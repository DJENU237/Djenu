document.addEventListener("DOMContentLoaded", () => {

  const scrollContainer = document.getElementById("scroll-container");
  const intro = document.getElementById("intro");
  const introText = document.querySelector(".intro-text");
  const header = document.getElementById("header");
  const backTop = document.getElementById("backTop");

  const panels = document.querySelectorAll(".panel");
  const texts = document.querySelectorAll(".text");
  const images = document.querySelectorAll(".image");
  const navLinks = document.querySelectorAll(".nav-link");
  const moreBtns = document.querySelectorAll(".more-btn");
  const contactTitle = document.querySelector(".contact-title");

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  let introFinished = false;

  /* ======================================================
     INTRO
  ====================================================== */
  window.addEventListener("load", () => {

    if (introText) {
      setTimeout(() => {
        introText.classList.add("intro-show");
      }, 300);
    }

    setTimeout(() => {

      introFinished = true;

      if (intro) {
        intro.classList.add("intro-hide");
        setTimeout(() => intro.style.display = "none", 800);
      }

      if (header) {
        header.style.opacity = "1";
      }

      // 🔥 ANDROID FIX HARD
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          forceFirstPanel();
          updateAnimations();
        });
      });

    }, 3000);
  });

  /* ======================================================
     FORCE FIRST PANEL (ANDROID)
  ====================================================== */
  function forceFirstPanel() {
    if (!panels.length) return;

    texts[0]?.classList.add("show");

    if (isMobile) {
      images[0]?.classList.remove("zoom"); // dézoom mobile
    } else {
      images[0]?.classList.add("zoom");    // zoom PC
    }

    navLinks[0]?.classList.add("active");
  }

  /* ======================================================
     ANIMATIONS
  ====================================================== */
  function updateAnimations() {
    if (!scrollContainer || !introFinished) return;

    const containerHeight = scrollContainer.clientHeight;

    panels.forEach((panel, index) => {
      const rect = panel.getBoundingClientRect();

      const visible =
        rect.top < containerHeight * 0.75 &&
        rect.bottom > containerHeight * 0.25;

      if (visible) {
        texts[index]?.classList.add("show");

        if (isMobile) {
          images[index]?.classList.remove("zoom");
        } else {
          images[index]?.classList.add("zoom");
        }

        navLinks[index]?.classList.add("active");
      } else {
        texts[index]?.classList.remove("show");
        images[index]?.classList.remove("zoom");
        navLinks[index]?.classList.remove("active");
      }
    });

    if (contactTitle) {
      const rect = contactTitle.getBoundingClientRect();
      if (rect.top < containerHeight * 0.8) {
        contactTitle.classList.add("show");
      }
    }
  }

  /* ======================================================
     SCROLL
  ====================================================== */
  if (scrollContainer) {
    scrollContainer.addEventListener("scroll", () => {

      const scrollTop = scrollContainer.scrollTop;

      if (backTop) {
        backTop.style.opacity = scrollTop > 300 ? "1" : "0";
        backTop.style.pointerEvents = scrollTop > 300 ? "auto" : "none";
        backTop.style.transform = scrollTop > 300 ? "translateY(0)" : "translateY(10px)";
      }

      updateAnimations();
    });
  }

  /* ======================================================
     NAV
  ====================================================== */
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const target = document.querySelector(link.getAttribute("href"));
      if (!target || !scrollContainer) return;scrollContainer.scrollTo({
        top: target.offsetTop,
        behavior: "smooth"
      });
    });
  });

  /* ======================================================
     MORE
  ====================================================== */
  moreBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const more = btn.previousElementSibling;
      if (!more) return;

      const open = more.classList.toggle("open");
      btn.textContent = open ? "Réduire" : "En savoir plus";
    });
  });

  /* ======================================================
     BACK TO TOP
  ====================================================== */
  if (backTop && scrollContainer) {
    backTop.addEventListener("click", () => {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

});
