document.addEventListener("DOMContentLoaded", () => {
    // Check for system preference and apply dark mode if preferred
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const toggleButton = document.getElementById("darkModeToggle");
  
    // Function to toggle dark mode
    const toggleDarkMode = () => {
      // Toggle the dark class on the <html> element (document.documentElement)
      document.documentElement.classList.toggle("dark");
      // Save the dark mode preference to localStorage
      localStorage.setItem("darkMode", document.documentElement.classList.contains("dark"));
    };
  
    // Load dark mode preference from localStorage or system preference
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true" || (savedDarkMode === null && prefersDarkScheme)) {
      document.documentElement.classList.add("dark");
    }
  
    // Add event listener to toggle button
    if (toggleButton) {
      toggleButton.addEventListener("click", toggleDarkMode);
    } else {
      console.warn("Dark mode toggle button not found!");
    }
  });
  