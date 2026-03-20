import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

export function DarkModeToggle() {
  const context = useContext(AppContext);
  if (!context) return null;

  const { theme, setTheme } = context;
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="px-4 py-2 rounded font-bold bg-[var(--success)]  text-white "
      
    >
      {isDark ? <FaMoon /> : <FaSun />}
    </button>
  );
}