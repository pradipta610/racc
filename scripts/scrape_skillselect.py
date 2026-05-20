import re
import os
import asyncio
from datetime import datetime
from playwright.async_api import async_playwright

# ── CONFIG ──────────────────────────────────────────────────────────────────
DASHBOARD_URL = (
    "https://api.dynamic.reports.employment.gov.au/anonap/extensions/"
    "hSKLS02_SkillSelect_EOI_Data/hSKLS02_SkillSelect_EOI_Data.html"
)

DOWNLOAD_DIR = os.path.join(os.path.dirname(__file__), "downloads")
os.makedirs(DOWNLOAD_DIR, exist_ok=True)


# ── WAIT HELPERS ─────────────────────────────────────────────────────────────
async def wait_for_homepage_ready(page):
    print("  Menunggu navbar visible...")
    await page.get_by_text("Navigate to sheet").wait_for(state="visible", timeout=60000)
    print("  Menunggu iframe visible...")
    await page.locator("iframe").wait_for(state="visible", timeout=60000)
    print("  ✓ Homepage ready!")


async def wait_for_eoi_params_ready(page):
    print("  Menunggu konten EOI Parameters siap...")
    frame = page.locator("iframe").content_frame
    await frame.get_by_label("Empty container Nominated").wait_for(
        state="visible", timeout=60000
    )
    print("  ✓ EOI Parameters ready!")
    return frame


async def wait_for_results_ready(frame):
    print("  Menunggu Results Table load...")
    await frame.locator("tr:nth-child(4) > td").first.wait_for(
        state="visible", timeout=60000
    )
    print("  ✓ Results Table ready!")


async def export_csv(page, frame, filename):
    filepath = os.path.join(DOWNLOAD_DIR, filename)

    await frame.locator("tr:nth-child(1) > td").first.click(button="right")
    await page.wait_for_timeout(500)

    await frame.get_by_text("Export data").click()
    await page.wait_for_timeout(500)

    await frame.locator(".lui-checkbox__check").click()
    await page.wait_for_timeout(300)

    async with page.expect_download(timeout=120000) as dl:
        await frame.get_by_role("button", name="Export").click()

    download = await dl.value
    await download.save_as(filepath)
    print(f"  ✓ Tersimpan: {filepath}")

    await frame.get_by_role("button", name="Close").click()
    await page.wait_for_timeout(500)

    return filepath


# ── RUN 1: Nominated State + Points ─────────────────────────────────────────
async def run1(playwright, timestamp):
    print("\n[Run 1] Nominated State + Points (SUBMITTED + INVITED)")

    browser = await playwright.chromium.launch(headless=False, slow_mo=200)
    context = await browser.new_context(accept_downloads=True)
    page = await context.new_page()

    await page.goto(DASHBOARD_URL, wait_until="domcontentloaded", timeout=60000)
    await wait_for_homepage_ready(page)

    await page.get_by_text("Navigate to sheet").click()
    await page.wait_for_timeout(500)
    await page.get_by_text("EOI Parameters").click()
    frame = await wait_for_eoi_params_ready(page)

    await frame.get_by_label("Empty container Nominated").get_by_role("button", name="Yes").click()
    await page.wait_for_timeout(500)
    await frame.get_by_label("Empty container Points").get_by_role("button", name="Yes").click()
    await page.wait_for_timeout(500)
    print("  ✓ Kolom: Nominated State + Points")

    await frame.get_by_test_id("filterpane-expand-button").click()
    await page.wait_for_timeout(1000)
    await frame.get_by_test_id("collapsed-title-Visa Type").locator("div").filter(has_text=re.compile(r"^Visa Type$")).click()
    await page.wait_for_timeout(500)
    await frame.get_by_test_id("search-input-field").fill("190")
    await page.wait_for_timeout(500)
    await frame.get_by_text("SAS Skilled Australian").click()
    await page.wait_for_timeout(300)
    await frame.get_by_role("button", name="Clear search").click()
    await frame.get_by_test_id("search-input-field").fill("189")
    await page.wait_for_timeout(500)
    await frame.get_by_title("189PTS Points-Tested Stream").click()
    await page.wait_for_timeout(300)
    await frame.get_by_test_id("search-input-field").fill("49")
    await page.wait_for_timeout(500)
    await frame.get_by_text("1FSR Family Sponsored -").click()
    await page.wait_for_timeout(300)
    await frame.get_by_text("1SNR State or Territory").click()
    await page.wait_for_timeout(300)
    await frame.get_by_test_id("actions-toolbar-confirm").click()
    await page.wait_for_timeout(1000)
    print("  ✓ Visa Type terpilih: 189, 190, 491")

    try:
        await frame.locator(".MuiBackdrop-root").click()
        await page.wait_for_timeout(500)
    except Exception:
        pass

    print("[Run 1] Klik Next...")
    await page.get_by_text("Next").click()
    await wait_for_results_ready(frame)

    print("[Run 1] Export data...")
    filepath = await export_csv(page, frame, f"skillselect_{timestamp}_nominated_points.csv")

    await context.close()
    await browser.close()
    return filepath


