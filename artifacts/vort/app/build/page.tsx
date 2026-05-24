"use client";

import { useChat } from "ai/react";
import { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Send, Zap, Download, Trash2, Copy, Check,
  AlertCircle, Loader2, RotateCcw, ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

const QUICK_PROMPTS = [
  "Создай CRM-систему для отдела продаж с историей сделок, контактами и отчётами",
  "Онлайн-магазин с каталогом товаров, корзиной и оплатой через Stripe",
  "Канбан-доска для команды с задачами, статусами и назначением исполнителей",
  "Приложение для учёта личных финансов с категориями расходов и графиками",
  "Платформа для публикации статей с редактором, тегами и комментариями",
  "Система бронирования услуг с расписанием мастеров и онлайн-оплатой",
  "Дашборд аналитики с графиками продаж, конверсий и активных пользователей",
  "Мобильное приложение для фитнес-трекинга с тренировками и статистикой",
];

const MODELS = [
  { value: "llama3.2", label: "Llama 3.2" },
  { value: "llama3.1", label: "Llama 3.1" },
  { value: "mistral", label: "Mistral" },
  { value: "qwen2.5-coder", label: "Qwen 2.5 Coder" },
  { value: "deepseek-coder", label: "DeepSeek Coder" },
  { value: "codellama", label: "Code Llama" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy}
      className="p-1.5 rounded transition-all hover:opacity-80"
      style={{ color: "var(--text-muted)", background: "rgba(255,255,255,0.06)" }}
      title="Копировать">
      {copied ? <Check size={13} style={{ color: "var(--accent)" }} /> : <Copy size={13} />}
    </button>
  );
}

function MessageBubble({ message }: { message: { role: string; content: string; id: string } }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex gap-3 animate-slide-up", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
          style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
          <Zap size={14} color="white" />
        </div>
      )}

      <div className={cn("max-w-[85%] min-w-0", isUser ? "items-end" : "items-start")} style={{ display: "flex", flexDirection: "column" }}>
        {isUser ? (
          <div className="px-5 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed"
            style={{ background: "rgba(124,92,252,0.2)", border: "1px solid rgba(124,92,252,0.3)", color: "var(--text)" }}>
            {message.content}
          </div>
        ) : (
          <div className="w-full rounded-2xl rounded-tl-sm overflow-hidden"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between px-4 py-2 border-b"
              style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Vort AI</span>
              </div>
              <CopyButton text={message.content} />
            </div>
            <div className="px-5 py-4 prose-vort text-sm overflow-x-auto">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold"
          style={{ background: "var(--bg-elevated)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
          Я
        </div>
      )}
    </div>
  );
}

