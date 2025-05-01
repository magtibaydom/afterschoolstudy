(() => {
    console.log("Dark mode script is running.");

        const darkModeToggle = document.getElementById('darkModeToggle');
        const roleButtons = document.querySelectorAll('.role-btn');
        const form = document.querySelector('.notify-form');
        const mentorQuestionContainer = document.getElementById('mentorQuestionContainer');
        const learnerQuestionContainer = document.getElementById('learnerQuestionContainer');
        const thankYouMessage = document.getElementById('thankYouMessage');
        const signupButton = document.querySelector('.final-signup-btn');
    
        let selectedRole = null;
    
        // Function to set the theme based on preference
        const setTheme = (isDark) => {
            document.body.classList.toggle('dark', isDark);
            darkModeToggle.innerText = isDark ? '☀️ Light Mode' : '🌑 Dark Mode';
        };
    
        // Check for device preference on initial load
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme(true); // Set to dark mode if preferred
        } else {
            setTheme(false); // Set to light mode if preferred or no preference
        }
    
        // Dark mode toggle logic
        darkModeToggle?.addEventListener('click', () => {
            const isCurrentlyDark = document.body.classList.contains('dark');
            setTheme(!isCurrentlyDark); // Toggle the theme
        });
    

    // Show relevant question when role is selected
    roleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            selectedRole = e.target.dataset.role;
            form.style.display = 'block';
    
            // Toggle visibility of question areas
            if (selectedRole === 'mentor') {
                mentorQuestionContainer.style.display = 'block';
                learnerQuestionContainer.style.display = 'none';
            } else if (selectedRole === 'learner') {
                learnerQuestionContainer.style.display = 'block';
                mentorQuestionContainer.style.display = 'none';
            }
    
            // Highlight selected role
            roleButtons.forEach(btn => {
                btn.classList.remove('selected');
                btn.classList.remove('active');
            });
            e.target.classList.add('selected');
        });
    });

    // Copy email functionality
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const email = 'hello@afterschoolstudyclub.com';
            navigator.clipboard.writeText(email)
                .then(() => {
                    // Show confirmation
                    const confirmation = document.createElement('div');
                    confirmation.className = 'copy-confirmation';
                    confirmation.textContent = 'Email copied to clipboard!';
                    document.body.appendChild(confirmation);
                    
                    // Show and then hide the confirmation
                    setTimeout(() => {
                        confirmation.classList.add('show');
                    }, 10);
                    
                    setTimeout(() => {
                        confirmation.classList.remove('show');
                        setTimeout(() => {
                            document.body.removeChild(confirmation);
                        }, 300);
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy email: ', err);
                });
        });
    }

    // Spinner functionality for form submission
    if (form && signupButton) {
        form.addEventListener('submit', function() {
            // Add loading state to button
            signupButton.classList.add('loading');
            signupButton.disabled = true;
            
            // Show thank you message after submission
            setTimeout(() => {
                thankYouMessage.style.display = 'block';
                form.style.display = 'none';
                signupButton.classList.remove('loading');
                signupButton.disabled = false;
                
                // Hide the message after 5 seconds
                setTimeout(() => {
                    thankYouMessage.style.display = 'none';
                }, 15000);
            }, 1500); // Simulate submission delay
        });
    }
})();