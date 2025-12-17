import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Star, GitFork, ArrowRight, FolderGit2 } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { prisma } from "@/lib/prisma";

const languageColors: Record<string, string> = {
  Go: "bg-lang-go",
  TypeScript: "bg-lang-typescript",
  Python: "bg-lang-python",
  JavaScript: "bg-lang-javascript",
  Rust: "bg-lang-rust",
};

async function getRepositories() {
  try {
    const repositories = await prisma.repository.findMany({
      orderBy: [{ stars: "desc" }, { createdAt: "desc" }],
      take: 4,
    });
    return { repositories, error: false };
  } catch {
    return { repositories: [], error: true };
  }
}

export default async function RepositoriesSection() {
  const { repositories, error } = await getRepositories();

  // Не показываем секцию если нет репозиториев и нет ошибки (БД пустая)
  if (repositories.length === 0 && !error) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">
                Open <span className="gradient-text">Source</span>
              </h2>
            </div>
            <p className="text-muted-foreground">
              Мои репозитории и вклад в сообщество
            </p>
          </div>
          <Link href="https://github.com/dreadew" target="_blank">
            <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              <FaGithub className="h-4 w-4" />
              <span className="hidden sm:inline">Больше на GitHub</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {error ? (
          <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg">
            Не удалось загрузить репозитории
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repositories.map((repo) => (
              <Link key={repo.id} href={repo.url} target="_blank">
                <Card className="border-border/50 bg-card/80 backdrop-blur card-glow transition-all duration-300 hover:border-primary/50 h-full cursor-pointer group">
                  <CardHeader>
                    <div className="space-y-3">
                      <CardTitle className="text-base group-hover:text-primary transition-colors flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-primary" />
                        {repo.name}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {repo.description}
                      </CardDescription>
                      <div className="flex items-center gap-4 pt-1">
                        {repo.language && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span
                              className={`w-2.5 h-2.5 rounded-full ${
                                languageColors[repo.language] || "bg-lang-default"
                              }`}
                            />
                            {repo.language}
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3" />
                          {repo.stars}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <GitFork className="h-3 w-3" />0
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
