import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL ?? "http://localhost:11434/v1";

const ollama = createOpenAI({ baseURL: OLLAMA_BASE_URL, apiKey: "ollama" });

const SYSTEM_PROMPT = `Ты — Vort, AI No-Code Builder. Помогаешь создавать приложения.

Когда пользователь описывает идею, генерируй полный технический план:

## Архитектура

Краткое описание.

## Структура проекта

\`\`\`
project/
├── app/
│   ├── api/
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── lib/
│   └── db/
│       └── schema.ts
└── package.json
\`\`\`

## Схема базы данных

\`\`\`sql
CREATE TABLE example (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

## API Endpoints

| Метод | Путь | Описание |
|-------|------|----------|
| GET | /api/... | ... |

## Ключевые компоненты

Список компонентов.

## Пример кода

Покажи реальный TypeScript код.

## Стек

Технологии и обоснование.

ПРАВИЛА:
- Отвечай ТОЛЬКО на русском
- Генерируй РЕАЛЬНЫЙ рабочий код
- TypeScript везде
- PostgreSQL + Drizzle ORM
- Next.js App Router`;

// Smart mock responses when Ollama is unavailable
function generateMockResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  let appType = "Веб-приложение";
  let tableName = "items";
  let fields = "name TEXT NOT NULL,\n  description TEXT,\n  status TEXT DEFAULT 'active',";
  let endpoints = `| GET | /api/items | Получить список |
| POST | /api/items | Создать запись |
| PUT | /api/items/:id | Обновить |
| DELETE | /api/items/:id | Удалить |`;
  let components = "- `ItemList` — таблица записей\n- `ItemForm` — форма создания\n- `ItemCard` — карточка";

  if (lower.includes("crm") || lower.includes("продаж") || lower.includes("сделк")) {
    appType = "CRM-система"; tableName = "contacts";
    fields = "name TEXT NOT NULL,\n  email TEXT UNIQUE,\n  company TEXT,\n  stage TEXT DEFAULT 'lead',\n  phone TEXT,\n  notes TEXT,";
    endpoints = `| GET | /api/contacts | Список контактов |
| POST | /api/contacts | Создать контакт |
| GET | /api/deals | Список сделок |
| POST | /api/deals | Создать сделку |
| GET | /api/analytics | Аналитика воронки |`;
    components = "- `ContactTable` — таблица контактов с поиском\n- `DealPipeline` — визуальная воронка\n- `ContactForm` — форма контакта\n- `AnalyticsDashboard` — дашборд метрик";
  } else if (lower.includes("магазин") || lower.includes("shop") || lower.includes("товар")) {
    appType = "Интернет-магазин"; tableName = "products";
    fields = "name TEXT NOT NULL,\n  description TEXT,\n  price DECIMAL(10,2) NOT NULL,\n  stock INTEGER DEFAULT 0,\n  category_id INTEGER REFERENCES categories(id),\n  image_url TEXT,";
    endpoints = `| GET | /api/products | Каталог товаров |
| POST | /api/cart | Добавить в корзину |
| GET | /api/cart | Содержимое корзины |
| POST | /api/orders | Оформить заказ |
| POST | /api/checkout | Оплата (Stripe) |`;
    components = "- `ProductGrid` — сетка товаров с фильтрами\n- `ProductCard` — карточка товара\n- `CartDrawer` — выезжающая корзина\n- `CheckoutForm` — форма оплаты";
  } else if (lower.includes("канбан") || lower.includes("задач") || lower.includes("трекер")) {
    appType = "Канбан-трекер"; tableName = "tasks";
    fields = "title TEXT NOT NULL,\n  description TEXT,\n  status TEXT DEFAULT 'todo',\n  assignee_id INTEGER REFERENCES users(id),\n  due_date TIMESTAMPTZ,\n  priority TEXT DEFAULT 'medium',";
    endpoints = `| GET | /api/tasks | Список задач |
| POST | /api/tasks | Создать задачу |
| PATCH | /api/tasks/:id | Обновить статус |
| GET | /api/users | Список пользователей |
| WS | /ws | Обновления в реальном времени |`;
    components = "- `KanbanBoard` — доска с drag & drop\n- `TaskCard` — карточка задачи\n- `TaskModal` — детали задачи\n- `UserAvatar` — аватар исполнителя";
  } else if (lower.includes("финанс") || lower.includes("бюджет") || lower.includes("расход")) {
    appType = "Финансовый трекер"; tableName = "transactions";
    fields = "amount DECIMAL(10,2) NOT NULL,\n  type TEXT NOT NULL,\n  category TEXT NOT NULL,\n  description TEXT,\n  date DATE DEFAULT CURRENT_DATE,\n  user_id INTEGER REFERENCES users(id),";
    endpoints = `| GET | /api/transactions | Транзакции |
| POST | /api/transactions | Добавить транзакцию |
| GET | /api/stats | Статистика по категориям |
| GET | /api/budget | Бюджет на месяц |`;
    components = "- `TransactionList` — список транзакций\n- `CategoryChart` — круговая диаграмма\n- `MonthlyBarChart` — график по месяцам\n- `BudgetProgress` — прогресс бюджета";
  } else if (lower.includes("блог") || lower.includes("стать") || lower.includes("публикац")) {
    appType = "Блог-платформа"; tableName = "posts";
    fields = "title TEXT NOT NULL,\n  slug TEXT UNIQUE NOT NULL,\n  content TEXT NOT NULL,\n  excerpt TEXT,\n  published BOOLEAN DEFAULT false,\n  author_id INTEGER REFERENCES users(id),\n  published_at TIMESTAMPTZ,";
    endpoints = `| GET | /api/posts | Список статей |
| GET | /api/posts/:slug | Одна статья |
| POST | /api/posts | Создать статью |
| PUT | /api/posts/:id | Обновить |
| GET | /api/tags | Теги |`;
    components = "- `PostList` — лента статей\n- `PostEditor` — MDX-редактор\n- `TagFilter` — фильтр по тегам\n- `CommentSection` — комментарии";
  }

  return `## Архитектура: ${appType}

Полностековое приложение на Next.js 15 + TypeScript + PostgreSQL. API через Route Handlers, ORM — Drizzle, валидация — Zod.

## Структура проекта

\`\`\`
project/
├── app/
│   ├── api/
│   │   └── ${tableName}/
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   └── ${tableName}/
├── lib/
│   ├── db/
│   │   └── schema.ts
│   └── validations.ts
└── package.json
\`\`\`

## Схема базы данных

\`\`\`sql
CREATE TABLE ${tableName} (
  id         SERIAL PRIMARY KEY,
  ${fields}
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_${tableName}_created ON ${tableName}(created_at DESC);
\`\`\`

## API Endpoints

${endpoints}

## Ключевые компоненты

${components}

## Пример кода

\`\`\`typescript
// lib/db/schema.ts
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const ${tableName} = pgTable("${tableName}", {
  id:        serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ${tableName.charAt(0).toUpperCase() + tableName.slice(1)} = typeof ${tableName}.$inferSelect;
export type New${tableName.charAt(0).toUpperCase() + tableName.slice(1)} = typeof ${tableName}.$inferInsert;

// app/api/${tableName}/route.ts
import { db } from "@/lib/db";
import { ${tableName} } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const rows = await db
    .select()
    .from(${tableName})
    .orderBy(desc(${tableName}.createdAt));
  return Response.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const [row] = await db.insert(${tableName}).values(body).returning();
  return Response.json(row, { status: 201 });
}
\`\`\`

## Стек технологий

| Технология | Версия | Зачем |
|------------|--------|-------|
| Next.js | 15 | Fullstack React-фреймворк |
| TypeScript | 5 | Типобезопасность |
| PostgreSQL | 16 | Основная БД |
| Drizzle ORM | latest | Типизированный ORM |
| Zod | 3 | Валидация схем |
| Tailwind CSS | 4 | Стилизация |

---
*Для запуска: установите зависимости, настройте DATABASE_URL и запустите миграции.*`;
}

