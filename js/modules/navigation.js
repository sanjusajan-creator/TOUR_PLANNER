/**
 * Navigation Module - Handles page navigation, day switching, and UI state management
 */

import {
  getSmartInitialDate,
  getSainikSmartInitialDate,
  initMarudharTrack,
  updateMarudharTracker,
  updateTracker,
  initSainikTrack,
  updateSainikTracker
} from './tracking.js';
import { initRetroGridsInSection } from './games.js';

/**
 * Clean up Bootstrap carousels before hiding sections to prevent memory leaks
 */
export function cleanupCarousels() {
  try {
    document.querySelectorAll('.carousel').forEach((carousel) => {
      try {
        const bsCarousel = bootstrap.Carousel.getInstance(carousel);
        if (bsCarousel && typeof bsCarousel.dispose === 'function') {
          bsCarousel.dispose();
        }
      } catch(e) {}
    });
  } catch (e) {
    console.error('Error cleaning up carousels:', e);
  }
}

/**
 * Hide all main sections and reset UI state
 */
export function hideAll() {
  try {
    cleanupCarousels();
  } catch(e) {}

  try {
    const firstPage = document.querySelector('.first_page');
    if (firstPage) {
      firstPage.style.display = 'none';
      firstPage.classList.remove('page-active');
    }
  } catch(e) {}

  try {
    const pdfs = document.getElementById('pdfSection');
    if (pdfs) pdfs.style.display = 'none';
  } catch(e) {}

  try {
    const aadhar = document.getElementById('aadhar-section');
    if (aadhar) aadhar.style.display = 'none';
  } catch(e) {}

  try {
    const entertainment = document.getElementById('entertainment-page');
    if (entertainment) entertainment.style.display = 'none';
  } catch(e) {}

  try {
    const packing = document.getElementById('packing-section');
    if (packing) packing.style.display = 'none';
  } catch(e) {}

  try {
    document.querySelectorAll('[id^=day]').forEach((d) => {
      d.style.display = 'none';
      d.classList.remove('page-active');
      d.classList.add('fade-hidden');
    });
  } catch(e) {}

  try {
    document.body.style.paddingTop = '0px';
  } catch(e) {}
}

/**
 * Show a specific day page with animations and day‑specific setup
 */
export function showDay(id) {
  if (!id) return;
  
  // Hide all sections
  try { hideAll(); } catch(e) {}

  // Update current day
  const dayNum = parseInt(id.replace('day', ''), 10);
  if (!Number.isNaN(dayNum)) {
    window.currentDay = dayNum;
  }

  // Update navbar layout
  const prevCol = document.getElementById('prevCol');
  const dropCol = document.getElementById('dropCol');
  if (prevCol && dropCol) {
    prevCol.classList.remove('d-none');
    prevCol.classList.add('col-3');
    dropCol.classList.replace('col-9', 'col-6');
  }

  // Show the day section
  const el = document.getElementById(id);
  if (el) {
    el.style.display = 'block';
    setTimeout(() => {
      el.classList.add('page-active');
      el.classList.remove('fade-hidden');
      
      // Day-specific initialization
      if (id === 'day4' || id === 'day-4') {
        const input = document.getElementById('marudhar-date');
        if (input) input.value = getSmartInitialDate();
        if (typeof initMarudharTrack === 'function') initMarudharTrack();
        updateMarudharTracker();
      } else if (id === 'day5') {
        const input = document.getElementById('sainik-date');
        if (input) input.value = getSainikSmartInitialDate();
        if (typeof initSainikTrack === 'function') initSainikTrack();
        updateSainikTracker();
      } else if (id === 'day2') {
        if (typeof updateTracker === 'function') updateTracker();
      } else if (id === 'day6') {
        setTimeout(() => {
          if (typeof initRetroGridsInSection === 'function') {
            initRetroGridsInSection('day6');
          }
        }, 500);
      }
    }, 10);
  }

  // Navigation UI updates
  const navWrapper = document.getElementById('nav-wrapper');
  const navbar = document.querySelector('.navbar');
  if (navbar && navWrapper) {
    navbar.classList.remove('is-day-mode');
    navbar.classList.remove('fixed-top');
    navWrapper.classList.add('sticky-top');
    navWrapper.style.top = '0px';
    document.body.classList.add('day-page-active');
    document.body.style.paddingTop = '0px';
  }

  const dropContainer = document.getElementById('dropContainer');
  if (dropContainer) dropContainer.classList.remove('dropup');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateDropdownText(id);
  setTimeout(triggerRevealAnimations, 50);
}

/**
 * Update dropdown button text based on selected day
 */
export function updateDropdownText(id) {
  const dropBtn = document.getElementById('dropBtn');
  if (!dropBtn) return;
  document.querySelectorAll('.dropdown-item').forEach((item) => {
    if (item.getAttribute('onclick') && item.getAttribute('onclick').includes(`'${id}'`)) {
      dropBtn.innerText = item.innerText;
    }
  });
}

/**
 * Show a toast notification (auto‑dismiss after 3 s)
 */
