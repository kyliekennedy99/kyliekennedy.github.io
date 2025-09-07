/* ========= THEME TOGGLE (safe across pages) ========= */
const themeBtn = document.getElementById("theme-toggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => document.body.classList.toggle("dark"));
}

/* ========= SCROLL-REVEAL ========= */
const revealObserver = new IntersectionObserver(
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
  revealObserver.observe(el);
});

/* ========= ANIMATE SKILL BARS WHEN IN VIEW ========= */
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
document.querySelectorAll(".bar").forEach((b) => barObserver.observe(b));

/* ========= IMAGE MODAL GALLERY ========= */
/* ========= IMAGE MODAL GALLERY (arrows + keys + swipe) ========= */
(() => {
  const modal = document.getElementById("img-modal");
  const modalImg = document.getElementById("modal-img");
  const captionText = document.getElementById("modal-caption");
  const closeBtn = document.querySelector(".modal .close");
  const prevBtn = document.querySelector(".modal .nav.prev");
  const nextBtn = document.querySelector(".modal .nav.next");
  const thumbs = Array.from(document.querySelectorAll(".gallery img"));

  if (!modal || !modalImg || !captionText || !closeBtn || !prevBtn || !nextBtn || thumbs.length === 0) return;

  let current = 0;

  const openAt = (i) => {
    current = (i + thumbs.length) % thumbs.length;
    const img = thumbs[current];
    modalImg.src = img.src;
    captionText.textContent = img.dataset.caption || img.alt || "";
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const closeModal = () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  };

  const go = (delta) => openAt(current + delta);

  // Click thumbs to open
  thumbs.forEach((img, i) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openAt(i));
  });

  // Controls
  prevBtn.addEventListener("click", (e) => { e.stopPropagation(); go(-1); });
  nextBtn.addEventListener("click", (e) => { e.stopPropagation(); go(1); });
  closeBtn.addEventListener("click", closeModal);

  // Backdrop click
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (modal.style.display !== "block") return;
    if (e.key === "Escape") closeModal();
    else if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  });

  // Basic swipe on modal
  let touchX = null;
  modal.addEventListener("touchstart", (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  modal.addEventListener("touchend", (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });
})();

/* ========= IMAGE MODAL GALLERY (scoped per section) ========= */
(() => {
  const modal = document.getElementById("img-modal");
  const modalImg = document.getElementById("modal-img");
  const captionText = document.getElementById("modal-caption");
  const closeBtn = document.querySelector(".modal .close");
  const prevBtn = document.querySelector(".modal .nav.prev");
  const nextBtn = document.querySelector(".modal .nav.next");

  if (!modal || !modalImg || !captionText || !closeBtn) return;

  let currentList = [];
  let current = 0;

  const openAt = (i) => {
    current = (i + currentList.length) % currentList.length;
    const img = currentList[current];
    modalImg.src = img.src;
    captionText.textContent = img.dataset.caption || img.alt || "";
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const closeModal = () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  };

  // Click to open — picks only images from the clicked gallery
  document.querySelectorAll(".gallery").forEach(gallery => {
    const imgs = Array.from(gallery.querySelectorAll("img"));
    imgs.forEach((img, i) => {
      img.addEventListener("click", () => { currentList = imgs; openAt(i); });
    });
  });

  const go = (d) => openAt(current + d);

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", (e) => { e.stopPropagation(); go(-1); });
    nextBtn.addEventListener("click", (e) => { e.stopPropagation(); go(1); });
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (modal.style.display !== "block") return;
    if (e.key === "Escape") closeModal();
    else if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  });
})();
