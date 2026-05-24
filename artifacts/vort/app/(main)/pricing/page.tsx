import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Цены — Vort",
  description: "Тарифные планы Vort AI Builder",
};

const plans = [
  {
    name: "Бесплатно",
    price: "0₽",
    period: "",
    description: "Для знакомства с возможностями Vort",
    highlight: false,
    features: [
      "20 генераций в месяц",
      "Модели Ollama (локально)",
      "Базовые шаблоны проектов",
      "История в рамках сессии",
      "Копирование кода",
      "Markdown-экспорт",
    ],
    disabled: ["Приоритетная генерация", "Сохранение проектов", "Командный доступ", "API доступ"],
    cta: "Начать бесплатно",
    href: "/build",
  },
  {
    name: "Pro",
    price: "990₽",
    period: "/ месяц",
    description: "Для разработчиков и фрилансеров",
    highlight: true,
    features: [
      "Неограниченные генерации",
      "Все модели Ollama + GPT-4o",
      "Расширенные шаблоны",
      "Сохранение проектов (до 50)",
      "История всех генераций",
      "JSON + ZIP экспорт",
      "Приоритетная поддержка",
    ],
    disabled: ["Командный доступ", "API доступ"],
    cta: "Попробовать Pro",
    href: "/build",
    badge: "Популярный",
  },
  {
    name: "Команда",
    price: "3 990₽",
    period: "/ месяц",
    description: "Для команд и стартапов",
    highlight: false,
    features: [
      "Всё из Pro",
      "До 10 участников",
      "Общие проекты и шаблоны",
      "API доступ (1000 req/day)",
      "Приоритетная генерация",
      "Выделенная поддержка",
      "Кастомные промпты",
      "Аналитика использования",
    ],
    disabled: [],
    cta: "Связаться с нами",
    href: "/build",
  },
];

const faqs = [
  {
    q: "Нужно ли устанавливать Ollama?",
    a: "Да, для работы на бесплатном плане вам нужен локальный Ollama. В Pro и Team планах доступны облачные модели без установки.",
  },
  {
    q: "Какие языковые модели поддерживаются?",
    a: "Vort работает с любой моделью Ollama: llama3.2, mistral, qwen2.5-coder, deepseek-coder и другими. В Pro плане доступны GPT-4o и Claude.",
  },
  {
    q: "Можно ли сохранять сгенерированные проекты?",
    a: "В бесплатном плане история сохраняется в рамках сессии. В Pro и Team можно сохранять неограниченно.",
  },
  {
    q: "Есть ли API для интеграции?",
    a: "Да, API доступ включён в Team план. Это позволяет интегрировать Vort в ваш CI/CD или внутренние инструменты.",
  },
];

export default function PricingPage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Простые и честные цены</h1>
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            Начните бесплатно, масштабируйтесь по мере роста
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {plans.map((plan) => (
            <div key={plan.name}
              className="relative p-7 rounded-2xl border flex flex-col"
              style={{
                background: plan.highlight ? "rgba(124,92,252,0.06)" : "var(--bg-card)",
                borderColor: plan.highlight ? "rgba(124,92,252,0.5)" : "var(--border)",
                boxShadow: plan.highlight ? "0 0 40px rgba(124,92,252,0.12)" : "none",
              }}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-bold mb-1">{plan.name}</h2>
                <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-4 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                    <span>{f}</span>
                  </li>
                ))}
                {plan.disabled.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-dim)" }}>
                    <span className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 flex items-center justify-center text-xs">—</span>
                    <span className="line-through">{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}
                className="mt-6 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={plan.highlight
                  ? { background: "linear-gradient(135deg, var(--primary), var(--accent))", color: "white" }
                  : { background: "var(--bg-elevated)", color: "var(--text)", border: "1px solid var(--border)" }
                }>
                {plan.name === "Бесплатно" && <Zap size={14} />}
                {plan.cta}
                {plan.name !== "Бесплатно" && <ArrowRight size={14} />}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Часто задаваемые вопросы</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
