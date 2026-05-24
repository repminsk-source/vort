"use client";

import { useChat } from "ai/react";
import { useRef, useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { VortLogo } from "@/components/vort-logo";

const PROMPTS = [
  { label:"CRM-система",      text:"Создай CRM для отдела продаж с историей сделок, контактами, воронкой и аналитикой" },
  { label:"Интернет-магазин", text:"Онлайн-магазин с каталогом товаров, корзиной, фильтрами и оплатой через Stripe" },
  { label:"Канбан-доска",     text:"Трекер задач с канбан-колонками, назначением исполнителей и дедлайнами" },
  { label:"Финансы",          text:"Приложение учёта личных финансов с категориями расходов, бюджетом и графиками" },
  { label:"Блог-платформа",   text:"Платформа для публикации статей с MDX-редактором, тегами и комментариями" },
  { label:"Бронирование",     text:"Система бронирования услуг с расписанием мастеров, уведомлениями и оплатой" },
  { label:"Аналитика",        text:"Дашборд аналитики с графиками продаж, конверсий и активных пользователей" },
  { label:"Фитнес-трекер",    text:"Приложение трекинга тренировок со статистикой, целями и прогрессом" },
];

const MODELS = [
  { v:"llama3.2",      l:"Llama 3.2" },
  { v:"llama3.1",      l:"Llama 3.1" },
  { v:"mistral",       l:"Mistral" },
  { v:"qwen2.5-coder", l:"Qwen 2.5 Coder" },
  { v:"deepseek-coder",l:"DeepSeek Coder" },
  { v:"codellama",     l:"Code Llama" },
];

/* ─── Copy button ─── */
function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setOk(true);
        setTimeout(() => setOk(false), 2000);
      }}
      style={{
        padding:"3px 10px", borderRadius:5, fontSize:11,
        fontWeight:600, cursor:"pointer",
        border:"1px solid var(--border-2)",
        color: ok ? "#4ade80" : "var(--text-3)",
        background:"var(--bg-3)", transition:"color .2s",
        minHeight:"auto",
      }}
    >
      {ok ? "Скопировано" : "Копировать"}
    </button>
  );
}

/* ─── Message bubble ─── */
function Bubble({ m }: { m: { role:string; content:string; id:string } }) {
  const isUser = m.role === "user";
  return (
    <div style={{
      display:"flex", gap:10,
      justifyContent: isUser ? "flex-end" : "flex-start",
      animation:"fade-up .35s cubic-bezier(.22,1,.36,1) both",
    }}>
      {!isUser && (
        <div style={{ flexShrink:0, marginTop:2 }}>
          <VortLogo size={30}/>
        </div>
      )}

      <div style={{ maxWidth:"84%", minWidth:0 }}>
        {isUser ? (
          <div style={{
            padding:"11px 16px", borderRadius:"14px 4px 14px 14px",
            fontSize:14, lineHeight:1.65,
            background:"var(--bg-3)", border:"1px solid var(--border-2)",
            color:"var(--text)",
          }}>{m.content}</div>
        ) : (
          <div style={{
            borderRadius:"4px 14px 14px 14px",
            border:"1px solid var(--border-2)", background:"var(--bg-2)",
            overflow:"hidden",
          }}>
            {/* AI header */}
            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"8px 14px", borderBottom:"1px solid var(--border)",
              background:"rgba(255,255,255,.025)",
            }}>
              <span style={{
                fontSize:11, fontWeight:700, color:"var(--text-3)",
                display:"flex", alignItems:"center", gap:6, letterSpacing:".04em",
              }}>
                <span style={{ width:5, height:5, borderRadius:"50%",
                  background:"#4ade80", display:"inline-block",
                  boxShadow:"0 0 6px #4ade80" }}/>
                VORT AI
              </span>
              <CopyBtn text={m.content}/>
            </div>
            <div className="prose" style={{ padding:"16px 18px", fontSize:13 }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {isUser && (
        <div style={{
          width:30, height:30, borderRadius:8, flexShrink:0, marginTop:2,
          background:"var(--bg-3)", border:"1px solid var(--border-2)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:11, fontWeight:700, color:"var(--text-2)",
        }}>Я</div>
      )}
    </div>
  );
}

/* ─── Sidebar content ─── */
function SidebarContent({
  prompts, setInput, taRef, ollamaOk, demoMode,
}: {
  prompts: typeof PROMPTS;
  setInput: (s: string) => void;
  taRef: React.RefObject<HTMLTextAreaElement | null>;
  ollamaOk: boolean;
  demoMode: boolean;
}) {
  return (
    <>
      <div style={{ padding:"12px 14px 8px", borderBottom:"1px solid var(--border)", flexShrink:0 }}>
        <p style={{ fontSize:10, fontWeight:700, letterSpacing:".08em",
          color:"var(--text-3)", textTransform:"uppercase" }}>Промпты</p>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"8px" }}>
        {prompts.map((p, i) => (
          <button
            key={i}
            onClick={() => { setInput(p.text); taRef.current?.focus(); }}
            style={{
              width:"100%", textAlign:"left", display:"block",
              padding:"10px 10px", borderRadius:8, marginBottom:2,
              border:"1px solid transparent", background:"transparent",
              cursor:"pointer", transition:"background .15s, border-color .15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background="var(--bg-3)";
              (e.currentTarget as HTMLElement).style.borderColor="var(--border)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background="transparent";
              (e.currentTarget as HTMLElement).style.borderColor="transparent";
            }}
          >
            <div style={{ fontSize:12, fontWeight:600, color:"var(--text)", marginBottom:2 }}>
              {p.label}
            </div>
            <div style={{ fontSize:11, color:"var(--text-3)", lineHeight:1.45 }}>
              {p.text.slice(0, 55)}…
            </div>
          </button>
        ))}
      </div>

      {/* Status */}
      <div style={{ padding:"10px 14px", borderTop:"1px solid var(--border)", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7, fontSize:11, marginBottom: demoMode ? 6 : 0 }}>
          <span style={{
            width:7, height:7, borderRadius:"50%",
            background: ollamaOk ? "#4ade80" : "#f87171",
            display:"inline-block",
            boxShadow: ollamaOk ? "0 0 7px #4ade80" : "0 0 5px #f87171",
          }}/>
          <span style={{ color:"var(--text-2)" }}>
            {ollamaOk ? "Ollama подключён" : "Ollama недоступен"}
          </span>
        </div>
        {demoMode && (
          <div style={{
            padding:"6px 8px", borderRadius:6,
            background:"rgba(255,255,255,.04)", border:"1px solid var(--border)",
          }}>
            <p style={{ fontSize:10, color:"var(--text-3)", lineHeight:1.5 }}>
              Демо-режим активен. Установите Ollama для полноценной генерации.
            </p>
            <p style={{ fontSize:10, color:"var(--text-3)", marginTop:3, fontFamily:"ui-monospace,monospace" }}>
              ollama serve
            </p>
          </div>
        )}
      </div>
    </>
  );
}

