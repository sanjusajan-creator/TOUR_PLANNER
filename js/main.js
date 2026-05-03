/**
 * Main Entry Point - Imports all modules and initializes the application
 */

// Import all modules (they self-register global functions)
import * as Navigation from './modules/navigation.js';
import * as Tracking from './modules/tracking.js';
import * as PDF from './modules/pdf.js';
import * as Games from './modules/games.js';
import * as Packing from './modules/packing.js';

// Application state
let currentDay = 0;

// Expose currentDay globally for navigation module
window.currentDay = currentDay;

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', () => {
  console.log('Tour Planner: Initializing...');
  
  // Rescue sections that might be in wrong DOM location
  const sectionsToRescue = ["pdfSection", "ticketModal", "homeToast", "aadhar-section", "entertainment-page"];
  const scriptTag = document.querySelector("body > script");
  sectionsToRescue.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.parentElement !== document.body) {
      console.log("[DOM Rescue] Moving #" + id + " to body root");
      document.body.insertBefore(el, scriptTag);
    }
  });

  // Setup ticket modal close handler
  const ticketModalEl = document.getElementById("ticketModal");
  if (ticketModalEl) {
    ticketModalEl.addEventListener("hidden.bs.modal", () => {
      window.isPdfUnlocked = false;
      PDF.updatePdfDownloadButton(false);
    });
  }

  // Setup click handlers for navigation/actions
  setupEventDelegation();

  // Initialize navigation - go to home
  Navigation.goHome(true);

  // Initialize scroll observers for animations
  initScrollAnimations();
  
  // Initialize Marudhar tracker if present
  initMarudharTracker();
  
  // Initialize Sainik tracker if present
  initSainikTracker();
  
  // Setup keyboard navigation
  setupKeyboardNavigation();
  
  // Setup window resize handler
  setupResizeHandler();
  
  console.log('Tour Planner: Initialization complete');
});

/**
 * @description Setup event delegation for data-action elements to replace inline onclick handlers
 * @returns {void}
 */
function setupEventDelegation() {
  // Navigation links
  document.querySelectorAll('[data-action="go-home"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      Navigation.goHome();
    });
  });

  document.querySelectorAll('[data-action="show-pdfs"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      Navigation.showPDFs();
    });
  });

  document.querySelectorAll('[data-action="show-aadhar"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      Navigation.showAadhar();
    });
  });

  document.querySelectorAll('[data-action="show-entertainment"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      Navigation.showEntertainment();
    });
  });

  document.querySelectorAll('[data-action="show-packing"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      Navigation.showPacking();
    });
  });

  // Prev/Next day buttons
  document.querySelectorAll('[data-action="prev-day"]').forEach(el => {
    el.addEventListener('click', () => Navigation.prevDay());
  });

  document.querySelectorAll('[data-action="next-day"]').forEach(el => {
    el.addEventListener('click', () => Navigation.nextDay());
  });

  // Day dropdown items
  document.querySelectorAll('[data-action="show-day"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const dayId = el.getAttribute('data-day');
      if (dayId) Navigation.showDay(dayId);
    });
  });

  // Tracking section
  document.querySelectorAll('[data-action="set-today"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      Tracking.setToday();
    });
  });

  document.querySelectorAll('[data-action="sync-live"]').forEach(el => {
    el.addEventListener('click', () => Tracking.syncLive());
  });

  // Marudhar tracking
  document.querySelectorAll('[data-action="set-marudhar-today"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      Tracking.setMarudharToday();
    });
  });

  document.querySelectorAll('[data-action="update-marudhar"]').forEach(el => {
    el.addEventListener('click', () => Tracking.updateMarudharTracker());
  });

  // Sainik tracking
  document.querySelectorAll('[data-action="set-sainik-today"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      Tracking.setSainikToday();
    });
  });

  document.querySelectorAll('[data-action="update-sainik"]').forEach(el => {
    el.addEventListener('click', () => Tracking.updateSainikTracker());
  });

  // PDF viewing
  document.querySelectorAll('[data-action="view-pdf"]').forEach(el => {
    el.addEventListener('click', (e) => {
      const file = el.getAttribute('data-file');
      if (file) PDF.viewPDF(file);
    });
  });

  // PDF password submit
  document.querySelectorAll('[data-action="submit-pdf-password"]').forEach(el => {
    el.addEventListener('click', () => PDF.submitPdfPassword());
  });

  // PDF download
  document.querySelectorAll('[data-action="download-pdf"]').forEach(el => {
    el.addEventListener('click', () => PDF.downloadCurrentPDF());
  });

  console.log('Event delegation setup complete');
}

