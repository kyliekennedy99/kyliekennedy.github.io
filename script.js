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

/* ========= IMAGE MODAL GALLERY ========= */
const modal = document.getElementById("img-modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("modal-caption");
const closeBtn = document.querySelector(".modal .close");

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerText = img.getAttribute("data-caption") || img.alt;
  });
});

closeBtn.onclick = () => { modal.style.display = "none"; };
modal.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};
