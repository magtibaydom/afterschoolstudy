// scripts.js - Complete Version
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const darkModeToggle = document.getElementById('darkModeToggle');
    const roleButtons = document.querySelectorAll('.role-btn');
    const form = document.querySelector('.notify-form');
    const mentorQuestionContainer = document.getElementById('mentorQuestionContainer');
    const learnerQuestionContainer = document.getElementById('learnerQuestionContainer');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const thankYouPopup = document.querySelector('.thank-you-popup');
    const submitBtn = document.querySelector('.final-signup-btn');

    // State
    let selectedRole = null;

    // 1. Dark Mode Functionality
    const initDarkMode = () => {
        // Check localStorage for dark mode preference
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // Apply dark mode if enabled
        if (isDarkMode) {
            document.body.classList.add('dark');
            darkModeToggle.textContent = '🌙 Light Mode';
        }

        // Toggle handler
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            localStorage.setItem('darkMode', isDark);
            darkModeToggle.textContent = isDark ? '🌙 Light Mode' : '🌓 Dark Mode';
        });
    };

    // 2. Role Selection Functionality
    // Update the role selection part of your scripts.js
const setupRoleSelection = () => {
    roleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Set selected role
            selectedRole = e.target.dataset.role;
            
            // Show the form
            form.style.display = 'block';

            // Show relevant question
            if (selectedRole === 'mentoring') {
                mentorQuestionContainer.style.display = 'block';
                learnerQuestionContainer.style.display = 'none';
            } else {
                learnerQuestionContainer.style.display = 'block';
                mentorQuestionContainer.style.display = 'none';
            }

            // Update button states - NEW VISUAL INDICATOR CODE
            roleButtons.forEach(btn => {
                btn.classList.remove('selected');
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = 'none';
            });
            
            // Add visual indicators to selected button
            e.target.classList.add('selected');
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            
            // For dark mode
            if (document.body.classList.contains('dark')) {
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 191, 255, 0.5)';
            } else {
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.5)';
            }
        });
    });
};

    // 3. Form Submission Handling
    const handleFormSubmit = () => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate role selection
            if (!selectedRole) {
                alert('Please select whether you are a mentor or learner');
                return;
            }

            // Get form values
            const email = form.querySelector('input[type="email"]').value.trim();
            const mentorInput = document.getElementById('mentorInterest')?.value.trim();
            const learnerInput = document.getElementById('learnerInterest')?.value.trim();
            const interest = selectedRole === 'mentoring' ? mentorInput : learnerInput;

            // Validate inputs
            if (!email || !validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            if (!interest) {
                alert(`Please tell us what you'd like to ${selectedRole === 'mentoring' ? 'teach' : 'learn'}`);
                return;
            }

            // Prepare form data
            const formData = {
                email,
                role: selectedRole,
                interest,
                timestamp: new Date().toISOString()
            };

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

            try {
                // Import form handler
                const { submitForm } = await import('./formHandler.js');
                
                // Submit data
                const success = await submitForm(formData);
                
                if (success) {
                    // Show success message
                    form.style.display = 'none';
                    thankYouMessage.style.display = 'block';
                    thankYouPopup.style.display = 'block';
                    
                    // Reset form after delay
                    setTimeout(() => {
                        form.reset();
                        mentorQuestionContainer.style.display = 'none';
                        learnerQuestionContainer.style.display = 'none';
                        roleButtons.forEach(btn => btn.classList.remove('selected'));
                        form.style.display = 'none';
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Sign Up';
                    }, 3000);
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                console.error('Submission error:', error);
                alert('Failed to submit. Please try again.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Sign Up';
            }
        });
    };

    // Helper function for email validation
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Initialize all functionality
    initDarkMode();
    setupRoleSelection();
    handleFormSubmit();
});