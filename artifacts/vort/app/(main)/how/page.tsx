import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Cpu, FileCode2, Download, ArrowRight, CheckCircle, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Как это работает — Vort",
  description: "Пошаговое объяснение того, как Vort превращает вашу идею в готовое приложение",
};

const steps = [
  {
    icon: <MessageSquare size={28} />,
    title: "Опишите свою идею",
    description:
      "Откройте AI Builder и напишите, что вы хотите создать. Используйте обычный русский язык — никакого технического жаргона не нужно. Чем подробнее описание, тем точнее результат.",
    example: "Создай веб-приложение для учёта личных финансов с графиками расходов по категориям, возможностью добавлять транзакции и экспортом в Excel",
    points: [
      "Описывайте функциональность, не технологии",
      "Упоминайте ключевые сущности (пользователи, товары, заказы)",
      "Указывайте особые требования если есть",
    ],
  },
  {
    icon: <Cpu size={28} />,
    title: "AI анализирует запрос",
    description:
      "Vort передаёт ваш запрос локальной языковой модели через Ollama. Модель анализирует требования и планирует архитектуру приложения — от структуры БД до API endpoints.",
    example: "Vort определяет: нужны таблицы transactions, categories, users; REST API с CRUD для каждой; компоненты Dashboard, TransactionList, Chart",
    points: [
      "Локальная обработка — данные не покидают ваш компьютер",
      "Работает с любой моделью Ollama (llama3, mistral, qwen и др.)",
      "Понимает контекст и предметную область",
    ],
  },
  {
    icon: <FileCode2 size={28} />,
    title: "Генерация кода и схем",
    description:
      "На основе анализа Vort генерирует полный набор артефактов: SQL-схему базы данных, TypeScript типы, React компоненты, API маршруты и структуру папок проекта.",
    example: "CREATE TABLE transactions (id SERIAL PRIMARY KEY, amount DECIMAL, category_id INT, created_at TIMESTAMP...)",
    points: [
      "SQL DDL для создания схемы базы данных",
      "TypeScript интерфейсы для всех сущностей",
      "React компоненты с TypeScript props",
      "Express/Next.js API роуты с валидацией",
    ],
  },
  {
    icon: <Download size={28} />,
    title: "Экспорт и использование",
    description:
      "Скопируйте сгенерированный код или скачайте всё одним файлом. Код готов к использованию — просто вставьте в ваш проект и адаптируйте под нужды.",
    example: "Экспорт: JSON с полной структурой, Markdown с документацией, или копирование отдельных блоков",
    points: [
      "Копирование в буфер обмена одним кликом",
      "Экспорт в JSON или Markdown",
      "История всех генераций в сессии",
    ],
  },
];

const techStack = [
  { name: "Next.js 15", desc: "Фреймворк для React с App Router" },
  { name: "Vercel AI SDK", desc: "Стриминг ответов от AI моделей" },
  { name: "Ollama", desc: "Локальный запуск языковых моделей" },
  { name: "TypeScript", desc: "Типизированный JavaScript" },
  { name: "Tailwind CSS v4", desc: "Утилитарный CSS-фреймворк" },
];

export default function HowPage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Как работает Vort</h1>
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            От идеи до готового кода — четыре простых шага
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16 mb-24">
          {steps.map((step, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(124,92,252,0.15)", color: "var(--primary-light)" }}>
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold mb-0.5" style={{ color: "var(--primary-light)" }}>
                      ШАГ {i + 1}
                    </div>
                    <h2 className="text-xl font-bold">{step.title}</h2>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                      <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <div className="p-5 rounded-xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                  <div className="text-xs font-medium mb-3" style={{ color: "var(--text-dim)" }}>ПРИМЕР</div>
                  <p className="text-sm font-mono leading-relaxed" style={{ color: "var(--accent)" }}>
                    {step.example}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="p-8 rounded-2xl border mb-12" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
          <h2 className="text-xl font-bold mb-6">Технический стек</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {techStack.map((t) => (
              <div key={t.name} className="p-4 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
                <div className="font-semibold text-sm mb-1">{t.name}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Ollama setup */}
        <div className="p-8 rounded-2xl border mb-16" style={{ background: "var(--bg-card)", borderColor: "rgba(124,92,252,0.3)" }}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Cpu size={20} style={{ color: "var(--primary-light)" }} />
            Настройка Ollama
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
            Vort работает с Ollama — локальным провайдером AI. Для работы необходимо:
          </p>
          <ol className="space-y-3">
            {[
              { cmd: "curl -fsSL https://ollama.ai/install.sh | sh", desc: "Установить Ollama" },
              { cmd: "ollama pull llama3.2", desc: "Скачать модель llama3.2 (или любую другую)" },
              { cmd: "ollama serve", desc: "Запустить сервер на localhost:11434" },
            ].map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(124,92,252,0.2)", color: "var(--primary-light)" }}>
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{s.desc}</p>
                  <code className="text-xs px-3 py-1.5 rounded block font-mono"
                    style={{ background: "var(--bg-elevated)", color: "var(--accent)" }}>
                    {s.cmd}
                  </code>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/build"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
            <Zap size={18} />
            Попробовать сейчас
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
