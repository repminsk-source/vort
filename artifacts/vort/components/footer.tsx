import Link from "next/link";
import { VortLogo } from "@/components/vort-logo";

export function Footer() {
  return (
    <footer
      className="border-t mt-24"
      style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <VortLogo size={32} />
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "1.2rem",
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
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Опишите вашу идею на русском языке — Vort создаст полноценное приложение с кодом, базой данных и API за секунды.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: "var(--text)" }}>
              Продукт
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/how", label: "Как это работает" },
                { href: "/examples", label: "Примеры" },
                { href: "/pricing", label: "Цены" },
                { href: "/build", label: "Запустить" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: "var(--text)" }}>
              Технологии
            </h4>
            <ul className="space-y-2">
              {["Next.js 15", "Vercel AI SDK", "Ollama", "TypeScript", "Tailwind CSS"].map(
                (tech) => (
                  <li key={tech} className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {tech}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-8 flex items-center justify-between border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-dim)" }}>
            © 2025 Vort. Все права защищены.
          </p>
          <p className="text-xs" style={{ color: "var(--text-dim)" }}>
            Powered by Ollama + Vercel AI SDK
          </p>
        </div>
      </div>
    </footer>
  );
}
