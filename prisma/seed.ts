import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required for seeding");
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Очистка существующих данных
  await prisma.achievement.deleteMany();
  await prisma.repository.deleteMany();
  await prisma.project.deleteMany();

  // Проекты
  const projects = await prisma.project.createMany({
    data: [
      {
        title: "AI Assistant Platform",
        description: "Платформа для создания ИИ-ассистентов с RAG и интеграцией LLM провайдеров.",
        url: "https://ai-assistant.example.com",
        tags: ["Next.js", "Python", "FastAPI", "PostgreSQL"],
        featured: true,
      },
      {
        title: "E-commerce Microservices",
        description: "Микросервисная архитектура магазина на Go с gRPC и Kafka.",
        url: "https://shop.example.com",
        tags: ["Go", "gRPC", "Kafka", "Docker"],
        featured: true,
      },
      {
        title: "Analytics Dashboard",
        description: "Real-time аналитика с Apache Spark и визуализацией на D3.js.",
        url: "https://analytics.example.com",
        tags: ["React", "D3.js", "Spark"],
        featured: false,
      },
      {
        title: "ML Pipeline Orchestrator",
        description: "Автоматизация обучения и деплоя ML-моделей.",
        url: "https://ml-pipeline.example.com",
        tags: ["Python", "MLflow", "K8s"],
        featured: false,
      },
    ],
  });
  console.log(`Created ${projects.count} projects`);

  // Репозитории
  const repositories = await prisma.repository.createMany({
    data: [
      {
        name: "go-microservices-template",
        description: "Шаблон для микросервисной архитектуры на Go с Docker, gRPC и Kafka",
        url: "https://github.com/dreadew/go-microservices-template",
        stars: 42,
        language: "Go",
      },
      {
        name: "next-ai-starter",
        description: "Стартовый шаблон Next.js с интеграцией OpenAI и Vercel AI SDK",
        url: "https://github.com/dreadew/next-ai-starter",
        stars: 28,
        language: "TypeScript",
      },
      {
        name: "rust-web-server",
        description: "Высокопроизводительный веб-сервер на Rust с Actix-web",
        url: "https://github.com/dreadew/rust-web-server",
        stars: 15,
        language: "Rust",
      },
      {
        name: "python-ml-utils",
        description: "Набор утилит для машинного обучения и обработки данных",
        url: "https://github.com/dreadew/python-ml-utils",
        stars: 23,
        language: "Python",
      },
    ],
  });
  console.log(`Created ${repositories.count} repositories`);

  // Достижения
  const achievements = await prisma.achievement.createMany({
    data: [
      {
        type: "ARTICLE",
        title: "Применение методов NLP для анализа научных текстов",
        description: "Опубликовано в журнале Вестник КФУ, 2024",
        url: "https://example.com/article1",
        date: new Date("2024-03-15"),
      },
      {
        type: "HACKATHON",
        title: "1 место на Digital Breakthrough 2023",
        description: "ИИ-решение для обработки медицинских изображений",
        url: "https://example.com/hackathon",
        date: new Date("2023-09-25"),
      },
      {
        type: "CONFERENCE",
        title: "Доклад на AINL Conference 2024",
        description: "Оптимизация LLM для извлечения информации",
        url: "https://example.com/conf",
        date: new Date("2024-04-10"),
      },
      {
        type: "RID",
        title: "Свидетельство о регистрации ПО",
        description: "Система автоматической классификации документов",
        url: null,
        date: new Date("2024-01-20"),
      },
      {
        type: "CERTIFICATE",
        title: "AWS Solutions Architect",
        description: "Amazon Web Services сертификация",
        url: "https://example.com/cert",
        date: new Date("2023-06-15"),
      },
    ],
  });
  console.log(`Created ${achievements.count} achievements`);

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
