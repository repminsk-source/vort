"use client";

import { useChat } from "ai/react";
import { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PROMPTS = [
  { icon:"🏢", label:"CRM-система",       text:"Создай CRM для отдела продаж с историей сделок, контактами, воронкой и аналитикой" },
  { icon:"🛒", label:"Интернет-магазин",  text:"Онлайн-магазин с каталогом товаров, корзиной, фильтрами и оплатой через Stripe" },
  { icon:"📋", label:"Канбан-доска",      text:"Трекер задач с канбан-колонками, назначением исполнителей, дедлайнами и комментариями" },
  { icon:"💰", label:"Финансы",           text:"Приложение учёта личных финансов с категориями расходов, бюджетом и графиками по месяцам" },
  { icon:"📝", label:"Блог-платформа",    text:"Платформа для публикации статей с MDX-редактором, тегами, лайками и комментариями" },
  { icon:"📅", label:"Бронирование",      text:"Система бронирования услуг с расписанием мастеров, уведомлениями и онлайн-оплатой" },
  { icon:"📊", label:"Аналитика",         text:"Дашборд аналитики с графиками продаж, конверсий, воронки и активных пользователей" },
  { icon:"🏋️", label:"Фитнес-трекер",    text:"Мобильное приложение для трекинга тренировок со статистикой, целями и прогрессом" },
];

const MODELS = [
  { v:"llama3.2",        l:"Llama 3.2" },
  { v:"llama3.1",        l:"Llama 3.1" },
  { v:"mistral",         l:"Mistral" },
  { v:"qwen2.5-coder",   l:"Qwen 2.5 Coder" },
  { v:"deepseek-coder",  l:"DeepSeek Coder" },
  { v:"codellama",       l:"Code Llama" },
];

function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button onClick={async () => { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000); }}
      style={{ padding:"4px 10px", borderRadius:6, fontSize:11, fontWeight:600, cursor:"pointer",
        border:"1px solid var(--border-2)", color: ok ? "#4ade80" : "var(--text-3)",
        background:"var(--bg-2)", transition:"color .2s",
      }}>{ok ? "✓ Скопировано" : "Копировать"}</button>
  );
}

