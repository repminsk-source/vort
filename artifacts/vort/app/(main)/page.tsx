import Link from "next/link";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "Vort — AI No-Code Builder",
  description: "Опишите идею — получите готовое приложение за секунды.",
};

const CODE = `-- contacts table
CREATE TABLE contacts (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT UNIQUE NOT NULL,
  company    TEXT,
  stage      TEXT DEFAULT 'lead',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GET /api/contacts
export async function GET() {
  const rows = await db
    .select()
    .from(contacts)
    .orderBy(desc(contacts.created_at));
  return Response.json(rows);
}

// ContactCard component
export function ContactCard({ c }: { c: Contact }) {
  return (
    <div className="card">
      <Avatar name={c.name} />
      <div>
        <p className="name">{c.name}</p>
        <p className="email">{c.email}</p>
      </div>
      <Badge stage={c.stage} />
    </div>
  );
}`;

function Terminal() {
  return (
    <div className="terminal" style={{ position:"relative" }}>
      {/* Scan line animation */}
      <div aria-hidden style={{
        position:"absolute", inset:0, overflow:"hidden",
        borderRadius:14, pointerEvents:"none", zIndex:2,
      }}>
        <div style={{
          position:"absolute", left:0, right:0, height:32,
          background:"linear-gradient(180deg,transparent,rgba(255,255,255,.018),transparent)",
          animation:"scan-line 4s linear infinite",
        }} />
      </div>

      {/* Bar */}
      <div className="terminal-bar">
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span style={{ flex:1, textAlign:"center", fontSize:11, color:"var(--text-3)",
          fontFamily:"ui-monospace,monospace" }}>vort — crm-schema.ts</span>
      </div>

      {/* Prompt */}
      <div style={{ padding:"12px 16px 0", fontFamily:"ui-monospace,monospace", fontSize:12 }}>
        <span style={{ color:"var(--text-3)" }}>$ </span>
        <span style={{ color:"var(--off-white)", fontWeight:500 }}>
          Создай CRM с историей сделок и воронкой
        </span>
        <span style={{
          display:"inline-block", width:2, height:12, background:"var(--white)",
          marginLeft:2, verticalAlign:"middle",
          animation:"blink 1.1s step-end infinite",
        }} />
      </div>
      <div style={{ margin:"10px 16px", borderTop:"1px solid var(--border)" }} />

      {/* Code */}
      <pre style={{
        margin:0, padding:"0 16px 16px",
        fontSize:11.5, lineHeight:1.8,
        fontFamily:"'Fira Code',ui-monospace,monospace",
        color:"#8a8a8a", overflowX:"auto",
      }}><code style={{ color:"inherit" }}>{CODE}</code></pre>

      {/* Status */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"8px 16px",
        background:"var(--bg-2)", borderTop:"1px solid var(--border)",
        fontSize:11, fontFamily:"ui-monospace,monospace",
      }}>
        <span style={{ display:"flex", alignItems:"center", gap:7, color:"#6b7280" }}>
          <span style={{
            width:5, height:5, borderRadius:"50%", background:"#4ade80",
            display:"inline-block", boxShadow:"0 0 6px #4ade80",
          }} />
          Готово — 1.8s
        </span>
        <span style={{ color:"var(--text-3)" }}>TypeScript + PostgreSQL</span>
      </div>
    </div>
  );
}

const STEPS = [
  {
    n: "01",
    title: "Опишите на русском",
    body: "Напишите что хотите создать — обычными словами. Никаких технических знаний не нужно.",
    tag: "Ввод"
  },
  {
    n: "02",
    title: "AI проектирует архитектуру",
    body: "Vort анализирует запрос и генерирует структуру: схема БД, API endpoints, компонентная иерархия.",
    tag: "Анализ"
  },
  {
    n: "03",
    title: "Получаете код",
    body: "SQL-миграции, TypeScript-типы, REST API, React-компоненты — всё готово к запуску.",
    tag: "Генерация"
  },
  {
    n: "04",
    title: "Копируете в проект",
    body: "Один клик — весь код в буфере. Или скачайте Markdown с документацией.",
    tag: "Экспорт"
  },
];

const EXAMPLES = [
  { title:"CRM-система",      prompt:"CRM для отдела продаж с историей сделок, контактами и воронкой", tags:["PostgreSQL","TypeScript","REST API"] },
  { title:"Интернет-магазин", prompt:"Магазин с каталогом, корзиной и оплатой через Stripe",          tags:["Next.js","Prisma","Stripe"] },
  { title:"Канбан-доска",     prompt:"Трекер задач с колонками, исполнителями и дедлайнами",          tags:["React","Drizzle ORM","WS"] },
  { title:"Личные финансы",   prompt:"Учёт доходов и расходов с категориями и месячными графиками",   tags:["SQLite","Recharts"] },
  { title:"Блог-платформа",   prompt:"Статьи с MDX-редактором, тегами и комментариями",               tags:["Next.js","MDX","PG"] },
  { title:"Аналитика",        prompt:"Дашборд с графиками продаж, конверсий и воронкой в реальном времени", tags:["Recharts","Aggregation"] },
];

