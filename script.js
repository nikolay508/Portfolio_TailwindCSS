if (window.location.hash) {
  window.history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  history.replaceState("", document.title, window.location.pathname);
}

const sections = document.querySelectorAll(".section-hidden");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "-100px 0px",
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

(function() {
    emailjs.init(config.EMAILJS_PUBLIC_KEY);
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const form = event.target;
    
    const templateParams = {
        from_name: form.user_name.value,
        from_email: form.user_email.value,
        message: form.message.value,
        reply_to: form.user_email.value
    };

    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;

    emailjs.send(
        config.EMAILJS_SERVICE_ID,
        config.EMAILJS_TEMPLATE_ID,
        templateParams
    )
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            button.textContent = 'Message Sent!';
            form.reset();
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 3000);
        }, function(error) {
            console.log('FAILED...', error);
            button.textContent = 'Error Sending Message';
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 3000);
        });
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuLinks = mobileMenu.getElementsByTagName("a");

    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    Array.from(mobileMenuLinks).forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
        });
    });
});

// Navigation handling
document.addEventListener('click', (e) => {
    // Check if clicked element is a navigation link
    if (e.target.tagName === 'A' && e.target.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const path = e.target.getAttribute('href');
        const sectionId = path.substring(1); // Remove the leading slash
        const section = document.getElementById(sectionId);
        
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
});