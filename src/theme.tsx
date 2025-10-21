import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
type Theme = "dark" | "light";
type ThemeCtx = { theme: Theme; toggle: () => void; };
const Ctx = createContext<ThemeCtx>({ theme: "dark", toggle: () => {} });
export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "dark");
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  const value = useMemo(() => ({ theme, toggle: () => setTheme(t => (t === "dark" ? "light" : "dark")) }), [theme]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};
export const useTheme = () => useContext(Ctx);