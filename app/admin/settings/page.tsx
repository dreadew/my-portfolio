"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, FileText, Upload, Trash2, ExternalLink, Check } from "lucide-react";
import Link from "next/link";

export default function AdminSettingsPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [currentResume, setCurrentResume] = useState<string | null>("/resume.pdf");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!resumeFile) return;

    setIsUploading(true);
    
    // TODO: Здесь будет реальная загрузка на сервер
    // Сейчас просто симулируем загрузку
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // В реальном приложении файл загружается через API
    // и сохраняется в public/resume.pdf или на S3/Cloudinary
    setCurrentResume(URL.createObjectURL(resumeFile));
    setIsUploading(false);
    setUploadSuccess(true);
    setResumeFile(null);
    
    // Сбросим статус успеха через 3 секунды
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const handleRemove = () => {
    setCurrentResume(null);
    setResumeFile(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          Настройки
        </h1>
        <p className="text-muted-foreground">
          Общие настройки сайта
        </p>
      </div>

      <div className="grid gap-6">
        {/* Резюме */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Резюме
            </CardTitle>
            <CardDescription>
              Загрузите PDF-файл с вашим резюме. Он будет доступен по ссылке /resume.pdf
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Текущий файл */}
            {currentResume && (
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">resume.pdf</p>
                    <p className="text-xs text-muted-foreground">Текущий файл</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={currentResume} target="_blank">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <ExternalLink className="w-4 h-4" />
                      Открыть
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive hover:text-destructive"
                    onClick={handleRemove}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Загрузка нового файла */}
            <div className="space-y-3">
              <Label>Загрузить новое резюме</Label>
              <div className="flex gap-3">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="flex-1"
                />
                <Button
                  onClick={handleUpload}
                  disabled={!resumeFile || isUploading}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Загрузка...
                    </>
                  ) : uploadSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      Загружено
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Загрузить
                    </>
                  )}
                </Button>
              </div>
              {resumeFile && (
                <p className="text-sm text-muted-foreground">
                  Выбран файл: {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>

            <div className="pt-2 text-xs text-muted-foreground">
              <p>* Поддерживаются только PDF-файлы</p>
              <p>* Для работы загрузки необходимо настроить API-эндпоинт</p>
            </div>
          </CardContent>
        </Card>

        {/* Инструкция по ручной загрузке */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ручная загрузка</CardTitle>
            <CardDescription>
              Пока API не настроен, можно загрузить резюме вручную
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50 font-mono text-sm space-y-2">
              <p className="text-muted-foreground"># Скопируйте PDF в папку public:</p>
              <p>cp ~/Downloads/resume.pdf ./public/resume.pdf</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
