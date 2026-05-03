/**
 * Module Index - Barrel file exporting all modules
 */

// Navigation module exports
export {
  cleanupCarousels,
  hideAll,
  showDay,
  updateDropdownText,
  goHome,
  showPDFs,
  showToast,
  nextDay,
  prevDay,
  showAadhar,
  showEntertainment,
  reveal,
  triggerRevealAnimations
} from './navigation.js';

// Tracking module exports
export {
  tripSchedule,
  marudharFullRoute,
  sainikFullRoute,
  initMarkers,
  updateTracker,
  setToday,
  syncLive,
  setInitialDate,
  handleDateChange,
  setupDate,
  updateCountdown,
  getSmartInitialDate,
  initMarudharTrack,
  calculateMinutesForStation,
  updateStationMarkers,
  updateMarudharTracker,
  setMarudharToday,
  getSainikSmartInitialDate,
  initSainikTrack,
  updateSainikTracker,
  setSainikToday
} from './tracking.js';

// PDF module exports
export {
  PDF_WORKER_SRC,
  pdfDocumentCache,
  getSessionPassword,
  setSessionPassword,
  promptForPassword,
  updatePdfDownloadButton,
  downloadCurrentPDF,
  viewPDF,
  submitPdfPassword,
  loadPdfWithJs,
  renderPdfPages
} from './pdf.js';

// Games/Entertainment module exports
export {
  initRetroGridsInSection,
  initScrollObserver,
  isValidExternalUrl,
  openExternalLink,
  initEntertainment,
  loadGameEmbeds
} from './games.js';

// Re-export for convenience
export { reveal as defaultReveal } from './navigation.js';