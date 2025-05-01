document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.notify-form');
    const thankYouPopup = document.querySelector('.thank-you-popup');
    const roleButtons = document.querySelectorAll('.role-btn');
    
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // ===== NEW: Get submit button and save original text =====
        const submitBtn = form.querySelector('.final-signup-btn');
        const originalBtnText = submitBtn.textContent;
        
        try {
            // ===== NEW: Show loading state =====
            submitBtn.textContent = "Signing up...";
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Get current selected role
            const selectedButton = document.querySelector('.role-btn.selected');
            if (!selectedButton) {
                throw new Error('Please select your role (Mentor or Learner)');
            }
            
            const role = selectedButton.dataset.role;
            const email = form.querySelector('input[type="email"]').value.trim();
            const interestField = role === 'mentor' ? 
                document.getElementById('mentorInterest') : 
                document.getElementById('learnerInterest');
            const interest = interestField ? interestField.value.trim() : '';
            
            // Validation
            if (!email) throw new Error('Please enter your email');
            if (!interest) throw new Error('Please tell us what you want to teach/learn');
            
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
            alert(error.message); // ===== CHANGED: Now shows the specific error
        } finally {
            // ===== NEW: Always restore button state =====
            submitBtn.textContent = originalBtnText;
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
});