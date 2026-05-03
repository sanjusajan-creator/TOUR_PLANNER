/**
 * PDF Module - Handles PDF rendering, password management, and document viewing
 */

// PDF.js worker source
export const PDF_WORKER_SRC = 'lib/pdf.js/pdf.worker.min.js';

// PDF document cache
export const pdfDocumentCache = new Map();

// Session password prefix for security
const SESSION_PASSWORD_PREFIX = 'pdf_password_';

// Current PDF state
let currentPdfFile = null;
let currentPdfPassword = null;
let isPdfUnlocked = false;

/**
 * Get session-stored password
 * @param {string} sessionKey - Session key identifier
 * @returns {string|null} Stored password or null
 */
export function getSessionPassword(sessionKey) {
  try {
    return sessionStorage.getItem(SESSION_PASSWORD_PREFIX + sessionKey);
  } catch (e) {
    console.error('Error reading session password:', e);
    return null;
  }
}

/**
 * Store password in session
 * @param {string} sessionKey - Session key identifier
 * @param {string} password - Password to store
 */
export function setSessionPassword(sessionKey, password) {
  try {
    sessionStorage.setItem(SESSION_PASSWORD_PREFIX + sessionKey, password);
  } catch (e) {
    console.error('Error storing session password:', e);
  }
}

/**
 * Prompt for password (checks session first)
 * @param {string} sessionKey - Session key identifier
 * @returns {string|null} Stored password or null to trigger UI prompt
 */
export function promptForPassword(sessionKey) {
  const storedPassword = getSessionPassword(sessionKey);
  if (storedPassword) {
    return storedPassword;
  }
  return null;
}

/**
 * Update PDF download button state
 * @param {boolean} isEnabled - Whether download should be enabled
 */
export function updatePdfDownloadButton(isEnabled) {
  const downloadBtn = document.getElementById("downloadPdfBtn");
  if (!downloadBtn) return;
  downloadBtn.disabled = !isEnabled;
}

/**
 * @description Download the current PDF file after unlocking
 * @returns {void}
 */
export function downloadCurrentPDF() {
  if (!currentPdfFile || !isPdfUnlocked) {
    alert("Unlock the document before downloading.");
    return;
  }

  const link = document.createElement("a");
  link.href = encodeURI(currentPdfFile);
  link.download = currentPdfFile;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/**
 * @description View a PDF file with password prompt
 * @param {string} file - PDF file path
 * @returns {void}
 */
export function viewPDF(file) {
  currentPdfFile = file;
  isPdfUnlocked = false;
  updatePdfDownloadButton(false);
  
  const sessionKey = file;
  currentPdfPassword = promptForPassword(sessionKey);
  
  const container = document.querySelector('.pdf-container-body');

  const myModal = new bootstrap.Modal(document.getElementById("ticketModal"));
  myModal.show();

  container.innerHTML = `
    <div class="d-flex flex-column align-items-center justify-content-center w-100 h-100 bg-dark" style="min-height: 450px; border-radius: 0 0 16px 16px;">
      <i class="bi bi-lock-fill text-white fs-1 mb-3"></i>
      <h5 class="text-white mb-3">Password Required</h5>
      <p class="text-white-50 mb-4 small">Please enter the password to view this document.</p>
      <input type="password" id="pdfPasswordInput" class="form-control mb-3 text-center" placeholder="Enter password" style="max-width: 250px; background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2);">
      <button class="btn btn-primary px-4 rounded-pill" onclick="submitPdfPassword()">Unlock Document</button>
    </div>
  `;
  
  setTimeout(() => {
    const input = document.getElementById("pdfPasswordInput");
    if (input) {
      input.focus();
      input.addEventListener('keyup', (e) => {
        if(e.key === 'Enter') submitPdfPassword();
      });
    }
  }, 300);
}

/**
 * @description Submit PDF password and begin loading the document
 * @returns {void}
 */
export function submitPdfPassword() {
  try {
    const passwordInput = document.getElementById("pdfPasswordInput");
    const container = document.querySelector('.pdf-container-body');

    if (!passwordInput) {
      console.error("Password input element not found");
      alert("Error: password input field not found");
      return;
    }

    if (!container) {
      console.error("PDF container not found");
      alert("Error: PDF container not found");
      return;
    }

    const userPassword = passwordInput.value;

    if (!userPassword || userPassword.trim() === "") {
      alert("Please enter a password");
      return;
    }

    if (currentPdfFile) {
      setSessionPassword(currentPdfFile, userPassword);
    }

    container.innerHTML = `
      <div id="pdf-viewer-wrapper" class="w-100 h-100" style="background:#323639; overflow-y:auto; min-height: 70vh;"></div>
      <div id="pdfLoading" class="position-absolute top-50 start-50 translate-middle text-center text-white">
        <div class="spinner-border text-info mb-2" role="status"></div>
        <div class="small">Decrypting...</div>
      </div>
    `;
    
    loadPdfWithJs(currentPdfFile, userPassword);
  } catch (e) {
    console.error("Error submitting PDF password:", e);
    alert("An error occurred while processing your request");
  }
}

/**
 * @description Load PDF using PDF.js library with password
 * @param {string} file - PDF file path
 * @param {string} password - PDF password for decryption
 * @returns {void}
 */
export function loadPdfWithJs(file, password) {
  try {
    const wrapper = document.getElementById("pdf-viewer-wrapper");
    const loader = document.getElementById("pdfLoading");
    
    if (!wrapper) {
      console.error("PDF wrapper not found");
      return;
    }

    if (!file) {
      console.error("No file specified");
      return;
    }

    const fileUrl = encodeURI(file);
    
    const cacheKey = fileUrl + ':' + password;
    if (pdfDocumentCache.has(cacheKey)) {
      const cachedPdf = pdfDocumentCache.get(cacheKey);
      if (loader) loader.style.display = "none";
      isPdfUnlocked = true;
      updatePdfDownloadButton(true);
      renderPdfPages(cachedPdf, wrapper);
      return;
    }

    const loadingTask = pdfjsLib.getDocument({
      url: fileUrl,
      password: password,
      workerSrc: PDF_WORKER_SRC
    });

    loadingTask.promise.then(function(pdf) {
      if (loader) loader.style.display = "none";
      pdfDocumentCache.set(cacheKey, pdf);
      isPdfUnlocked = true;
      updatePdfDownloadButton(true);
      renderPdfPages(pdf, wrapper);
    }).catch(function(err) {
      if (loader) loader.style.display = "none";
      isPdfUnlocked = false;
      updatePdfDownloadButton(false);
      const errorMessage = err && err.message ? err.message : "Unknown error";
      
      if (err && (err.name === 'PasswordException' || errorMessage.toLowerCase().includes('password'))) {
        alert("Incorrect password. Please try again.");
        viewPDF(file);
      } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-center text-white p-5';
        
        const icon = document.createElement('i');
        icon.className = 'bi bi-exclamation-triangle fs-1 text-warning mb-3';
        
        const message = document.createElement('p');
        message.textContent = 'Error loading PDF: ' + errorMessage;
        
        const button = document.createElement('button');
        button.className = 'btn btn-sm btn-outline-light';
        button.textContent = 'Retry';
        button.setAttribute('onclick', `viewPDF('${file.replace(/'/g, "\\'")}' )`);
        
        errorDiv.appendChild(icon);
        errorDiv.appendChild(message);
        errorDiv.appendChild(button);
        
        wrapper.innerHTML = '';
        wrapper.appendChild(errorDiv);
      }
    });
  } catch (e) {
    console.error("Error loading PDF:", e);
    const wrapper = document.getElementById("pdf-viewer-wrapper");
    if (wrapper) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'text-center text-white p-5';
      errorDiv.textContent = 'An unexpected error occurred while loading the PDF.';
      wrapper.innerHTML = '';
      wrapper.appendChild(errorDiv);
    }
  }
}

