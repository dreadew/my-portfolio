import { FolderGit2, Rocket, Trophy, Settings, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AdminAuth from "./components/admin-auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuth>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/50 backdrop-blur sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                <span className="font-bold">Панель управления</span>
              </Link>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                Вернуться на сайт
              </Button>
            </Link>
          </div>
        </header>

        {/* Navigation */}
        <nav className="border-b border-border/50 bg-card/30">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex gap-1">
              <Link href="/admin">
                <Button variant="ghost" className="gap-2 rounded-none border-b-2 border-transparent data-[active=true]:border-primary">
                  <Rocket className="w-4 h-4" />
                  Проекты
                </Button>
              </Link>
              <Link href="/admin/repositories">
                <Button variant="ghost" className="gap-2 rounded-none border-b-2 border-transparent data-[active=true]:border-primary">
                  <FolderGit2 className="w-4 h-4" />
                  Репозитории
                </Button>
              </Link>
              <Link href="/admin/achievements">
                <Button variant="ghost" className="gap-2 rounded-none border-b-2 border-transparent data-[active=true]:border-primary">
                  <Trophy className="w-4 h-4" />
                  Достижения
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant="ghost" className="gap-2 rounded-none border-b-2 border-transparent data-[active=true]:border-primary">
                  <FileText className="w-4 h-4" />
                  Настройки
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </AdminAuth>
  );
}
