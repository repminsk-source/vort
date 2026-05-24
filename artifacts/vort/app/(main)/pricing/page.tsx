import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "Цены — Vort",
  description: "Vort бесплатен. Работает локально через Ollama.",
};

const FEATURES = [
  "Неограниченные запросы",
  "Все модели Ollama",
  "SQL + TypeScript + React генерация",
  "Экспорт в Markdown",
  "История чата",
  "Переключение моделей",
  "Работа офлайн",
  "Без регистрации",
  "Открытый исходный код",
];

const COMPARED = [
  { feat:"Стоимость",                      vort:"Бесплатно",      other:"$20–50 / мес" },
  { feat:"Данные",                          vort:"Только локально",other:"Отправляются в облако" },
  { feat:"Ограничения запросов",            vort:"Нет",            other:"Лимиты токенов" },
  { feat:"Работа без интернета",            vort:"Да",             other:"Нет" },
  { feat:"Выбор модели",                    vort:"Любая Ollama",   other:"Фиксированная" },
  { feat:"Исходный код",                    vort:"Открытый",       other:"Закрытый" },
];

const SETUP = [
  { n:"1", text:"Установите Ollama на ollama.com" },
  { n:"2", text:"Скачайте модель: ollama pull llama3.2" },
  { n:"3", text:"Запустите Vort и откройте Builder" },
];

