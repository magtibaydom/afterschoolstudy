(() => {
    console.log("Days since script is running.");

    const darkModeToggle = document.getElementById('darkModeToggleSubdomain');
    const body = document.body;
    const daysSinceDisplay = document.getElementById('daysSince');
    const LOCAL_STORAGE_KEY = 'darkModeEnabledSubdomain'; // Use a different key for the subdomain
    const launchDate = new Date(2025, 4, 1); // Month is 0-indexed (May is 4)

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

    // Function to calculate and display days since the launch date
    const displayDaysSince = () => {
        const today = new Date();
        const timeDifference = today.getTime() - launchDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        daysSinceDisplay.textContent = `${daysDifference} Days Since Launch`;
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

    // Display the days since launch
    displayDaysSince();

    // Initial update of the button text
    updateToggleButtonText(initialDarkMode);
})();