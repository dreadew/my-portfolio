"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  FolderGit2,
  Star,
  Loader2,
} from "lucide-react";

type Repository = {
  id: string;
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
};

export default function AdminRepositoriesPage() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRepo, setEditingRepo] = useState<Repository | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    stars: 0,
    language: "",
  });

  const fetchRepositories = useCallback(async () => {
    try {
      const response = await fetch("/api/repositories");
      if (response.ok) {
        const data = await response.json();
        setRepositories(data);
      }
    } catch (error) {
      console.error("Failed to fetch repositories:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  const handleOpenDialog = (repo?: Repository) => {
    if (repo) {
      setEditingRepo(repo);
      setFormData({
        name: repo.name,
        description: repo.description,
        url: repo.url,
        stars: repo.stars,
        language: repo.language,
      });
    } else {
      setEditingRepo(null);
      setFormData({
        name: "",
        description: "",
        url: "",
        stars: 0,
        language: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const repoData = {
        name: formData.name,
        description: formData.description,
        url: formData.url,
        stars: formData.stars,
        language: formData.language,
      };

      if (editingRepo) {
        const response = await fetch(`/api/repositories/${editingRepo.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(repoData),
        });
        if (!response.ok) throw new Error("Failed to update repository");
      } else {
        const response = await fetch("/api/repositories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(repoData),
        });
        if (!response.ok) throw new Error("Failed to create repository");
      }

      await fetchRepositories();
      setIsDialogOpen(false);
      setEditingRepo(null);
    } catch (error) {
      console.error("Failed to save repository:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот репозиторий?")) return;
    
    try {
      const response = await fetch(`/api/repositories/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchRepositories();
      }
    } catch (error) {
      console.error("Failed to delete repository:", error);
    }
  };

  const languageColors: Record<string, string> = {
    Go: "bg-lang-go",
    TypeScript: "bg-lang-typescript",
    Python: "bg-lang-python",
    JavaScript: "bg-lang-javascript",
    Rust: "bg-lang-rust",
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-primary" />
            Репозитории
          </h1>
          <p className="text-muted-foreground">
            Управление GitHub репозиториями
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleOpenDialog()}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Добавить репозиторий
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-125">
            <DialogHeader>
              <DialogTitle>
                {editingRepo
                  ? "Редактировать репозиторий"
                  : "Новый репозиторий"}
              </DialogTitle>
              <DialogDescription>
                {editingRepo
                  ? "Внесите изменения в репозиторий"
                  : "Заполните информацию о репозитории"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Название</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="my-awesome-repo"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Краткое описание репозитория"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  placeholder="https://github.com/username/repo"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="language">Язык</Label>
                  <Input
                    id="language"
                    value={formData.language}
                    onChange={(e) =>
                      setFormData({ ...formData, language: e.target.value })
                    }
                    placeholder="TypeScript"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stars">Звезды</Label>
                  <Input
                    id="stars"
                    type="number"
                    value={formData.stars}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stars: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Сохранить
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle>Все репозитории</CardTitle>
          <CardDescription>
            Список всех репозиториев ({repositories.length})
          </CardDescription>
        </CardHeader>
        <CardContent>
          {repositories.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Репозиториев пока нет. Добавьте первый репозиторий!
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Описание</TableHead>
                  <TableHead>Язык</TableHead>
                  <TableHead>Звезды</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repositories.map((repo) => (
                  <TableRow key={repo.id}>
                    <TableCell className="font-medium">{repo.name}</TableCell>
                    <TableCell className="max-w-50 truncate">
                      {repo.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            languageColors[repo.language] || "bg-lang-default"
                          }`}
                        />
                        {repo.language}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-star" />
                        {repo.stars}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(repo.url, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(repo)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(repo.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