export default function PricingPage() {
  return (
    <>
      {/* ─ Header ─ */}
      <section style={{
        padding:"clamp(100px,14vw,160px) clamp(16px,4vw,24px) clamp(48px,6vw,80px)",
        borderBottom:"1px solid var(--border)", textAlign:"center",
      }}>
        <div style={{ maxWidth:640, margin:"0 auto" }}>
          <p style={{ fontSize:11, fontWeight:700, letterSpacing:".1em",
            color:"var(--text-3)", textTransform:"uppercase", marginBottom:16 }}>Цены</p>
          <h1 className="a1" style={{ marginBottom:20 }}>Полностью<br/>бесплатно</h1>
          <p className="a2" style={{ fontSize:"clamp(.9rem,2vw,1.05rem)",
            color:"var(--text-2)", lineHeight:1.72 }}>
            Vort работает через Ollama — локальный AI-сервер. Никаких подписок, никаких лимитов, никаких API-ключей.
          </p>
        </div>
      </section>

      {/* ─ Big price + features ─ */}
      <section style={{ padding:"clamp(48px,7vw,100px) clamp(16px,4vw,24px)" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <div style={{
            display:"grid",
            gridTemplateColumns:"clamp(180px,30vw,280px) 1fr",
            gap:"clamp(2px,0.5vw,2px)",
          }}>
            {/* Price card */}
            <ScrollReveal>
              <div style={{
                padding:"clamp(24px,4vw,40px) clamp(20px,3vw,32px)",
                border:"1px solid var(--border-2)", background:"var(--bg-2)",
                borderRadius:"14px 0 0 14px",
                display:"flex", flexDirection:"column", justifyContent:"center",
                alignItems:"center", textAlign:"center",
              }}>
                <div style={{
                  fontSize:"clamp(3rem,8vw,5rem)", fontWeight:900,
                  letterSpacing:"-.04em", lineHeight:1, marginBottom:8,
                  color:"var(--white)",
                }}>
                  0 ₽
                </div>
                <div style={{ fontSize:"clamp(.8rem,1.5vw,.85rem)", color:"var(--text-3)", marginBottom:20 }}>
                  навсегда
                </div>
                <Link href="/build" className="btn-white" style={{
                  display:"flex", alignItems:"center", justifyContent:"center",
                  padding:"clamp(9px,1.5vw,11px) clamp(16px,2.5vw,24px)", borderRadius:9,
                  fontWeight:700, fontSize:"clamp(12px,1.8vw,13px)",
                  color:"var(--bg)", textDecoration:"none", background:"var(--white)",
                  boxShadow:"0 4px 20px rgba(0,0,0,.5)", width:"100%",
                }}>Начать</Link>
              </div>
            </ScrollReveal>

            {/* Features */}
            <ScrollReveal delay={80}>
              <div style={{
                border:"1px solid var(--border)", background:"var(--bg-1)",
                borderRadius:"0 14px 14px 0",
                padding:"clamp(20px,3vw,32px) clamp(16px,2.5vw,28px)",
              }}>
                <p style={{ fontSize:11, fontWeight:700, letterSpacing:".08em",
                  color:"var(--text-3)", textTransform:"uppercase", marginBottom:16 }}>Включено</p>
                <ul style={{ listStyle:"none" }}>
                  {FEATURES.map((f, i) => (
                    <li key={i} style={{
                      display:"flex", alignItems:"center", gap:10,
                      padding:"clamp(6px,1vw,8px) 0",
                      borderBottom: i < FEATURES.length - 1 ? "1px solid var(--border)" : "none",
                      fontSize:"clamp(.82rem,1.5vw,.87rem)", color:"var(--text-2)",
                    }}>
                      <span style={{ width:5, height:5, borderRadius:"50%",
                        background:"var(--text-3)", display:"inline-block", flexShrink:0 }}/>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─ Comparison ─ */}
      <section style={{ padding:"clamp(48px,7vw,80px) clamp(16px,4vw,24px)", background:"var(--bg-1)" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <ScrollReveal>
            <h2 style={{ marginBottom:"clamp(24px,4vw,40px)" }}>Сравнение</h2>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <div style={{ border:"1px solid var(--border-2)", borderRadius:14, overflow:"hidden" }}>
              {/* Header */}
              <div style={{
                display:"grid", gridTemplateColumns:"1fr 1fr 1fr",
                background:"var(--bg-2)", borderBottom:"1px solid var(--border-2)",
              }}>
                <div style={{ padding:"clamp(10px,1.5vw,14px) clamp(14px,2vw,20px)",
                  fontSize:11, fontWeight:700, color:"var(--text-3)", textTransform:"uppercase",
                  letterSpacing:".06em" }}>Функция</div>
                <div style={{ padding:"clamp(10px,1.5vw,14px) clamp(14px,2vw,20px)",
                  fontSize:11, fontWeight:700, color:"var(--white)", textTransform:"uppercase",
                  letterSpacing:".06em", borderLeft:"1px solid var(--border)" }}>Vort</div>
                <div style={{ padding:"clamp(10px,1.5vw,14px) clamp(14px,2vw,20px)",
                  fontSize:11, fontWeight:700, color:"var(--text-3)", textTransform:"uppercase",
                  letterSpacing:".06em", borderLeft:"1px solid var(--border)" }}>Другие AI</div>
              </div>

              {COMPARED.map((row, i) => (
                <div key={i} style={{
                  display:"grid", gridTemplateColumns:"1fr 1fr 1fr",
                  borderBottom: i < COMPARED.length-1 ? "1px solid var(--border)" : "none",
                  background: i % 2 === 0 ? "var(--bg-1)" : "transparent",
                }}>
                  <div style={{ padding:"clamp(10px,1.5vw,13px) clamp(14px,2vw,20px)",
                    fontSize:"clamp(.8rem,1.5vw,.85rem)", color:"var(--text-2)" }}>{row.feat}</div>
                  <div style={{ padding:"clamp(10px,1.5vw,13px) clamp(14px,2vw,20px)",
                    fontSize:"clamp(.8rem,1.5vw,.85rem)", fontWeight:600,
                    color:"var(--white)", borderLeft:"1px solid var(--border)" }}>{row.vort}</div>
                  <div style={{ padding:"clamp(10px,1.5vw,13px) clamp(14px,2vw,20px)",
                    fontSize:"clamp(.8rem,1.5vw,.85rem)", color:"var(--text-3)",
                    borderLeft:"1px solid var(--border)" }}>{row.other}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─ Setup ─ */}
      <section style={{ padding:"clamp(48px,7vw,80px) clamp(16px,4vw,24px)" }}>
        <div style={{ maxWidth:640, margin:"0 auto" }}>
          <ScrollReveal>
            <h2 style={{ marginBottom:"clamp(20px,3vw,32px)" }}>Начать за 3 шага</h2>
          </ScrollReveal>

          <div style={{ display:"flex", flexDirection:"column", gap:2, marginBottom:"clamp(28px,4vw,40px)" }}>
            {SETUP.map((s, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div style={{
                  display:"flex", alignItems:"center", gap:"clamp(14px,2.5vw,20px)",
                  padding:"clamp(14px,2vw,20px) clamp(16px,2.5vw,24px)",
                  border:"1px solid var(--border)", background:"var(--bg-1)",
                  borderRadius: i===0 ? "12px 12px 0 0" : i===SETUP.length-1 ? "0 0 12px 12px" : 0,
                }}>
                  <span style={{
                    width:"clamp(28px,4vw,36px)", height:"clamp(28px,4vw,36px)",
                    borderRadius:"50%", background:"var(--bg-3)", border:"1px solid var(--border-2)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:"clamp(11px,1.5vw,13px)", fontWeight:800, color:"var(--text-2)",
                    flexShrink:0, fontFamily:"ui-monospace,monospace",
                  }}>{s.n}</span>
                  <code style={{
                    fontFamily:"ui-monospace,monospace",
                    fontSize:"clamp(.8rem,1.6vw,.87rem)", color:"var(--off-white)",
                  }}>{s.text}</code>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={180}>
            <div style={{ textAlign:"center" }}>
              <Link href="/build" className="btn-white" style={{
                display:"inline-flex", alignItems:"center", justifyContent:"center",
                padding:"clamp(11px,2vw,14px) clamp(28px,4vw,40px)", borderRadius:10,
                fontWeight:700, fontSize:"clamp(13px,2vw,14px)",
                color:"var(--bg)", textDecoration:"none", background:"var(--white)",
                boxShadow:"0 4px 24px rgba(0,0,0,.5)",
              }}>Открыть Builder</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
