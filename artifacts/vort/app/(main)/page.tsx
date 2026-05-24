import Link from "next/link";
import { ArrowRight, Zap, Code2, Database, Globe, Sparkles, CheckCircle } from "lucide-react";
import { VortLogo } from "@/components/vort-logo";

const steps = [
  {
    number: "01",
    icon: <Sparkles size={22} />,
    title: "Опишите идею",
    desc: "Напишите, что вы хотите построить — на обычном русском языке. Никакого технического жаргона не нужно.",
  },
  {
    number: "02",
    icon: <Code2 size={22} />,
    title: "AI генерирует код",
    desc: "Vort анализирует вашу идею и создаёт полноценный код: компоненты, API, схему базы данных.",
  },
  {
    number: "03",
    icon: <Database size={22} />,
    title: "Готовая архитектура",
    desc: "Получите структуру папок, SQL-схему, API endpoints и основные компоненты — готовые к использованию.",
  },
  {
    number: "04",
    icon: <Globe size={22} />,
    title: "Экспорт и запуск",
    desc: "Скачайте результат, скопируйте код и запустите приложение в своём окружении.",
  },
];

const examples = [
  {
    title: "CRM-система",
    prompt: "Создай CRM для отдела продаж с историей звонков, сделками и отчётами",
    tags: ["TypeScript", "PostgreSQL", "REST API"],
    color: "from-purple-600/20 to-blue-600/20",
  },
  {
    title: "Маркетплейс",
    prompt: "Онлайн-магазин с каталогом, корзиной и оплатой через Stripe",
    tags: ["Next.js", "Prisma", "Stripe"],
    color: "from-blue-600/20 to-cyan-600/20",
  },
  {
    title: "Трекер задач",
    prompt: "Канбан-доска для команды с назначением исполнителей и дедлайнами",
    tags: ["React", "Drizzle", "WebSockets"],
    color: "from-cyan-600/20 to-teal-600/20",
  },
];

const features = [
  "Структура папок и файлов",
  "Схема базы данных (SQL)",
  "REST API endpoints",
  "React-компоненты",
  "TypeScript типы",
  "Полностью на русском",
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-20">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }} />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-5"
            style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8 border"
            style={{ background: "rgba(124,92,252,0.1)", borderColor: "rgba(124,92,252,0.3)", color: "var(--primary-light)" }}>
            <Sparkles size={12} />
            Работает локально с Ollama
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            Опишите идею —{" "}
            <span className="gradient-text">получите</span>
            <br />
            готовое приложение
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-muted)" }}>
            Vort превращает вашу идею в рабочий код. Просто опишите приложение на русском языке — AI создаст архитектуру, схему БД и все компоненты.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/build"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
              <Zap size={18} />
              Начать создавать
              <ArrowRight size={16} />
            </Link>
            <Link href="/examples"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-base border transition-all hover:border-opacity-60"
              style={{ color: "var(--text-muted)", borderColor: "var(--border)", background: "var(--bg-card)" }}>
              Посмотреть примеры
            </Link>
          </div>

          {/* Feature chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-12">
            {features.map((f) => (
              <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "var(--bg-card)" }}>
                <CheckCircle size={11} style={{ color: "var(--accent)" }} />
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-24" style={{ background: "var(--bg-card)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Как это работает</h2>
            <p className="text-base" style={{ color: "var(--text-muted)" }}>
              Четыре шага от идеи до готового кода
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative p-6 rounded-xl border transition-all hover:border-opacity-60"
                style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}>
                <div className="text-xs font-bold mb-4" style={{ color: "var(--primary-light)" }}>
                  {step.number}
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(124,92,252,0.15)", color: "var(--primary-light)" }}>
                  {step.icon}
                </div>
                <h3 className="font-semibold text-base mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Примеры проектов</h2>
            <p className="text-base" style={{ color: "var(--text-muted)" }}>
              Что пользователи уже создали с помощью Vort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {examples.map((ex, i) => (
              <div key={i} className={`p-6 rounded-xl border bg-gradient-to-br ${ex.color} transition-all hover:scale-[1.02]`}
                style={{ borderColor: "var(--border)" }}>
                <h3 className="font-semibold text-lg mb-3">{ex.title}</h3>
                <p className="text-sm mb-4 leading-relaxed italic"
                  style={{ color: "var(--text-muted)" }}>
                  &ldquo;{ex.prompt}&rdquo;
                </p>
                <div className="flex flex-wrap gap-2">
                  {ex.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded border"
                      style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "rgba(0,0,0,0.3)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/examples"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: "var(--primary-light)" }}>
              Все примеры <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24" style={{ background: "var(--bg-card)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-10 rounded-2xl border relative overflow-hidden"
            style={{ borderColor: "rgba(124,92,252,0.3)", background: "linear-gradient(135deg, rgba(124,92,252,0.08), rgba(0,212,255,0.04))" }}>
            <div className="absolute inset-0 opacity-5 pointer-events-none"
              style={{ background: "radial-gradient(circle at 50% 0%, var(--primary), transparent 70%)" }} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative">
              Готовы создать что-то новое?
            </h2>
            <p className="mb-8 relative" style={{ color: "var(--text-muted)" }}>
              Откройте Builder, опишите свою идею и получите полноценный код за секунды.
            </p>
            <Link href="/build"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
              <Zap size={18} />
              Открыть AI Builder
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
