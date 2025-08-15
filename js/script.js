const navLinks = document.querySelectorAll('header nav a')
const logoLink = document.querySelector('.logo')
const sections = document.querySelectorAll('section')
const menuIcon = document.querySelector('#menu-icon')
const navBar = document.querySelector('header nav')

menuIcon.addEventListener('click', ()=>{
  menuIcon.classList.toggle('bx-x');
  navBar.classList.toggle('active');
});
const activePage = ()=>{
    const header = document.querySelector('header');
    const barsBox= document.querySelector('.bars-box');

    header.classList.remove('active');
    setTimeout(()=>{
        header.classList.add('active');
    }, 200);

    navLinks.forEach(link=>{
        link.classList.remove('active');
    });
    barsBox.classList.remove('active');
    setTimeout(()=>{
        barsBox.classList.add('active');
    }, 200);

    sections.forEach(section=>{
      section.classList.remove('active');
  });
}
navLinks.forEach((link,idx)=>{
    link.addEventListener('click', ()=>{
        if(!link.classList.contains('active')){
            activePage();
            link.classList.add('active');

            setTimeout(()=>{
                sections[idx].classList.add('active');
            }, 200);
        }
        
        // Close mobile menu when link is clicked
        if(navBar.classList.contains('active')) {
            menuIcon.classList.remove('bx-x');
            navBar.classList.remove('active');
        }
    });
});

logoLink.addEventListener('click', ()=>{
    if(!navLinks[0].classList.contains('active'))
    {
        activePage();
        navLinks[0].classList.add('active');

        setTimeout(()=>{
          sections[0].classList.add('active');
      }, 200);
    }
});


const resumeBtns = document.querySelectorAll(".resume-btn");

resumeBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    const resumeDetails = document.querySelectorAll(".resume-detail");
    resumeBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");

    resumeDetails.forEach((datail) => {
      datail.classList.remove("active");
    });
    resumeDetails[idx].classList.add("active");
  });
});

const arrowRight = document.querySelector(
  ".portfolio-box .navigation .arrow-right"
);
const arrowLeft = document.querySelector(
  ".portfolio-box .navigation .arrow-left"
);

let index = 0;

const activePortfolio = () => {
  const imgSlide = document.querySelector(".portfolio-carousel .img-slide");
  const portfolioDetails = document.querySelectorAll('.portfolio-detail');
  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${
    index * 2
  }rem))`;

  portfolioDetails.forEach((detail) => {
    detail.classList.remove("active");
  });
  portfolioDetails[index].classList.add("active");
};

arrowRight.addEventListener("click", () => {
  if (index < 2) {
    index++;
    arrowLeft.classList.remove("disabled");
  } else {
    index = 3;
    arrowRight.classList.add("disabled");
  }
  activePortfolio();
});

arrowLeft.addEventListener("click", () => {
  if (index > 1) {
    index--;
    arrowRight.classList.remove("disabled");
  } else {
    index = 0;
    arrowLeft.classList.add("disabled");
  }
  activePortfolio();
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navBar.contains(e.target) && !menuIcon.contains(e.target) && navBar.classList.contains('active')) {
        menuIcon.classList.remove('bx-x');
        navBar.classList.remove('active');
    }
});

// Improve mobile navigation accessibility
navLinks.forEach(link => {
    link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            link.click();
        }
    });
});

// EmailJS Configuration and Contact Form Functionality
(function() {
    // Initialize EmailJS with your public key
    emailjs.init("mfKSEf702Od2rZacg"); // Replace with your actual public key
})();

// Contact form handler
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Clear previous status
        formStatus.textContent = '';
        formStatus.className = '';
        
        // Get form data
        const formData = new FormData(contactForm);
        const templateParams = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
            to_name: 'Vasantha Kumari' // Your name
        };
        
        // Send email using EmailJS
        emailjs.send('service_47kbhof', 'template_19pcnad', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showFormStatus('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                showFormStatus('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
            })
            .finally(function() {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            });
    });
}

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = type;
    
    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = '';
        }, 5000);
    }
}
