"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { VortLogo } from "@/components/vort-logo";

const links = [
  { href: "/how",      label: "Как работает" },
  { href: "/examples", label: "Примеры" },
  { href: "/pricing",  label: "Цены" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,.07)" : "transparent"}`,
        background: scrolled ? "rgba(6,6,6,.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "background .3s, border-color .3s, backdrop-filter .3s",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 24px",
          height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
            <VortLogo size={30} />
            <span style={{
              fontWeight: 800, fontSize: 18, letterSpacing: "-0.04em",
              color: "var(--white)",
            }}>Vort</span>
          </Link>

          {/* Desktop links */}
          <nav className="hide-mobile" style={{ display:"flex", alignItems:"center", gap:2 }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} className="link-hover" style={{
                padding: "7px 14px", borderRadius: 8,
                fontSize: 14, fontWeight: 500, textDecoration: "none",
                color: pathname === l.href ? "var(--white)" : "var(--text-2)",
                background: pathname === l.href ? "var(--bg-3)" : "transparent",
                transition: "background .15s, color .15s",
              }}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hide-mobile" style={{ display:"flex", alignItems:"center", gap:8 }}>
            <Link href="/build" className="btn-white" style={{
              padding: "8px 20px", borderRadius: 8,
              fontSize: 13, fontWeight: 700, color: "var(--bg)", textDecoration: "none",
              background: "var(--white)",
              boxShadow: "0 0 0 1px rgba(255,255,255,.15)",
            }}>
              Запустить
            </Link>
          </div>

          {/* Mobile burger */}
          <button className="hide-desktop" onClick={() => setOpen(o=>!o)} style={{
            width: 40, height: 40, borderRadius: 8, border: "1px solid var(--border-2)",
            background: "var(--bg-2)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 5,
          }}>
            <span style={{ width:18, height:1.5, background:"var(--text)", borderRadius:2, transition:"transform .2s, opacity .2s", transform: open ? "rotate(45deg) translate(4px,4px)" : "none" }} />
            <span style={{ width:18, height:1.5, background:"var(--text)", borderRadius:2, opacity: open ? 0 : 1 }} />
            <span style={{ width:18, height:1.5, background:"var(--text)", borderRadius:2, transition:"transform .2s, opacity .2s", transform: open ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className="hide-desktop" style={{
        position: "fixed", top: 60, left: 0, right: 0, zIndex: 99,
        background: "var(--bg-1)", borderBottom: "1px solid var(--border-2)",
        transform: open ? "translateY(0)" : "translateY(-110%)",
        transition: "transform .3s cubic-bezier(.22,1,.36,1)",
        padding: "16px 24px 24px",
      }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{
            display: "block", padding: "12px 0", fontSize: 16, fontWeight: 600,
            color: pathname === l.href ? "var(--white)" : "var(--text-2)", textDecoration: "none",
            borderBottom: "1px solid var(--border)",
          }}>{l.label}</Link>
        ))}
        <Link href="/build" style={{
          display: "block", marginTop: 16, padding: "12px 0", textAlign: "center",
          fontSize: 15, fontWeight: 700, color: "var(--bg)", textDecoration: "none",
          background: "var(--white)", borderRadius: 10,
        }}>Запустить</Link>
      </div>
    </>
  );
}
