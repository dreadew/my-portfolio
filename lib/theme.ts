/**
 * Централизованное управление цветами темы
 * 
 * Все цвета определены в OKLCH формате для точного контроля:
 * oklch(lightness chroma hue)
 * - lightness: 0-1 (темнее -> светлее)
 * - chroma: 0-0.4 (серый -> насыщенный)
 * - hue: 0-360 (оттенок)
 * 
 * Основные hue значения:
 * - 45-50: оранжевый/янтарный (primary)
 * - 25: красный (destructive)
 * - 85-90: жёлтый (star, javascript, python)
 * - 145: зелёный (conference)
 * - 195: голубой/циан (certificate, go)
 * - 240: синий (article, typescript)
 */

export const themeConfig = {
  // Основной оттенок (hue) для акцентных цветов
  hue: {
    primary: 45,
    secondary: 50,
  },

  dark: {
    // Фон - не слишком тёмный, минимальная насыщенность
    background: { l: 0.14, c: 0.004, h: 50 },
    foreground: { l: 0.75, c: 0.006, h: 60 },

    // Карточки - чуть светлее фона
    card: { l: 0.17, c: 0.005, h: 50 },
    cardForeground: { l: 0.75, c: 0.006, h: 60 },

    // Popover
    popover: { l: 0.17, c: 0.005, h: 50 },
    popoverForeground: { l: 0.75, c: 0.006, h: 60 },

    // Primary - мягкий тёплый акцент
    primary: { l: 0.72, c: 0.10, h: 45 },
    primaryForeground: { l: 0.14, c: 0.004, h: 50 },

    // Secondary
    secondary: { l: 0.20, c: 0.005, h: 50 },
    secondaryForeground: { l: 0.75, c: 0.006, h: 60 },

    // Muted
    muted: { l: 0.20, c: 0.003, h: 50 },
    mutedForeground: { l: 0.55, c: 0.008, h: 60 },

    // Accent
    accent: { l: 0.24, c: 0.012, h: 50 },
    accentForeground: { l: 0.75, c: 0.006, h: 60 },

    // Destructive
    destructive: { l: 0.55, c: 0.12, h: 25 },

    // Border & Input
    border: { l: 0.26, c: 0.006, h: 50, alpha: 0.5 },
    input: { l: 0.18, c: 0.005, h: 50 },
    ring: { l: 0.72, c: 0.10, h: 45 },

    // Chart colors - гармоничная палитра
    chart1: { l: 0.70, c: 0.09, h: 45 },
    chart2: { l: 0.62, c: 0.07, h: 35 },
    chart3: { l: 0.58, c: 0.06, h: 25 },
    chart4: { l: 0.68, c: 0.08, h: 60 },
    chart5: { l: 0.56, c: 0.06, h: 40 },

    // Gradient
    gradientFrom: { l: 0.72, c: 0.10, h: 50, alpha: 0.9 },
    gradientVia: { l: 0.70, c: 0.09, h: 55, alpha: 0.9 },
    gradientTo: { l: 0.68, c: 0.10, h: 45, alpha: 0.9 },

    // Achievement types (semantic colors)
    achievementArticle: { l: 0.65, c: 0.08, h: 240 },
    achievementRid: { l: 0.70, c: 0.09, h: 50 },
    achievementHackathon: { l: 0.68, c: 0.10, h: 45 },
    achievementConference: { l: 0.65, c: 0.09, h: 145 },
    achievementCertificate: { l: 0.68, c: 0.08, h: 195 },
    achievementOther: { l: 0.60, c: 0.06, h: 60 },

    // Programming languages
    langGo: { l: 0.68, c: 0.10, h: 195 },
    langTypescript: { l: 0.65, c: 0.10, h: 240 },
    langPython: { l: 0.75, c: 0.12, h: 90 },
    langJavascript: { l: 0.78, c: 0.12, h: 85 },
    langRust: { l: 0.68, c: 0.12, h: 45 },
    langDefault: { l: 0.60, c: 0.06, h: 60 },

    // Star/rating
    star: { l: 0.75, c: 0.12, h: 85 },
  },

  light: {
    // Фон - чистый, минимальная насыщенность
    background: { l: 0.97, c: 0.003, h: 70 },
    foreground: { l: 0.25, c: 0.01, h: 70 },

    // Карточки
    card: { l: 0.99, c: 0.002, h: 70 },
    cardForeground: { l: 0.25, c: 0.01, h: 70 },

    // Popover
    popover: { l: 0.99, c: 0.002, h: 70 },
    popoverForeground: { l: 0.25, c: 0.01, h: 70 },

    // Primary
    primary: { l: 0.55, c: 0.12, h: 50 },
    primaryForeground: { l: 0.98, c: 0, h: 0 },

    // Secondary
    secondary: { l: 0.93, c: 0.01, h: 70 },
    secondaryForeground: { l: 0.35, c: 0.02, h: 70 },

    // Muted
    muted: { l: 0.93, c: 0.005, h: 70 },
    mutedForeground: { l: 0.55, c: 0.01, h: 70 },

    // Accent
    accent: { l: 0.92, c: 0.02, h: 50 },
    accentForeground: { l: 0.35, c: 0.02, h: 70 },

    // Destructive
    destructive: { l: 0.50, c: 0.15, h: 25 },

    // Border & Input
    border: { l: 0.90, c: 0.01, h: 70 },
    input: { l: 0.93, c: 0.005, h: 70 },
    ring: { l: 0.55, c: 0.12, h: 50 },

    // Chart colors
    chart1: { l: 0.55, c: 0.12, h: 50 },
    chart2: { l: 0.50, c: 0.10, h: 35 },
    chart3: { l: 0.52, c: 0.08, h: 25 },
    chart4: { l: 0.58, c: 0.10, h: 65 },
    chart5: { l: 0.48, c: 0.10, h: 40 },

    // Gradient
    gradientFrom: { l: 0.60, c: 0.14, h: 50 },
    gradientVia: { l: 0.58, c: 0.12, h: 55 },
    gradientTo: { l: 0.55, c: 0.12, h: 45 },

    // Achievement types (semantic colors)
    achievementArticle: { l: 0.50, c: 0.10, h: 240 },
    achievementRid: { l: 0.55, c: 0.12, h: 50 },
    achievementHackathon: { l: 0.55, c: 0.14, h: 45 },
    achievementConference: { l: 0.52, c: 0.12, h: 145 },
    achievementCertificate: { l: 0.55, c: 0.10, h: 195 },
    achievementOther: { l: 0.50, c: 0.08, h: 60 },

    // Programming languages
    langGo: { l: 0.60, c: 0.12, h: 195 },
    langTypescript: { l: 0.55, c: 0.12, h: 240 },
    langPython: { l: 0.70, c: 0.14, h: 90 },
    langJavascript: { l: 0.75, c: 0.14, h: 85 },
    langRust: { l: 0.55, c: 0.14, h: 45 },
    langDefault: { l: 0.55, c: 0.08, h: 60 },

    // Star/rating
    star: { l: 0.70, c: 0.14, h: 85 },
  },
} as const;

