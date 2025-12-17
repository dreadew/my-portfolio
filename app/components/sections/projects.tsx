import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { ExternalLink, Rocket } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" },
      ],
    });
    return { projects, error: false };
  } catch {
    return { projects: [], error: true };
  }
}

export default async function ProjectsSection() {
  const { projects, error } = await getProjects();

  // Не показываем секцию если нет проектов и нет ошибки (БД пустая)
  if (projects.length === 0 && !error) {
    return null;
  }

  // Если ошибка подключения к БД - показываем заглушку
  if (error) {
    return (
      <section className="py-16">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">
                Мои <span className="gradient-text">проекты</span>
              </h2>
            </div>
            <p className="text-muted-foreground">
              Задеплоенные решения и пет-проекты, над которыми я работал
            </p>
          </div>
          <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg">
            Не удалось загрузить проекты
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">
              Мои <span className="gradient-text">проекты</span>
            </h2>
          </div>
          <p className="text-muted-foreground">
            Задеплоенные решения и пет-проекты, над которыми я работал
          </p>
        </div>

        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex gap-4">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="w-[320px] shrink-0 border-border/50 bg-card/80 backdrop-blur card-glow transition-all duration-300 hover:border-primary/50 pt-0"
              >
                {/* Image placeholder */}
                <div className="h-40 bg-linear-to-br from-primary/10 via-primary/5 to-transparent rounded-t-lg flex items-center justify-center">
                  <div className="text-4xl font-bold text-primary/30">
                    {project.title.charAt(0)}
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0">
                      <CardTitle className="text-base flex items-center gap-2 truncate">
                        <span className="truncate">{project.title}</span>
                        {project.featured && (
                          <Badge className="shrink-0 bg-primary/20 text-primary border-primary/30 text-[10px]">
                            Featured
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-sm whitespace-normal line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px] border-primary/30 text-muted-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Link href={project.url} target="_blank" className="block">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-primary/30 hover:bg-primary/10"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-2" />
                      Открыть проект
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
