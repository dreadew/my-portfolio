import { cn } from "@/lib/utils";

interface ITypography {
  children: React.ReactNode;
}

interface IBlock extends ITypography {
  className?: string;
}

export function TypographyH1({ children }: ITypography) {
  return (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h1>
  );
}

export function TypographyH2({ children }: ITypography) {
  return (
    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

export function TypographyH3({ children }: ITypography) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}

export function TypographyH4({ children }: ITypography) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}

export function TypographyP({ children }: ITypography) {
  return <p className="leading-7 not-first:mt-6">{children}</p>;
}

export function TypographyBlockquote({ children }: ITypography) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
}

export function TypographyInlineCode({ children }: ITypography) {
  return (
    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}

export function TypographyLarge({ children }: ITypography) {
  return <div className="text-lg font-semibold">{children}</div>;
}

export function TypographySmall({ children }: ITypography) {
  return <small className="text-sm leading-none font-medium">{children}</small>;
}

export function TypographyMuted({ children }: ITypography) {
  return (
    <p className="text-muted-foreground text-md font-medium w-3/4">
      {children}
    </p>
  );
}

export function TypographyBlock({ children, className }: IBlock) {
  return (
    <div className={cn("flex items-start flex-col", className)}>{children}</div>
  );
}
