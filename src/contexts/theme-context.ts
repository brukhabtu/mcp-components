import { createContext } from '@lit/context';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
}

export const themeContext = createContext<ThemeConfig>('mcp-theme');
