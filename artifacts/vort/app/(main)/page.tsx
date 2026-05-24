import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vort — AI No-Code Builder",
  description: "Опишите идею — получите готовое приложение. AI-конструктор на базе Ollama.",
};

/* ── Fake terminal preview ─────────────────────── */
const CODE = `-- Схема базы данных
CREATE TABLE contacts (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) UNIQUE,
  company     VARCHAR(255),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- API endpoint
export async function GET(req) {
  const contacts = await db
    .select()
    .from(schema.contacts)
    .orderBy(desc(contacts.created_at))
  return Response.json(contacts)
}

// React component
export function ContactCard({ contact }: Props) {
  return (
    <div className="card">
      <h3>{contact.name}</h3>
      <p>{contact.email}</p>
      <Badge>{contact.company}</Badge>
    </div>
  )
}`;

function CodePreview() {
  return (
    <div style={{
      borderRadius: 16,
      border: "1px solid var(--border-2)",
      overflow: "hidden",
      background: "var(--bg-1)",
      boxShadow: "0 40px 80px rgba(0,0,0,.7), 0 0 60px rgba(118,85,252,.1)",
    }}>
      {/* macOS title bar */}
      <div style={{
        display:"flex", alignItems:"center", gap:8, padding:"11px 16px",
        background:"var(--bg-2)", borderBottom:"1px solid var(--border)",
      }}>
        <span style={{ width:11,height:11,borderRadius:"50%",background:"#ff5f57",display:"inline-block" }}/>
        <span style={{ width:11,height:11,borderRadius:"50%",background:"#ffbd2e",display:"inline-block" }}/>
        <span style={{ width:11,height:11,borderRadius:"50%",background:"#28c840",display:"inline-block" }}/>
        <span style={{ flex:1,textAlign:"center",fontSize:11,color:"var(--text-3)",fontFamily:"ui-monospace,monospace" }}>
          vort — crm-schema.ts
        </span>
      </div>

      {/* Prompt */}
      <div style={{ padding:"12px 16px 0", fontFamily:"ui-monospace,monospace", fontSize:12 }}>
        <span style={{ color:"var(--text-3)" }}>▶ </span>
        <span style={{ color:"var(--primary-2)", fontWeight:600 }}>
          Создай CRM с историей сделок и аналитикой
        </span>
      </div>
      <div style={{ margin:"10px 16px",borderTop:"1px solid var(--border)",opacity:.4 }}/>

      {/* Code */}
      <pre style={{
        margin:0, padding:"0 16px 14px",
        fontSize:11.5, lineHeight:1.75,
        fontFamily:"'Fira Code',ui-monospace,monospace",
        color:"#b8d0f8", overflowX:"auto",
      }}><code>{CODE}</code></pre>

      {/* Status */}
      <div style={{
        display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"8px 16px",background:"var(--bg-2)",borderTop:"1px solid var(--border)",
        fontSize:11,fontFamily:"ui-monospace,monospace",
      }}>
        <span style={{ display:"flex",alignItems:"center",gap:6,color:"#4ade80" }}>
          <span style={{ width:6,height:6,borderRadius:"50%",background:"#4ade80",display:"inline-block",boxShadow:"0 0 6px #4ade80" }}/>
          Генерация завершена · 2.1s
        </span>
        <span style={{ color:"var(--text-3)" }}>TypeScript · PostgreSQL · REST API</span>
      </div>
    </div>
  );
}

const STEPS = [
  { n:"01", title:"Опишите идею",    body:"Напишите на русском, что хотите создать. Никакого технического жаргона." },
  { n:"02", title:"AI строит план",  body:"Vort анализирует запрос и проектирует архитектуру: БД, API, компоненты." },
  { n:"03", title:"Получите код",    body:"SQL, TypeScript-типы, React-компоненты и структура папок." },
  { n:"04", title:"Экспортируйте",   body:"Скопируйте одним кликом или скачайте всё в Markdown." },
];

