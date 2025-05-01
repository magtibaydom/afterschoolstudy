document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
  
    // Initialize Supabase client
    const supabaseUrl = 'https://tnrixzsbylxdykkfljcz.supabase.co'; // Replace with your Supabase URL
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRucml4enNieWx4ZHlra2ZsamN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDUzNjUsImV4cCI6MjA2MTY4MTM2NX0.FjJfFG4-Q6w7t_EzqnUDPrIUA-KrT9k7wIdDHY9SSyU'; // Replace with your Supabase Anon Key
    const supabase = createClient(supabaseUrl, supabaseKey);
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      loginError.style.display = 'none'; // Hide any previous error messages
  
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
  
        if (error) {
          console.error('Error signing in:', error);
          loginError.textContent = error.message;
          loginError.style.display = 'block';
        } else {
          console.log('Logged in:', data);
          // Redirect the user to the dashboard or another protected page
          window.location.href = '/dashboard';
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
        loginError.textContent = 'An unexpected error occurred. Please try again.';
        loginError.style.display = 'block';
      }
    });
  });