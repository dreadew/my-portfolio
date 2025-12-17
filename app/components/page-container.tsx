import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

interface IPageContainer {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className }: IPageContainer) {
  return (
    <div
      className={cn(
        "sm:px-4 px-6 mx-auto max-w-5xl min-h-screen bg-background py-8 relative",
        className
      )}
    >
      <div className="absolute top-4 right-4 sm:right-6">
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
}
