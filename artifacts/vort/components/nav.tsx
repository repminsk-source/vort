"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";
import { VortLogo } from "@/components/vort-logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Главная" },
  { href: "/how", label: "Как это работает" },
  { href: "/examples", label: "Примеры" },
  { href: "/pricing", label: "Цены" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        background: "rgba(8,8,13,0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "var(--border)",
        willChange: "transform",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight">
          <VortLogo size={34} />
          <span
            style={{
              fontWeight: 800,
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #9d7ffe, #00d4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Vort
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                pathname === link.href ? "text-white" : "hover:text-white"
              )}
              style={{
                color: pathname === link.href ? "var(--text)" : "var(--text-muted)",
                background: pathname === link.href ? "var(--bg-elevated)" : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/build"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.03] active:scale-95"
          style={{
            background: "linear-gradient(135deg, #7c5cfc, #00d4ff)",
            boxShadow: "0 0 20px rgba(124,92,252,0.35)",
          }}
        >
          <Zap size={14} />
          Запустить
        </Link>
      </div>
    </header>
  );
}
