import Link from "next/link";

interface BreadcrumbProps {
  crumbs: { label: string; href?: string }[];
}

export default function Breadcrumb({ crumbs }: BreadcrumbProps) {
  return (
    <div style={{ background: "var(--off)", borderBottom: "1px solid var(--border)", padding: "10px 5%" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", display: "flex",
        alignItems: "center", gap: 8, fontSize: 13, color: "var(--tl)",
      }}>
        {crumbs.map((c, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {i > 0 && <span style={{ opacity: 0.4 }}>›</span>}
            {c.href
              ? <Link href={c.href} style={{ color: "var(--tl)", textDecoration: "none" }}
                  className="bc-link">{c.label}</Link>
              : <span>{c.label}</span>
            }
          </span>
        ))}
      </div>
      <style>{`.bc-link:hover { color: var(--navy) !important; }`}</style>
    </div>
  );
}
