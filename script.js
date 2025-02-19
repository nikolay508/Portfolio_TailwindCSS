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
