import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "Как работает — Vort",
  description: "Как Vort превращает описание в рабочий код приложения.",
};

const STEPS = [
  {
    n:"01", title:"Вы описываете идею",
    body:"Пишете на русском, что хотите создать. Никакого технического жаргона — просто опишите задачу.",
    detail:`"Сделай CRM для отдела продаж. Нужны контакты, история звонков, статусы сделок и воронка."`,
  },
  {
    n:"02", title:"AI анализирует запрос",
    body:"Vort разбирает запрос: определяет сущности, связи, бизнес-логику. Строит граф до генерации кода.",
    detail:"Модели: Llama 3.2, Mistral, Qwen 2.5 Coder, DeepSeek Coder, Code Llama.",
  },
  {
    n:"03", title:"Генерирует структуру",
    body:"SQL-схема, TypeScript-типы, Zod-валидация, REST API — всё последовательно и без противоречий.",
    detail:"PostgreSQL / SQLite, Drizzle ORM, Express / Next.js API Routes.",
  },
  {
    n:"04", title:"Строит компоненты",
    body:"React-компоненты с типами, хуки для запросов, адаптивная вёрстка — готово к подключению.",
    detail:"React 18+, TypeScript, Tailwind CSS, React Query / SWR.",
  },
  {
    n:"05", title:"Вы копируете результат",
    body:"Один клик — код в буфере. Или скачайте Markdown со всей структурой. Вставьте в проект — готово.",
    detail:"Среднее время: 1–3 секунды. Работает полностью локально.",
  },
];

const FAQ = [
  { q:"Нужно ли устанавливать Ollama?",     a:"Да. Ollama — локальный AI-сервер. Скачайте на ollama.com, запустите и выберите модель." },
  { q:"Какую модель лучше использовать?",    a:"Для кода — Qwen 2.5 Coder или DeepSeek Coder. Llama 3.2 универсальна и работает быстрее." },
  { q:"Данные отправляются в облако?",       a:"Нет. Всё работает на вашем компьютере через Ollama. Никакие данные никуда не уходят." },
  { q:"Можно использовать без знания кода?", a:"Да. Вы описываете бизнес-задачу, AI сам решает как её реализовать технически." },
  { q:"Что делать с готовым кодом?",         a:"Скопируйте в ваш Next.js / Express / TypeScript-проект. Запустите миграции и используйте." },
];

export default function HowPage() {
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
              color:"var(--text-3)", textTransform:"uppercase", marginBottom:16 }}>Как работает</p>
            <h1 className="a1" style={{ marginBottom:20 }}>От слов<br/>к коду</h1>
            <p className="a2" style={{ fontSize:"clamp(.9rem,2vw,1.05rem)",
              color:"var(--text-2)", lineHeight:1.72 }}>
              Vort использует Ollama — локальный AI-сервер — чтобы превращать описание на русском в рабочую архитектуру приложения.
            </p>
          </div>
        </div>
      </section>

      {/* ─ Steps ─ */}
      <section style={{ padding:"clamp(48px,7vw,100px) clamp(16px,4vw,24px)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {STEPS.map((s, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="card-hover" style={{
                  display:"grid",
                  gridTemplateColumns:"clamp(48px,6vw,80px) 1fr",
                  gap:"clamp(14px,3vw,40px)",
                  padding:"clamp(20px,3vw,32px) clamp(16px,2.5vw,28px)",
                  border:"1px solid var(--border)", background:"var(--bg-1)",
                  borderRadius: i===0 ? "14px 14px 0 0" : i===STEPS.length-1 ? "0 0 14px 14px" : 0,
                  alignItems:"start",
                }}>
                  <span style={{
                    fontSize:"clamp(1.4rem,3.5vw,2.2rem)", fontWeight:900,
                    letterSpacing:"-.04em", color:"var(--text-3)",
                    fontFamily:"ui-monospace,monospace", lineHeight:1,
                    paddingTop:3,
                  }}>{s.n}</span>

                  <div>
                    <h3 style={{ fontSize:"clamp(.93rem,2vw,1.03rem)", fontWeight:700,
                      marginBottom:10, letterSpacing:"-.02em" }}>{s.title}</h3>
                    <p style={{ fontSize:"clamp(.82rem,1.5vw,.88rem)", color:"var(--text-2)",
                      lineHeight:1.7, marginBottom:14 }}>{s.body}</p>
                    <div style={{
                      display:"inline-block", padding:"8px 14px", borderRadius:8,
                      border:"1px solid var(--border-2)", background:"var(--bg-3)",
                    }}>
                      <p style={{ fontSize:"clamp(.76rem,1.4vw,.80rem)", color:"var(--text-2)",
                        lineHeight:1.6, fontStyle:"italic", margin:0 }}>{s.detail}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─ FAQ ─ */}
      <section style={{ padding:"clamp(48px,7vw,80px) clamp(16px,4vw,24px)", background:"var(--bg-1)" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <ScrollReveal>
            <h2 style={{ marginBottom:"clamp(24px,4vw,40px)" }}>Вопросы</h2>
          </ScrollReveal>
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {FAQ.map((f, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div style={{
                  padding:"clamp(16px,2.5vw,22px) clamp(16px,2.5vw,24px)",
                  border:"1px solid var(--border)", background:"var(--bg-2)",
                  borderRadius: i===0 ? "14px 14px 0 0" : i===FAQ.length-1 ? "0 0 14px 14px" : 0,
                }}>
                  <p style={{ fontWeight:600, fontSize:"clamp(.88rem,2vw,.93rem)",
                    marginBottom:8, color:"var(--text)" }}>{f.q}</p>
                  <p style={{ fontSize:"clamp(.82rem,1.5vw,.87rem)", color:"var(--text-2)", lineHeight:1.65 }}>{f.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─ CTA ─ */}
      <section style={{ padding:"clamp(48px,7vw,80px) clamp(16px,4vw,24px)" }}>
        <div style={{ maxWidth:520, margin:"0 auto", textAlign:"center" }}>
          <ScrollReveal>
            <h2 style={{ marginBottom:16 }}>Попробуйте сейчас</h2>
            <p style={{ fontSize:"clamp(.88rem,2vw,.95rem)", color:"var(--text-2)",
              lineHeight:1.7, marginBottom:28 }}>
              Запустите Ollama, откройте Builder и опишите свою идею.
            </p>
            <Link href="/build" className="btn-white" style={{
              display:"inline-flex", alignItems:"center", justifyContent:"center",
              padding:"clamp(10px,2vw,13px) clamp(24px,4vw,32px)", borderRadius:10,
              fontWeight:700, fontSize:"clamp(13px,2vw,14px)",
              color:"var(--bg)", textDecoration:"none", background:"var(--white)",
              boxShadow:"0 4px 24px rgba(0,0,0,.5)",
            }}>Открыть Builder</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
