import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  FileText,
  Award,
  Trophy,
  Users,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const typeConfig: Record<
  string,
  { icon: React.ElementType; label: string; className: string }
> = {
  ARTICLE: {
    icon: FileText,
    label: "Статья",
    className:
      "bg-achievement-article-bg border-achievement-article-border text-achievement-article",
  },
  RID: {
    icon: Award,
    label: "РИД",
    className:
      "bg-achievement-rid-bg border-achievement-rid-border text-achievement-rid",
  },
  HACKATHON: {
    icon: Trophy,
    label: "Хакатон",
    className:
      "bg-achievement-hackathon-bg border-achievement-hackathon-border text-achievement-hackathon",
  },
  CONFERENCE: {
    icon: Users,
    label: "Конференция",
    className:
      "bg-achievement-conference-bg border-achievement-conference-border text-achievement-conference",
  },
  CERTIFICATE: {
    icon: Award,
    label: "Сертификат",
    className:
      "bg-achievement-certificate-bg border-achievement-certificate-border text-achievement-certificate",
  },
  OTHER: {
    icon: FileText,
    label: "Другое",
    className:
      "bg-achievement-other-bg border-achievement-other-border text-achievement-other",
  },
};

async function getAchievements() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { date: "desc" },
      take: 6,
    });
    return { achievements, error: false };
  } catch {
    return { achievements: [], error: true };
  }
}

export default async function AchievementsSection() {
  const { achievements, error } = await getAchievements();

  // Не показываем секцию если нет достижений и нет ошибки (БД пустая)
  if (achievements.length === 0 && !error) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">
              Мои <span className="gradient-text">достижения</span>
            </h2>
          </div>
          <p className="text-muted-foreground">
            Научные публикации, хакатоны, конференции и патенты
          </p>
        </div>

        {error ? (
          <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg">
            Не удалось загрузить достижения
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => {
              const config = typeConfig[achievement.type] || typeConfig.OTHER;
              const Icon = config.icon;

              return (
                <Card
                  key={achievement.id}
                  className="border-border/50 bg-card/80 backdrop-blur card-glow transition-all duration-300 hover:border-primary/50 h-full flex flex-col"
                >
                  <CardHeader className="flex-1 flex flex-col space-y-3">
                    <div className="w-full flex items-center justify-between gap-2">
                      <Badge
                        variant="outline"
                        className={`${config.className} gap-1.5 font-medium`}
                      >
                        <Icon className="h-3 w-3" />
                        {config.label}
                      </Badge>
                      {achievement.url && (
                        <Link href={achievement.url} target="_blank">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:text-primary"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      )}
                    </div>
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-sm leading-tight line-clamp-2">
                        {achievement.title}
                      </CardTitle>
                      {achievement.description && (
                        <CardDescription className="text-xs line-clamp-2">
                          {achievement.description}
                        </CardDescription>
                      )}
                    </div>
                    {achievement.date && (
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide mt-auto pt-2">
                        {new Date(achievement.date).toLocaleDateString("ru-RU", {
                          year: "numeric",
                          month: "long",
                        })}
                      </p>
                    )}
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
