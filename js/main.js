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
   02. STACKING PAGES + ACTIVE NAV + ANCHOR SCROLL
   Replaces the old IntersectionObserver
   active-link code.
===================================== */

const header = document.querySelector(".site-header");
const stackMain = document.querySelector("main");
const stackSections = [...document.querySelectorAll("main > section[id]")];
const navItems = document.querySelectorAll(".nav-links a");

let starts = [];   // where each page begins in normal page flow

function measureStack() {

  const headerHeight = header.offsetHeight;
  const viewportHeight = window.innerHeight;

  // lets the CSS size each page to (screen - header)
  document.documentElement.style.setProperty("--hh", headerHeight + "px");

  // start position of every page in normal flow
  let y = stackMain.getBoundingClientRect().top + window.scrollY;

  starts = stackSections.map(section => {
    const start = y;
    y += section.offsetHeight;
    return start;
  });

  // Short page: pin just under the header.
  // Tall page: pin once its bottom edge reaches the bottom of the screen,
  // so all of its content can still be scrolled through.
  stackSections.forEach(section => {
    section.style.top =
      Math.min(headerHeight, viewportHeight - section.offsetHeight) + "px";
  });

}

function updateActiveLink() {

  const viewportHeight = window.innerHeight;
  let current = 0;

  starts.forEach((start, index) => {
    if (start - window.scrollY <= viewportHeight * 0.5) {
      current = index;
    }
  });

  const atBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 4;

  if (atBottom) {
    current = stackSections.length - 1;
  }

  const currentId = stackSections[current].id;

  navItems.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentId}`
    );
  });

}

// How much of each page is covered by the next one (0 to 1).
// CSS uses this value to shrink and dim the page underneath.

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateCover() {

  if (reduceMotion) return;

  const viewportHeight = window.innerHeight;
  const headerHeight = header.offsetHeight;

  stackSections.forEach((section, index) => {

    const next = stackSections[index + 1];

    if (!next) return;

    const nextTop = next.getBoundingClientRect().top;

    const progress = Math.min(
      1,
      Math.max(0, (viewportHeight - nextTop) / (viewportHeight - headerHeight))
    );

    section.style.setProperty("--cover", progress.toFixed(3));

  });

}

// Anchor links: scroll to each page's real starting point
// (not to where the page is currently pinned).

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", event => {

    const id = link.getAttribute("href").slice(1);
    const index = stackSections.findIndex(section => section.id === id);

    if (index === -1) return;

    event.preventDefault();

    window.scrollTo({
      top: Math.max(0, starts[index] - header.offsetHeight),
      behavior: "smooth"
    });

  });

});

function refreshStack() {
  measureStack();
  updateActiveLink();
  updateCover();
}

window.addEventListener(
  "scroll",
  () => {
    updateActiveLink();
    updateCover();
  },
  { passive: true }
);

window.addEventListener("resize", refreshStack);
window.addEventListener("load", refreshStack);

// re-measure whenever images, fonts or content change the page height
new ResizeObserver(refreshStack).observe(stackMain);

refreshStack();


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
   (needs a .cursor-glow style in style.css to be visible)
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