const STATS = [
  { value:"< 2s",  label:"среднее время генерации" },
  { value:"100%",  label:"локально, без облака" },
  { value:"6+",    label:"моделей Ollama" },
  { value:"∞",     label:"запросов бесплатно" },
];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────── */}
      <section className="grid-bg" style={{
        minHeight:"100svh", display:"flex", alignItems:"center",
        padding:"100px 24px 80px",
        position:"relative", overflow:"hidden",
      }}>
        {/* Corner gradients */}
        <div aria-hidden style={{
          position:"absolute", top:0, left:0, width:600, height:600,
          background:"radial-gradient(circle at 0% 0%,rgba(255,255,255,.04) 0%,transparent 60%)",
          pointerEvents:"none",
        }} />
        <div aria-hidden style={{
          position:"absolute", bottom:0, right:0, width:600, height:600,
          background:"radial-gradient(circle at 100% 100%,rgba(255,255,255,.03) 0%,transparent 60%)",
          pointerEvents:"none",
        }} />

        <div style={{ maxWidth:1200, margin:"0 auto", width:"100%" }}>
          <div style={{
            display:"grid",
            gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",
            gap:"clamp(32px,5vw,72px)",
            alignItems:"center",
          }}>

            {/* Left */}
            <div>
              <div className="a1 badge" style={{ marginBottom:28 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", flexShrink:0,
                  boxShadow:"0 0 8px #4ade80" }} />
                Локально · Ollama · Открытый код
              </div>

              <h1 className="a2" style={{
                fontSize:"clamp(2.8rem,5vw,4.2rem)",
                fontWeight:900, letterSpacing:"-0.045em", lineHeight:1.0,
                marginBottom:20,
              }}>
                Опишите идею —<br />
                <span className="grad-text">получите код</span>
              </h1>

              <p className="a3" style={{
                fontSize:"clamp(.95rem,1.6vw,1.1rem)", lineHeight:1.72,
                color:"var(--text-2)", marginBottom:36, maxWidth:420,
              }}>
                Vort превращает описание на русском в рабочий код. SQL-схема, API и React-компоненты — за секунды. Без облака, без подписок.
              </p>

              <div className="a4" style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                <Link href="/build" className="btn-white" style={{
                  display:"inline-flex", alignItems:"center", gap:8,
                  padding:"13px 28px", borderRadius:10,
                  fontWeight:700, fontSize:14, color:"var(--bg)", textDecoration:"none",
                  background:"var(--white)",
                  boxShadow:"0 0 0 1px rgba(255,255,255,.2), 0 4px 24px rgba(0,0,0,.5)",
                }}>
                  Начать создавать
                </Link>

                <Link href="/how" className="btn-ghost" style={{
                  display:"inline-flex", alignItems:"center", gap:8,
                  padding:"13px 28px", borderRadius:10,
                  fontWeight:600, fontSize:14, textDecoration:"none",
                  color:"var(--text-2)", background:"var(--bg-2)",
                  border:"1px solid var(--border-2)",
                }}>
                  Как это работает
                </Link>
              </div>

              {/* Stats */}
              <div className="a5" style={{
                display:"grid", gridTemplateColumns:"repeat(4,1fr)",
                gap:0, marginTop:48,
                borderTop:"1px solid var(--border)",
                paddingTop:32,
              }}>
                {STATS.map((s, i) => (
                  <div key={i} style={{
                    paddingRight:20,
                    borderRight: i < 3 ? "1px solid var(--border)" : "none",
                    paddingLeft: i > 0 ? 20 : 0,
                  }}>
                    <div style={{ fontSize:"clamp(1.2rem,2vw,1.6rem)", fontWeight:800, color:"var(--white)", marginBottom:3 }}>
                      {s.value}
                    </div>
                    <div style={{ fontSize:11, color:"var(--text-3)", lineHeight:1.4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — terminal */}
            <div className="a6 anim-float" style={{ minWidth:0 }}>
              <Terminal />
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW ──────────────────────────────────── */}
      <section style={{ padding:"clamp(60px,8vw,120px) 24px", background:"var(--bg-1)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>

          <ScrollReveal>
            <div style={{ marginBottom:"clamp(40px,6vw,72px)" }}>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", color:"var(--text-3)",
                textTransform:"uppercase", marginBottom:12 }}>Процесс</p>
              <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:900, letterSpacing:"-0.04em" }}>
                Четыре шага
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:2 }}>
            {STEPS.map((s, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="card-hover" style={{
                  padding:"32px 28px",
                  border:"1px solid var(--border)",
                  background:"var(--bg-2)",
                  borderRadius: i === 0 ? "14px 0 0 14px" : i === 3 ? "0 14px 14px 0" : 0,
                  position:"relative", overflow:"hidden",
                  height:"100%",
                }}>
                  {/* Big number */}
                  <span aria-hidden style={{
                    position:"absolute", top:-16, right:12,
                    fontSize:88, fontWeight:900, lineHeight:1,
                    color:"rgba(255,255,255,.025)", userSelect:"none", letterSpacing:"-.05em",
                  }}>{s.n}</span>

                  <span style={{
                    fontSize:10, fontWeight:700, letterSpacing:".08em",
                    color:"var(--text-3)", textTransform:"uppercase",
                    display:"block", marginBottom:16,
                  }}>{s.tag}</span>

                  <h3 style={{ fontSize:"1rem", fontWeight:700, marginBottom:10, letterSpacing:"-.02em" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize:"0.84rem", color:"var(--text-2)", lineHeight:1.7 }}>
                    {s.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXAMPLES ─────────────────────────────── */}
      <section style={{ padding:"clamp(60px,8vw,120px) 24px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>

          <ScrollReveal>
            <div style={{
              display:"flex", alignItems:"flex-end", justifyContent:"space-between",
              marginBottom:"clamp(32px,5vw,56px)", flexWrap:"wrap", gap:16,
            }}>
              <div>
                <p style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", color:"var(--text-3)",
                  textTransform:"uppercase", marginBottom:12 }}>Примеры</p>
                <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:900, letterSpacing:"-0.04em" }}>
                  Что можно создать
                </h2>
              </div>
              <Link href="/examples" className="link-hover" style={{
                fontSize:13, color:"var(--text-2)", textDecoration:"none", fontWeight:500,
              }}>Все примеры</Link>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:12 }}>
            {EXAMPLES.map((ex, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="card-hover" style={{
                  padding:"24px",
                  border:"1px solid var(--border)",
                  background:"var(--bg-1)",
                  borderRadius:12, height:"100%",
                }}>
                  <h3 style={{ fontWeight:700, fontSize:"0.95rem", marginBottom:10, letterSpacing:"-.02em" }}>
                    {ex.title}
                  </h3>
                  <p style={{ fontSize:"0.82rem", color:"var(--text-2)", lineHeight:1.65,
                    marginBottom:16, fontStyle:"italic" }}>
                    &ldquo;{ex.prompt}&rdquo;
                  </p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {ex.tags.map(t => (
                      <span key={t} style={{
                        fontSize:10, fontWeight:500, padding:"2px 8px", borderRadius:4,
                        border:"1px solid var(--border)", color:"var(--text-3)",
                        fontFamily:"ui-monospace,monospace",
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────── */}
      <section style={{ padding:"clamp(60px,8vw,100px) 24px", background:"var(--bg-1)" }}>
        <div style={{ maxWidth:640, margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{
              padding:"clamp(40px,6vw,64px) clamp(24px,5vw,56px)",
              borderRadius:20,
              border:"1px solid var(--border-2)",
              background:"var(--bg-2)",
              textAlign:"center", position:"relative", overflow:"hidden",
            }}>
              {/* Corner lines */}
              <div aria-hidden style={{
                position:"absolute", inset:0, pointerEvents:"none",
                backgroundImage:"linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)",
                backgroundSize:"40px 40px",
              }} />

              <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:900,
                letterSpacing:"-0.04em", marginBottom:16, position:"relative" }}>
                Готовы начать?
              </h2>
              <p style={{ fontSize:"0.95rem", color:"var(--text-2)", lineHeight:1.7,
                marginBottom:32, position:"relative" }}>
                Опишите свою идею и получите полноценный код за секунды.
              </p>

              <Link href="/build" className="btn-white" style={{
                display:"inline-flex", alignItems:"center", gap:8,
                padding:"14px 36px", borderRadius:10,
                fontWeight:700, fontSize:14, color:"var(--bg)", textDecoration:"none",
                background:"var(--white)",
                boxShadow:"0 4px 24px rgba(0,0,0,.6)",
                position:"relative",
              }}>
                Открыть AI Builder
              </Link>

              <p style={{ fontSize:12, color:"var(--text-3)", marginTop:20, position:"relative" }}>
                Работает локально — ваши данные никуда не уходят
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
