// formhandler.js - Handles form submission to Google Sheets

// Wait for DOM to be fully loaded
// formhandler.js - Updated to properly handle role selection

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.notify-form');
    const thankYouPopup = document.querySelector('.thank-you-popup');
    const roleButtons = document.querySelectorAll('.role-btn');
    
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get current selected role
        const selectedButton = document.querySelector('.role-btn.selected');
        if (!selectedButton) {
            alert('Please select your role (Mentor or Learner)');
            return;
        }
        
        const role = selectedButton.dataset.role;
        const email = form.querySelector('input[type="email"]').value.trim();
        const interestField = role === 'mentor' ? 
            document.getElementById('mentorInterest') : 
            document.getElementById('learnerInterest');
        const interest = interestField ? interestField.value.trim() : '';
        
        // Validation (only email and interest)
        if (!email) {
            alert('Please enter your email');
            return;
        }
        
        if (!interest) {
            alert('Please tell us what you want to teach/learn');
            return;
        }
        
        try {
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbwI8WadRTxgoEEqcDgjHnor0vyIRKhjtzNK--BZ1_GzVEGPHUTNR1t-f_iin0tdWkiF/exec';
            
            const response = await fetch(scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    role: role,
                    interest: interest
                })
            });
            
            const data = await response.json();
            
            if (thankYouPopup) {
                thankYouPopup.style.display = 'block';
                form.reset();
                
                // Reset role selection
                roleButtons.forEach(btn => btn.classList.remove('selected'));
                
                setTimeout(() => {
                    thankYouPopup.style.display = 'none';
                }, 3000);
            }
            
        } catch (error) {
            console.error('Submission error:', error);
            alert('Submission failed. Please try again later.');
        }
    });
});