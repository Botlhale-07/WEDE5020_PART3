document.addEventListener('DOMContentLoaded', () => {
  console.log("Brews & Bytes JS Loaded Successfully!");

  /* ==========================================
     1. CONTACT FORM VALIDATION & MAILTO COMPILATION
     ========================================== */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      let isValid = true;
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value.trim();

      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const subjectError = document.getElementById('subjectError');
      const messageError = document.getElementById('messageError');
      const formSuccess = document.getElementById('formSuccess');

      // Reset errors
      document.querySelectorAll('.error-text').forEach(el => el.style.display = 'none');
      if (formSuccess) formSuccess.style.display = 'none';

      if (name === "") {
        nameError.innerText = "Please enter your full name.";
        nameError.style.display = 'block';
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === "" || !emailRegex.test(email)) {
        emailError.innerText = "Please enter a valid email address.";
        emailError.style.display = 'block';
        isValid = false;
      }

      if (!subject) {
        subjectError.innerText = "Please select a message subject.";
        subjectError.style.display = 'block';
        isValid = false;
      }

      if (message.length < 10) {
        messageError.innerText = "Message must be at least 10 characters long.";
        messageError.style.display = 'block';
        isValid = false;
      }

      if (isValid) {
        if (formSuccess) {
          formSuccess.innerText = "Validation successful! Opening Gmail...";
          formSuccess.style.display = 'block';
        }

        setTimeout(() => {
          // Construct the email body text
          const emailBody = "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message;
          
          // Explicitly open Gmail web compose in a new tab
          const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hello@brewbytes.co.za&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
          
          window.open(gmailUrl, '_blank');
        }, 1000);
      }
    });
  }

  /* ==========================================
     2. INTERACTIVE MENU FILTER TABS (DOM Manipulation)
     ========================================== */
  const filterTabs = document.querySelectorAll('.filter-tabs .tab');
  const menuCards = document.querySelectorAll('.menu-grid .menu-card');

  if (filterTabs.length > 0 && menuCards.length > 0) {
    filterTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        filterTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        const category = tab.textContent.trim().toLowerCase();

        menuCards.forEach((card, cardIndex) => {
          if (category === 'all items') {
            card.style.display = 'block';
          } else {
            // Match category header text with selected tab name
            const headerTitle = card.querySelector('.card-header h3').textContent.trim().toLowerCase();
            if (headerTitle === category) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }

  /* ==========================================
     3. INTERACTIVE FAQ ACCORDION ANIMATION
     ========================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    if (summary) {
      summary.addEventListener('click', (e) => {
        // Optional custom smooth toggle behavior if needed
        item.classList.toggle('open');
      });
    }
  });

});