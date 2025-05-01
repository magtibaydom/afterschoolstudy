(() => {
    console.log("Dark mode script is running.");

    const darkModeToggle = document.getElementById('darkModeToggle');
    const roleButtons = document.querySelectorAll('.role-btn');
    const form = document.querySelector('.notify-form');
    const mentorQuestionContainer = document.getElementById('mentorQuestionContainer');
    const learnerQuestionContainer = document.getElementById('learnerQuestionContainer');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const thankYouPopup = document.querySelector('.thank-you-popup');

    let selectedRole = null;

    // Dark mode toggle logic
    darkModeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        darkModeToggle.innerText = isDark ? '☀️ Light Mode' : '🌑 Dark Mode';
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

})();