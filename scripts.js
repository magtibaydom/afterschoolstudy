(() => {
    console.log("Dark mode + language script is running.");

    const darkModeToggle = document.getElementById('darkModeToggle');
    const languageToggle = document.getElementById('languageToggle');
    const darkModeText = document.getElementById('darkModeText');
    const languageText = document.getElementById('languageText');
    const roleButtons = document.querySelectorAll('.notify-btn');
    const form = document.querySelector('.notify-form');
    const mentorQuestionContainer = document.getElementById('mentorQuestionContainer');
    const learnerQuestionContainer = document.getElementById('learnerQuestionContainer');
    const mentorInterestTextarea = document.getElementById('mentorInterest');
    const learnerInterestTextarea = document.getElementById('learnerInterest');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const signupButton = document.querySelector('.final-signup-btn');
    const copyBtn = document.querySelector('.copy-btn');
    const signupButtonsContainer = document.querySelector('.role-selection');

    let selectedRole = null;
    let mentorInterval;
    let learnerInterval;

    // LANGUAGE TOGGLE SETUP
    let currentLanguage = 'en';
    const translations = {};

    const loadTranslations = async (lang) => {
        if (translations[lang]) {
            updatePageContent(lang);
            updateLanguageToggleText(lang); // Update language toggle text
            return;
        }

        try {
            const response = await fetch(`${lang}.json`);
            const data = await response.json();
            translations[lang] = data;
            updatePageContent(lang);
            updateLanguageToggleText(lang); // Update language toggle text
        } catch (error) {
            console.error(`Error loading ${lang}.json:`, error);
        }
    };

    const updatePageContent = (lang) => {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach((el) => {
            const key = el.getAttribute('data-translate');
            const translation = translations[lang][key];
            if (translation) {
                el.innerHTML = translation;
            }
        });

        // Update placeholder text dynamically for textareas
        const placeholders = document.querySelectorAll('[data-translate-placeholder]');
        placeholders.forEach((el) => {
            const key = el.getAttribute('data-translate-placeholder');
            const translation = translations[lang][key];
            if (translation) {
                el.setAttribute('placeholder', translation);
            }
        });

        // Restart typing effect with new prefix
        if (selectedRole === 'mentor') {
            clearInterval(mentorInterval);
            const prefix = translations[lang].mentorInterestPrefix || "I'd like to teach ";
            mentorInterval = startTypingEffect(mentorInterestTextarea, translations[lang].mentorPhrases || [], prefix);
        } else if (selectedRole === 'learner') {
            clearInterval(learnerInterval);
            const prefix = translations[lang].learnerInterestPrefix || "I'd like to learn ";
            learnerInterval = startTypingEffect(learnerInterestTextarea, translations[lang].learnerPhrases || [], prefix);
        }
    };

    const updateLanguageToggleText = (lang) => {
        const capitalizedLang = lang.charAt(0).toUpperCase() + lang.slice(1);
        languageText.textContent = capitalizedLang;
    };

    // Language toggle as checkbox
    languageToggle?.addEventListener('change', () => {
        currentLanguage = languageToggle.checked ? 'tagalog' : 'english'; // 'tl' for Tagalog, 'en' for English
        loadTranslations(currentLanguage);
    });

    loadTranslations(currentLanguage);

    // Cheaty quick toggle to force typing effect to trigger
setTimeout(() => {
    languageToggle.checked = !languageToggle.checked;
    languageToggle.dispatchEvent(new Event('change'));

    setTimeout(() => {
        languageToggle.checked = !languageToggle.checked;
        languageToggle.dispatchEvent(new Event('change'));
    }, 40); // toggle back after 100ms
}, 200); // wait just enough for DOM to settle


    // DARK MODE
    const setTheme = (isDark) => {
        document.body.classList.toggle('dark', isDark);
        darkModeToggle.checked = isDark;  // Update checkbox state
        darkModeText.textContent = isDark ? '🌙' : '☀️'; // Update dark mode text
    };

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme(true);
    } else {
        setTheme(false);
    }

    // Dark mode toggle as checkbox
    darkModeToggle?.addEventListener('change', () => {
        setTheme(darkModeToggle.checked);
    });

    // TYPING EFFECT FUNCTION
    const startTypingEffect = (textarea, phrases, prefix) => {
        let lastIndex = -1;

        const getRandomIndex = () => {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * phrases.length);
            } while (newIndex === lastIndex && phrases.length > 1);
            lastIndex = newIndex;
            return newIndex;
        };
        
        let phraseIndex = getRandomIndex();
        
        let charIndex = 0;
        let isTyping = true;
        let pauseEnd = false;
        const typeSpeed = 30;
        const pauseDuration = 1000;

        return setInterval(() => {
            const currentPhrase = phrases[phraseIndex];

            if (isTyping && !pauseEnd) {
                textarea.placeholder = prefix + currentPhrase.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex > currentPhrase.length) {
                    isTyping = false;
                    pauseEnd = true;
                    setTimeout(() => { pauseEnd = false; }, pauseDuration);
                }
            } else if (!isTyping && !pauseEnd) {
                textarea.placeholder = prefix + currentPhrase.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex < 0) {
                    isTyping = true;
                    phraseIndex = getRandomIndex();
                    charIndex = 0;
                }
            }
        }, typeSpeed);
    };

  // ROLE SELECTION
roleButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        selectedRole = e.target.dataset.role;
        form.style.display = 'block';
        
        // Clear any existing typing effects before starting a new one
        clearInterval(mentorInterval);
        clearInterval(learnerInterval);

        if (selectedRole === 'mentor') {
            mentorQuestionContainer.style.display = 'block';
            learnerQuestionContainer.style.display = 'none';
            
            const prefix = translations[currentLanguage].mentorInterestPrefix || "I'd like to teach ";
            mentorInterestTextarea.placeholder = prefix; // Keep the prefix before typing
            mentorInterval = startTypingEffect(
            mentorInterestTextarea,
            translations[currentLanguage].mentorPhrases || [],
            prefix
);

            
            mentorInterestTextarea.required = true;
            learnerInterestTextarea.required = false;
        } else if (selectedRole === 'learner') {
            learnerQuestionContainer.style.display = 'block';
            mentorQuestionContainer.style.display = 'none';

            const prefix = translations[currentLanguage].learnerInterestPrefix || "I'd like to learn ";
            learnerInterestTextarea.placeholder = prefix; // Keep the prefix before typing
            learnerInterval = startTypingEffect(
            learnerInterestTextarea,
            translations[currentLanguage].learnerPhrases || [],
            prefix
);

            learnerInterestTextarea.required = true;
            mentorInterestTextarea.required = false;
        } else {
            mentorInterestTextarea.required = false;
            learnerInterestTextarea.required = false;
        }

        // Handle button styling
        roleButtons.forEach(btn => btn.classList.remove('selected', 'active'));
        e.target.classList.add('selected');
    });
});


    // COPY TO CLIPBOARD
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const email = 'hello@afterschoolstudyclub.com';
            navigator.clipboard.writeText(email)
                .then(() => {
                    const confirmation = document.createElement('div');
                    confirmation.className = 'copy-confirmation';
                    confirmation.textContent = 'Email copied to clipboard!';
                    document.body.appendChild(confirmation);

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

    // FORM SUBMIT HANDLING
    if (form && signupButton) {
        form.addEventListener('submit', function () {
            signupButton.classList.add('loading');
            signupButton.disabled = true;

            roleButtons.forEach(btn => btn.classList.remove('selected'));

            setTimeout(() => {
                thankYouMessage.style.display = 'block';
                form.style.display = 'none';
                signupButton.classList.remove('loading');
                signupButton.disabled = false;

                roleButtons.forEach(btn => btn.style.display = 'none');
                if (signupButtonsContainer) {
                    signupButtonsContainer.style.display = 'none';
                }

                setTimeout(() => {
                    thankYouMessage.style.display = 'none';
                    roleButtons.forEach(btn => btn.style.display = 'flex');
                    if (signupButtonsContainer) {
                        signupButtonsContainer.style.display = 'flex';
                    }
                }, 10000);
            }, 1500);
        });
    }

    window.onload = function () {
        const loadingScreen = document.getElementById("loading-screen");
      
        // Hide the loading screen after 3 seconds (or adjust the time as needed)
        setTimeout(function () {
          loadingScreen.style.opacity = "0";
          loadingScreen.style.visibility = "hidden";
        }, 1000); // Change the duration as needed
      };

      // Character count + warning for both textareas
mentorInterestTextarea.addEventListener('input', () => {
    updateCharCountAndWarning(mentorInterestTextarea, 'mentorCount', 'mentorWarning');
});

learnerInterestTextarea.addEventListener('input', () => {
    updateCharCountAndWarning(learnerInterestTextarea, 'learnerCount', 'learnerWarning');
});

})();