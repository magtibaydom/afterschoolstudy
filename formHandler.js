document.addEventListener('DOMContentLoaded', function() {
    const roleButtons = document.querySelectorAll('.role-btn');
    const notifyForm = document.querySelector('.notify-form');
    const mentorQuestionContainer = document.getElementById('mentorQuestionContainer');
    const learnerQuestionContainer = document.getElementById('learnerQuestionContainer');
    const mentorInterestTextarea = document.getElementById('mentorInterest');
    const learnerInterestTextarea = document.getElementById('learnerInterest');
    const emailInput = notifyForm.querySelector('input[type="email"]');
    const signupButton = notifyForm.querySelector('.final-signup-btn');
    let selectedRole = null;
  
    roleButtons.forEach(button => {
      button.addEventListener('click', function() {
        selectedRole = this.dataset.role;
        notifyForm.style.display = 'block';
        mentorQuestionContainer.style.display = selectedRole === 'mentor' ? 'block' : 'none';
        learnerQuestionContainer.style.display = selectedRole === 'learner' ? 'block' : 'none';
      });
    });
  
    notifyForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      if (!selectedRole) {
        alert('Please select a role before submitting.');
        return;
      }
  
      let interest = '';
      if (selectedRole === 'mentor') {
        interest = mentorInterestTextarea.value.trim();
      } else if (selectedRole === 'learner') {
        interest = learnerInterestTextarea.value.trim();
      }
      const email = emailInput.value.trim();
  
      if (!email) {
        alert('Please enter your email address.');
        return;
      }
  
      // Replace with your Google Apps Script Web App URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbym4j4o6CCz_m1gDvOiz6ylGEMaQ7HGJ4hoHbIeXbgYW7XYAAw0xcq9fOwy2GErCikxlg/exec';
  
      const formData = new FormData();
      formData.append('role', selectedRole);
      formData.append('interest', interest);
      formData.append('email', email);
  
      fetch(scriptURL, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.result === 'success') {
          notifyForm.reset();
          notifyForm.style.display = 'none';
          mentorQuestionContainer.style.display = 'none';
          learnerQuestionContainer.style.display = 'none';
          selectedRole = null;
        } else {
          alert('There was an error submitting your information. Please try again.');
          console.error('Error:', data);
        }
      })
      .catch(error => {
        alert('There was a network error. Please try again later.');
        console.error('Error!', error);
      });
    });

    notifyForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // ... (keep all your existing validation code)

        const signupButton = notifyForm.querySelector('.final-signup-btn');
        
        fetch(scriptURL, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // ... (keep your existing success/error handling)
        })
        .catch(error => {
            // ... (keep your existing error handling)
        })
        .finally(() => {
            // Clean up spinner
            if (signupButton) {
                signupButton.classList.remove('loading');
                signupButton.disabled = false;
            }
        });
    });
  });