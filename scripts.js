(() => {
    console.log("Dark mode script is running.");

    const darkModeToggle = document.getElementById('darkModeToggle');
    const roleButtons = document.querySelectorAll('.notify-btn');
    const form = document.querySelector('.notify-form');
    const mentorQuestionContainer = document.getElementById('mentorQuestionContainer');
    const learnerQuestionContainer = document.getElementById('learnerQuestionContainer');
    const mentorInterestTextarea = document.getElementById('mentorInterest');
    const learnerInterestTextarea = document.getElementById('learnerInterest');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const signupButton = document.querySelector('.final-signup-btn');
    const copyBtn = document.querySelector('.copy-btn');
    const signupButtonsContainer = document.querySelector('.role-selection'); // Updated selector

    const mentorPhrases = [
        "resume writing and tailoring techniques",
        "behavioral interview strategies",
        "effective online and in-person networking",
        "how to write targeted cover letters",
        "how to prepare for virtual job fairs",
        "how to showcase your projects online",
        "how to build your mentor presence",
        "strategies for guiding career transitions",
        "demystifying industry-specific jargon",
        "how to design engaging learning sessions",
        "how to share your career journey effectively",
        "how to provide constructive criticism",
        "how to foster learner confidence",
        "how to adapt to different learning styles",
        "how to develop assessment strategies"
    ];
    const learnerPhrases = [
        "how to find relevant internships",
        "effective job search strategies",
        "the basics of LinkedIn for professionals",
        "how to explore different career paths",
        "how to build a strong personal brand",
        "how to write impactful resumes",
        "how to ace job interviews",
        "how to create a professional network",
        "how to understand company culture",
        "how to negotiate job offers",
        "how to craft compelling personal statements",
        "how to prepare for informational interviews",
        "how to build a professional online presence",
        "essential soft skills for the workplace",
        "how the hiring process works"
    ];
    let selectedRole = null;
    let mentorInterval;
    let learnerInterval;

    // Function to set the theme based on preference
    const setTheme = (isDark) => {
        document.body.classList.toggle('dark', isDark);
        darkModeToggle.innerText = isDark ? '☀️' : '🌙'; // Change icon based on theme
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

    const startTypingEffect = (textarea, phrases, prefix) => {
        let phraseIndex = 0;
        let charIndex = 0;
        let isTyping = true;
        let pauseEnd = false;
        const typeSpeed = 30; // Adjust typing speed (milliseconds per character)
        const pauseDuration = 1000; // Adjust pause duration (milliseconds) after a phrase

        return setInterval(() => {
            const currentPhrase = phrases[phraseIndex];

            if (isTyping && !pauseEnd) {
                textarea.placeholder = prefix + currentPhrase.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex > currentPhrase.length) {
                    isTyping = false;
                    pauseEnd = true;
                    setTimeout(() => { pauseEnd = false; }, pauseDuration); // Pause before erasing
                }
            } else if (!isTyping && !pauseEnd) {
                textarea.placeholder = prefix + currentPhrase.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex < 0) {
                    isTyping = true;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    charIndex = 0;
                }
            }
        }, typeSpeed);
    };

    // Show relevant question when role is selected
    roleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            selectedRole = e.target.dataset.role;
            form.style.display = 'block';

            // Clear any existing intervals
            clearInterval(mentorInterval);
            clearInterval(learnerInterval);

            // Toggle visibility of question areas and start typing effect
            if (selectedRole === 'mentor') {
                mentorQuestionContainer.style.display = 'block';
                learnerQuestionContainer.style.display = 'none';
                mentorInterval = startTypingEffect(mentorInterestTextarea, mentorPhrases, "I'd like to teach ");
                mentorInterestTextarea.required = true;
                learnerInterestTextarea.required = false;
            } else if (selectedRole === 'learner') {
                learnerQuestionContainer.style.display = 'block';
                mentorQuestionContainer.style.display = 'none';
                learnerInterval = startTypingEffect(learnerInterestTextarea, learnerPhrases, "I'd like to learn ");
                learnerInterestTextarea.required = true;
                mentorInterestTextarea.required = false;
            } else {
                mentorInterestTextarea.required = false;
                learnerInterestTextarea.required = false;
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

        // Reset button selection
        roleButtons.forEach(btn => {
            btn.classList.remove('selected');
        });

        // Show thank you message and hide form elements and the buttons
        setTimeout(() => {
            thankYouMessage.style.display = 'block';
            form.style.display = 'none';
            signupButton.classList.remove('loading');
            signupButton.disabled = false;

            // **HIDE THE BUTTONS AND CONTAINER**
            roleButtons.forEach(btn => {
                btn.style.display = 'none';
            });
            if (signupButtonsContainer) {
                signupButtonsContainer.style.display = 'none';
            }

            // **UNHIDE THE BUTTONS AND CONTAINER AFTER THE THANK YOU MESSAGE TIMEOUT**
            setTimeout(() => {
                thankYouMessage.style.display = 'none';
                roleButtons.forEach(btn => {
                    btn.style.display = 'flex'; // Or 'inline-block' depending on your layout
                });
                if (signupButtonsContainer) {
                    signupButtonsContainer.style.display = 'flex'; // Or your container's original display style
                }
            }, 10000); // Same duration as the thank you message timeout

        }, 1500); // Simulate submission delay
    });
}
})();