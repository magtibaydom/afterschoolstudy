const form = document.querySelector('.notify-form');
const mentorBtn = document.querySelector('.for-mentors');
const learnerBtn = document.querySelector('.for-learners');

let selectedRole = "";

mentorBtn.addEventListener('click', () => {
  selectedRole = "mentor";
  form.style.display = 'block';
  document.getElementById('mentorQuestionContainer').style.display = 'block';
  document.getElementById('learnerQuestionContainer').style.display = 'none';
});

learnerBtn.addEventListener('click', () => {
  selectedRole = "learner";
  form.style.display = 'block';
  document.getElementById('mentorQuestionContainer').style.display = 'none';
  document.getElementById('learnerQuestionContainer').style.display = 'block';
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = form.querySelector('input[type="email"]').value.trim();
  const interest = selectedRole === "mentor"
    ? document.getElementById("mentorInterest").value.trim()
    : document.getElementById("learnerInterest").value.trim();

  const payload = {
    role: selectedRole,
    interest: interest,
    email: email
  };

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyJvhbvLD54s2irqPT2cAPrN6uZ2X1FsLLdyd8WWF2qncKc-lvoBFIzhNQZpMLtgidn/exec", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      }
    });

    const result = await response.json();
    if (result.success) {
      alert("✅ Signed up successfully!");
      form.reset();
      form.style.display = "none";
      document.getElementById('mentorQuestionContainer').style.display = 'none';
      document.getElementById('learnerQuestionContainer').style.display = 'none';
    } else {
      alert("⚠️ Something went wrong. Try again.");
    }
  } catch (err) {
    console.error("Submission error:", err);
    alert("❌ Submission failed. Check console.");
  }
});
