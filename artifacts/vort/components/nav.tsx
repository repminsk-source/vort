"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { VortLogo } from "@/components/vort-logo";

const LINKS = [
  { href: "/how",      label: "Как работает" },
  { href: "/examples", label: "Примеры" },
  { href: "/pricing",  label: "Цены" },
];

export function Nav() {
  const pathname  = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close menu on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        background: scrolled ? "rgba(6,6,6,.94)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "background .3s, border-color .3s",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "0 clamp(16px,3vw,24px)",
          height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
            <VortLogo size={30}/>
            <span style={{ fontWeight:800, fontSize:18, letterSpacing:"-0.04em", color:"var(--white)" }}>
              Vort
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display:"flex", alignItems:"center", gap:2 }} className="hide-mobile">
            {LINKS.map(l => (
              <Link key={l.href} href={l.href} style={{
                padding:"7px 14px", borderRadius:8,
                fontSize:14, fontWeight:500, textDecoration:"none",
                color: pathname === l.href ? "var(--white)" : "var(--text-2)",
                background: pathname === l.href ? "var(--bg-3)" : "transparent",
                transition:"background .15s, color .15s",
              }}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hide-mobile">
            <Link href="/build" className="btn-white" style={{
              padding:"8px 20px", borderRadius:8,
              fontSize:13, fontWeight:700, color:"var(--bg)", textDecoration:"none",
              background:"var(--white)", display:"inline-block",
            }}>Запустить</Link>
          </div>

          {/* Mobile burger button */}
          <button
            className="hide-desktop"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            style={{
              width:40, height:40, borderRadius:8,
              border:"1px solid var(--border-2)",
              background:"var(--bg-2)", cursor:"pointer",
              display:"flex", flexDirection:"column",
              alignItems:"center", justifyContent:"center", gap:5,
              flexShrink:0,
            }}
          >
            <span style={{
              width:18, height:1.5, background:"var(--text)", borderRadius:2,
              display:"block", transition:"transform .25s, opacity .25s",
              transform: open ? "rotate(45deg) translate(0,3.5px)" : "none",
            }}/>
            <span style={{
              width:18, height:1.5, background:"var(--text)", borderRadius:2,
              display:"block", transition:"opacity .25s",
              opacity: open ? 0 : 1,
            }}/>
            <span style={{
              width:18, height:1.5, background:"var(--text)", borderRadius:2,
              display:"block", transition:"transform .25s, opacity .25s",
              transform: open ? "rotate(-45deg) translate(0,-3.5px)" : "none",
            }}/>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay — backdrop */}
      {open && (
        <div
          className="hide-desktop"
          onClick={() => setOpen(false)}
          style={{
            position:"fixed", inset:0, zIndex:198,
            background:"rgba(0,0,0,.6)",
            backdropFilter:"blur(4px)",
          }}
        />
      )}

      {/* Mobile menu panel */}
      <div
        className="hide-desktop"
        style={{
          position:"fixed", top:60, left:0, right:0, zIndex:199,
          background:"var(--bg-1)",
          borderBottom:"1px solid var(--border-2)",
          transform: open ? "translateY(0)" : "translateY(-110%)",
          transition:"transform .3s cubic-bezier(.22,1,.36,1)",
          padding:"8px 16px 20px",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {LINKS.map(l => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            style={{
              display:"flex", alignItems:"center",
              padding:"14px 8px", fontSize:17, fontWeight:600,
              color: pathname === l.href ? "var(--white)" : "var(--text-2)",
              textDecoration:"none",
              borderBottom:"1px solid var(--border)",
              transition:"color .15s",
            }}
          >
            {l.label}
          </Link>
        ))}

        <Link
          href="/build"
          onClick={() => setOpen(false)}
          style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            marginTop:16, padding:"14px 0",
            fontSize:15, fontWeight:700, color:"var(--bg)",
            textDecoration:"none", background:"var(--white)",
            borderRadius:12,
          }}
        >
          Запустить Builder
        </Link>
      </div>
    </>
  );
}
