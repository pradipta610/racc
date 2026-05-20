import os
import re
import pandas as pd
from supabase import create_client
from dotenv import load_dotenv
from datetime import datetime

# ── CONFIG ──────────────────────────────────────────────────────────────────
# Load dari .env.local di root project
load_dotenv(os.path.join(os.path.dirname(__file__), "../.env.local"))

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

DOWNLOAD_DIR = os.path.join(os.path.dirname(__file__), "downloads")
TIMESTAMP = datetime.now().strftime("%Y%m")


# ── HELPERS ──────────────────────────────────────────────────────────────────
def extract_anzsco(occupation: str):
    """Extract ANZSCO code dan nama dari string seperti '221111 Accountant (General)'"""
    if not isinstance(occupation, str):
        return None, None
    match = re.match(r"^(\d{6})\s+(.+)$", occupation.strip())
    if match:
        return match.group(1), match.group(2).strip()
    return None, occupation.strip()


def clean_date(val):
    """Convert date ke format YYYY-MM-DD string."""
    if pd.isna(val):
        return None
    if isinstance(val, str):
        return val[:10]
    return str(val)[:10]


def clean_points(val):
    """Convert points ke integer, None kalau tidak valid."""
    try:
        return int(val)
    except (ValueError, TypeError):
        return None


def upload_batch(table: str, records: list, batch_size: int = 500):
    """Upload records ke Supabase dalam batch."""
    total = len(records)
    uploaded = 0
    for i in range(0, total, batch_size):
        batch = records[i:i + batch_size]
        supabase.table(table).insert(batch).execute()
        uploaded += len(batch)
        print(f"  Uploaded {uploaded}/{total}...")
    print(f"  ✓ Selesai: {total} records ke tabel '{table}'")


# ── UPLOAD RUN 1: eoi_by_state_points ────────────────────────────────────────
def upload_run1():
    filepath = os.path.join(DOWNLOAD_DIR, f"skillselect_{TIMESTAMP}_nominated_points.csv")
    print(f"\n[Upload 1] {os.path.basename(filepath)}")

    df = pd.read_excel(filepath)
    print(f"  {len(df)} rows ditemukan")

    # Cek apakah data bulan ini sudah ada
    as_at_month = clean_date(df["As At Month"].iloc[0])
    existing = supabase.table("eoi_by_state_points").select("id").eq("as_at_month", as_at_month).limit(1).execute()
    if existing.data:
        print(f"  ⚠ Data bulan {as_at_month} sudah ada, skip upload")
        return

    records = []
    for _, row in df.iterrows():
        records.append({
            "as_at_month":     clean_date(row["As At Month"]),
            "visa_type":       str(row["Visa Type"]),
            "eoi_status":      str(row["EOI Status"]),
            "points":          clean_points(row.get("Points")),
            "nominated_state": str(row["Nominated State"]) if pd.notna(row.get("Nominated State")) else None,
            "count_eois":      str(row["Count EOIs"]),
        })

    upload_batch("eoi_by_state_points", records)


# ── UPLOAD RUN 2: eoi_occupation_invited ─────────────────────────────────────
def upload_run2():
    filepath = os.path.join(DOWNLOAD_DIR, f"skillselect_{TIMESTAMP}_occupations_invited.csv")
    print(f"\n[Upload 2] {os.path.basename(filepath)}")

    df = pd.read_excel(filepath)
    print(f"  {len(df)} rows ditemukan")

    as_at_month = clean_date(df["As At Month"].iloc[0])
    existing = supabase.table("eoi_occupation_invited").select("id").eq("as_at_month", as_at_month).limit(1).execute()
    if existing.data:
        print(f"  ⚠ Data bulan {as_at_month} sudah ada, skip upload")
        return

    records = []
    for _, row in df.iterrows():
        anzsco_code, occupation_name = extract_anzsco(row.get("Occupation"))
        records.append({
            "as_at_month":     clean_date(row["As At Month"]),
            "month_submitted": clean_date(row.get("Month Submitted")),
            "visa_type":       str(row["Visa Type"]),
            "occupation":      str(row["Occupation"]) if pd.notna(row.get("Occupation")) else None,
            "anzsco_code":     anzsco_code,
            "occupation_name": occupation_name,
            "eoi_status":      str(row["EOI Status"]),
            "count_eois":      str(row["Count EOIs"]),
        })

    upload_batch("eoi_occupation_invited", records)


# ── UPLOAD RUN 3: eoi_occupation_submitted ───────────────────────────────────
def upload_run3():
    filepath = os.path.join(DOWNLOAD_DIR, f"skillselect_{TIMESTAMP}_occupations_submitted.csv")
    print(f"\n[Upload 3] {os.path.basename(filepath)}")

    df = pd.read_excel(filepath)
    print(f"  {len(df)} rows ditemukan")

    as_at_month = clean_date(df["As At Month"].iloc[0])
    existing = supabase.table("eoi_occupation_submitted").select("id").eq("as_at_month", as_at_month).limit(1).execute()
    if existing.data:
        print(f"  ⚠ Data bulan {as_at_month} sudah ada, skip upload")
        return

    records = []
    for _, row in df.iterrows():
        anzsco_code, occupation_name = extract_anzsco(row.get("Occupation"))
        records.append({
            "as_at_month":     clean_date(row["As At Month"]),
            "visa_type":       str(row["Visa Type"]),
            "occupation":      str(row["Occupation"]) if pd.notna(row.get("Occupation")) else None,
            "anzsco_code":     anzsco_code,
            "occupation_name": occupation_name,
            "eoi_status":      str(row["EOI Status"]),
            "points":          clean_points(row.get("Points")),
            "count_eois":      str(row["Count EOIs"]),
        })

    upload_batch("eoi_occupation_submitted", records)


# ── MAIN ─────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("=== SkillSelect Upload ke Supabase ===")
    print(f"Waktu: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"Supabase URL: {SUPABASE_URL}")

    upload_run1()
    upload_run2()
    upload_run3()

    print("\n=== Semua selesai! ===")
