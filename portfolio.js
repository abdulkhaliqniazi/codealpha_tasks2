let menuicon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
  section.forEach((sec) => {
    let top = window.scrolly;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove('active');
        document
          .querySelector('header nav a [href*=' + id + ']')
          .classList.add('active');
      });
    }
  });
};
menuicon.onclick = () => (
  menuicon.classList.toggle('bx-x'),
  navbar.classList.toggle('active')
);

const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append('access_key', '992dbc48-4a32-490c-9fd6-1a6f04a139aa');

  const originalText = submitBtn.textContent;

  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert('Success! Your message has been sent.');
      form.reset();
    } else {
      alert('Error: ' + data.message);
    }
  } catch (error) {
    alert('Something went wrong. Please try again.');
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});