export default function BuildPage() {
  const [model, setModel] = useState("llama3.2");
  const [ollamaError, setOllamaError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, setMessages, setInput, reload } = useChat({
    api: "/api/chat",
    body: { model },
    onError: (err) => {
      if (err.message.includes("503") || err.message.includes("Ollama")) {
        setOllamaError(true);
      }
    },
    onResponse: () => setOllamaError(false),
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        handleSubmit(e as unknown as React.FormEvent);
      }
    }
  };

  const handleExport = () => {
    const content = messages.map(m =>
      `## ${m.role === "user" ? "Пользователь" : "Vort AI"}\n\n${m.content}`
    ).join("\n\n---\n\n");
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vort-session-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm("Очистить историю чата?")) setMessages([]);
  };

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="h-screen flex flex-col pt-16" style={{ background: "var(--bg)" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b flex-shrink-0"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Zap size={16} style={{ color: "var(--primary-light)" }} />
            <span className="text-sm font-semibold">AI Builder</span>
          </div>
          {messages.length > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>
              {messages.filter(m => m.role === "user").length} запросов
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Model selector */}
          <div className="relative">
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="appearance-none text-xs px-3 py-1.5 pr-7 rounded-lg border cursor-pointer"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "var(--border)",
                color: "var(--text-muted)",
              }}>
              {MODELS.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--text-dim)" }} />
          </div>

          {messages.length > 0 && (
            <>
              <button onClick={handleExport}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all hover:border-opacity-60"
                style={{ background: "var(--bg-elevated)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                <Download size={12} />
                Экспорт
              </button>
              <button onClick={handleClear}
                className="p-1.5 rounded-lg border transition-all hover:border-opacity-60"
                style={{ background: "var(--bg-elevated)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                <Trash2 size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — quick prompts */}
        <div className="hidden lg:flex flex-col w-72 border-r flex-shrink-0 overflow-y-auto"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
          <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--text-muted)" }}>БЫСТРЫЕ ПРОМПТЫ</p>
            <p className="text-xs" style={{ color: "var(--text-dim)" }}>Нажмите для вставки</p>
          </div>
          <div className="p-3 space-y-2 flex-1">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button key={i} onClick={() => handleQuickPrompt(prompt)}
                className="w-full text-left px-3 py-2.5 rounded-lg border text-xs leading-relaxed transition-all hover:border-opacity-60"
                style={{ background: "var(--bg-elevated)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                {prompt}
              </button>
            ))}
          </div>

          {/* Ollama status */}
          <div className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center gap-2 text-xs">
              <div className={cn("w-2 h-2 rounded-full", ollamaError ? "bg-red-500" : "bg-emerald-500")}
                style={!ollamaError ? { boxShadow: "0 0 6px rgba(16,185,129,0.6)" } : undefined} />
              <span style={{ color: "var(--text-muted)" }}>
                {ollamaError ? "Ollama недоступен" : "Ollama подключён"}
              </span>
            </div>
            {ollamaError && (
              <p className="text-xs mt-2" style={{ color: "var(--text-dim)" }}>
                Запустите: <code className="text-xs" style={{ color: "var(--accent)" }}>ollama serve</code>
              </p>
            )}
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {isEmpty ? (
              /* Empty state */
              <div className="max-w-2xl mx-auto h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
                  <Zap size={28} color="white" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Опишите вашу идею</h2>
                <p className="text-sm mb-8 leading-relaxed max-w-md" style={{ color: "var(--text-muted)" }}>
                  Напишите, какое приложение вы хотите создать. Vort сгенерирует архитектуру, схему базы данных, API и код компонентов.
                </p>

                {/* Mobile quick prompts */}
                <div className="lg:hidden w-full max-w-md space-y-2 mb-8">
                  <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-dim)" }}>БЫСТРЫЕ ПРОМПТЫ</p>
                  {QUICK_PROMPTS.slice(0, 4).map((prompt, i) => (
                    <button key={i} onClick={() => handleQuickPrompt(prompt)}
                      className="w-full text-left px-4 py-3 rounded-xl border text-xs leading-relaxed transition-all"
                      style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                      {prompt}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {["CRM-система", "Интернет-магазин", "Трекер задач", "Финансы"].map((ex) => (
                    <span key={ex} className="text-xs px-3 py-1.5 rounded-full border"
                      style={{ borderColor: "var(--border)", color: "var(--text-dim)", background: "var(--bg-card)" }}>
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Ollama error banner */}
                {ollamaError && (
                  <div className="flex items-start gap-3 p-4 rounded-xl border"
                    style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.3)" }}>
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#f87171" }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#f87171" }}>Ollama недоступен</p>
                      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                        Убедитесь, что Ollama запущен: <code style={{ color: "var(--accent)" }}>ollama serve</code>
                      </p>
                      <button onClick={() => reload()}
                        className="flex items-center gap-1.5 text-xs mt-2 hover:underline"
                        style={{ color: "#f87171" }}>
                        <RotateCcw size={11} /> Повторить
                      </button>
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}

                {isLoading && (
                  <div className="flex gap-3 animate-fade-in">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
                      <Zap size={14} color="white" />
                    </div>
                    <div className="px-5 py-4 rounded-2xl rounded-tl-sm"
                      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                      <div className="flex items-center gap-2">
                        <Loader2 size={14} className="animate-spin" style={{ color: "var(--primary-light)" }} />
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>Генерирую архитектуру...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="flex-shrink-0 border-t p-4"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="relative rounded-2xl border transition-all focus-within:border-opacity-80"
                  style={{
                    background: "var(--bg-elevated)",
                    borderColor: "rgba(124,92,252,0.4)",
                    boxShadow: "0 0 0 1px rgba(124,92,252,0.1)",
                  }}>
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={autoResize}
                    onKeyDown={handleKeyDown}
                    placeholder="Опишите приложение, которое хотите создать... (Enter — отправить, Shift+Enter — новая строка)"
                    rows={3}
                    disabled={isLoading}
                    className="w-full px-5 pt-4 pb-3 text-sm resize-none bg-transparent outline-none placeholder-opacity-40 leading-relaxed"
                    style={{
                      color: "var(--text)",
                      minHeight: "80px",
                      maxHeight: "200px",
                    }}
                  />

                  <div className="flex items-center justify-between px-4 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs" style={{ color: "var(--text-dim)" }}>
                        {input.length > 0 && `${input.length} симв.`}
                      </span>
                      {/* Mobile quick prompts dropdown hint */}
                      <span className="text-xs lg:hidden" style={{ color: "var(--text-dim)" }}>
                        Enter — отправить
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
                      {isLoading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Генерирую...
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Создать
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              <p className="text-center text-xs mt-3" style={{ color: "var(--text-dim)" }}>
                Работает локально через Ollama · Данные не покидают ваш компьютер
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
