export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: { bg: "#9b9bd6ff", card: "#e8e8fcff", soft: "#1a1b1e" },
        text: { primary: "#ffffff", muted: "#bdbdc1" },
        accent: {
          blue: "#00c2ff",
          purple: "#6c3bd9",
          orange: "#ff9b21",
          red: "#ff4b4b",
          green: "#22c55e",
          yellow: "#f59e0b"
        },
        dashboard: {
          background: "rgb(var(--dashboard-bg) / <alpha-value>)",
          surface: "rgb(var(--dashboard-surface) / <alpha-value>)",
          sidebar: "rgb(var(--dashboard-sidebar) / <alpha-value>)",
          header: "rgb(var(--dashboard-header) / <alpha-value>)",
          accent: "rgb(var(--dashboard-accent) / <alpha-value>)",
          accentSoft: "rgb(var(--dashboard-accent-soft) / <alpha-value>)",
          text: "rgb(var(--dashboard-text) / <alpha-value>)",
          muted: "rgb(var(--dashboard-muted) / <alpha-value>)",
          border: "rgb(var(--dashboard-border) / <alpha-value>)"
        }
      },
      borderRadius: { xl2: "1.25rem" },
      boxShadow: { card: "0 10px 30px rgba(0,0,0,0.35)" }
    }
  },
  plugins: []
}