/**
 * Initialize scroll-based reveal animations
 */
function initScrollAnimations() {
  try {
    const selectors = ".card, .carousel, .bg-dark.rounded-5, h2, .location-wrapper";
    const elementsToAnimate = document.querySelectorAll(selectors);

    elementsToAnimate.forEach((el) => {
      el.classList.add("reveal-on-scroll");
    });

    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(
            () => {
              entry.target.classList.add("is-visible");
            },
            (index % 3) * 150,
          );

          scrollObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elementsToAnimate.forEach((el) => scrollObserver.observe(el));

    // Setup carousel animations
    const carouselItems = document.querySelectorAll(".carousel-item img");
    carouselItems.forEach((img) => {
      img.style.transition = "transform 8s ease";
    });

    document.querySelectorAll(".carousel").forEach((carouselEl) => {
      try {
        let carousel = bootstrap.Carousel.getInstance(carouselEl);
        if (!carousel) {
          carousel = new bootstrap.Carousel(carouselEl, {
            interval: 5000,
            wrap: true
          });
        }

        carouselEl.addEventListener("slid.bs.carousel", function () {
          const activeImg = this.querySelector(".carousel-item.active img");
          if (activeImg) activeImg.style.transform = "scale(1.1)";
        });
      } catch (e) {
        console.warn("Error initializing carousel:", e);
      }
    });

    // Setup blurred background for carousel items
    document.querySelectorAll(".carousel-item").forEach((item) => {
      const img = item.querySelector("img");
      if (img) {
        item.classList.add("blurred-bg-wrapper");
        item.style.setProperty("--blur-bg-img", `url('${img.src}')`);
      }
    });
  } catch (e) {
    console.error("Error in scroll animation initialization:", e);
  }
}

/**
 * Re-initialize scroll animations after view changes
 * Call this function after navigating between views (home -> day -> PDF -> home)
 */
function reinitScrollAnimations() {
  try {
    const selectors = ".card, .carousel, .bg-dark.rounded-5, h2, .location-wrapper";
    const elementsToAnimate = document.querySelectorAll(selectors);

    // Reset is-visible class to allow re-animation on scroll
    elementsToAnimate.forEach((el) => {
      el.classList.add("reveal-on-scroll");
      el.classList.remove("is-visible");
    });

    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    // Create new observer for re-initialization
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(
            () => {
              entry.target.classList.add("is-visible");
            },
            (index % 3) * 150,
          );

          scrollObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elementsToAnimate.forEach((el) => scrollObserver.observe(el));

    // Re-trigger reveal animations with staggered delays
    setTimeout(() => {
      document.querySelectorAll(".reveal-on-scroll").forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("is-visible");
        }, index * 50);
      });
    }, 100);

    console.log("Scroll animations re-initialized");
  } catch (e) {
    console.error("Error in reinitScrollAnimations:", e);
  }
}

/**
 * Initialize Marudhar tracker
 */