function Bubble({ m }: { m: { role: string; content: string; id: string } }) {
  const isUser = m.role === "user";
  return (
    <div className="anim-slide" style={{ display:"flex", gap:12, justifyContent: isUser ? "flex-end" : "flex-start" }}>
      {!isUser && (
        <div style={{
          width:32, height:32, borderRadius:10, flexShrink:0, marginTop:2,
          background:"linear-gradient(135deg,#7655fc,#22d3ee)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:14,
        }}>⚡</div>
      )}

      <div style={{ maxWidth:"84%", minWidth:0 }}>
        {isUser ? (
          <div style={{
            padding:"12px 18px", borderRadius:"16px 4px 16px 16px",
            fontSize:14, lineHeight:1.65,
            background:"rgba(118,85,252,.18)",
            border:"1px solid rgba(118,85,252,.3)",
            color:"var(--text)",
          }}>{m.content}</div>
        ) : (
          <div style={{
            borderRadius:"4px 16px 16px 16px",
            border:"1px solid var(--border-2)",
            background:"var(--bg-2)",
            overflow:"hidden",
          }}>
            {/* AI header */}
            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"10px 14px",
              borderBottom:"1px solid var(--border)",
              background:"rgba(255,255,255,.025)",
            }}>
              <span style={{ fontSize:11, fontWeight:600, color:"var(--text-3)", display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--accent)", display:"inline-block" }} />
                Vort AI
              </span>
              <CopyBtn text={m.content} />
            </div>

            {/* Content */}
            <div className="prose" style={{ padding:"16px 18px", fontSize:13 }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {isUser && (
        <div style={{
          width:32, height:32, borderRadius:10, flexShrink:0, marginTop:2,
          background:"var(--bg-2)", border:"1px solid var(--border-2)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:12, fontWeight:700, color:"var(--text-2)",
        }}>Я</div>
      )}
    </div>
  );
}

export default function BuildPage() {
  const [model, setModel] = useState("llama3.2");
  const [ollamaErr, setOllamaErr] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const taRef  = useRef<HTMLTextAreaElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, setInput } = useChat({
    api:"/api/chat",
    body:{ model },
    onError: err => { if (err.message.includes("503")||err.message.includes("Ollama")||err.message.includes("fetch")) setOllamaErr(true); },
    onResponse: () => setOllamaErr(false),
  });

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  const send = (e: React.FormEvent) => { if (input.trim() && !isLoading) handleSubmit(e); };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(e as unknown as React.FormEvent); }
  };

  const resize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    const ta = e.target; ta.style.height="auto"; ta.style.height = Math.min(ta.scrollHeight, 180)+"px";
  };

  const exportChat = () => {
    const md = messages.map(m=>`## ${m.role==="user"?"Пользователь":"Vort AI"}\n\n${m.content}`).join("\n\n---\n\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([md], {type:"text/markdown"}));
    a.download = `vort-${Date.now()}.md`; a.click();
  };

  return (
    <div style={{ height:"100svh", display:"flex", flexDirection:"column", paddingTop:60, background:"var(--bg)" }}>

      {/* ── Top bar ── */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 16px", height:48, flexShrink:0,
        borderBottom:"1px solid var(--border)",
        background:"var(--bg-1)",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:14, fontWeight:700 }}>⚡ AI Builder</span>
          {messages.length > 0 && (
            <span style={{
              fontSize:11, padding:"2px 8px", borderRadius:5,
              background:"var(--bg-3)", color:"var(--text-3)",
            }}>{messages.filter(m=>m.role==="user").length} запросов</span>
          )}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {/* Model */}
          <div style={{ position:"relative" }}>
            <select value={model} onChange={e=>setModel(e.target.value)} style={{
              appearance:"none", cursor:"pointer",
              padding:"5px 28px 5px 10px", borderRadius:7, fontSize:12,
              border:"1px solid var(--border-2)",
              background:"var(--bg-2)", color:"var(--text-2)",
            }}>
              {MODELS.map(m=><option key={m.v} value={m.v}>{m.l}</option>)}
            </select>
            <span style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", fontSize:10, color:"var(--text-3)" }}>▾</span>
          </div>

          {messages.length > 0 && <>
            <button onClick={exportChat} style={{
              padding:"5px 12px", borderRadius:7, fontSize:12, fontWeight:600, cursor:"pointer",
              border:"1px solid var(--border-2)", background:"var(--bg-2)", color:"var(--text-2)",
            }}>↓ Экспорт</button>
            <button onClick={()=>{ if(window.confirm("Очистить?")) setMessages([]); }} style={{
              padding:"5px 10px", borderRadius:7, fontSize:12, cursor:"pointer",
              border:"1px solid var(--border-2)", background:"var(--bg-2)", color:"var(--text-3)",
            }}>✕</button>
          </>}
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ flex:1, display:"flex", overflow:"hidden" }}>

        {/* ─ Sidebar ─ */}
        <aside style={{
          width:240, flexShrink:0, display:"flex", flexDirection:"column",
          borderRight:"1px solid var(--border)",
          background:"var(--bg-1)", overflow:"hidden",
        }}>
          <div style={{ padding:"14px 14px 10px", borderBottom:"1px solid var(--border)" }}>
            <p style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", color:"var(--text-3)", textTransform:"uppercase" }}>
              Быстрые промпты
            </p>
          </div>

          <div style={{ flex:1, overflowY:"auto", padding:"10px 10px" }}>
            {PROMPTS.map((p, i) => (
              <button key={i} onClick={()=>{ setInput(p.text); taRef.current?.focus(); }}
                style={{
                  width:"100%", textAlign:"left", display:"flex", alignItems:"flex-start", gap:8,
                  padding:"10px 10px", borderRadius:9, marginBottom:4,
                  border:"1px solid transparent", background:"transparent",
                  cursor:"pointer", transition:"background .15s, border-color .15s",
                }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="var(--bg-2)";(e.currentTarget as HTMLElement).style.borderColor="var(--border-2)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="transparent";(e.currentTarget as HTMLElement).style.borderColor="transparent";}}
              >
                <span style={{ fontSize:15, lineHeight:1, flexShrink:0, marginTop:1 }}>{p.icon}</span>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:"var(--text)", marginBottom:2 }}>{p.label}</div>
                  <div style={{ fontSize:11, color:"var(--text-3)", lineHeight:1.5 }}>{p.text.slice(0,52)}…</div>
                </div>
              </button>
            ))}
          </div>

          {/* Ollama status */}
          <div style={{ padding:"10px 14px", borderTop:"1px solid var(--border)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:7, fontSize:11 }}>
              <span style={{
                width:7, height:7, borderRadius:"50%",
                background: ollamaErr ? "#f87171" : "#4ade80",
                display:"inline-block",
                boxShadow: ollamaErr ? "0 0 5px #f87171" : "0 0 7px #4ade80",
              }} />
              <span style={{ color:"var(--text-2)" }}>{ollamaErr ? "Ollama недоступен" : "Ollama подключён"}</span>
            </div>
            {ollamaErr && <p style={{ fontSize:10, color:"var(--text-3)", marginTop:5 }}>
              Запустите: <code style={{ color:"var(--accent)" }}>ollama serve</code>
            </p>}
          </div>
        </aside>

        {/* ─ Chat ─ */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

          {/* Messages */}
          <div style={{ flex:1, overflowY:"auto", padding:"24px 20px" }}>
            {messages.length === 0 ? (
              /* Empty state */
              <div style={{
                height:"100%", display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center", textAlign:"center",
              }}>
                <div style={{
                  width:64, height:64, borderRadius:18, marginBottom:20,
                  background:"linear-gradient(135deg,#7655fc,#22d3ee)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:28, boxShadow:"0 0 40px rgba(118,85,252,.4)",
                }} className="anim-float">⚡</div>
                <h2 style={{ fontSize:"1.25rem", fontWeight:700, letterSpacing:"-0.02em", marginBottom:10 }}>
                  Опишите ваше приложение
                </h2>
                <p style={{ fontSize:13, color:"var(--text-2)", lineHeight:1.65, maxWidth:380, marginBottom:28 }}>
                  Напишите идею на русском — Vort сгенерирует архитектуру, SQL-схему, API endpoints и React-компоненты.
                </p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", maxWidth:480 }}>
                  {["CRM-система","Маркетплейс","Канбан-доска","Финансы"].map(ex => (
                    <button key={ex} onClick={()=>{ setInput(`Создай ${ex}`); taRef.current?.focus(); }}
                      style={{
                        padding:"6px 14px", borderRadius:8, fontSize:12, fontWeight:500,
                        border:"1px solid var(--border-2)", background:"var(--bg-2)",
                        color:"var(--text-2)", cursor:"pointer",
                      }}>
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ maxWidth:820, margin:"0 auto", display:"flex", flexDirection:"column", gap:20 }}>
                {/* Ollama error banner */}
                {ollamaErr && (
                  <div style={{
                    display:"flex", alignItems:"flex-start", gap:12,
                    padding:"14px 16px", borderRadius:12,
                    background:"rgba(248,113,113,.07)", border:"1px solid rgba(248,113,113,.25)",
                  }}>
                    <span style={{ fontSize:16 }}>⚠️</span>
                    <div>
                      <p style={{ fontSize:13, fontWeight:600, color:"#f87171", marginBottom:4 }}>Ollama недоступен</p>
                      <p style={{ fontSize:12, color:"var(--text-2)" }}>
                        Запустите: <code style={{ color:"var(--accent)" }}>ollama serve</code>
                      </p>
                    </div>
                  </div>
                )}

                {messages.map(m => <Bubble key={m.id} m={m} />)}

                {isLoading && (
                  <div className="anim-fade" style={{ display:"flex", gap:12 }}>
                    <div style={{
                      width:32, height:32, borderRadius:10, flexShrink:0,
                      background:"linear-gradient(135deg,#7655fc,#22d3ee)",
                      display:"flex", alignItems:"center", justifyContent:"center", fontSize:14,
                    }}>⚡</div>
                    <div style={{
                      padding:"14px 18px", borderRadius:"4px 16px 16px 16px",
                      border:"1px solid var(--border-2)", background:"var(--bg-2)",
                    }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"var(--text-2)" }}>
                        <span style={{ display:"flex", gap:3 }}>
                          {[0,1,2].map(i=>(
                            <span key={i} style={{
                              width:6, height:6, borderRadius:"50%", background:"var(--primary-2)",
                              animation:`blink 1.2s ${i*0.2}s ease-in-out infinite`,
                            }} />
                          ))}
                        </span>
                        Генерирую архитектуру…
                      </div>
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>
            )}
          </div>

          {/* ─ Input ─ */}
          <div style={{
            flexShrink:0, padding:"12px 20px 16px",
            borderTop:"1px solid var(--border)",
            background:"var(--bg-1)",
          }}>
            <form onSubmit={send} style={{ maxWidth:820, margin:"0 auto" }}>
              <div style={{
                borderRadius:14,
                border:"1px solid rgba(118,85,252,.4)",
                background:"var(--bg-2)",
                boxShadow:"0 0 0 3px rgba(118,85,252,.07)",
                overflow:"hidden",
                transition:"box-shadow .2s",
              }}>
                <textarea
                  ref={taRef}
                  value={input}
                  onChange={resize}
                  onKeyDown={onKey}
                  disabled={isLoading}
                  rows={3}
                  placeholder="Опишите приложение… (Enter — отправить, Shift+Enter — новая строка)"
                  style={{
                    width:"100%", display:"block",
                    padding:"14px 18px 8px",
                    fontSize:14, lineHeight:1.65,
                    background:"transparent", border:"none", outline:"none", resize:"none",
                    color:"var(--text)", minHeight:72, maxHeight:180,
                    fontFamily:"var(--font-sans)",
                  }}
                />
                <div style={{
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"8px 14px 12px",
                }}>
                  <span style={{ fontSize:11, color:"var(--text-3)" }}>
                    {input.length > 0 ? `${input.length} симв.` : "Локально · данные не покидают ваш компьютер"}
                  </span>
                  <button type="submit" disabled={!input.trim()||isLoading} style={{
                    display:"flex", alignItems:"center", gap:7,
                    padding:"9px 20px", borderRadius:9,
                    fontSize:13, fontWeight:700, color:"white", cursor:"pointer",
                    border:"none",
                    background: (!input.trim()||isLoading) ? "rgba(118,85,252,.3)" : "linear-gradient(135deg,#7655fc,#22d3ee)",
                    boxShadow: (!input.trim()||isLoading) ? "none" : "0 0 20px rgba(118,85,252,.4)",
                    transition:"opacity .15s, transform .15s",
                    opacity: (!input.trim()||isLoading) ? .5 : 1,
                  }}>
                    {isLoading ? "…" : "⚡ Создать"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
