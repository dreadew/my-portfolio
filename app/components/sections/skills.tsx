"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Code2 } from "lucide-react";

const skillsData = [
  { skill: "Backend", level: 95, description: "C#, Python, Go, REST, gRPC" },
  {
    skill: "AI/ML",
    level: 90,
    description: "LangChain, LangGraph, PyTorch, NLP, Computer Vision, LLM",
  },
  {
    skill: "Data Engineering",
    level: 90,
    description: "ETL, Apache Airflow, Apache Spark, S3, Clickhouse, Data Mesh",
  },
  {
    skill: "Frontend",
    level: 80,
    description: "React, Next.js, TypeScript, Tailwind",
  },
  { skill: "DevOps", level: 80, description: "Docker, K8s, Terraform, CI/CD" },
  {
    skill: "Architecture",
    level: 85,
    description: "Микросервисы, Kafka, Redis, PostgreSQL",
  },
];

const chartConfig = {
  level: {
    label: "Уровень",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function SkillsSection() {
  return (
    <section className="py-16">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">
              Мой <span className="gradient-text">стек</span>
            </h2>
          </div>
          <p className="text-muted-foreground">
            Технологии, с которыми я работаю ежедневно
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border/50 bg-card/80 backdrop-blur card-glow">
            <CardHeader className="items-center pb-2">
              <CardTitle className="text-lg">Карта навыков</CardTitle>
              <CardDescription>Визуализация уровня владения</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-80 w-full"
              >
                <RadarChart
                  data={skillsData}
                  margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <PolarGrid
                    className="fill-primary opacity-10"
                    gridType="circle"
                  />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                    tickLine={false}
                  />
                  <Radar
                    dataKey="level"
                    fill="var(--color-level)"
                    fillOpacity={0.4}
                    stroke="var(--color-level)"
                    strokeWidth={2}
                  />
                </RadarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/80 backdrop-blur card-glow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Детализация</CardTitle>
              <CardDescription>
                Конкретные технологии по направлениям
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsData.map((item, index) => (
                  <div key={item.skill} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{item.skill}</span>
                      <span className="text-muted-foreground text-xs">
                        {item.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${item.level}%`,
                          background: `linear-gradient(90deg, var(--chart-${
                            (index % 5) + 1
                          }), var(--chart-${((index + 1) % 5) + 1}))`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