# ── RUN 2: Occupations + Month Submitted, INVITED only ──────────────────────
async def run2(playwright, timestamp):
    print("\n[Run 2] Occupations + Month Submitted (INVITED only)")

    browser = await playwright.chromium.launch(headless=False, slow_mo=200)
    context = await browser.new_context(accept_downloads=True)
    page = await context.new_page()

    await page.goto(DASHBOARD_URL, wait_until="domcontentloaded", timeout=60000)
    await wait_for_homepage_ready(page)

    await page.get_by_text("Navigate to sheet").click()
    await page.wait_for_timeout(500)
    await page.get_by_text("EOI Parameters").click()
    frame = await wait_for_eoi_params_ready(page)

    await frame.get_by_label("Empty container Month").get_by_role("button", name="Yes").click()
    await page.wait_for_timeout(500)
    await frame.get_by_label("Empty container Occupations").get_by_role("button", name="Yes").click()
    await page.wait_for_timeout(500)
    print("  ✓ Kolom: Month Submitted + Occupations")

    await frame.get_by_test_id("filterpane-expand-button").click()
    await page.wait_for_timeout(1000)
    await frame.get_by_test_id("collapsed-title-EOI Status").locator("div").filter(has_text=re.compile(r"^EOI Status$")).click()
    await page.wait_for_timeout(500)
    await frame.locator("span").filter(has_text="INVITED").first.click()
    await page.wait_for_timeout(300)
    await frame.get_by_test_id("actions-toolbar-confirm").click()
    await page.wait_for_timeout(500)
    print("  ✓ EOI Status: INVITED only")

    try:
        await frame.locator(".MuiBackdrop-root").click()
        await page.wait_for_timeout(500)
    except Exception:
        pass

    await frame.get_by_test_id("filterpane-expand-button").click()
    await page.wait_for_timeout(1000)
    await frame.get_by_test_id("collapsed-title-Visa Type").locator("div").filter(has_text=re.compile(r"^Visa Type$")).click()
    await page.wait_for_timeout(500)
    await frame.get_by_test_id("search-input-field").fill("190")
    await page.wait_for_timeout(500)
    await frame.get_by_text("SAS Skilled Australian").click()
    await page.wait_for_timeout(300)
    await frame.get_by_role("button", name="Clear search").click()
    await frame.get_by_test_id("search-input-field").fill("189")
    await page.wait_for_timeout(500)
    await frame.get_by_text("189PTS Points-Tested Stream").click()
    await page.wait_for_timeout(300)
    await frame.get_by_test_id("search-input-field").fill("49")
    await page.wait_for_timeout(500)
    await frame.get_by_text("1FSR Family Sponsored -").click()
    await page.wait_for_timeout(300)
    await frame.get_by_text("1SNR State or Territory").click()
    await page.wait_for_timeout(300)
    await frame.get_by_test_id("actions-toolbar-confirm").click()
    await page.wait_for_timeout(1000)
    print("  ✓ Visa Type terpilih: 189, 190, 491")

    try:
        await frame.locator(".MuiBackdrop-root").click()
        await page.wait_for_timeout(500)
    except Exception:
        pass

    print("[Run 2] Klik Next...")
    await page.get_by_text("Next").click()
    await wait_for_results_ready(frame)

    print("[Run 2] Export data...")
    filepath = await export_csv(page, frame, f"skillselect_{timestamp}_occupations_invited.csv")

    await context.close()
    await browser.close()
    return filepath


