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
        darkModeToggle.innerText = isDark ? '🌙 Light Mode' : '🌓 Dark Mode';
    });

    // Show relevant question when role is selected
    roleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            selectedRole = e.target.dataset.role;
            form.style.display = 'block';

            // Toggle visibility of question areas
            if (selectedRole === 'mentoring') {
                mentorQuestionContainer.style.display = 'block';
                learnerQuestionContainer.style.display = 'none';
            } else {
                learnerQuestionContainer.style.display = 'block';
                mentorQuestionContainer.style.display = 'none';
            }

            // Highlight selected role
            roleButtons.forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
        });
    });

    // Handle form submission and write to Google Sheets
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = form.querySelector('input[type="email"]').value.trim();
        const mentorInput = document.getElementById('mentorInterest').value.trim();
        const learnerInput = document.getElementById('learnerInterest').value.trim();

        if (!selectedRole) {
            alert("Please select a role first.");
            return;
        }

        const interest = selectedRole === 'mentoring' ? mentorInput : learnerInput;

        if (!interest) {
            alert("Please fill out your interest.");
            return;
        }

        const timestamp = new Date().toISOString();

        const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbzaVRR1xsrgkDPCp9SRbXPrusqjGUKIYojyWICJaaPr0mOITRN39MdWAwntX1Pjngu6/exec';

        try {
            const response = await fetch(googleAppsScriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    role: selectedRole,
                    why: interest,
                    timestamp: timestamp
                })
            });

            if (response.ok) {
                form.style.display = 'none';
                thankYouMessage.style.display = 'block';
                thankYouPopup.style.display = 'block';
            } else {
                console.error('Failed to submit form data to Google Sheets');
                alert('Something went wrong while submitting. Try again!');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Submission failed. Check your internet or try again later.');
        }
    });
})();