(() => {
    console.log("Dark mode script is running.");

    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const LOCAL_STORAGE_KEY = 'darkModeEnabled';
    const notifyForm = document.querySelector('.notify-form');
    const backendUrl = "https://script.google.com/macros/s/AKfycbzSUC89JJADN5tQLNUI1IzsuT4WkoIk28UvnTpRHHuEfjZngATDq2RuNpW1heI0XL5Q/exec"; // Replace with your web app URL
    const emailButton = document.querySelector('.email-btn');
    const emailAddress = "hello@afterschoolstudyclub.com";
    const copyConfirmation = document.createElement('div');

    copyConfirmation.classList.add('copy-confirmation'); // Add the base class
    document.body.appendChild(copyConfirmation);

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
        const thankYouMessage = document.getElementById('thankYouMessage'); // Get the thank you message element

        if (emailInput.value && role) {
            clickedButton.textContent = 'Submitting...';
            clickedButton.disabled = true;
            thankYouMessage.style.display = 'none'; // Ensure it's hidden before a new submission

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
                clickedButton.textContent = `${role.charAt(0).toUpperCase() + role.slice(1)}`;
                clickedButton.disabled = false;
                emailInput.value = ''; // Clear the input field
                thankYouMessage.style.display = 'block'; // Show the thank you message
            })
            .catch(error => {
                console.error('Submission error:', error);
                clickedButton.textContent = `${role.charAt(0).toUpperCase() + role.slice(1)}`;
                clickedButton.disabled = false;
                thankYouMessage.textContent = 'Oops! Something went wrong. Please try again.'; // Update message for error
                thankYouMessage.style.display = 'block'; // Show the error message
            });
        } else {
            alert('Please enter your email address.');
        }
    };

    // Function to copy text to clipboard and show confirmation with slide
    const copyToClipboard = (text) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
            .then(() => {
                copyConfirmation.textContent = `Email address "${text}" copied!`;
                copyConfirmation.classList.add('show');
                setTimeout(() => {
                    copyConfirmation.classList.remove('show');
                }, 2000); // Adjust timeout to match CSS transition duration
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                copyConfirmation.textContent = 'Failed to copy email address. Please try again.';
                copyConfirmation.classList.add('show');
                setTimeout(() => {
                    copyConfirmation.classList.remove('show');
                }, 2500); // Adjust timeout for error message
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.opacity = 0;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                const successful = document.execCommand('copy');
                copyConfirmation.textContent = `Email address "${text}" copied!`;
                copyConfirmation.classList.add('show');
                setTimeout(() => {
                    copyConfirmation.classList.remove('show');
                }, 2000); // Adjust timeout
            } catch (err) {
                console.error('Unable to copy: ', err);
                copyConfirmation.textContent = 'Failed to copy email address. Please try again.';
                copyConfirmation.classList.add('show');
                setTimeout(() => {
                    copyConfirmation.classList.remove('show');
                }, 2500); // Adjust timeout for error
            }
            document.body.removeChild(textArea);
        }
    };

    // Add event listener to the email button
    if (emailButton) {
        emailButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default mailto: action
            copyToClipboard(emailAddress);
        });
    } else {
        console.warn("Email button not found!");
    }

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