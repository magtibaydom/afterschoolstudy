/**
 * Handles form submissions to Google Sheets
 * @param {Object} formData - Contains email, role, interest, timestamp
 * @returns {Promise<boolean>} - True if successful
 */
export const submitForm = async (formData) => {
    try {
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx0LBuxNlUwrhtkM9thsWPxKcbzqTmcEShmTDv2XH9RG7Ph2yL0My6GyHRSdd7m3OaYoA/exec';
      
      // Create URL-encoded form data instead of JSON
      const formDataEncoded = new URLSearchParams();
      formDataEncoded.append('email', formData.email);
      formDataEncoded.append('role', formData.role);
      formDataEncoded.append('interest', formData.interest);
      formDataEncoded.append('timestamp', formData.timestamp);
  
      // Use traditional form submission
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?${formDataEncoded}`, {
        method: 'GET', // Using GET to avoid CORS
        redirect: 'follow'
      });
  
      // Check if request was successful
      if (response.ok || response.redirected) {
        return true;
      }
      return false;
      
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    }
  };
  
  // For non-module environments (if needed)
  // window.formHandler = { submitForm };