// Helper для генерации OKLCH строки
export function toOklch(color: { l: number; c: number; h: number; alpha?: number }): string {
  if (color.alpha !== undefined) {
    return `oklch(${color.l} ${color.c} ${color.h} / ${color.alpha * 100}%)`;
  }
  return `oklch(${color.l} ${color.c} ${color.h})`;
}

// Генерация CSS переменных
export function generateCSSVariables(theme: 'dark' | 'light'): Record<string, string> {
  const colors = themeConfig[theme];
  
  const result: Record<string, string> = {
    '--background': toOklch(colors.background),
    '--foreground': toOklch(colors.foreground),
    '--card': toOklch(colors.card),
    '--card-foreground': toOklch(colors.cardForeground),
    '--popover': toOklch(colors.popover),
    '--popover-foreground': toOklch(colors.popoverForeground),
    '--primary': toOklch(colors.primary),
    '--primary-foreground': toOklch(colors.primaryForeground),
    '--secondary': toOklch(colors.secondary),
    '--secondary-foreground': toOklch(colors.secondaryForeground),
    '--muted': toOklch(colors.muted),
    '--muted-foreground': toOklch(colors.mutedForeground),
    '--accent': toOklch(colors.accent),
    '--accent-foreground': toOklch(colors.accentForeground),
    '--destructive': toOklch(colors.destructive),
    '--border': toOklch(colors.border),
    '--input': toOklch(colors.input),
    '--ring': toOklch(colors.ring),
    '--chart-1': toOklch(colors.chart1),
    '--chart-2': toOklch(colors.chart2),
    '--chart-3': toOklch(colors.chart3),
    '--chart-4': toOklch(colors.chart4),
    '--chart-5': toOklch(colors.chart5),
    
    // Gradient
    '--gradient-from': toOklch(colors.gradientFrom),
    '--gradient-via': toOklch(colors.gradientVia),
    '--gradient-to': toOklch(colors.gradientTo),
    
    // Achievement types
    '--achievement-article': toOklch(colors.achievementArticle),
    '--achievement-article-bg': toOklch({ ...colors.achievementArticle, alpha: 0.2 }),
    '--achievement-article-border': toOklch({ ...colors.achievementArticle, alpha: 0.3 }),
    '--achievement-rid': toOklch(colors.achievementRid),
    '--achievement-rid-bg': toOklch({ ...colors.achievementRid, alpha: 0.2 }),
    '--achievement-rid-border': toOklch({ ...colors.achievementRid, alpha: 0.3 }),
    '--achievement-hackathon': toOklch(colors.achievementHackathon),
    '--achievement-hackathon-bg': toOklch({ ...colors.achievementHackathon, alpha: 0.2 }),
    '--achievement-hackathon-border': toOklch({ ...colors.achievementHackathon, alpha: 0.3 }),
    '--achievement-conference': toOklch(colors.achievementConference),
    '--achievement-conference-bg': toOklch({ ...colors.achievementConference, alpha: 0.2 }),
    '--achievement-conference-border': toOklch({ ...colors.achievementConference, alpha: 0.3 }),
    '--achievement-certificate': toOklch(colors.achievementCertificate),
    '--achievement-certificate-bg': toOklch({ ...colors.achievementCertificate, alpha: 0.2 }),
    '--achievement-certificate-border': toOklch({ ...colors.achievementCertificate, alpha: 0.3 }),
    '--achievement-other': toOklch(colors.achievementOther),
    '--achievement-other-bg': toOklch({ ...colors.achievementOther, alpha: 0.2 }),
    '--achievement-other-border': toOklch({ ...colors.achievementOther, alpha: 0.3 }),
    
    // Languages
    '--lang-go': toOklch(colors.langGo),
    '--lang-typescript': toOklch(colors.langTypescript),
    '--lang-python': toOklch(colors.langPython),
    '--lang-javascript': toOklch(colors.langJavascript),
    '--lang-rust': toOklch(colors.langRust),
    '--lang-default': toOklch(colors.langDefault),
    
    // Star
    '--star': toOklch(colors.star),
  };
  
  return result;
}

// Экспорт всех hue значений для справки
export const hueReference = {
  orange: 45,      // primary, hackathon, rust
  amber: 50,       // rid, secondary
  red: 25,         // destructive
  yellow: 85,      // star, javascript
  yellowGreen: 90, // python
  green: 145,      // conference
  cyan: 195,       // certificate, go
  blue: 240,       // article, typescript
  warmGray: 60,    // muted, other, default
} as const;
