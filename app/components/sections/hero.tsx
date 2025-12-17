import { Button } from "@/components/animate-ui/components/buttons/button";
import { FaTelegramPlane, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { MapPin, FileText } from "lucide-react";
import Image from "next/image";

// TODO: Replace with actual resume URL or upload to /public/resume.pdf
const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL || "/resume.pdf";
const SHOW_RESUME = process.env.NEXT_PUBLIC_SHOW_RESUME !== "false";

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Текст */}
        <div className="flex flex-col gap-5 text-center md:text-left flex-1">
          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Казань, Россия</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Привет, я <span className="gradient-text">Артур</span>
            </h1>
            <p className="text-lg text-muted-foreground flex items-center justify-center md:justify-start gap-2">
              Full-stack разработчик & DE/AI-инженер
            </p>
          </div>

          <p className="text-muted-foreground max-w-lg leading-relaxed">
            Пишу код с 7 класса. Прошёл путь от Telegram-ботов до микросервисов
            на C# / Python / Go и ML-пайплайнов. Учусь в магистратуре, публикую
            статьи и участвую в хакатонах.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
            <Link href="https://t.me/dreadew" target="_blank">
              <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <FaTelegramPlane /> Написать
              </Button>
            </Link>
            {SHOW_RESUME && (
              <Link href={RESUME_URL} target="_blank">
                <Button
                  variant="outline"
                  className="gap-2 border-primary/50 hover:bg-primary/10"
                >
                  <FileText className="w-4 h-4" /> Резюме
                </Button>
              </Link>
            )}
            <Link href="https://github.com/dreadew" target="_blank">
              <Button variant="outline" className="gap-2">
                <FaGithub /> GitHub
              </Button>
            </Link>
          </div>
        </div>

        {/* Фото */}
        <div className="relative">
          {/* Background glow */}
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl blur-2xl" />
          
          <div className="relative h-44 md:h-80 rounded-2xl overflow-hidden border-2 border-primary/50 aspect-square shadow-xl shadow-primary/10">
            <Image
              src="/avatar.jpg"
              alt="Артур Перов"
              fill
              className="object-cover scale-150 translate-y-7"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
