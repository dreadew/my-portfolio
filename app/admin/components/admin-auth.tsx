"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Eye, EyeOff } from "lucide-react";

// Пароль хранится в .env в base64 формате: ADMIN_PASSWORD_BASE64=YWRtaW4xMjM=
// Декодируем на клиенте (для простого портфолио это достаточно)
const getAdminPassword = (): string => {
  const base64Password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_BASE64;
  if (!base64Password) {
    console.warn("NEXT_PUBLIC_ADMIN_PASSWORD_BASE64 not set in .env");
    return "";
  }
  try {
    return atob(base64Password);
  } catch {
    console.error("Invalid base64 password");
    return "";
  }
};

const AUTH_KEY = "portfolio_admin_auth";

interface AdminAuthProps {
  children: React.ReactNode;
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверяем сохранённую авторизацию
    const savedAuth = sessionStorage.getItem(AUTH_KEY);
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const adminPassword = getAdminPassword();
    if (!adminPassword) {
      setError("Пароль не настроен. Проверьте .env файл.");
      return;
    }

    if (password === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, "true");
    } else {
      setError("Неверный пароль");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Вход в панель управления</CardTitle>
            <CardDescription>
              Введите пароль для доступа к админке
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    className="pr-10"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* Кнопка выхода в header */}
      <div className="fixed top-4 right-4 z-50">
        <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
          <Lock className="w-4 h-4" />
          Выйти
        </Button>
      </div>
      {children}
    </>
  );
}
