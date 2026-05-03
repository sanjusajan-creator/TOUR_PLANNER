/* ============================================
   SECTION TRANSITIONS
   ============================================ */
.section-container {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.section-container.fade-hidden {
  opacity: 0;
  transform: translateY(10px);
  visibility: hidden;
  pointer-events: none;
}
.section-container:not(.fade-hidden) {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
  pointer-0events: auto;
}