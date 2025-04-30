(() => {
    console.log("Dark mode script is running.");

    const darkModeToggle = document.getElementById('darkModeToggle');
    const roleButtons = document.querySelectorAll('.notify-btn');
    const form = document.querySelector('.notify-form');
    const mentorQuestionContainer = document.getElementById('mentorQuestionContainer');
    const learnerQuestionContainer = document.getElementById('learnerQuestionContainer');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const thankYouPopup = document.querySelector('.thank-you-popup');
    const finalSubmitButton = document.querySelector('.final-signup-btn');

    // Dark mode toggle logic
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        darkModeToggle.innerText = isDark ? '🌙 Light Mode' : '🌓 Dark Mode';
    });

    // Show relevant question when role is selected
    roleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const role = e.target.dataset.role;
            form.style.display = 'block';
            if (role === 'mentoring') {
                mentorQuestionContainer.style.display = 'block';
                learnerQuestionContainer.style.display = 'none';
            } else {
                learnerQuestionContainer.style.display = 'block';
                mentorQuestionContainer.style.display = 'none';
            }
        });
    });

// JavaScript to toggle the selected state of the buttons
document.querySelectorAll('.notify-btn').forEach(button => {
    button.addEventListener('click', function() {
      // Remove 'selected' from all buttons first
      document.querySelectorAll('.notify-btn').forEach(btn => btn.classList.remove('selected'));
  
      // Add 'selected' class to the clicked button
      this.classList.add('selected');
    });
  });
  
  
    // Handle form submission and write to Google Sheets
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = form.querySelector('input[type="email"]').value;
        const role = document.querySelector('.notify-btn.active').dataset.role;
        const interest = role === 'mentoring'
            ? document.getElementById('mentorInterest').value
            : document.getElementById('learnerInterest').value;

        // Google Apps Script Web App URL
        const googleAppsScriptUrl = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL'; // Replace with your URL

        const response = await fetch(googleAppsScriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                role: role,
                interest: interest,
            })
        });

        if (response.ok) {
            form.style.display = 'none';
            thankYouMessage.style.display = 'block';
            thankYouPopup.style.display = 'block';
        } else {
            console.error('Failed to submit form data to Google Sheets');
        }
    });
})();