const EXAMPLES = [
  { title:"CRM-система",       prompt:"CRM для продаж с историей звонков, сделками и воронкой",            tags:["PostgreSQL","TypeScript","REST"] },
  { title:"Интернет-магазин",  prompt:"Магазин с каталогом, корзиной и оплатой через Stripe",              tags:["Next.js","Prisma","Stripe"] },
  { title:"Канбан-доска",      prompt:"Трекер задач с колонками, исполнителями и дедлайнами",              tags:["React","Drizzle","WS"] },
  { title:"Личные финансы",    prompt:"Учёт доходов и расходов с категориями и месячными графиками",       tags:["SQLite","Recharts"] },
  { title:"Блог-платформа",    prompt:"Публикация статей с MDX-редактором, тегами и комментариями",        tags:["Next.js","MDX"] },
  { title:"Аналитика",         prompt:"Дашборд с графиками продаж, конверсий и воронкой в реальном времени", tags:["Recharts","PG"] },
];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ────────────────────────────────────────── */}
      <section className="dot-grid" style={{
        minHeight:"100vh", display:"flex", alignItems:"center",
        padding:"120px 24px 80px", position:"relative", overflow:"hidden",
      }}>
        {/* Ambient glow */}
        <div className="anim-glow" aria-hidden style={{
          position:"absolute", top:"35%", left:"50%",
          width:800, height:600, transform:"translate(-50%,-50%)",
          borderRadius:"50%",
          background:"radial-gradient(circle,rgba(118,85,252,.18) 0%,transparent 65%)",
          pointerEvents:"none",
        }}/>

        <div style={{ maxWidth:1200, margin:"0 auto", width:"100%",
          display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>

          {/* Left */}
          <div>
            <div className="a1" style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"5px 14px 5px 8px", borderRadius:99, marginBottom:28,
              fontSize:12, fontWeight:600,
              background:"rgba(118,85,252,.1)", border:"1px solid rgba(118,85,252,.28)",
              color:"var(--primary-2)",
            }}>
              <span style={{ width:7,height:7,borderRadius:"50%",background:"#4ade80",display:"inline-block",boxShadow:"0 0 7px #4ade80" }}/>
              Работает локально · Ollama
            </div>

            <h1 className="a2" style={{
              fontSize:"clamp(2.6rem,4.5vw,3.8rem)", fontWeight:800,
              letterSpacing:"-0.04em", lineHeight:1.1, marginBottom:20,
            }}>
              Опишите идею —<br/>
              <span className="grad-text">получите код</span>
            </h1>

            <p className="a3" style={{
              fontSize:"1.05rem", lineHeight:1.72, color:"var(--text-2)",
              marginBottom:36, maxWidth:430,
            }}>
              Vort превращает описание на русском в рабочий код. Архитектура, SQL-схема, API и React-компоненты — за секунды.
            </p>

            <div className="a4" style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <Link href="/build" className="btn-primary" style={{
                display:"inline-flex", alignItems:"center", gap:8,
                padding:"13px 28px", borderRadius:12,
                fontWeight:700, fontSize:15, color:"white", textDecoration:"none",
                background:"linear-gradient(135deg,#7655fc,#22d3ee)",
                boxShadow:"0 0 36px rgba(118,85,252,.45), 0 2px 12px rgba(0,0,0,.4)",
              }}>⚡ Начать создавать →</Link>

              <Link href="/examples" className="btn-ghost" style={{
                display:"inline-flex", alignItems:"center", gap:8,
                padding:"13px 28px", borderRadius:12,
                fontWeight:600, fontSize:15, textDecoration:"none",
                color:"var(--text-2)", background:"var(--bg-2)",
                border:"1px solid var(--border-2)",
              }}>Посмотреть примеры</Link>
            </div>

            <div className="a5" style={{
              display:"flex", gap:24, marginTop:40,
              fontSize:13, color:"var(--text-3)", flexWrap:"wrap",
            }}>
              {["8+ шаблонов","TypeScript","PostgreSQL","React"].map(s=>(
                <span key={s} style={{ display:"flex",alignItems:"center",gap:6 }}>
                  <span style={{ width:4,height:4,borderRadius:"50%",background:"var(--primary-2)",display:"inline-block" }}/>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right — code preview */}
          <div className="a6 anim-float"><CodePreview /></div>
        </div>
      </section>

      {/* ─── STEPS ───────────────────────────────────────── */}
      <section style={{ padding:"100px 24px", background:"var(--bg-1)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <p style={{ fontSize:11,fontWeight:700,letterSpacing:".1em",color:"var(--text-3)",textTransform:"uppercase",marginBottom:12 }}>
            Процесс
          </p>
          <h2 style={{ fontSize:"clamp(1.8rem,3vw,2.4rem)",fontWeight:800,letterSpacing:"-0.035em",marginBottom:60 }}>
            Четыре шага до готового кода
          </h2>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20 }}>
            {STEPS.map((s,i)=>(
              <div key={i} className="card-step" style={{
                padding:"28px 22px", borderRadius:16,
                border:"1px solid var(--border)",
                background:"var(--bg-2)", position:"relative", overflow:"hidden",
              }}>
                <span aria-hidden style={{
                  position:"absolute",top:-12,right:10,
                  fontSize:72,fontWeight:900,lineHeight:1,
                  color:"rgba(118,85,252,.06)",userSelect:"none",
                }}>{s.n}</span>
                <div style={{ fontSize:11,fontWeight:700,color:"var(--primary-2)",letterSpacing:".08em",marginBottom:14 }}>{s.n}</div>
                <h3 style={{ fontSize:"1rem",fontWeight:700,marginBottom:10 }}>{s.title}</h3>
                <p style={{ fontSize:"0.85rem",color:"var(--text-2)",lineHeight:1.65 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXAMPLES ────────────────────────────────────── */}
      <section style={{ padding:"100px 24px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <p style={{ fontSize:11,fontWeight:700,letterSpacing:".1em",color:"var(--text-3)",textTransform:"uppercase",marginBottom:12 }}>
            Примеры
          </p>
          <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:48,flexWrap:"wrap",gap:12 }}>
            <h2 style={{ fontSize:"clamp(1.8rem,3vw,2.4rem)",fontWeight:800,letterSpacing:"-0.035em" }}>
              Что можно создать
            </h2>
            <Link href="/examples" className="link-subtle" style={{
              fontSize:14,color:"var(--primary-2)",textDecoration:"none",fontWeight:600,
            }}>Все примеры →</Link>
          </div>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16 }}>
            {EXAMPLES.map((ex,i)=>(
              <div key={i} className="card-example" style={{
                padding:"22px", borderRadius:14,
                border:"1px solid var(--border)",
                background:"var(--bg-1)",
              }}>
                <h3 style={{ fontWeight:700,fontSize:"0.93rem",marginBottom:9 }}>{ex.title}</h3>
                <p style={{ fontSize:"0.82rem",color:"var(--text-2)",lineHeight:1.6,marginBottom:14,fontStyle:"italic" }}>
                  &ldquo;{ex.prompt}&rdquo;
                </p>
                <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                  {ex.tags.map(t=>(
                    <span key={t} style={{
                      fontSize:11,padding:"2px 8px",borderRadius:5,
                      border:"1px solid var(--border-2)",color:"var(--text-3)",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────── */}
      <section style={{ padding:"80px 24px 120px",background:"var(--bg-1)" }}>
        <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center" }}>
          <div style={{
            padding:"56px 40px", borderRadius:24,
            border:"1px solid rgba(118,85,252,.22)",
            background:"linear-gradient(135deg,rgba(118,85,252,.07),rgba(34,211,238,.03))",
            position:"relative", overflow:"hidden",
          }}>
            <div aria-hidden style={{
              position:"absolute",top:-80,left:"50%",transform:"translateX(-50%)",
              width:400,height:250,borderRadius:"50%",
              background:"radial-gradient(circle,rgba(118,85,252,.2) 0%,transparent 70%)",
              pointerEvents:"none",
            }}/>
            <div style={{
              width:60,height:60,borderRadius:16,margin:"0 auto 24px",
              background:"linear-gradient(135deg,#7655fc,#22d3ee)",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:26, boxShadow:"0 0 36px rgba(118,85,252,.5)",
            }} className="anim-float">⚡</div>

            <h2 style={{ fontSize:"clamp(1.5rem,3vw,2rem)",fontWeight:800,letterSpacing:"-0.035em",marginBottom:14 }}>
              Готовы начать?
            </h2>
            <p style={{ fontSize:"0.95rem",color:"var(--text-2)",lineHeight:1.7,marginBottom:32 }}>
              Опишите свою идею и получите полноценный код за секунды.
            </p>

            <Link href="/build" className="btn-primary" style={{
              display:"inline-flex",alignItems:"center",gap:8,
              padding:"14px 36px",borderRadius:12,
              fontWeight:700,fontSize:15,color:"white",textDecoration:"none",
              background:"linear-gradient(135deg,#7655fc,#22d3ee)",
              boxShadow:"0 0 32px rgba(118,85,252,.4)",
            }}>⚡ Открыть AI Builder</Link>
          </div>
        </div>
      </section>
    </>
  );
}
