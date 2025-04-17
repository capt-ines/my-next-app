// context/ThemeContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

type Theme =
  | "indigoChild"
  | "seeker"
  | "lightworker"
  | "pilgrim"
  | "starseed"
  | "oldSoul"
  | "sage"
  | "wanderer"
  | "twinFlame"
  | "oracle"
  | "magician"
  | "guide"
  | string;

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setTheme(stored);
    else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const defaultTheme = prefersDark ? "seeker" : "indigoChild";
      localStorage.setItem("theme", defaultTheme);
      setTheme(defaultTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    const stored = localStorage.getItem("theme");
    if (theme !== stored) {
      localStorage.setItem("theme", theme);
    }
    console.log(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useThemeContext must be used within ThemeProvider");
  return context;
};