/* ─── Main page ─── */
export default function BuildPage() {
  const [model, setModel]         = useState("llama3.2");
  const [ollamaOk, setOllamaOk]   = useState(true);
  const [demoMode, setDemoMode]   = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const taRef  = useRef<HTMLTextAreaElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, setInput } =
    useChat({
      api: "/chat",   // <-- fixed: was /api/chat which hit the API server
      body: { model },
      onError: () => { setOllamaOk(false); },
      onResponse: res => {
        setOllamaOk(true);
        if (res.headers.get("X-Vort-Mode") === "demo") setDemoMode(true);
        else setDemoMode(false);
      },
    });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (!sidebarOpen) return;
    const fn = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-sidebar]") && !target.closest("[data-sidebar-toggle]")) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [sidebarOpen]);

  const send = useCallback((e: React.FormEvent) => {
    if (input.trim() && !isLoading) handleSubmit(e);
  }, [input, isLoading, handleSubmit]);

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(e as unknown as React.FormEvent);
    }
  };

  const resize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  };

  const exportChat = () => {
    const md = messages
      .map(m => `## ${m.role === "user" ? "Пользователь" : "Vort AI"}\n\n${m.content}`)
      .join("\n\n---\n\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([md], { type:"text/markdown" }));
    a.download = `vort-${Date.now()}.md`;
    a.click();
  };

  return (
    <div style={{ height:"100svh", display:"flex", flexDirection:"column",
      paddingTop:60, background:"var(--bg)" }}>

      {/* ── Top bar ── */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 clamp(12px,2vw,16px)", height:50, flexShrink:0,
        borderBottom:"1px solid var(--border)", background:"var(--bg-1)",
        gap:8,
      }}>
        {/* Left: toggle + title */}
        <div style={{ display:"flex", alignItems:"center", gap:10, minWidth:0 }}>
          <button
            data-sidebar-toggle
            className="hide-desktop"
            onClick={() => setSidebarOpen(o => !o)}
            style={{
              width:34, height:34, borderRadius:7,
              border:"1px solid var(--border-2)", background:"var(--bg-2)",
              cursor:"pointer", display:"flex", alignItems:"center",
              justifyContent:"center", flexShrink:0, fontSize:13,
              color:"var(--text-2)",
            }}
            aria-label="Промпты"
          >
            ☰
          </button>

          <div style={{ display:"flex", alignItems:"center", gap:8, minWidth:0, overflow:"hidden" }}>
            <VortLogo size={22}/>
            <span style={{ fontSize:14, fontWeight:700, whiteSpace:"nowrap" }}>Builder</span>
            {demoMode && (
              <span style={{
                fontSize:10, fontWeight:600, padding:"2px 7px", borderRadius:4,
                background:"rgba(255,255,255,.06)", border:"1px solid var(--border-2)",
                color:"var(--text-3)", whiteSpace:"nowrap", letterSpacing:".04em",
              }}>ДЕМО</span>
            )}
            {messages.length > 0 && (
              <span style={{
                fontSize:11, padding:"2px 7px", borderRadius:4,
                background:"var(--bg-3)", color:"var(--text-3)", whiteSpace:"nowrap",
              }}>
                {messages.filter(m => m.role==="user").length} запросов
              </span>
            )}
          </div>
        </div>

        {/* Right: model + actions */}
        <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
          <div style={{ position:"relative" }}>
            <select
              value={model}
              onChange={e => setModel(e.target.value)}
              style={{
                appearance:"none", cursor:"pointer",
                padding:"6px 26px 6px 10px", borderRadius:7,
                fontSize:12, border:"1px solid var(--border-2)",
                background:"var(--bg-2)", color:"var(--text-2)",
                maxWidth:"clamp(80px,18vw,140px)",
              }}
            >
              {MODELS.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
            </select>
            <span style={{ position:"absolute", right:7, top:"50%",
              transform:"translateY(-50%)", pointerEvents:"none",
              fontSize:9, color:"var(--text-3)" }}>▾</span>
          </div>

          {messages.length > 0 && (
            <>
              <button onClick={exportChat} className="hide-mobile" style={{
                padding:"5px 12px", borderRadius:7, fontSize:12,
                fontWeight:600, cursor:"pointer",
                border:"1px solid var(--border-2)", background:"var(--bg-2)",
                color:"var(--text-2)",
              }}>Экспорт</button>
              <button onClick={() => { if (window.confirm("Очистить чат?")) setMessages([]); }} style={{
                padding:"5px 10px", borderRadius:7, fontSize:12,
                cursor:"pointer", border:"1px solid var(--border-2)",
                background:"var(--bg-2)", color:"var(--text-3)",
              }}>✕</button>
            </>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ flex:1, display:"flex", overflow:"hidden", position:"relative" }}>

        {/* Mobile sidebar overlay backdrop */}
        {sidebarOpen && (
          <div
            className="hide-desktop"
            onClick={() => setSidebarOpen(false)}
            style={{
              position:"absolute", inset:0, zIndex:49,
              background:"rgba(0,0,0,.7)",
              backdropFilter:"blur(4px)",
            }}
          />
        )}

        {/* Desktop sidebar */}
        <aside
          className="hide-mobile"
          style={{
            width:240, flexShrink:0, display:"flex", flexDirection:"column",
            borderRight:"1px solid var(--border)",
            background:"var(--bg-1)", overflow:"hidden",
          }}
        >
          <SidebarContent
            prompts={PROMPTS} setInput={setInput} taRef={taRef}
            ollamaOk={ollamaOk} demoMode={demoMode}
          />
        </aside>

        {/* Mobile sidebar panel */}
        <div
          data-sidebar
          className="hide-desktop"
          style={{
            position:"absolute", top:0, left:0, bottom:0,
            width:"min(280px,80vw)", zIndex:50,
            display:"flex", flexDirection:"column",
            background:"var(--bg-1)", borderRight:"1px solid var(--border-2)",
            transform: sidebarOpen ? "translateX(0)" : "translateX(-105%)",
            transition:"transform .3s cubic-bezier(.22,1,.36,1)",
            overflow:"hidden",
          }}
        >
          <div style={{
            display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"12px 14px", borderBottom:"1px solid var(--border)", flexShrink:0,
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <VortLogo size={22}/>
              <span style={{ fontSize:13, fontWeight:700, color:"var(--text)" }}>Vort Builder</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} style={{
              background:"none", border:"none", color:"var(--text-3)",
              cursor:"pointer", fontSize:18, lineHeight:1, padding:"2px 4px",
            }}>×</button>
          </div>
          <SidebarContent
            prompts={PROMPTS}
            setInput={s => { setInput(s); setSidebarOpen(false); setTimeout(() => taRef.current?.focus(), 100); }}
            taRef={taRef}
            ollamaOk={ollamaOk}
            demoMode={demoMode}
          />
        </div>

        {/* ─ Chat area ─ */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>

          {/* Messages */}
          <div style={{ flex:1, overflowY:"auto", padding:"clamp(16px,3vw,24px) clamp(12px,2vw,20px)" }}>
            {messages.length === 0 ? (
              /* Empty state */
              <div style={{
                height:"100%", display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center", textAlign:"center",
                padding:"0 clamp(16px,4vw,32px)",
              }}>
                <div className="anim-float" style={{ marginBottom:20 }}>
                  <VortLogo size={56}/>
                </div>
                <h2 style={{
                  fontSize:"clamp(1.1rem,4vw,1.35rem)", fontWeight:700,
                  letterSpacing:"-.02em", marginBottom:10,
                }}>Опишите ваше приложение</h2>
                <p style={{
                  fontSize:"clamp(12px,3vw,13px)", color:"var(--text-2)",
                  lineHeight:1.65, maxWidth:380, marginBottom:28,
                }}>
                  Напишите идею на русском — Vort сгенерирует SQL-схему, API, компоненты и структуру проекта.
                </p>

                {demoMode && (
                  <div style={{
                    padding:"8px 14px", borderRadius:8, marginBottom:20,
                    background:"rgba(255,255,255,.04)", border:"1px solid var(--border-2)",
                    fontSize:12, color:"var(--text-3)", maxWidth:360,
                  }}>
                    Демо-режим — Ollama недоступен. Отвечаю по шаблонам.
                  </div>
                )}

                <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
                  {["CRM-система","Маркетплейс","Канбан","Финансы"].map(ex => (
                    <button
                      key={ex}
                      onClick={() => { setInput(`Создай ${ex}`); taRef.current?.focus(); }}
                      style={{
                        padding:"8px 16px", borderRadius:8, fontSize:13, fontWeight:500,
                        border:"1px solid var(--border-2)", background:"var(--bg-2)",
                        color:"var(--text-2)", cursor:"pointer",
                        transition:"background .15s, border-color .15s",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="var(--bg-3)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="var(--bg-2)"; }}
                    >{ex}</button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{
                maxWidth:820, margin:"0 auto",
                display:"flex", flexDirection:"column", gap:20,
              }}>
                {messages.map(m => <Bubble key={m.id} m={m}/>)}

                {isLoading && (
                  <div style={{ display:"flex", gap:10, animation:"fade-in .3s both" }}>
                    <div style={{ flexShrink:0, marginTop:2 }}>
                      <VortLogo size={30}/>
                    </div>
                    <div style={{
                      padding:"14px 18px", borderRadius:"4px 14px 14px 14px",
                      border:"1px solid var(--border-2)", background:"var(--bg-2)",
                      display:"flex", alignItems:"center", gap:10,
                    }}>
                      <div style={{ display:"flex", gap:4 }}>
                        {[0,1,2].map(i => (
                          <span key={i} style={{
                            width:5, height:5, borderRadius:"50%",
                            background:"var(--text-3)", display:"inline-block",
                            animation:`blink 1.2s ${i*.2}s ease-in-out infinite`,
                          }}/>
                        ))}
                      </div>
                      <span style={{ fontSize:12, color:"var(--text-3)" }}>
                        {demoMode ? "Генерирую по шаблону…" : "Генерирую архитектуру…"}
                      </span>
                    </div>
                  </div>
                )}
                <div ref={endRef}/>
              </div>
            )}
          </div>

          {/* ─ Input area ─ */}
          <div style={{
            flexShrink:0,
            padding:"clamp(10px,2vw,12px) clamp(12px,2vw,20px) clamp(12px,2vw,16px)",
            borderTop:"1px solid var(--border)", background:"var(--bg-1)",
          }}>
            <form onSubmit={send} style={{ maxWidth:820, margin:"0 auto" }}>
              <div style={{
                borderRadius:12, border:"1px solid var(--border-2)",
                background:"var(--bg-2)", overflow:"hidden",
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
                    padding:"clamp(11px,2vw,14px) clamp(14px,2vw,18px) 8px",
                    fontSize:"clamp(13px,2vw,14px)", lineHeight:1.65,
                    background:"transparent", border:"none", outline:"none",
                    resize:"none", color:"var(--text)",
                    minHeight:"clamp(60px,10vw,72px)", maxHeight:160,
                    fontFamily:"inherit",
                  }}
                />
                <div style={{
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"8px clamp(10px,2vw,14px) clamp(10px,2vw,12px)",
                  gap:8,
                }}>
                  <span style={{ fontSize:11, color:"var(--text-3)", minWidth:0, overflow:"hidden" }}>
                    {input.length > 0 ? `${input.length} симв.` : "Данные не покидают компьютер"}
                  </span>
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    style={{
                      padding:"9px clamp(16px,3vw,22px)", borderRadius:8,
                      fontSize:13, fontWeight:700, flexShrink:0,
                      cursor: (!input.trim() || isLoading) ? "not-allowed" : "pointer",
                      border:"none",
                      color: (!input.trim() || isLoading) ? "var(--text-3)" : "var(--bg)",
                      background: (!input.trim() || isLoading) ? "var(--bg-4)" : "var(--white)",
                      transition:"background .15s",
                    }}
                  >
                    {isLoading ? "Генерирую…" : "Создать"}
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