export async function POST(req: Request) {
  try {
    const { messages, model = "llama3.2" } = await req.json() as {
      messages: { role: string; content: string }[];
      model?: string;
    };

    // First check if Ollama is reachable
    let ollamaOk = false;
    try {
      const check = await fetch(`${OLLAMA_BASE_URL.replace("/v1", "")}/api/tags`, {
        signal: AbortSignal.timeout(2000),
      });
      ollamaOk = check.ok;
    } catch {
      ollamaOk = false;
    }

    // If Ollama is unavailable, return smart mock response
    if (!ollamaOk) {
      const lastUserMsg = [...messages].reverse().find(m => m.role === "user")?.content ?? "";
      const mockText = generateMockResponse(lastUserMsg);

      // Stream the mock response character by character
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const words = mockText.split("");
          let buf = "";
          for (let i = 0; i < words.length; i++) {
            buf += words[i];
            if (i % 3 === 0 || i === words.length - 1) {
              // Vercel AI SDK data stream format
              controller.enqueue(encoder.encode(`0:${JSON.stringify(buf)}\n`));
              buf = "";
              await new Promise(r => setTimeout(r, 8));
            }
          }
          controller.enqueue(encoder.encode(`d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "X-Vort-Mode": "demo",
        },
      });
    }

    const result = streamText({
      model: ollama(model),
      system: SYSTEM_PROMPT,
      messages: messages as Parameters<typeof streamText>[0]["messages"],
      temperature: 0.7,
      maxTokens: 4000,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Ошибка";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
