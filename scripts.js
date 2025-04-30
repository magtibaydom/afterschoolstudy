(() => {
    console.log("Dark mode script is running.");

    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const LOCAL_STORAGE_KEY = 'darkModeEnabled';

    // Function to set the dark mode preference in local storage and update the body class
    const setDarkMode = (isEnabled) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, isEnabled);
        body.classList.toggle('dark', isEnabled);
        updateToggleButtonText(isEnabled);
        console.log(`Dark mode ${isEnabled ? 'enabled' : 'disabled'}.`);
    };

    // Function to update the toggle button text
    const updateToggleButtonText = (isDarkMode) => {
        if (darkModeToggle) {
            darkModeToggle.textContent = isDarkMode ? '☀️ Light Mode' : '🌓 Dark Mode';
        }
    };

    // Check local storage on page load
    const storedPreference = localStorage.getItem(LOCAL_STORAGE_KEY);
    const initialDarkMode = storedPreference === 'true';
    setDarkMode(initialDarkMode); // Apply initial state

    // Add event listener to the toggle button
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            setDarkMode(!body.classList.contains('dark')); // Toggle the state
        });
    } else {
        console.warn("Dark mode toggle button not found!");
    }
})();