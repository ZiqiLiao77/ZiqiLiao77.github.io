const navLinks = Array.from(document.querySelectorAll(".main-nav a"));
const sections = navLinks
  .map((link) => {
    const href = link.getAttribute("href");
    return href === "#home" ? null : document.querySelector(href);
  })
  .filter(Boolean);

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      setActiveLink(visible.target.id);
    }
  },
  {
    rootMargin: "-20% 0px -55% 0px",
    threshold: [0.18, 0.35, 0.55],
  }
);

sections.forEach((section) => observer.observe(section));

window.addEventListener("scroll", () => {
  if (window.scrollY < 40) {
    setActiveLink("home");
  }
});

setActiveLink("home");
document.getElementById("year").textContent = new Date().getFullYear();
