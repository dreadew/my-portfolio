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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, ExternalLink, Trophy, FileText, Award, Users, Loader2 } from "lucide-react";

const achievementTypes = [
  { value: "ARTICLE", label: "Научная статья", icon: FileText },
  { value: "RID", label: "РИД", icon: Award },
  { value: "HACKATHON", label: "Хакатон", icon: Trophy },
  { value: "CONFERENCE", label: "Конференция", icon: Users },
  { value: "CERTIFICATE", label: "Сертификат", icon: Award },
  { value: "OTHER", label: "Другое", icon: FileText },
];

type Achievement = {
  id: string;
  type: string;
  title: string;
  description: string;
  url: string | null;
  date: string;
};

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [formData, setFormData] = useState({
    type: "ARTICLE",
    title: "",
    description: "",
    url: "",
    date: "",
  });

  const fetchAchievements = useCallback(async () => {
    try {
      const response = await fetch("/api/achievements");
      if (response.ok) {
        const data = await response.json();
        // Convert date strings to YYYY-MM-DD format for display
        const formattedData = data.map((a: Achievement & { date: string }) => ({
          ...a,
          date: a.date ? new Date(a.date).toISOString().split("T")[0] : "",
        }));
        setAchievements(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch achievements:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  const handleOpenDialog = (achievement?: Achievement) => {
    if (achievement) {
      setEditingAchievement(achievement);
      setFormData({
        type: achievement.type,
        title: achievement.title,
        description: achievement.description,
        url: achievement.url || "",
        date: achievement.date,
      });
    } else {
      setEditingAchievement(null);
      setFormData({
        type: "ARTICLE",
        title: "",
        description: "",
        url: "",
        date: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const achievementData = {
        type: formData.type,
        title: formData.title,
        description: formData.description,
        url: formData.url || null,
        date: formData.date ? new Date(formData.date).toISOString() : null,
      };

      if (editingAchievement) {
        const response = await fetch(`/api/achievements/${editingAchievement.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(achievementData),
        });
        if (!response.ok) throw new Error("Failed to update achievement");
      } else {
        const response = await fetch("/api/achievements", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(achievementData),
        });
        if (!response.ok) throw new Error("Failed to create achievement");
      }

      await fetchAchievements();
      setIsDialogOpen(false);
      setEditingAchievement(null);
    } catch (error) {
      console.error("Failed to save achievement:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить это достижение?")) return;
    
    try {
      const response = await fetch(`/api/achievements/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchAchievements();
      }
    } catch (error) {
      console.error("Failed to delete achievement:", error);
    }
  };

  const getTypeConfig = (type: string) => {
    return achievementTypes.find((t) => t.value === type) || achievementTypes[5];
  };

  const typeColors: Record<string, string> = {
    ARTICLE: "bg-achievement-article-bg text-achievement-article border-achievement-article-border",
    RID: "bg-achievement-rid-bg text-achievement-rid border-achievement-rid-border",
    HACKATHON: "bg-achievement-hackathon-bg text-achievement-hackathon border-achievement-hackathon-border",
    CONFERENCE: "bg-achievement-conference-bg text-achievement-conference border-achievement-conference-border",
    CERTIFICATE: "bg-achievement-certificate-bg text-achievement-certificate border-achievement-certificate-border",
    OTHER: "bg-achievement-other-bg text-achievement-other border-achievement-other-border",
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
            <Trophy className="w-6 h-6 text-primary" />
            Достижения
          </h1>
          <p className="text-muted-foreground">
            Управление статьями, РИД и другими достижениями
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleOpenDialog()}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Добавить достижение
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingAchievement ? "Редактировать достижение" : "Новое достижение"}
              </DialogTitle>
              <DialogDescription>
                {editingAchievement
                  ? "Внесите изменения в достижение"
                  : "Заполните информацию о достижении"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Тип</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    {achievementTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Название</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Название достижения"
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
                  placeholder="Краткое описание"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Дата</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="url">URL (опционально)</Label>
                  <Input
                    id="url"
                    value={formData.url}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    placeholder="https://..."
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
          <CardTitle>Все достижения</CardTitle>
          <CardDescription>
            Список всех достижений ({achievements.length})
          </CardDescription>
        </CardHeader>
        <CardContent>
          {achievements.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Достижений пока нет. Добавьте первое достижение!
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Тип</TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Описание</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {achievements.map((achievement) => {
                  const typeConfig = getTypeConfig(achievement.type);
                  const Icon = typeConfig.icon;
                  return (
                    <TableRow key={achievement.id}>
                      <TableCell>
                        <Badge variant="outline" className={`gap-1 ${typeColors[achievement.type]}`}>
                          <Icon className="w-3 h-3" />
                          {typeConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {achievement.title}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate text-muted-foreground">
                        {achievement.description}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {achievement.date && new Date(achievement.date).toLocaleDateString('ru-RU')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {achievement.url && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => window.open(achievement.url!, "_blank")}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(achievement)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(achievement.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
