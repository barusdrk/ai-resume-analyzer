import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } =
    useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg border px-4 py-2 transition
      dark:border-gray-700
      dark:bg-gray-800
      dark:text-white"
    >
      {theme === "light"
        ? "🌙 Dark"
        : "☀️ Light"}
    </button>
  );
}
