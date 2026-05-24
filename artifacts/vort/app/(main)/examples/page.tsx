import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Примеры — Vort",
  description: "Примеры приложений, созданных с помощью Vort AI Builder",
};

const categories = ["Все", "Бизнес", "E-commerce", "Аналитика", "Социальные", "Утилиты"];

const examples = [
  {
    category: "Бизнес",
    title: "CRM-система",
    prompt: "Создай CRM для отдела продаж с историей взаимодействий, воронкой сделок и отчётами",
    generates: ["Таблицы: contacts, deals, activities, users", "API: 12 endpoints", "Компоненты: DealPipeline, ContactCard, ActivityLog, ReportsChart"],
    tags: ["PostgreSQL", "TypeScript", "REST API"],
    color: "from-violet-600/15 to-purple-600/10",
    accent: "#7c5cfc",
  },
  {
    category: "E-commerce",
    title: "Интернет-магазин",
    prompt: "Онлайн-магазин с каталогом товаров, корзиной, оплатой через Stripe и панелью администратора",
    generates: ["Таблицы: products, orders, cart_items, categories, users", "API: 18 endpoints", "Компоненты: ProductGrid, Cart, CheckoutForm, AdminDashboard"],
    tags: ["Next.js", "Prisma", "Stripe"],
    color: "from-blue-600/15 to-cyan-600/10",
    accent: "#00d4ff",
  },
  {
    category: "Утилиты",
    title: "Трекер задач",
    prompt: "Канбан-доска для команды с колонками статусов, назначением исполнителей, дедлайнами и комментариями",
    generates: ["Таблицы: tasks, projects, columns, comments, users", "API: 14 endpoints", "Компоненты: KanbanBoard, TaskCard, MemberPicker, CommentList"],
    tags: ["React", "Drizzle ORM", "WebSockets"],
    color: "from-cyan-600/15 to-teal-600/10",
    accent: "#00d4ff",
  },
  {
    category: "Аналитика",
    title: "Дашборд аналитики",
    prompt: "Аналитический дашборд с графиками продаж, конверсий, географией пользователей и воронкой",
    generates: ["Таблицы: events, sessions, conversions, users", "API: 8 endpoints", "Компоненты: SalesChart, FunnelChart, GeoMap, MetricCard"],
    tags: ["Recharts", "PostgreSQL", "Aggregations"],
    color: "from-emerald-600/15 to-green-600/10",
    accent: "#10b981",
  },
  {
    category: "Социальные",
    title: "Платформа контента",
    prompt: "Блог-платформа с редактором статей, тегами, комментариями, лайками и подписками",
    generates: ["Таблицы: posts, comments, tags, likes, follows, users", "API: 16 endpoints", "Компоненты: RichEditor, PostFeed, CommentTree, ProfilePage"],
    tags: ["Next.js", "MDX", "PostgreSQL"],
    color: "from-rose-600/15 to-pink-600/10",
    accent: "#f43f5e",
  },
  {
    category: "Утилиты",
    title: "Трекер личных финансов",
    prompt: "Приложение для учёта доходов и расходов с категориями, бюджетами и графиками по месяцам",
    generates: ["Таблицы: transactions, categories, budgets, accounts", "API: 10 endpoints", "Компоненты: TransactionForm, ExpenseChart, BudgetProgress, CategoryList"],
    tags: ["React", "SQLite", "Recharts"],
    color: "from-amber-600/15 to-yellow-600/10",
    accent: "#f59e0b",
  },
  {
    category: "Бизнес",
    title: "HR-система",
    prompt: "Система управления персоналом: сотрудники, должности, отпуска, оценка KPI",
    generates: ["Таблицы: employees, departments, leaves, kpi_goals", "API: 15 endpoints", "Компоненты: OrgChart, EmployeeProfile, LeaveCalendar, KPIBoard"],
    tags: ["TypeScript", "PostgreSQL", "Charts"],
    color: "from-indigo-600/15 to-blue-600/10",
    accent: "#6366f1",
  },
  {
    category: "E-commerce",
    title: "Система бронирования",
    prompt: "Платформа для бронирования услуг с расписанием, уведомлениями и онлайн-оплатой",
    generates: ["Таблицы: bookings, services, providers, schedules, payments", "API: 13 endpoints", "Компоненты: Calendar, BookingForm, ProviderCard, NotificationList"],
    tags: ["Next.js", "Stripe", "Emails"],
    color: "from-purple-600/15 to-violet-600/10",
    accent: "#a855f7",
  },
];

export default function ExamplesPage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Примеры проектов</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>
            Что можно создать с помощью Vort — от простых утилит до сложных платформ
          </p>

          {/* Category filter (decorative) */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat, i) => (
              <button key={cat}
                className="px-4 py-2 rounded-lg text-sm font-medium border transition-all"
                style={{
                  background: i === 0 ? "rgba(124,92,252,0.15)" : "var(--bg-card)",
                  borderColor: i === 0 ? "rgba(124,92,252,0.4)" : "var(--border)",
                  color: i === 0 ? "var(--primary-light)" : "var(--text-muted)",
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16">
          {examples.map((ex, i) => (
            <div key={i}
              className={`p-5 rounded-xl border bg-gradient-to-br ${ex.color} transition-all hover:scale-[1.02] hover:border-opacity-60 group`}
              style={{ borderColor: "var(--border)" }}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs px-2 py-1 rounded-full border"
                  style={{ borderColor: `${ex.accent}40`, color: ex.accent, background: `${ex.accent}15` }}>
                  {ex.category}
                </span>
              </div>

              <h3 className="font-bold text-base mb-2">{ex.title}</h3>

              <p className="text-xs leading-relaxed mb-4 italic" style={{ color: "var(--text-muted)" }}>
                &ldquo;{ex.prompt}&rdquo;
              </p>

              <div className="space-y-1 mb-4">
                {ex.generates.map((g, j) => (
                  <div key={j} className="text-xs" style={{ color: "var(--text-dim)" }}>
                    · {g}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {ex.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded border"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "rgba(0,0,0,0.3)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Не нашли свой случай? Vort справится с любой идеей.
          </p>
          <Link href="/build"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
            <Zap size={18} />
            Создать своё приложение
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
