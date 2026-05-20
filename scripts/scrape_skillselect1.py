import asyncio
import os
import pandas as pd
from datetime import datetime
from playwright.async_api import async_playwright

# ── CONFIG ──────────────────────────────────────────────────────────────────
DASHBOARD_URL = (
    "https://api.dynamic.reports.employment.gov.au/anonap/extensions/"
    "hSKLS02_SkillSelect_EOI_Data/hSKLS02_SkillSelect_EOI_Data.html"
)
DOWNLOAD_DIR = os.path.join(os.path.dirname(__file__), "downloads")
os.makedirs(DOWNLOAD_DIR, exist_ok=True)

# Kolom tambahan yang mau diaktifkan (max 2 per run)
# Kita jalankan 2x dengan kombinasi berbeda
COLUMN_COMBOS = [
    ["Nominated State", "Points"],
    ["Occupations", "Month Submitted"],
]

# ── HELPERS ─────────────────────────────────────────────────────────────────
async def wait_and_click(page, text, timeout=15000):
    """Klik elemen berdasarkan teks yang terlihat."""
    await page.get_by_text(text, exact=True).first.click(timeout=timeout)
    await page.wait_for_timeout(1000)


async def scrape_with_columns(playwright, col1: str, col2: str, run_index: int):
    """Satu run: buka dashboard, set filter, export CSV."""
    browser = await playwright.chromium.launch(headless=True)
    context = await browser.new_context(accept_downloads=True)
    page = await context.new_page()

    print(f"\n[Run {run_index}] Membuka dashboard...")
    await page.goto(DASHBOARD_URL, wait_until="networkidle", timeout=60000)
    await page.wait_for_timeout(3000)

    # ── STEP 1: As At Month sudah auto-select bulan terbaru ──────────────────
    print(f"[Run {run_index}] Step 1: As At Month sudah terpilih otomatis")

    # ── STEP 2: Pilih semua Visa Type relevan ─────────────────────────────────
    print(f"[Run {run_index}] Step 2: Memilih Visa Type...")
    try:
        visa_filter = page.locator("text=Visa Type").first
        await visa_filter.click()
        await page.wait_for_timeout(1000)

        for visa in ["189", "190", "491"]:
            try:
                await page.get_by_text(visa, exact=False).first.click()
                await page.wait_for_timeout(500)
            except Exception:
                print(f"  [!] Visa {visa} tidak ditemukan, skip")
    except Exception as e:
        print(f"  [!] Filter Visa Type gagal: {e}")

    # ── STEP 3: Aktifkan kolom tambahan ──────────────────────────────────────
    print(f"[Run {run_index}] Step 3: Mengaktifkan kolom: {col1}, {col2}")
    for col_name in [col1, col2]:
        try:
            # Cari Yes button di dekat label kolom
            col_section = page.locator(f"text={col_name}").first
            yes_btn = col_section.locator("..").locator("..").get_by_text("Yes")
            await yes_btn.click()
            await page.wait_for_timeout(500)
            print(f"  ✓ {col_name} diaktifkan")
        except Exception as e:
            print(f"  [!] Gagal aktifkan {col_name}: {e}")

    # ── Klik NEXT ─────────────────────────────────────────────────────────────
    print(f"[Run {run_index}] Klik NEXT...")
    await page.locator("text=NEXT").click()
    await page.wait_for_timeout(5000)  # tunggu tabel load

    # ── Export CSV ────────────────────────────────────────────────────────────
    print(f"[Run {run_index}] Export data...")
    timestamp = datetime.now().strftime("%Y%m")
    filename = f"skillselect_{timestamp}_run{run_index}.csv"
    filepath = os.path.join(DOWNLOAD_DIR, filename)

    try:
        async with page.expect_download(timeout=30000) as dl:
            await page.locator(".qv-object-content-container").first.click(
                button="right"
            )
            await page.wait_for_timeout(500)
            await page.get_by_text("Export data").click()

        download = await dl.value
        await download.save_as(filepath)
        print(f"  ✓ Tersimpan: {filepath}")
    except Exception as e:
        print(f"  [!] Export gagal: {e}")
        filepath = None

    await browser.close()
    return filepath


# ── MAIN ────────────────────────────────────────────────────────────────────
async def main():
    print("=== SkillSelect Scraper ===")
    print(f"Waktu: {datetime.now().strftime('%Y-%m-%d %H:%M')}")

    downloaded_files = []

    async with async_playwright() as pw:
        for i, (col1, col2) in enumerate(COLUMN_COMBOS, start=1):
            filepath = await scrape_with_columns(pw, col1, col2, run_index=i)
            if filepath:
                downloaded_files.append(filepath)
            await asyncio.sleep(2)  # jeda antar run

    # ── Preview hasil ────────────────────────────────────────────────────────
    print(f"\n=== Selesai: {len(downloaded_files)} file didownload ===")
    for f in downloaded_files:
        try:
            df = pd.read_csv(f)
            print(f"\n{os.path.basename(f)}: {len(df)} rows, kolom: {list(df.columns)}")
            print(df.head(3).to_string())
        except Exception as e:
            print(f"Preview gagal: {e}")


if __name__ == "__main__":
    asyncio.run(main())
