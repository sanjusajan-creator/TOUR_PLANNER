/**
 * Component Factory Module - Generates reusable HTML patterns
 */

/**
 * @description Create an itinerary day card HTML structure
 * @param {Object} dayData - Day information object
 * @param {string} dayData.date - Date string (e.g., "24th May 2026")
 * @param {number} dayData.dayNum - Day number (e.g., 1)
 * @param {string} dayData.description - Description text
 * @returns {string} HTML string for day card
 */
export function createDayCard({ date, dayNum, description }) {
  return `
    <div class="card shadow-sm border border-dark mb-3 train-card mx-auto w-100" style="max-width: 95%;">
      <div class="card-body p-3 text-dark">
        <h3 class="text-center days-head">${date} (DAY ${dayNum})</h3>
        <p class="lead">${description}</p>
      </div>
    </div>
  `;
}

/**
 * @description Create a train info card HTML structure
 * @param {Object} trainData - Train information object
 * @param {string} trainData.trainNum - Train number
 * @param {string} trainData.trainName - Train name
 * @param {string} trainData.from - Origin station code
 * @param {string} trainData.to - Destination station code
 * @param {string} trainData.departure - Departure time
 * @param {string} trainData.arrival - Arrival time
 * @returns {string} HTML string for train card
 */
export function createTrainCard({ trainNum, trainName, from, to, departure, arrival }) {
  return `
    <div class="card shadow-sm border border-dark mb-3 train-card mx-auto w-100" style="max-width: 95%;">
      <div class="card-body p-3 text-dark">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <span class="badge bg-primary fs-6 px-3 py-2" style="border-radius: 4px;">${trainNum}</span>
          <div class="d-flex align-items-center flex-grow-1 px-3">
            <span class="fw-bold">${departure}</span>
            <div class="flex-grow-1 border-top border-dark mx-2"></div>
            <span class="fw-bold">${arrival}</span>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-3">
          <span class="fw-bold">${trainName}</span>
          <span class="text-muted">${from} → ${to}</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * @description Create a game embed container HTML structure
 * @param {Object} gameData - Game information object
 * @param {string} gameData.name - Game name
 * @param {string} gameData.url - Game URL to open
 * @param {string} gameData.icon - Icon class (e.g., "bi bi-dice-5-fill")
 * @param {string} gameData.description - Game description
 * @returns {string} HTML string for game card
 */
export function createGameEmbed({ name, url, icon = "bi bi-controller", description }) {
  return `
    <div class="col-6 col-lg-4">
      <div class="game-card border-0 h-100 rounded-4 overflow-hidden position-relative reveal-on-scroll" 
           data-action="open-game" data-url="${url}" style="cursor: pointer;">
        <div class="card-body text-center p-4 text-white">
          <div class="game-icon-bg">
            <i class="${icon}"></i>
          </div>
          <h5 class="fw-bold mb-1">${name}</h5>
          <p class="small mb-0 opacity-75">${description}</p>
        </div>
        <div class="game-shine"></div>
      </div>
    </div>
  `;
}

/**
 * @description Create a modal structure HTML
 * @param {Object} modalData - Modal configuration object
 * @param {string} modalData.id - Modal ID
 * @param {string} modalData.title - Modal title
 * @param {string} modalData.bodyContent - Modal body HTML content
 * @param {string} modalData.footerContent - Modal footer HTML (optional)
 * @returns {string} HTML string for modal
 */
export function createModal({ id, title, bodyContent, footerContent = "" }) {
  return `
    <div class="modal fade" id="${id}" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${bodyContent}
          </div>
          ${footerContent ? `<div class="modal-footer">${footerContent}</div>` : ""}
        </div>
      </div>
    </div>
  `;
}