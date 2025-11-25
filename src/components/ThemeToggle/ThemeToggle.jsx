export default function ThemeToggle({ darkMode, onToggle }) {
  return (
    <label className="theme-toggle">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={onToggle}
      />
      <span>{darkMode ? "🌙" : "☀️"}</span>
    </label>
  );
}
