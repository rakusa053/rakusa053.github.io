document.addEventListener("DOMContentLoaded", () => {
  // Reveal animations on scroll
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  }, observerOptions);

  // Apply reveal classes to sections
  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 1s cubic-bezier(0.4, 0, 0.2, 1)";
    observer.observe(section);
  });

  // Custom Observer Handler for the inline visibility toggle
  const scrollHandler = () => {
    document.querySelectorAll("section").forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }
    });
  };

  window.addEventListener("scroll", scrollHandler);
  scrollHandler(); // Inital check

  // Smooth Scroll for Nav Links
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Mobile Menu Toggle (Simple placeholder)
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      // Add actual CSS for .nav-links.active if mobile menu is needed
    });
  }
});
