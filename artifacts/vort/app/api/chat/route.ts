import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL ?? "http://localhost:11434/v1";

const ollama = createOpenAI({
  baseURL: OLLAMA_BASE_URL,
  apiKey: "ollama",
});

const SYSTEM_PROMPT = `Ты — AI No-Code Builder по имени Vort. Твоя задача — помогать пользователям создавать приложения.

Когда пользователь описывает идею приложения, ты ВСЕГДА генерируешь полноценный технический план в следующем формате:

## 🏗️ Архитектура приложения

Краткое описание того, что ты построишь.

## 📦 Структура проекта

\`\`\`
project/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
├── components/
├── lib/
└── ...
\`\`\`

## 🗄️ Схема базы данных

\`\`\`sql
CREATE TABLE table_name (
  id SERIAL PRIMARY KEY,
  ...
);
\`\`\`

## 🔌 API Endpoints

| Метод | Путь | Описание |
|-------|------|----------|
| GET   | /api/... | ... |
...

## ⚛️ Ключевые компоненты

Список компонентов с кратким описанием.

## 💻 Пример кода

Покажи ключевой компонент или хук с настоящим TypeScript кодом.

## 🛠️ Стек технологий

Список технологий с обоснованием выбора.

---

ПРАВИЛА:
- Отвечай ТОЛЬКО на русском языке
- Всегда генерируй РЕАЛЬНЫЙ, рабочий код, не псевдокод
- Используй TypeScript везде
- Для БД предпочитай PostgreSQL с Drizzle ORM
- Для API предпочитай Next.js App Router (route.ts)
- Всегда добавляй типы TypeScript для всех сущностей
- Код должен быть готов к копированию и использованию
- Если пользователь задаёт вопрос не об разработке, вежливо перенаправь его к созданию приложений`;

export async function POST(req: Request) {
  try {
    const { messages, model = "llama3.2" } = await req.json() as {
      messages: { role: string; content: string }[];
      model?: string;
    };

    const result = streamText({
      model: ollama(model),
      system: SYSTEM_PROMPT,
      messages: messages as Parameters<typeof streamText>[0]["messages"],
      temperature: 0.7,
      maxTokens: 4000,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Неизвестная ошибка";

    if (
      message.includes("ECONNREFUSED") ||
      message.includes("fetch failed") ||
      message.includes("connect")
    ) {
      return new Response(
        JSON.stringify({
          error:
            "Ollama недоступен. Убедитесь, что Ollama запущен: ollama serve",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
