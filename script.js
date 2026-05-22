const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const surpriseButton = document.querySelector(".surprise-button");
const surpriseMessage = document.querySelector("#surpriseMessage");
const animatedItems = document.querySelectorAll(".fade-in");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      document.body.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (surpriseButton && surpriseMessage) {
  surpriseButton.addEventListener("click", () => {
    const isHidden = surpriseMessage.hasAttribute("hidden");

    if (isHidden) {
      surpriseMessage.removeAttribute("hidden");
      surpriseMessage.classList.add("is-visible");
      surpriseButton.textContent = "Hide message";
      surpriseMessage.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      surpriseMessage.setAttribute("hidden", "");
      surpriseMessage.classList.remove("is-visible");
      surpriseButton.textContent = "Reveal message";
    }
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16
    }
  );

  animatedItems.forEach((item) => observer.observe(item));
} else {
  animatedItems.forEach((item) => item.classList.add("visible"));
}
