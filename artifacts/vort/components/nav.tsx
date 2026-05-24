"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";
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
    <header className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ background: "rgba(8,8,13,0.85)", backdropFilter: "blur(16px)", borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
            <Zap size={16} color="white" />
          </div>
          <span className="gradient-text">Vort</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                pathname === link.href
                  ? "text-white"
                  : "hover:text-white"
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
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
          <Zap size={14} />
          Запустить
        </Link>
      </div>
    </header>
  );
}
