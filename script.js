// script.js - Portfolio Interactivity

document.addEventListener('DOMContentLoaded', () => {
  // Form validation
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function (e) {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();  // ← subject जोडला
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill in all required fields.');
      e.preventDefault();
    } else if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      e.preventDefault();
    }
  });

  // Email format check
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
