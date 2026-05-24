"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { VortLogo } from "@/components/vort-logo";

const links = [
  { href: "/how",      label: "Как работает" },
  { href: "/examples", label: "Примеры" },
  { href: "/pricing",  label: "Цены" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      borderBottom: "1px solid var(--border)",
      background: "rgba(4,4,10,0.82)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 24px",
        height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
          <VortLogo size={32} />
          <span style={{
            fontWeight: 800, fontSize: 20, letterSpacing: "-0.04em",
            background: "linear-gradient(120deg,#a78bfa,#22d3ee)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>Vort</span>
        </Link>

        {/* Links */}
        <nav style={{ display:"flex", alignItems:"center", gap:2 }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              padding: "7px 14px", borderRadius: 8,
              fontSize: 14, fontWeight: 500, textDecoration: "none",
              transition: "background .15s, color .15s",
              color: pathname === l.href ? "var(--text)" : "var(--text-2)",
              background: pathname === l.href ? "var(--bg-2)" : "transparent",
            }}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link href="/build" style={{
          display:"flex", alignItems:"center", gap:7,
          padding: "9px 20px", borderRadius: 10,
          fontSize: 14, fontWeight: 700, color: "white", textDecoration: "none",
          background: "linear-gradient(135deg,#7655fc,#22d3ee)",
          boxShadow: "0 0 24px rgba(118,85,252,.4), inset 0 1px 0 rgba(255,255,255,.15)",
          transition: "opacity .15s, transform .15s",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity=".88"; (e.currentTarget as HTMLElement).style.transform="scale(1.03)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity="1";   (e.currentTarget as HTMLElement).style.transform="scale(1)"; }}
        >
          ⚡ Запустить
        </Link>
      </div>
    </header>
  );
}
