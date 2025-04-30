(() => {
    console.log("Dark mode script is running.");

    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const LOCAL_STORAGE_KEY = 'darkModeEnabled';
    const notifyForm = document.querySelector('.notify-form');
    const backendUrl = "https://script.google.com/macros/s/AKfycbzSUC89JJADN5tQLNUI1IzsuT4WkoIk28UvnTpRHHuEfjZngATDq2RuNpW1heI0XL5Q/exec"; // Replace with your web app URL

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

    // Function to handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission (page reload)

        const clickedButton = event.submitter;
        const role = clickedButton.dataset.role;
        const emailInput = notifyForm.querySelector('input[type="email"]');

        if (emailInput.value && role) {
            clickedButton.textContent = 'Submitting...';
            clickedButton.disabled = true;

            fetch(backendUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `email=${encodeURIComponent(emailInput.value)}&role=${encodeURIComponent(role)}`
            })
            .then(response => {
                console.log('Submission successful:', response);
                clickedButton.textContent = `Notify Me for ${role.charAt(0).toUpperCase() + role.slice(1)}`;
                clickedButton.disabled = false;
                emailInput.value = ''; // Clear the input field
                alert(`Thank you for signing up to be notified for ${role}!`);
            })
            .catch(error => {
                console.error('Submission error:', error);
                clickedButton.textContent = `Notify Me for ${role.charAt(0).toUpperCase() + role.slice(1)}`;
                clickedButton.disabled = false;
                alert('Oops! Something went wrong. Please try again.');
            });
        } else {
            alert('Please enter your email address.');
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

    // Add event listener to the form submission
    if (notifyForm) {
        notifyForm.addEventListener('submit', handleFormSubmit);
    } else {
        console.warn("Notify form not found!");
    }

    // Initial update of the button text
    updateToggleButtonText(initialDarkMode);
})();