# ── RUN 3: Occupations + Points, SUBMITTED only ─────────────────────────────
async def run3(playwright, timestamp):
    print("\n[Run 3] Occupations + Points (SUBMITTED only)")

    browser = await playwright.chromium.launch(headless=False, slow_mo=200)
    context = await browser.new_context(accept_downloads=True)
    page = await context.new_page()

    await page.goto(DASHBOARD_URL, wait_until="domcontentloaded", timeout=60000)
    await wait_for_homepage_ready(page)

    await page.get_by_text("Navigate to sheet").click()
    await page.wait_for_timeout(500)
    await page.get_by_text("EOI Parameters").click()
    frame = await wait_for_eoi_params_ready(page)

    # Kolom: Occupations + Points
    await frame.get_by_label("Empty container Occupations").get_by_role("button", name="Yes").click()
    await page.wait_for_timeout(500)
    await frame.get_by_label("Empty container Points").get_by_role("button", name="Yes").click()
    await page.wait_for_timeout(500)
    print("  ✓ Kolom: Occupations + Points")

    await frame.get_by_test_id("filterpane-expand-button").click()
    await page.wait_for_timeout(1000)
    await frame.get_by_test_id("collapsed-title-Visa Type").locator("div").filter(has_text=re.compile(r"^Visa Type$")).click()
    await page.wait_for_timeout(500)
    await frame.get_by_test_id("search-input-field").fill("190")
    await page.wait_for_timeout(500)
    await frame.get_by_text("SAS Skilled Australian").click()
    await page.wait_for_timeout(300)
    await frame.get_by_role("button", name="Clear search").click()
    await frame.get_by_test_id("search-input-field").fill("189")
    await page.wait_for_timeout(500)
    await frame.get_by_title("189PTS Points-Tested Stream").click()
    await page.wait_for_timeout(300)
    await frame.get_by_test_id("search-input-field").fill("49")
    await page.wait_for_timeout(500)
    await frame.get_by_text("1FSR Family Sponsored -").click()
    await page.wait_for_timeout(300)
    await frame.get_by_text("1SNR State or Territory").click()
    await page.wait_for_timeout(300)
    await frame.get_by_test_id("actions-toolbar-confirm").click()
    await page.wait_for_timeout(1000)
    print("  ✓ Visa Type terpilih: 189, 190, 491")

    try:
        await frame.locator(".MuiBackdrop-root").click()
        await page.wait_for_timeout(500)
    except Exception:
        pass

    # Filter EOI Status: SUBMITTED only
    await frame.get_by_test_id("filterpane-expand-button").click()
    await page.wait_for_timeout(1000)
    await frame.get_by_test_id("collapsed-title-EOI Status").locator("div").filter(has_text=re.compile(r"^EOI Status$")).click()
    await page.wait_for_timeout(500)
    await frame.get_by_text("SUBMITTED", exact=True).click()
    await page.wait_for_timeout(300)
    await frame.get_by_test_id("actions-toolbar-confirm").click()
    await page.wait_for_timeout(500)
    print("  ✓ EOI Status: SUBMITTED only")

    try:
        await frame.locator(".MuiBackdrop-root").click()
        await page.wait_for_timeout(500)
    except Exception:
        pass

    print("[Run 3] Klik Next...")
    await page.get_by_text("Next").click()
    await wait_for_results_ready(frame)

    print("[Run 3] Export data...")
    filepath = await export_csv(page, frame, f"skillselect_{timestamp}_occupations_submitted.csv")

    await context.close()
    await browser.close()
    return filepath


# ── ENTRY POINT ──────────────────────────────────────────────────────────────
async def main():
    print("=== SkillSelect Scraper ===")
    print(f"Waktu: {datetime.now().strftime('%Y-%m-%d %H:%M')}")

    timestamp = datetime.now().strftime("%Y%m")
    downloaded = []

    # Kalau Run 1 & 2 sudah ada, comment out dan jalankan run3 saja:
    # runs = [run3]
    runs = [run1, run2, run3]

    async with async_playwright() as pw:
        for i, run_fn in enumerate(runs, start=1):
            try:
                path = await run_fn(pw, timestamp)
                downloaded.append(path)
            except Exception as e:
                print(f"[Run {i}] ERROR: {e}")
            await asyncio.sleep(5)

    print(f"\n=== Selesai: {len(downloaded)} file ===")
    for f in downloaded:
        try:
            import pandas as pd
            df = pd.read_excel(f)
            print(f"\n{os.path.basename(f)}: {len(df)} rows")
            print(f"Kolom: {list(df.columns)}")
            print(df.head(3).to_string())
        except Exception as e:
            print(f"Preview gagal: {e}")


if __name__ == "__main__":
    asyncio.run(main())