function initMarudharTracker() {
  const input = document.getElementById("marudhar-date");
  if (input) input.value = Tracking.getSmartInitialDate();

  if (typeof Tracking.initMarudharTrack === "function") Tracking.initMarudharTrack();
  Tracking.updateMarudharTracker();
  
  // Listen for date changes
  const marudharInput = document.getElementById("marudhar-date");
  if (marudharInput) {
    marudharInput.addEventListener("change", () => Tracking.updateMarudharTracker());
  }
}

/**
 * Initialize Sainik tracker
 */
function initSainikTracker() {
  const sainikInput = document.getElementById("sainik-date");
  if (sainikInput) {
    sainikInput.value = Tracking.getSainikSmartInitialDate();
  }
  if (typeof Tracking.initSainikTrack === "function") Tracking.initSainikTrack();
  Tracking.updateSainikTracker();
  
  // Listen for date changes
  const sainikDateInput = document.getElementById("sainik-date");
  if (sainikDateInput) {
    sainikDateInput.addEventListener("change", () => Tracking.updateSainikTracker());
  }
}

/**
 * Setup keyboard navigation
 */
function setupKeyboardNavigation() {
  document.addEventListener("keydown", function (event) {
    const target = event.target;
    const isTypingField =
      target &&
      (target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable);

    if (isTypingField) {
      return;
    }

    const ascii = event.key.charCodeAt(0);
    const key = event.key.toLowerCase();
    const key2 = event.key;

    // Handle ? key to show keyboard shortcuts help modal
    if (key === "?") {
      event.preventDefault();
      showKeyboardShortcuts();
      return;
    }

    if (event.ctrlKey && event.key === "1") {
      event.preventDefault();
      Navigation.showDay("day10");
    }

    else if (!event.ctrlKey && ascii >= 48 && ascii <= 57) {
      const dayId = "day" + event.key;
      Navigation.showDay(dayId);
    } else if (key === "h") {
        Navigation.goHome();
      } else if (key === "t") {
        Navigation.showPDFs();
      } else if (key === "a") {
        Navigation.showAadhar();
      } else if (key === "e") {
        Navigation.showEntertainment();
      } else if (key === "p") {
        Navigation.showPacking();
      } else if (key2 === "ArrowRight") {
      Navigation.nextDay();
    } else if (key2 === "ArrowLeft") {
      Navigation.prevDay();
    }
  });
}

/**
 * Show keyboard shortcuts help modal
 */
function showKeyboardShortcuts() {
  const modal = document.getElementById("keyboard-help-modal");
  if (!modal) return;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  // Setup close handlers
  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  };

  // Remove any existing handlers to avoid duplicates
  const backdrop = modal.querySelector(".keyboard-modal-backdrop");
  const closeBtn = modal.querySelector(".keyboard-modal-close");
  const closeHandler = (e) => {
    if (e.type === "keydown" && e.key !== "Escape") return;
    closeModal();
    document.removeEventListener("keydown", closeHandler);
  };

  // Add click handlers
  if (backdrop) {
    backdrop.onclick = closeModal;
  }
  if (closeBtn) {
    closeBtn.onclick = closeModal;
  }

  // Add escape key handler
  document.addEventListener("keydown", closeHandler);
}

/**
 * Setup window resize handler
 */
function setupResizeHandler() {
  window.addEventListener("resize", () => {
    const day4 = document.getElementById("day4");
    if (day4 && day4.style.display === "block") {
      Tracking.initMarudharTrack();
      Tracking.updateMarudharTracker();
    }
  });
}

// Window load - initialize main tracker
window.onload = () => {
  Tracking.initMarkers();
  Tracking.setInitialDate();
  Tracking.updateTracker();
  setInterval(Tracking.updateTracker, 60000);
};

// Scroll reveal handler
window.addEventListener("scroll", Navigation.reveal);
Navigation.reveal();

// Make isPdfUnlocked globally accessible
window.isPdfUnlocked = false;

// Make reinitScrollAnimations globally accessible for navigation module
window.reinitScrollAnimations = reinitScrollAnimations;

console.log('Main.js loaded - ES6 modules initialized');