/**
 * @description Render PDF pages to canvas elements with concurrent loading
 * @param {Object} pdf - PDF document object from PDF.js
 * @param {HTMLElement} wrapper - Container element for rendering pages
 * @returns {void}
 */
export function renderPdfPages(pdf, wrapper) {
  const scale = Math.max(1, (window.devicePixelRatio || 1) * (window.innerWidth < 768 ? 0.8 : 1.2));
  wrapper.innerHTML = '<div id="pdf-pages" class="py-3"></div>';
  const pagesContainer = document.getElementById('pdf-pages');
  
  const CONCURRENCY = 3;
  const pages = [];
  
  for (let i = 1; i <= pdf.numPages; i++) {
    pages.push(i);
  }
  
  async function processPages() {
    const executing = [];
    
    for (const pageNum of pages) {
      const pagePromise = pdf.getPage(pageNum).then((page) => {
        const viewport = page.getViewport({ scale: scale });
        const pageDiv = document.createElement('div');
        pageDiv.className = 'pdf-page-container mb-3 shadow-lg mx-auto';
        pageDiv.style.maxWidth = 'max-content';
        pageDiv.style.background = '#fff';
        pagesContainer.appendChild(pageDiv);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const dpi = window.devicePixelRatio || 1;
        canvas.width = viewport.width * dpi;
        canvas.height = viewport.height * dpi;
        canvas.style.width = viewport.width + 'px';
        canvas.style.height = viewport.height + 'px';
        pageDiv.appendChild(canvas);

        return page.render({ canvasContext: ctx, viewport: viewport }).promise;
      });
      
      executing.push(pagePromise);
      
      if (executing.length >= CONCURRENCY) {
        await Promise.race(executing);
        const newExecuting = [];
        for (const p of executing) {
          if (p !== null) newExecuting.push(p);
        }
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
    
    await Promise.all(executing);
  }
  
  processPages();
}

// Make functions globally available for inline onclick handlers
window.viewPDF = viewPDF;
window.submitPdfPassword = submitPdfPassword;
window.downloadCurrentPDF = downloadCurrentPDF;
window.updatePdfDownloadButton = updatePdfDownloadButton;