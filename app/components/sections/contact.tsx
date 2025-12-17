import { Button } from "@/components/animate-ui/components/buttons/button";
import Link from "next/link";
import {
  FaTelegramPlane,
  FaGithub,
  FaBehance,
  FaDribbble,
  FaVk,
} from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

const socialLinks = [
  {
    title: "Telegram",
    link: "https://t.me/dreadew",
    icon: FaTelegramPlane,
    primary: true,
  },
  {
    title: "GitHub",
    link: "https://github.com/dreadew",
    icon: FaGithub,
    primary: false,
  },
  {
    title: "Эл. почта",
    link: "mailto:p74ur@yandex.ru",
    icon: MdAlternateEmail,
    primary: false,
  },
  {
    title: "VK",
    link: "https://vk.com/dreadewux",
    icon: FaVk,
    primary: false,
  },
  {
    title: "Behance",
    link: "https://www.behance.net/dreadew",
    icon: FaBehance,
    primary: false,
  },
  {
    title: "Dribbble",
    link: "https://dribbble.com/dreadew",
    icon: FaDribbble,
    primary: false,
  },
];

export default function ContactSection() {
  return (
    <section className="py-20">
      <div className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-primary/3 to-transparent rounded-3xl blur-3xl" />

        <div className="relative bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-8 md:p-12 text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Давайте <span className="gradient-text">сотрудничать</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">
              Открыт для интересных проектов, фриланса и новых возможностей.
              Напишите мне, и я отвечу в ближайшее время.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link key={social.title} href={social.link} target="_blank">
                  <Button
                    variant={social.primary ? "default" : "outline"}
                    className={
                      social.primary
                        ? "gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "gap-2 border-border hover:bg-accent hover:border-primary/30"
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {social.title}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-12 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Артур Перов. Сделано с{" "}
          <span className="text-primary">Next.js</span> и{" "}
          <span className="text-primary">shadcn/ui</span>
        </p>
      </div>
    </section>
  );
}
