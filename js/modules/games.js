/**
 * Games/Entertainment Module - Handles entertainment features and visual effects
 */

/**
 * Initialize retro grid effects in a specific section
 * @param {string} sectionId - The ID of the section to initialize
 */
export function initRetroGridsInSection(sectionId) {
  var RetroGrid = window.RetroGrid;
  if (!RetroGrid) {
    setTimeout(function() { initRetroGridsInSection(sectionId); }, 100);
    return;
  }
  
  var section = document.getElementById(sectionId);
  if (!section) return;
  
  var canvases = section.querySelectorAll('.retro-grid-canvas');
  canvases.forEach(function(canvas) {
    if (canvas.dataset.retroGridInitialized) return;
    
    var gridColor = canvas.dataset.gridColor || '#ff00ff';
    var showScanlines = canvas.dataset.showScanlines !== 'false';
    var glowEffect = canvas.dataset.glowEffect !== 'false';
    var gridId = canvas.dataset.gridId || 'single';
    var position = canvas.dataset.position || 'top';
    
    new RetroGrid(canvas, {
      gridColor: gridColor,
      showScanlines: showScanlines,
      glowEffect: glowEffect,
      gridId: gridId,
      position: position
    });
    
    canvas.dataset.retroGridInitialized = 'true';
  });
}

/**
 * Initialize scroll observer for reveal animations
 */
export function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -30px 0px" });

  document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
    observer.observe(el);
  });
}

/**
 * Validate external URL for security
 * @param {string} urlString - URL to validate
 * @returns {boolean} Whether URL is valid and trusted
 */
export function isValidExternalUrl(urlString) {
  try {
    if (!urlString || typeof urlString !== 'string') return false;

    const url = new URL(urlString);
    
    if (url.protocol !== 'https:') {
      console.warn("URL must use HTTPS:", urlString);
      return false;
    }

    const trustedDomains = [
      'google.com',
      'maps.google.com',
      'www.google.com',
      'cdnjs.cloudflare.com'
    ];

    const hostname = url.hostname;
    const isTrusted = trustedDomains.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );

    if (!isTrusted) {
      console.warn("URL domain not in whitelist:", hostname);
      return false;
    }

    return true;
  } catch (e) {
    console.warn("Invalid URL format:", urlString, e);
    return false;
  }
}

/**
 * Open external link with validation
 * @param {string} urlString - URL to open
 * @param {string} target - Target window (default '_blank')
 * @returns {boolean} Whether link was opened successfully
 */
export function openExternalLink(urlString, target = '_blank') {
  try {
    if (!isValidExternalUrl(urlString)) {
      console.error("Invalid or untrusted URL");
      alert("This link cannot be opened for security reasons");
      return false;
    }

    window.open(urlString, target);
    return true;
  } catch (e) {
    console.error("Error opening external link:", e);
    alert("Could not open the requested link");
    return false;
  }
}

/**
 * Initialize entertainment features on DOM ready
 */
export function initEntertainment() {
  // Games are initialized via onclick handlers in HTML
  // This function can be extended for additional entertainment features
  console.log("Entertainment module initialized");
}

/**
 * Load game embeds for the games section
 */
export function loadGameEmbeds() {
  // Game embeds are loaded via onclick to external URLs
  // This function can be extended for embedded game content
  console.log("Game embeds loaded");
}

// Make functions globally available
window.initRetroGridsInSection = initRetroGridsInSection;
window.initScrollObserver = initScrollObserver;
window.isValidExternalUrl = isValidExternalUrl;
window.openExternalLink = openExternalLink;
window.loadGameEmbeds = loadGameEmbeds;
window.initEntertainment = initEntertainment;