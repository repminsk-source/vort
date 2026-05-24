import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "Примеры — Vort",
  description: "Примеры приложений, которые можно создать с помощью Vort.",
};

const EXAMPLES = [
  {
    title:"CRM-система",
    prompt:"CRM для отдела продаж с историей сделок, контактами, воронкой и аналитикой",
    what:["Таблица контактов с историей",  "Воронка продаж по этапам", "Дашборд конверсий", "REST API с фильтрацией"],
    tags:["PostgreSQL","TypeScript","REST API","React"],
  },
  {
    title:"Интернет-магазин",
    prompt:"Магазин с каталогом товаров, корзиной и оплатой через Stripe",
    what:["Каталог с фильтрами", "Корзина и checkout", "Интеграция Stripe", "Панель администратора"],
    tags:["Next.js","Prisma","Stripe","Tailwind"],
  },
  {
    title:"Канбан-доска",
    prompt:"Трекер задач с колонками, исполнителями и дедлайнами",
    what:["Drag & drop колонки", "Назначение исполнителей", "Дедлайны и уведомления", "WebSocket обновления"],
    tags:["React","Drizzle ORM","WebSocket","PG"],
  },
  {
    title:"Личные финансы",
    prompt:"Учёт доходов и расходов с категориями и месячными графиками",
    what:["Транзакции по категориям", "Месячные графики", "Бюджет на категорию", "Экспорт в CSV"],
    tags:["SQLite","Recharts","TypeScript"],
  },
  {
    title:"Блог-платформа",
    prompt:"Платформа публикации статей с MDX-редактором, тегами и комментариями",
    what:["MDX редактор", "Теги и поиск", "Комментарии", "SEO-метаданные"],
    tags:["Next.js","MDX","PostgreSQL","Zod"],
  },
  {
    title:"Аналитика",
    prompt:"Дашборд с графиками продаж, конверсий и воронкой в реальном времени",
    what:["Графики реального времени", "Воронка конверсий", "Сегментация", "Экспорт отчётов"],
    tags:["Recharts","Aggregation","PG","WS"],
  },
  {
    title:"Система бронирования",
    prompt:"Бронирование услуг с расписанием мастеров и онлайн-оплатой",
    what:["Расписание мастеров", "Онлайн-запись", "Оплата через Stripe", "Уведомления по email"],
    tags:["Next.js","PostgreSQL","Stripe","Nodemailer"],
  },
  {
    title:"Фитнес-трекер",
    prompt:"Трекинг тренировок со статистикой, целями и прогрессом",
    what:["Лог тренировок", "Прогресс по целям", "Графики нагрузки", "История упражнений"],
    tags:["SQLite","React","Recharts","TypeScript"],
  },
];

export default function ExamplesPage() {
  return (
    <>
      {/* ─ Header ─ */}
      <section style={{
        padding:"clamp(100px,14vw,160px) clamp(16px,4vw,24px) clamp(48px,6vw,80px)",
        borderBottom:"1px solid var(--border)",
      }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ maxWidth:600 }}>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:".1em",
              color:"var(--text-3)", textTransform:"uppercase", marginBottom:16 }}>Примеры</p>
            <h1 className="a1" style={{ marginBottom:20 }}>
              Что можно<br/>создать
            </h1>
            <p className="a2" style={{ fontSize:"clamp(.9rem,2vw,1.05rem)",
              color:"var(--text-2)", lineHeight:1.72 }}>
              Восемь готовых промптов — скопируйте в Builder и получите полную архитектуру с кодом.
            </p>
          </div>
        </div>
      </section>

      {/* ─ Grid ─ */}
      <section style={{ padding:"clamp(48px,7vw,80px) clamp(16px,4vw,24px)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="examples-grid">
            {EXAMPLES.map((ex, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="card-hover" style={{
                  padding:"clamp(18px,2.5vw,24px)",
                  border:"1px solid var(--border)", background:"var(--bg-1)",
                  borderRadius:12, height:"100%", display:"flex", flexDirection:"column",
                }}>
                  <h3 style={{ fontWeight:700, fontSize:"clamp(.9rem,2vw,.97rem)",
                    marginBottom:10, letterSpacing:"-.02em" }}>{ex.title}</h3>

                  <p style={{ fontSize:"clamp(.79rem,1.5vw,.83rem)", color:"var(--text-2)",
                    lineHeight:1.6, marginBottom:14, fontStyle:"italic", flexGrow:1 }}>
                    &ldquo;{ex.prompt}&rdquo;
                  </p>

                  <ul style={{ listStyle:"none", marginBottom:14 }}>
                    {ex.what.map(w => (
                      <li key={w} style={{
                        fontSize:"clamp(.78rem,1.4vw,.82rem)", color:"var(--text-2)",
                        padding:"4px 0", borderBottom:"1px solid var(--border)",
                        display:"flex", alignItems:"center", gap:8,
                      }}>
                        <span style={{ width:4, height:4, borderRadius:"50%",
                          background:"var(--text-3)", display:"inline-block", flexShrink:0 }}/>
                        {w}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:14 }}>
                    {ex.tags.map(t => (
                      <span key={t} style={{
                        fontSize:10, fontWeight:500, padding:"2px 8px", borderRadius:4,
                        border:"1px solid var(--border)", color:"var(--text-3)",
                        fontFamily:"ui-monospace,monospace",
                      }}>{t}</span>
                    ))}
                  </div>

                  <Link href={`/build?prompt=${encodeURIComponent(ex.prompt)}`} className="btn-ghost" style={{
                    display:"flex", alignItems:"center", justifyContent:"center",
                    padding:"9px 0", borderRadius:8, fontSize:13, fontWeight:600,
                    textDecoration:"none", color:"var(--text-2)",
                    border:"1px solid var(--border-2)", background:"var(--bg-2)",
                    marginTop:"auto",
                  }}>Создать</Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
