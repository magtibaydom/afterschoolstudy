const toggle = document.getElementById("darkModeToggle");

// Step 1: Check localStorage, then system preference
const storedTheme = localStorage.getItem("theme");

if (storedTheme === "dark" || 
   (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.classList.add("dark");
}

// Step 2: Add toggle click handler
toggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