export function showToast(message) {
  const toast = document.getElementById('homeToast');
  if (!toast) return;
  toast.innerHTML = `<i class="bi bi-info-circle me-2 text-info"></i> ${message}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/**
 * Navigate to the next day (max 10)
 */
export function nextDay() {
  const currentDay = window.currentDay !== undefined ? window.currentDay : 0;
  if (currentDay < 10) {
    showDay('day' + (currentDay + 1));
  } else {
    showToast("You've reached the final day of the trip!");
  }
}

/**
 * Navigate to the previous day or home if on day 1
 */
export function prevDay() {
  const currentDay = window.currentDay !== undefined ? window.currentDay : 0;
  if (currentDay > 1) {
    showDay('day' + (currentDay - 1));
  } else if (currentDay === 1) {
    goHome();
  } else if (currentDay === 0) {
    showDay('day10');
  }
}

/**
 * Return to the home/landing page with proper UI reset
 */
export function goHome(isInitialLoad = false) {
  const top = document.getElementById('topContent');
  const pdfs = document.getElementById('pdfSection');
  const navWrapper = document.getElementById('nav-wrapper');
  const navbar = document.querySelector('.navbar');
  const aadhar = document.getElementById('aadhar-section');
  const entertainment = document.getElementById('entertainment-page');
  const packing = document.getElementById('packing-section');

  const pdfVisible = pdfs && pdfs.style.display !== 'none' && pdfs.style.display !== '';
  const aadharVisible = aadhar && aadhar.style.display !== 'none' && aadhar.style.display !== '';
  const entertainmentVisible = entertainment && entertainment.style.display !== 'none' && entertainment.style.display !== '';
  const packingVisible = packing && packing.style.display !== 'none' && packing.style.display !== '';

  if (!isInitialLoad && window.currentDay === 0 && !pdfVisible && !aadharVisible && !entertainmentVisible && !packingVisible) {
    showToast('Currently on home screen');
    return;
  }

  hideAll();
  window.currentDay = 0;

  const firstPage = document.querySelector('.first_page');
  if (firstPage && top) {
    firstPage.style.display = 'block';
    top.style.display = 'flex';
    setTimeout(() => {
      firstPage.classList.add('page-active');
      firstPage.classList.add('is-visible');
      top.classList.add('page-active');
      if (typeof reveal === 'function') reveal();
    }, 10);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (navbar) {
    navbar.classList.remove('is-day-mode');
    navbar.classList.remove('fixed-top');
  }

  if (navWrapper) {
    navWrapper.classList.remove('nav-wrapper-day-mode');
    navWrapper.classList.remove('sticky-top');
    navWrapper.style.top = '';
  }

  document.body.style.paddingTop = '0px';
  document.body.classList.remove('day-page-active');

  const dropBtn = document.getElementById('dropBtn');
  if (dropBtn) dropBtn.innerText = 'Select date...';

  const prevCol = document.getElementById('prevCol');
  const dropCol = document.getElementById('dropCol');
  if (prevCol && dropCol) {
    prevCol.classList.add('d-none');
    prevCol.classList.remove('col-3');
    dropCol.classList.replace('col-6', 'col-9');
  }

  const dropContainer = document.getElementById('dropContainer');
  if (dropContainer) dropContainer.classList.add('dropup');

  const aadharSection = document.getElementById('aadhar-section');
  if (aadharSection) aadharSection.style.display = 'none';

  const entertainmentSection = document.getElementById('entertainment-page');
  if (entertainmentSection) entertainmentSection.style.display = 'none';

  const packingSection = document.getElementById('packing-section');
  if (packingSection) packingSection.style.display = 'none';

  if (typeof window.reinitScrollAnimations === 'function') {
    setTimeout(() => window.reinitScrollAnimations(), 100);
  }
}

/**
 * Show the PDF/Tickets section
 */
export function showPDFs() {
  const pdfs = document.getElementById('pdfSection');
  if (pdfs && pdfs.style.display === 'block') {
    showToast('Already viewing Tickets');
    return;
  }
  hideAll();
  if (pdfs) {
    pdfs.classList.remove('fade-hidden');
    pdfs.style.display = 'block';
    pdfs.style.opacity = '1';
    const nav = document.getElementById('nav-wrapper');
    const navbar = document.querySelector('.navbar');
    if (nav && navbar) {
      navbar.classList.remove('fixed-top');
      nav.classList.add('sticky-top');
      nav.style.top = '0px';
      document.body.style.paddingTop = '0px';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(reveal, 100);
    if (typeof window.reinitScrollAnimations === 'function') {
      setTimeout(() => window.reinitScrollAnimations(), 100);
    }
  }
}

/**
 * Show the Aadhar Vault section
 */
export function showAadhar() {
  const aadharEl = document.getElementById('aadhar-section');
  if (aadharEl && aadharEl.style.display === 'block') {
    showToast('Already viewing Aadhar Vault');
    return;
  }
  hideAll();
  if (aadharEl) {
    aadharEl.classList.remove('fade-hidden');
    aadharEl.style.display = 'block';
    aadharEl.style.opacity = '1';
  }
  const prevCol = document.getElementById('prevCol');
  const dropCol = document.getElementById('dropCol');
  if (prevCol) prevCol.classList.add('d-none');
  if (dropCol) dropCol.classList.replace('col-6', 'col-9');
  const nav = document.getElementById('nav-wrapper');
  const navbar = document.querySelector('.navbar');
  if (nav && navbar) {
    navbar.classList.remove('fixed-top');
    nav.classList.add('sticky-top');
    nav.style.top = '0px';
    nav.style.zIndex = '1019';
    nav.style.pointerEvents = 'auto';
    document.body.style.paddingTop = '0px';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(reveal, 100);
  if (typeof window.reinitScrollAnimations === 'function') {
    setTimeout(() => window.reinitScrollAnimations(), 100);
  }
}

/**
 * Show the Entertainment/Games section
 */
export function showEntertainment() {
  const entertainmentEl = document.getElementById('entertainment-page');
  if (entertainmentEl && entertainmentEl.style.display === 'block') {
    showToast('Already viewing Entertainment');
    return;
  }
  hideMainContent();
  if (entertainmentEl) {
    entertainmentEl.classList.remove('fade-hidden');
    entertainmentEl.style.display = 'block';
    entertainmentEl.style.opacity = '1';
  }
  const nav = document.getElementById('nav-wrapper');
  const navbar = document.querySelector('.navbar');
  if (nav && navbar) {
    navbar.classList.remove('fixed-top');
    nav.classList.add('sticky-top');
    nav.style.top = '0px';
    document.body.style.paddingTop = '0px';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => revealEntertainment(entertainmentEl), 100);
}

/**
 * Hide only main content sections (lightweight hide for entertainment)
 */
function hideMainContent() {
  const firstPage = document.querySelector('.first_page');
  if (firstPage) {
    firstPage.style.display = 'none';
    firstPage.classList.remove('page-active');
  }
  const pdfs = document.getElementById('pdfSection');
  if (pdfs) pdfs.style.display = 'none';
  const aadhar = document.getElementById('aadhar-section');
  if (aadhar) aadhar.style.display = 'none';
  const entertainment = document.getElementById('entertainment-page');
  if (entertainment) entertainment.style.display = 'none';
  const packing = document.getElementById('packing-section');
  if (packing) packing.style.display = 'none';
  document.querySelectorAll('[id^=day]').forEach((d) => {
    d.style.display = 'none';
    d.classList.remove('page-active');
    d.classList.add('fade-hidden');
  });
  document.body.style.paddingTop = '0px';
}

/**
 * Reveal elements only within entertainment section
 */
function revealEntertainment(container) {
  if (!container) return;
  const reveals = container.querySelectorAll('.reveal-on-scroll, .reveal');
  reveals.forEach((el, index) => {
    el.classList.remove('is-visible');
    el.classList.add('reveal-on-scroll');
    setTimeout(() => el.classList.add('is-visible'), index * 50);
  });
}

/**
 * Show the Packing List section
 */
export function showPacking() {
  console.log('showPacking called');
  const packingEl = document.getElementById('packing-section');
  console.log('packingEl found:', packingEl);
  if (packingEl && packingEl.style.display === 'block') {
    showToast('Already viewing Packing List');
    return;
  }
  try { hideAll(); } catch(e) { console.error('hideAll:', e); }
  if (packingEl) {
    packingEl.classList.remove('fade-hidden');
    packingEl.style.display = 'block';
    packingEl.style.opacity = '1';
    console.log('packing display set to block');
    if (window.updatePackingProgress) window.updatePackingProgress();
  }
  const nav = document.getElementById('nav-wrapper');
  const navbar = document.querySelector('.navbar');
  if (nav && navbar) {
    navbar.classList.remove('fixed-top');
    nav.classList.add('sticky-top');
    nav.style.top = '0px';
    document.body.style.paddingTop = '0px';
  }
  const prevCol = document.getElementById('prevCol');
  const dropCol = document.getElementById('dropCol');
  if (prevCol) prevCol.classList.add('d-none');
  if (dropCol) dropCol.classList.replace('col-6', 'col-9');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(reveal, 100);
  if (typeof window.reinitScrollAnimations === 'function') {
    setTimeout(() => window.reinitScrollAnimations(), 100);
  }
}

/**
 * Reveal elements on scroll – adds "active" class
 */
export function reveal() {
  const reveals = document.querySelectorAll('.reveal');
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 150;
    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add('active');
    }
  }
}

/**
 * Trigger staggered reveal‑on‑scroll animations
 */
export function triggerRevealAnimations() {
  document.querySelectorAll('.reveal-on-scroll').forEach((el, index) => {
    setTimeout(() => el.classList.add('is-visible'), index * 50);
  });
}

// expose functions globally for legacy onclick handlers
window.goHome = goHome;
window.showDay = showDay;
window.showPDFs = showPDFs;
window.nextDay = nextDay;
window.prevDay = prevDay;
window.showAadhar = showAadhar;
window.showEntertainment = showEntertainment;
window.showPacking = showPacking;
window.updateDropdownText = updateDropdownText;
