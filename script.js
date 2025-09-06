/* ========= DARK-MODE TOGGLE ========= */
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.onclick = () => document.body.classList.toggle("dark");

/* ========= SCROLL-REVEAL ========= */
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".timeline li, .glass, .skill-set").forEach((el) => {
  observer.observe(el);
});

/* ========= ANIMATE SKILL BARS WHEN IN VIEW ========= */
const bars = document.querySelectorAll(".bar");
const barObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("reveal");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.4 }
);
bars.forEach((b) => barObserver.observe(b));
