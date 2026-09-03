const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const successMsg = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Basic validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in your name, email and message before sending.');
      return;
    }

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        successMsg.classList.add('show');
        submitBtn.textContent = 'Sent \u2713';
        submitBtn.style.background = '#2ecc71';
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      submitBtn.textContent = 'Send Message \u2192';
      submitBtn.disabled = false;
      alert('There was an issue sending your message. Please email us directly at info@rkconsulting.co.nz');
    }
  });
}
