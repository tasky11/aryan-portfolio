
// /* =====================================
//    01. MOBILE NAVIGATION
// ===================================== */

// const menuToggle = document.querySelector(".menu-toggle");
// const navLinks = document.querySelector(".nav-links");

// if (menuToggle && navLinks) {

//   menuToggle.addEventListener("click", () => {

//     const isOpen = navLinks.classList.toggle("open");

//     menuToggle.setAttribute(
//       "aria-expanded",
//       isOpen
//     );

//     menuToggle.textContent = isOpen ? "✕" : "☰";

//   });


//   // Close menu after clicking a navigation link

//   navLinks.querySelectorAll("a").forEach(link => {

//     link.addEventListener("click", () => {

//       navLinks.classList.remove("open");

//       menuToggle.setAttribute(
//         "aria-expanded",
//         "false"
//       );

//       menuToggle.textContent = "☰";

//     });

//   });

// }


// /* =====================================
//    02. ACTIVE NAVIGATION
// ===================================== */

// const sections = document.querySelectorAll("main section[id]");
// const navItems = document.querySelectorAll(".nav-links a");

// const sectionObserver = new IntersectionObserver(
//   (entries) => {

//     entries.forEach(entry => {

//       if (entry.isIntersecting) {

//         const currentId = entry.target.id;

//         navItems.forEach(link => {

//           link.classList.toggle(
//             "active",
//             link.getAttribute("href") === `#${currentId}`
//           );

//         });

//       }

//     });

//   },
//   {
//     rootMargin: "-25% 0px -65% 0px"
//   }
// );

// sections.forEach(section => {
//   sectionObserver.observe(section);
// });


// /* =====================================
//    03. SCROLL REVEAL ANIMATION
// ===================================== */

// const revealElements = document.querySelectorAll(".reveal");

// const revealObserver = new IntersectionObserver(
//   (entries, observer) => {

//     entries.forEach(entry => {

//       if (entry.isIntersecting) {

//         entry.target.classList.add("visible");

//         observer.unobserve(entry.target);

//       }

//     });

//   },
//   {
//     threshold: 0.12
//   }
// );

// revealElements.forEach(element => {
//   revealObserver.observe(element);
// });


// /* =====================================
//    04. AUTOMATIC FOOTER YEAR
// ===================================== */

// const yearElement = document.getElementById("year");

// if (yearElement) {
//   yearElement.textContent = new Date().getFullYear();
// }


// /* =====================================
//    05. CONTACT FORM
// ===================================== */

// const contactForm = document.getElementById("contact-form");
// const formMessage = document.getElementById("form-message");

// if (contactForm) {

//   contactForm.addEventListener("submit", function(event) {

//     event.preventDefault();

//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const subject = document.getElementById("subject").value.trim();
//     const message = document.getElementById("message").value.trim();

//     if (!name || !email || !subject || !message) {

//       formMessage.textContent = "Please fill in all fields.";
//       return;

//     }

//     const emailSubject = encodeURIComponent(subject);

//     const emailBody = encodeURIComponent(
//       `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
//     );

//     const mailtoLink =
//       `mailto:aryan.gond11@gmail.com?subject=${emailSubject}&body=${emailBody}`;

//     formMessage.textContent =
//       "Opening your email application...";

//     window.location.href = mailtoLink;

//   });

// }

/* =====================================
   ARYAN GOND — PORTFOLIO JAVASCRIPT
===================================== */


/* =====================================
   01. MOBILE NAVIGATION
===================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";

  });

  // Close menu after clicking a navigation link

  navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";

    });

  });

  // Close menu when clicking outside

  document.addEventListener("click", event => {

    if (
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {

      navLinks.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";

    }

  });

}


/* =====================================
   02. ACTIVE NAVIGATION
===================================== */

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(

  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const currentId = entry.target.id;

        navItems.forEach(link => {

          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentId}`
          );

        });

      }

    });

  },

  {
    rootMargin: "-25% 0px -65% 0px"
  }

);

sections.forEach(section => {
  sectionObserver.observe(section);
});


/* =====================================
   03. SCROLL REVEAL ANIMATION
===================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

  (entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.12
  }

);

revealElements.forEach((element, index) => {

  element.style.transitionDelay = `${(index % 3) * 100}ms`;

  revealObserver.observe(element);

});


/* =====================================
   04. AUTOMATIC FOOTER YEAR
===================================== */

const yearElement = document.getElementById("year");

if (yearElement) {

  yearElement.textContent = new Date().getFullYear();

}


/* =====================================
   05. CONTACT FORM
===================================== */

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm && formMessage) {

  contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Check empty fields

    if (!name || !email || !subject || !message) {

      formMessage.textContent = "Please fill in all fields.";
      return;

    }

    // Validate email

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

      formMessage.textContent = "Please enter a valid email address.";
      return;

    }

    // Prepare email

    const emailSubject = encodeURIComponent(subject);

    const emailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    const mailtoLink =
      `mailto:aryan.gond11@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    formMessage.textContent =
      "Opening your email application...";

    window.location.href = mailtoLink;

  });

}


/* =====================================
   06. CURSOR FOLLOWING GLOW
   Desktop Only
===================================== */

const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (isDesktop) {

  const glow = document.createElement("div");

  glow.className = "cursor-glow";

  document.body.appendChild(glow);

  document.addEventListener("mousemove", event => {

    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;

  });

}
