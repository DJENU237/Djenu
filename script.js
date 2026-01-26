document.addEventListener("DOMContentLoaded", () => {

  const scrollContainer = document.getElementById("scroll-container");
  const intro = document.getElementById("intro");
  const header = document.getElementById("header");
  const backTop = document.getElementById("backTop");

  const panels = document.querySelectorAll(".panel");
  const texts = document.querySelectorAll(".text");
  const images = document.querySelectorAll(".image");
  const navLinks = document.querySelectorAll(".nav-link");
  const moreBtns = document.querySelectorAll(".more-btn");
  const contactTitle = document.querySelector(".contact-title");

 /* ======================================================
   INTRO
====================================================== */
window.addEventListener("load", function () {
  var intro = document.getElementById("intro");
  var introText = document.querySelector(".intro-text");
  var header = document.getElementById("header");

  if (introText) {
    setTimeout(function () {
      introText.classList.add("intro-show");
    }, 300);
  }

  setTimeout(function () {
    if (intro) {
      intro.classList.add("intro-hide");

      setTimeout(() => {
        intro.style.display = "none";
      }, 800);
    }

    if (header) {
      header.style.opacity = "1";
    }

    /* 🔥 FORCE LE RAFRAÎCHISSEMENT DES OBSERVERS */
    setTimeout(() => {
      document.querySelectorAll(".text").forEach(el => {
        el.classList.add("show");
      });

      document.querySelectorAll(".contact-title").forEach(el => {
        el.classList.add("show");
      });
    }, 300);

  }, 3000);
});

  /* ================= SCROLL EVENTS ================= */
  if (scrollContainer) {
    scrollContainer.addEventListener("scroll", () => {
      const scrollTop = scrollContainer.scrollTop;
      const containerHeight = scrollContainer.clientHeight;

      /* ===== BACK TO TOP ===== */
      if (backTop) {
        if (scrollTop > 300) {
          backTop.style.opacity = "1";
          backTop.style.pointerEvents = "auto";
          backTop.style.transform = "translateY(0)";
        } else {
          backTop.style.opacity = "0";
          backTop.style.pointerEvents = "none";
          backTop.style.transform = "translateY(10px)";
        }
      }

      /* ===== PANELS ANIMATION ===== */
      panels.forEach((panel, index) => {
        const rect = panel.getBoundingClientRect();

        if (rect.top < containerHeight * 0.65 && rect.bottom > 0) {
          texts[index]?.classList.add("show");
          images[index]?.classList.add("zoom");
          navLinks[index]?.classList.add("active");
        } else {
          texts[index]?.classList.remove("show");
          images[index]?.classList.remove("zoom");
          navLinks[index]?.classList.remove("active");
        }
      });

      /* ===== CONTACT TITLE ===== */
      if (contactTitle) {
        const rect = contactTitle.getBoundingClientRect();
        if (rect.top < containerHeight * 0.8) {
          contactTitle.classList.add("show");
        }
      }
    });
  }

  /* ================= NAVIGATION CLICK ================= */
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target && scrollContainer) {
        scrollContainer.scrollTo({
          top: target.offsetTop,
          behavior: "smooth"
        });
      }
    });
  });

  /* ================= MORE BUTTON ================= */
  moreBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const more = btn.previousElementSibling;

      if (more.classList.contains("open")) {
        more.classList.remove("open");
        btn.textContent = "En savoir plus";
      } else {
        more.classList.add("open");
        btn.textContent = "Réduire";
      }
    });
  });

  /* ================= BACK TO TOP CLICK ================= */
  if (backTop && scrollContainer) {
    backTop.addEventListener("click", () => {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

});
