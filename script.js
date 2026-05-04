let currentDay = 0;

// SECURITY NOTE: PDF passwords are encoded in base64 for obfuscation only.
// For production use, consider storing these on a secure backend and using API endpoints.
// This is temporary storage for static hosting.
const pdfPasswordsEncoded = {
  'QLN AGC.pdf': 'MjQyNg==',
  'AF JP.pdf': 'MjQyNg==',
  'JP DEC.pdf': 'MjQyNg==',
  'NDLS QLN.pdf': 'MjQyNg==',
  'Booking_Confirmation_Voucher(PRO).pdf': 'MjQyMDI2',
  'Property_Rules_and_Policy(PRO).pdf': 'MjQyMDI2',
  'Booking_Confirmation_Voucher (1)(PRO).pdf': 'MjQyMDI2',
  'Property_Rules_and_Policy (1)(PRO).pdf': 'MjQyMDI2',
  'Booking_Confirmation_Voucher (2)(PRO).pdf': 'MjQyMDI2',
  'Property_Rules_and_Policy (2)(PRO).pdf': 'MjQyMDI2',
  'eAadhaar_1775528942612[1].pdf': 'U0FKQTE5NzE=',
  'eAadhaar_1775364962369[2].pdf': 'QU5OQTE5Nzk=',
  'eAadhaar_1775364245987[3].pdf': 'U0FNUzIwMDM=',
  'eAadhaar_1775364447319[4].pdf': 'U0FOSjIwMTA='
};

function getPdfPassword(file) {
   try {
     if (!file || typeof file !== 'string') {
       console.warn("Invalid PDF file parameter");
       return '';
     }

     if (!/^[\w\s\[\]\-\.\(\)]+\.pdf$/i.test(file)) {
       console.warn("Invalid PDF filename format:", file);
       return '';
     }

     const encoded = pdfPasswordsEncoded[file];
     if (!encoded) {
       console.warn("No password found for PDF:", file);
       return '';
     }

     const decoded = atob(encoded);
     
     if (!decoded || decoded.trim() === '') {
       console.warn("Decoded password is empty for:", file);
       return '';
     }

     return decoded;
   } catch (e) {
     console.error("Error decoding PDF password:", e);
     return '';
    }
}

function isValidExternalUrl(urlString) {
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

function openExternalLink(urlString, target = '_blank') {
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

const PDF_WORKER_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

const pdfDocumentCache = new Map();

function cleanupCarousels() {
   try {
     document.querySelectorAll(".carousel").forEach((carousel) => {
       const bsCarousel = bootstrap.Carousel.getInstance(carousel);
       if (bsCarousel) {
         bsCarousel.dispose();
       }
     });
   } catch (e) {
     console.error("Error cleaning up carousels:", e);
   }
}

function hideAll() {
   cleanupCarousels();

   const firstPage = document.querySelector(".first_page");
   if (firstPage) {
     firstPage.style.display = "none";
     firstPage.classList.remove("page-active");
   }

   const pdfs = document.getElementById("pdfSection");
   if (pdfs) pdfs.style.display = "none";

   const aadhar = document.getElementById("aadhar-section");
   if (aadhar) aadhar.style.display = "none";

   const entertainment = document.getElementById("entertainment-page");
   if (entertainment) entertainment.style.display = "none";

   const packing = document.getElementById("packing-section");
   if (packing) packing.style.display = "none";

   document.querySelectorAll("[id^=day]").forEach((d) => {
     d.style.display = "none";
     d.classList.remove("page-active");
     d.classList.add("fade-hidden");
   });

   document.body.style.paddingTop = "0px";
}

function showDay(id) {
  if (!id) return;
  console.log("showDay called with:", id);
  hideAll();
  currentDay = parseInt(id.replace("day", ""));

  const el = document.getElementById(id);
  console.log("Element found:", el);
  if (el) {
    el.style.display = "block";
    console.log("Set display to block for:", id);

    setTimeout(() => {
      el.classList.add("page-active");
      el.style.display = "block";
      console.log("Added page-active to:", id);
      
      if (id === "day4" || id === "day-4") {
        const input = document.getElementById("marudhar-date");
        if (input) {
          input.value = getSmartInitialDate();
        }

        if (typeof initMarudharTrack === "function") {
          initMarudharTrack();
        }
        updateMarudharTracker();
      } else if (id === "day5") {
        const input = document.getElementById("sainik-date");
        if (input) {
          input.value = getSainikSmartInitialDate();
        }
        if (typeof initSainikTrack === "function") {
          initSainikTrack();
        }
        updateSainikTracker();
      } else if (id === "day2") {
        if (typeof updateTracker === "function") {
          updateTracker();
        }
      } else if (id === "day6") {
        console.log("Day 6 loaded - starting animations");
        setTimeout(function() {
          try {
            var section = document.getElementById("day6");
            if (!section) {
              console.error("day6 section not found");
              return;
            }
            var canvases = section.querySelectorAll('.retro-grid-canvas');
            console.log("Found " + canvases.length + " retro grid canvases");
            
            if (typeof initRetroGridsInSection === "function") {
              initRetroGridsInSection("day6");
            } else {
              console.error("initRetroGridsInSection not defined");
            }
          } catch(e) { console.error('Retro grid error:', e); }
        }, 500);
      }
    }, 10);
  }

  const navWrapper = document.getElementById("nav-wrapper");
  const navbar = document.querySelector(".navbar");
  if (navbar && navWrapper) {
    navbar.classList.remove("is-day-mode");
    navbar.classList.remove("fixed-top");
    navWrapper.classList.add("sticky-top");
    navWrapper.style.top = "0px";
    document.body.classList.add("day-page-active");
    document.body.style.paddingTop = "0px";
  }

  const prevCol = document.getElementById("prevCol");
  const dropCol = document.getElementById("dropCol");
  if (prevCol && dropCol) {
    prevCol.classList.remove("d-none");
    prevCol.classList.add("col-3");
    dropCol.classList.replace("col-9", "col-6");
  }

  const dropContainer = document.getElementById("dropContainer");
  if (dropContainer) {
    dropContainer.classList.remove("dropup");
  }

  const aadharSection = document.getElementById("aadhar-section");
  if (aadharSection) {
    aadharSection.style.display = "none";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
  updateDropdownText(id);
  setTimeout(triggerRevealAnimations, 50);
}

function updateDropdownText(id) {
  const dropBtn = document.getElementById("dropBtn");
  if (!dropBtn) return;

  const items = document.querySelectorAll(".dropdown-item");
  items.forEach(item => {
    if (item.getAttribute("onclick") && item.getAttribute("onclick").includes(`'${id}'`)) {
      dropBtn.innerText = item.innerText;
    }
  });
}
function goHome(isInitialLoad = false) {
  const top = document.getElementById("topContent");
  const pdfs = document.getElementById("pdfSection");
  const navWrapper = document.getElementById("nav-wrapper");
  const navbar = document.querySelector(".navbar");
  const aadhar = document.getElementById("aadhar-section");
  const entertainment = document.getElementById("entertainment-page");
  const packing = document.getElementById("packing-section");

  const pdfVisible = pdfs && pdfs.style.display !== "none" && pdfs.style.display !== "";
  const aadharVisible = aadhar && aadhar.style.display !== "none" && aadhar.style.display !== "";
  const entertainmentVisible = entertainment && entertainment.style.display !== "none" && entertainment.style.display !== "";

  if (!isInitialLoad && currentDay === 0 && !pdfVisible && !aadharVisible && !entertainmentVisible) {
    showToast("Currently on home screen");
    return;
  }

  // Force hide ALL day sections before anything else
  document.querySelectorAll("[id^=day]").forEach((d) => {
    d.style.display = "none";
    d.classList.remove("page-active");
    d.classList.add("fade-hidden");
  });

  hideAll();
  currentDay = 0;

  const firstPage = document.querySelector(".first_page");
  if (firstPage && top) {
    firstPage.style.display = "block";
    top.style.display = "flex";
    setTimeout(() => {
      firstPage.classList.add("page-active");
      top.classList.add("page-active");
      reveal();
    }, 10);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (navbar) {
    navbar.classList.remove("is-day-mode");
    navbar.classList.remove("fixed-top");
  }

  if (navWrapper) {
    navWrapper.classList.remove("nav-wrapper-day-mode");
    navWrapper.classList.remove("sticky-top");
    navWrapper.style.top = "";
  }

  document.body.style.paddingTop = "0px";
  document.body.classList.remove("day-page-active");

  const dropBtn = document.getElementById("dropBtn");
  if (dropBtn) dropBtn.innerText = "Select date...";

  const prevCol = document.getElementById("prevCol");
  const dropCol = document.getElementById("dropCol");
  if (prevCol && dropCol) {
    prevCol.classList.add("d-none");
    prevCol.classList.remove("col-3");
    dropCol.classList.replace("col-6", "col-9");
  }

  const dropContainer = document.getElementById("dropContainer");
  if (dropContainer) {
    dropContainer.classList.add("dropup");
  }
  const aadharSection = document.getElementById("aadhar-section");
  if (aadharSection) aadharSection.style.display = "none";

  const entertainmentSection = document.getElementById("entertainment-page");
  if (entertainmentSection) entertainmentSection.style.display = "none";

  const packingSection = document.getElementById("packing-section");
  if (packingSection) packingSection.style.display = "none";
}

function showPDFs() {
  const pdfs = document.getElementById("pdfSection");

  if (pdfs && pdfs.style.display === "block") {
    showToast("Already viewing Tickets");
    return;
  }
  hideAll();
  if (pdfs) {
    pdfs.style.display = "block";
    pdfs.style.opacity = "1";
    const nav = document.getElementById("nav-wrapper");
    const navbar = document.querySelector(".navbar");
    if (nav && navbar) {
      navbar.classList.remove("fixed-top");
      nav.classList.add("sticky-top");
      nav.style.top = "0px";
      document.body.style.paddingTop = "0px";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(reveal, 100);
  }
}

function showToast(message) {
  const toast = document.getElementById("homeToast");
  if (!toast) return;
  toast.innerHTML = `<i class="bi bi-info-circle me-2 text-info"></i> ${message}`;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function nextDay() {
  if (currentDay < 10) {
    showDay("day" + (currentDay + 1));
  } else {
    showToast("You've reached the final day of the trip!");
  }
}

function prevDay() {
  if (currentDay > 1) {
    showDay("day" + (currentDay - 1));
  } else if (currentDay === 1) {
    goHome();
  } else if (currentDay === 0) {
    showDay("day10");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sectionsToRescue = ["pdfSection", "ticketModal", "homeToast", "aadhar-section", "entertainment-page"];
  const scriptTag = document.querySelector("body > script");
  sectionsToRescue.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.parentElement !== document.body) {
      console.log("[DOM Rescue] Moving #" + id + " to body root");
      document.body.insertBefore(el, scriptTag);
    }
  });

  const ticketModalEl = document.getElementById("ticketModal");
  if (ticketModalEl) {
    ticketModalEl.addEventListener("hidden.bs.modal", () => {
      isPdfUnlocked = false;
      updatePdfDownloadButton(false);
    });
  }

  goHome(true);
});

let currentPdfFile = null;
let currentPdfPassword = null;
let isPdfUnlocked = false;

function updatePdfDownloadButton(isEnabled) {
  const downloadBtn = document.getElementById("downloadPdfBtn");
  if (!downloadBtn) return;
  downloadBtn.disabled = !isEnabled;
}

function downloadCurrentPDF() {
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

function viewPDF(file) {
  currentPdfFile = file;
  isPdfUnlocked = false;
  updatePdfDownloadButton(false);
  currentPdfPassword = getPdfPassword(file);
  
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

function submitPdfPassword() {
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

function loadPdfWithJs(file, password) {
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

function renderPdfPages(pdf, wrapper) {
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

const tripSchedule = [
  { name: "Trivandrum", code: "TVC", mins: 735 },
  { name: "Kollam", code: "QLN", mins: 798 },
  { name: "Kottayam", code: "KTYM", mins: 895 },
  { name: "Ernakulam", code: "ERN", mins: 970 },
  { name: "Palakkad", code: "PGT", mins: 1155 },
  { name: "Coimbatore", code: "CBE", mins: 1255 },
  { name: "Vijayawada", code: "BZA", mins: 2095 },
  { name: "Nagpur", code: "NGP", mins: 2715 },
  { name: "Bhopal", code: "BPL", mins: 3115 },
  { name: "Agra Cantt", code: "AGC", mins: 3495 },
];

function initMarkers() {
  const container = document.getElementById("station-marker-container");
  const startMins = tripSchedule[0].mins;
  const endMins = tripSchedule[tripSchedule.length - 1].mins;
  const totalRange = endMins - startMins;

  container.innerHTML = "";
  tripSchedule.forEach((stn, i) => {
    const position = ((stn.mins - startMins) / totalRange) * 100;
    const marker = document.createElement("div");
    marker.className = "stn-marker";
    marker.style.left = position + "%";
    marker.id = `stn-${i}`;
    marker.innerHTML = `<div class="stn-dot"></div><div class="stn-code">${stn.code}</div>`;
    container.appendChild(marker);
  });
}

function updateTracker() {
   try {
     const dateVal = document.getElementById("journey-date");
     if (!dateVal) return;

     const dateInputValue = dateVal.value;
     const DEPARTURE_DATE = new Date(`${dateInputValue}T12:15:00`);
     const now = new Date();

     const countdownWrap = document.getElementById("countdown-wrap");
     const countdownText = document.getElementById("countdown-text");

     if (!countdownWrap || !countdownText) return;

     if (DEPARTURE_DATE > now) {
       const diff = DEPARTURE_DATE - now;
       const days = Math.floor(diff / (1000 * 60 * 60 * 24));
       const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

       countdownWrap.style.display = "block";
       countdownText.innerHTML = `<i class="bi bi-hourglass-split"></i> Departs in ${days}d ${hours}h`;
     } else {
       countdownWrap.style.display = "none";
     }

     const diffMins = Math.floor((now - DEPARTURE_DATE) / 60000);
     const currentTripMins = 735 + diffMins;

     const startTrip = tripSchedule[0].mins;
     const endTrip = tripSchedule[tripSchedule.length - 1].mins;
     const totalRange = endTrip - startTrip;

     let progress = 0;
     let status = "Scheduled";
     let prev = tripSchedule[0],
       next = tripSchedule[1];

     if (currentTripMins >= endTrip) {
       progress = 100;
       status = "Arrived";
       prev = tripSchedule[tripSchedule.length - 2];
       next = tripSchedule[tripSchedule.length - 1];
     } else if (currentTripMins > startTrip) {
       progress = ((currentTripMins - startTrip) / totalRange) * 100;
       status = "Live Tracking";
       for (let i = 0; i < tripSchedule.length - 1; i++) {
         if (
           currentTripMins >= tripSchedule[i].mins &&
           currentTripMins <= tripSchedule[i + 1].mins
         ) {
           prev = tripSchedule[i];
           next = tripSchedule[i + 1];
           break;
         }
       }
     }

     const syncProgress = document.getElementById("sync-progress");
     const trainIcon = document.getElementById("train-icon");
     const statusText = document.getElementById("status-text");
     const displayPrev = document.getElementById("display-prev");
     const displayNext = document.getElementById("display-next");
     const journeyPercent = document.getElementById("journey-percent");

     if (syncProgress) syncProgress.style.width = progress + "%";
     if (trainIcon) trainIcon.style.left = progress + "%";
     if (statusText) statusText.innerText = status;
     if (displayPrev) displayPrev.innerText = prev.name;
     if (displayNext) displayNext.innerText = next.name;
     if (journeyPercent) journeyPercent.innerText = Math.round(progress) + "% Journey Done";

     tripSchedule.forEach((s, i) => {
       const m = document.getElementById(`stn-${i}`);
       if (m) {
         if (currentTripMins >= s.mins) m.classList.add("passed");
         else m.classList.remove("passed");
       }
     });
   } catch (e) {
     console.error("Error updating tracker:", e);
   }
}

function setToday() {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");

  const dateString = `${y}-${m}-${d}`;
  document.getElementById("journey-date").value = dateString;
  handleDateChange(dateString);
}

function syncLive() {
  updateTracker();
}

window.onload = () => {
  initMarkers();
  setInitialDate();
  updateTracker();
  setInterval(updateTracker, 60000);
};

function setInitialDate() {
    const dateInput = document.getElementById("journey-date");
    const display = document.getElementById("formatted-date-display");
    const now = new Date();

    const tripStartDate = new Date("2026-05-24T00:00:00");
    const tripEndDate = new Date("2026-05-26T23:59:59");

    let initialDate;

    if (now < tripStartDate) {
      initialDate = tripStartDate;
      const lockBadges = document.querySelectorAll(".auto-lock-badge.lock-badge");
      lockBadges.forEach(b => b.style.display = "inline-block");
    } 
    else if (now >= tripStartDate && now <= tripEndDate) {
      initialDate = now;
      const lockBadges = document.querySelectorAll(".auto-lock-badge.lock-badge");
      lockBadges.forEach(b => b.style.display = "inline-block");
    }
    else {
      initialDate = now;
      const lockBadges = document.querySelectorAll(".auto-lock-badge.lock-badge");
      lockBadges.forEach(b => b.style.display = "none");
    }

    const y = initialDate.getFullYear();
    const m = String(initialDate.getMonth() + 1).padStart(2, "0");
    const d = String(initialDate.getDate()).padStart(2, "0");

    if (dateInput) {
      dateInput.value = `${y}-${m}-${d}`;
    }
    if (display) {
      display.innerText = `${d}/${m}/${y}`;
    }
}

function handleDateChange(val) {
  if (!val) return;
  const [y, m, d] = val.split("-");
  document.getElementById("formatted-date-display").innerText =
    `${d}/${m}/${y}`;
  updateTracker();
}

function setupDate() {
  const now = new Date();
  const target = new Date("2026-05-24T12:15:00");
  const expiry = new Date("2026-05-26T23:59:59");
  const lockBadge = document.getElementById("lock-badge");
  const input = document.getElementById("journey-date");
  const display = document.getElementById("formatted-date-display");

  let initialDate = now <= expiry ? target : now;
  if (now > expiry) lockBadge.style.display = "none";

  const y = initialDate.getFullYear(),
    m = String(initialDate.getMonth() + 1).padStart(2, "0"),
    d = String(initialDate.getDate()).padStart(2, "0");
  input.value = `${y}-${m}-${d}`;
  display.innerText = `${d}/${m}/${y}`;

  if (target > now) {
    document.getElementById("countdown-wrap").style.display = "block";
    updateCountdown(target);
  }
}

function updateCountdown(target) {
  setInterval(() => {
    const diff = target - new Date();
    const days = Math.floor(diff / 86400000);
    const hrs = Math.floor((diff % 86400000) / 3600000);
    document.getElementById("countdown-text").innerHTML =
      `<i class="bi bi-hourglass-split"></i> Departs in ${days}d ${hrs}h`;
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
   try {
     const selectors =
       ".card, .carousel, .bg-dark.rounded-5, h2, .location-wrapper";
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

     document.querySelectorAll(".carousel-item").forEach((item) => {
       const img = item.querySelector("img");
       if (img) {
         item.classList.add("blurred-bg-wrapper");
         item.style.setProperty("--blur-bg-img", `url('${img.src}')`);
       }
     });
   } catch (e) {
     console.error("Error in DOMContentLoaded event listener:", e);
   }
});

const marudharFullRoute = [
  { name: "Varanasi City", code: "BCY", day: 1, time: "16:40", dist: 0 },
  { name: "Varanasi Jn", code: "BSB", day: 1, time: "17:00", dist: 4 },
  { name: "Babatpur", code: "BTP", day: 1, time: "17:32", dist: 23 },
  { name: "Jaunpur City", code: "JOP", day: 1, time: "18:13", dist: 62 },
  { name: "Sultanpur", code: "SLN", day: 1, time: "19:35", dist: 148 },
  { name: "Musafir Khana", code: "MFKA", day: 1, time: "20:10", dist: 179 },
  { name: "Mah Bijli Pasi", code: "MBLP", day: 1, time: "20:26", dist: 198 },
  { name: "Lucknow NR", code: "LKO", day: 2, time: "00:00", dist: 287 },
  { name: "Unnao Jn", code: "ON", day: 2, time: "01:23", dist: 344 },
  { name: "Kanpur Central", code: "CNB", day: 2, time: "02:00", dist: 361 },
  { name: "Etawah Jn", code: "ETW", day: 2, time: "04:05", dist: 500 },
  { name: "Shikohabad Jn", code: "SKB", day: 2, time: "05:00", dist: 556 },
  { name: "Tundla Jn", code: "TDL", day: 2, time: "05:50", dist: 592 },
  { name: "Agra Fort", code: "AF", day: 2, time: "06:35", dist: 615 },
  { name: "Idgah Agra Jn", code: "IDH", day: 2, time: "07:02", dist: 617 },
  { name: "Achhnera Jn", code: "AH", day: 2, time: "07:30", dist: 641 },
  { name: "Bharatpur Jn", code: "BTE", day: 2, time: "08:05", dist: 668 },
  { name: "Nadbai", code: "NBI", day: 2, time: "08:38", dist: 697 },
  { name: "Kherli", code: "KL", day: 2, time: "08:53", dist: 714 },
  { name: "Mandawar M Rd", code: "MURD", day: 2, time: "09:08", dist: 733 },
  { name: "Bandikui Jn", code: "BKI", day: 2, time: "10:25", dist: 765 },
  { name: "Dausa Jn", code: "DO", day: 2, time: "10:54", dist: 794 },
  { name: "Gandhinagar Jpr", code: "GADJ", day: 2, time: "11:38", dist: 850 },
  { name: "Jaipur Jn", code: "JP", day: 2, time: "12:05", dist: 856 },
  { name: "Dhanakya", code: "DNK", day: 2, time: "12:34", dist: 875 },
  { name: "Phulera Jn", code: "FL", day: 2, time: "13:18", dist: 910 },
  { name: "Sambhar Lake", code: "SBR", day: 2, time: "13:38", dist: 918 },
  { name: "Nawa City", code: "NAC", day: 2, time: "14:02", dist: 946 },
  { name: "Kuchaman City", code: "KMNC", day: 2, time: "14:18", dist: 961 },
  { name: "Makrana Jn", code: "MKN", day: 2, time: "14:33", dist: 975 },
  { name: "Degana Jn", code: "DNA", day: 2, time: "15:06", dist: 1019 },
  { name: "Ren", code: "REN", day: 2, time: "15:30", dist: 1047 },
  { name: "Merta Road Jn", code: "MTD", day: 2, time: "15:44", dist: 1064 },
  { name: "Gotan", code: "GOTN", day: 2, time: "16:09", dist: 1084 },
  { name: "Raika Bagh P Jn", code: "RKB", day: 2, time: "17:10", dist: 1166 },
  { name: "Jodhpur Jn", code: "JU", day: 2, time: "17:30", dist: 1168 },
];

const ThiruvananthapuramFullRoute = [
  { name: "Amritsar Jn", code: "ASR", day: 1, time: "00:00", dist: 0 },
  { name: "Beas", code: "BEAS", day: 1, time: "06:23", dist: 43 },
  { name: "Jalandhar City", code: "JUC", day: 1, time: "07:02", dist: 79 },
  { name: "Ludhiana Jn", code: "LDH", day: 1, time: "08:02", dist: 136 },
  { name: "Ambala Cant Jn", code: "UMB", day: 1, time: "10:00", dist: 250 },
  { name: "Bhodwal Majri", code: "BDMJ", day: 1, time: "11:35", dist: 382 },
  { name: "New Delhi", code: "NDLS", day: 1, time: "12:55", dist: 448 },
  { name: "H Nizamuddin", code: "NZM", day: 1, time: "13:21", dist: 455 },
  { name: "Kota Jn", code: "KOTA", day: 1, time: "18:05", dist: 913 },
  { name: "Ratlam Jn", code: "RTM", day: 1, time: "21:30", dist: 1179 },
  { name: "Vadodara Jn", code: "BRC", day: 2, time: "01:15", dist: 1440 },
  { name: "Surat", code: "ST", day: 2, time: "03:00", dist: 1569 },
  { name: "Udhna Jn", code: "UDN", day: 2, time: "03:14", dist: 1573 },
  { name: "Vasai Road", code: "BSR", day: 2, time: "05:55", dist: 1784 },
  { name: "Panvel", code: "PNVL", day: 2, time: "07:27", dist: 1852 },
  { name: "Chiplun", code: "CHI", day: 2, time: "11:00", dist: 2108 },
  { name: "Ratnagiri", code: "RN", day: 2, time: "12:25", dist: 2214 },
  { name: "Madgaon", code: "MAO", day: 2, time: "17:10", dist: 2548 },
  { name: "Udupi", code: "UD", day: 2, time: "21:18", dist: 2898 },
  { name: "Mangaluru Jn", code: "MAJN", day: 2, time: "23:45", dist: 2979 },
  { name: "Kasaragod", code: "KGQ", day: 3, time: "00:34", dist: 3030 },
  { name: "Kannur", code: "CAN", day: 3, time: "01:52", dist: 3116 },
  { name: "Kozhikode", code: "CLT", day: 3, time: "03:10", dist: 3205 },
  { name: "Shoranur Jn", code: "SRR", day: 3, time: "04:55", dist: 3291 },
  { name: "Thrisur", code: "TCR", day: 3, time: "06:05", dist: 3324 },
  { name: "Ernakulam Jn", code: "ERS", day: 3, time: "07:55", dist: 3398 },
  { name: "Alleppey", code: "ALLP", day: 3, time: "09:27", dist: 3455 },
  { name: "Kayankulam Jn", code: "KYJ", day: 3, time: "10:08", dist: 3498 },
  { name: "Kollam Jn", code: "QLN", day: 3, time: "10:42", dist: 3539 },
  { name: "Trivandrum North", code: "TVCN", day: 3, time: "12:30", dist: 3597 },
];

function initMarudharTrack() {
  const container = document.getElementById("marudhar-stations-container");
  if (!container) return;
  container.innerHTML = "";

  const totalDist = 1168;
  const isMobile = window.innerWidth <= 768;
  const keyStations = new Set([0, 4, 8, 12, 16, 20, 24, 28, 32, 35]);

  marudharFullRoute.forEach((stn, index) => {
    const pos = (stn.dist / totalDist) * 100;
    const marker = document.createElement("div");
    const isKey = keyStations.has(index);

    marker.style.position = "absolute";
    marker.style.left = pos + "%";
    marker.style.top = "12px";
    marker.style.transform = "translateX(-50%)";
    marker.style.textAlign = "center";
    
    if (isMobile && !isKey) {
      marker.style.visibility = "hidden";
      marker.style.opacity = "0";
    }
    marker.className = "marudhar-stn-marker";

    marker.innerHTML = `
            <div style="width:8px; height:8px; background:#adb5bd; border-radius:50%; margin:0 auto; border:2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>
            <div style="font-size:9px; font-weight:bold; color:#6c757d; margin-top:4px; white-space:nowrap; transform: rotate(-45deg); transform-origin: top center;">${stn.code}</div>
        `;
    container.appendChild(marker);
  });
}

function getSmartInitialDate() {
   const now = new Date();
   now.setHours(0, 0, 0, 0);
   
   const tripStartDate = new Date("2026-05-27T00:00:00");
   const tripEndDate = new Date("2026-05-27T23:59:59");

   if (now < tripStartDate) {
     return "2026-05-27";
   }
   else {
     return now.toISOString().split("T")[0];
   }
}

function updateMarudharTracker() {
   try {
     const input = document.getElementById("marudhar-date");
     const countdownWrap = document.getElementById("marudhar-countdown-wrap");
     const countdownText = document.getElementById("marudhar-countdown-text");
     const statusBadge = document.getElementById("trip-status-badge");
     const statusBox = document.getElementById("marudhar-status-text");
     const fill = document.getElementById("marudhar-progress-fill");
     const train = document.getElementById("marudhar-train-icon");
     const percentText = document.getElementById("marudhar-percent");

     if (!input || !countdownWrap) return;

     const now = new Date();
     const selectedDateValue = input.value;

     const tripStartDate = new Date("2026-05-27T00:00:00");
     const tripEndDate = new Date("2026-05-27T23:59:59");
     
     const todayStart = new Date();
     todayStart.setHours(0, 0, 0, 0);

     const depTime = new Date(selectedDateValue + "T16:40:00");
     const totalJourneyMinutes = 1490;
     const elapsed = Math.floor((now - depTime) / 60000);

     let pct = (elapsed / totalJourneyMinutes) * 100;
     pct = Math.max(0, Math.min(100, pct));

     if (fill) fill.style.width = pct + "%";
     if (train) train.style.left = pct + "%";
     if (percentText) percentText.innerText = Math.floor(pct) + "% Completed";
     
     const dateDisplay = document.getElementById("marudhar-date-display");
     if (dateDisplay) {
       dateDisplay.innerText = new Date(selectedDateValue).toLocaleDateString("en-GB");
     }

     if (todayStart < tripStartDate && selectedDateValue === "2026-05-27") {
       const diffInMs = tripStartDate - todayStart;
       const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

       if (countdownWrap) countdownWrap.style.display = "block";
       if (countdownText) countdownText.innerText = `${diffInDays} ${diffInDays === 1 ? "Day" : "Days"} to Departure`;

       if (statusBox) {
         statusBox.innerText = "Journey Pending";
         statusBox.className = "fw-black text-muted mb-1";
       }
       if (statusBadge) {
         statusBadge.className = "auto-lock-badge bg-warning-subtle text-dark";
         statusBadge.innerHTML = '<i class="bi bi-clock"></i> Upcoming';
       }

       if (fill) fill.style.width = "0%";
       if (train) train.style.left = "0%";
       if (percentText) percentText.innerText = "0% Completed";
     } else {
       if (countdownWrap) countdownWrap.style.display = "none";

       if (pct >= 100) {
         if (statusBox) {
           statusBox.innerText = "Arrived at Jodhpur";
           statusBox.className = "fw-black text-success mb-1";
         }
         if (statusBadge) {
           statusBadge.className = "auto-lock-badge bg-success-subtle text-success";
           statusBadge.innerHTML = '<i class="bi bi-check-circle"></i> Completed';
         }
       } else if (pct <= 0) {
         if (statusBox) {
           statusBox.innerText = "Waiting to Depart";
           statusBox.className = "fw-black text-warning mb-1";
         }
         if (statusBadge) {
           statusBadge.className = "auto-lock-badge bg-primary-subtle text-primary";
           statusBadge.innerHTML = '<i class="bi bi-train-front"></i> At Origin';
         }
       } else {
         if (statusBox) {
           statusBox.innerText = "En Route to Jodhpur";
           statusBox.className = "fw-black text-danger mb-1";
         }
         if (statusBadge) {
           statusBadge.className = "auto-lock-badge bg-danger-subtle text-danger";
           statusBadge.innerHTML = '<i class="bi bi-geo-alt-fill"></i> Live Trip';
         }
       }
     }

     if (typeof updateStationMarkers === "function") {
       updateStationMarkers(elapsed, depTime, selectedDateValue);
     }
   } catch (e) {
     console.error("Error updating Marudhar tracker:", e);
   }
}

function updateStationMarkers(elapsed, depTime, selectedDateValue) {
    try {
        let lastPassedStation = null;
        let nextStation = null;

        marudharFullRoute.forEach((stn, index) => {
            const stationMinutes = calculateMinutesForStation(stn);
            const marker = document.getElementById("marudhar-stations-container")?.children[index];
            
            if (marker) {
                if (elapsed >= stationMinutes) {
                    marker.style.opacity = "1";
                    marker.style.filter = "brightness(1)";
                    lastPassedStation = stn;
                } else {
                    marker.style.opacity = "0.5";
                    marker.style.filter = "brightness(0.7)";
                    if (!nextStation) nextStation = stn;
                }
            }
        });

        const prevDisplay = document.getElementById("marudhar-prev");
        const nextDisplay = document.getElementById("marudhar-next");

        if (prevDisplay) {
            prevDisplay.innerText = lastPassedStation ? `${lastPassedStation.name} (${lastPassedStation.code})` : "Journey Start";
        }
        if (nextDisplay) {
            nextDisplay.innerText = nextStation ? `${nextStation.name} (${nextStation.code})` : "Journey End";
        }
    } catch (e) {
        console.error("Error updating station markers:", e);
    }
}

function calculateMinutesForStation(station) {
  const timeParts = station.time.split(":");
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const depHours = 16;
  const depMinutes = 40;
  const depTotalMinutes = depHours * 60 + depMinutes;
  const stationTotalMinutes = hours * 60 + minutes;
  
  if (station.day > 1) {
    return (24 * 60 * (station.day - 1)) + stationTotalMinutes - depTotalMinutes;
  } else {
    if (stationTotalMinutes < depTotalMinutes) {
      return (24 * 60) + stationTotalMinutes - depTotalMinutes;
    }
    return stationTotalMinutes - depTotalMinutes;
  }
}
function setMarudharToday() {
  const input = document.getElementById("marudhar-date");
  if (input) {
    input.value = new Date().toISOString().split("T")[0];
    updateMarudharTracker();
  }
}

function setSainikToday() {
  const input = document.getElementById("sainik-date");
  if (input) {
    input.value = new Date().toISOString().split("T")[0];
    updateSainikTracker();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("marudhar-date");
  if (input) input.value = getSmartInitialDate();

  if (typeof initMarudharTrack === "function") initMarudharTrack();
  updateMarudharTracker();

  const sainikInput = document.getElementById("sainik-date");
  if (sainikInput) {
    sainikInput.value = getSainikSmartInitialDate();
  }
  if (typeof initSainikTrack === "function") initSainikTrack();
  updateSainikTracker();

  const ThiruvananthapuramInput = document.getElementById("thiruvananthapuram-date");
  if (ThiruvananthapuramInput) {
    ThiruvananthapuramInput.value = getThiruvananthapuramSmartInitialDate();
    handleThiruvananthapuramDateChange(ThiruvananthapuramInput.value);
  }
  if (typeof initThiruvananthapuramTrack === "function") {
    initThiruvananthapuramTrack();
  }
  setTimeout(() => updateThiruvananthapuramTracker(), 100);
  setInterval(updateThiruvananthapuramTracker, 60000);

  document.querySelectorAll('[data-action="update-thiruvananthapuram"]').forEach(el => {
    el.addEventListener("click", () => {
      updateThiruvananthapuramTracker();
    });
  });

  document.querySelectorAll('[data-action="set-thiruvananthapuram-today"]').forEach(el => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      setThiruvananthapuramToday();
    });
  });

  const ThiruvananthapuramDateInput = document.getElementById("thiruvananthapuram-date");
  if (ThiruvananthapuramDateInput) {
    ThiruvananthapuramDateInput.addEventListener("change", () => handleThiruvananthapuramDateChange(ThiruvananthapuramDateInput.value));
  }
});

window.addEventListener("resize", () => {
  const day4 = document.getElementById("day4");
  if (day4 && day4.style.display === "block") {
    initMarudharTrack();
    updateMarudharTracker();
  }
});

const sainikFullRoute = [
  { name: "Jaipur Jn", code: "JP", time: "20:45", dist: 0 },
  { name: "Dahar Ka Balaji", code: "DKBJ", time: "20:55", dist: 3.4 },
  { name: "Chomun Samod", code: "COM", time: "21:18", dist: 28.4 },
  { name: "Govindgarh Malikpur", code: "GND", time: "21:30", dist: 39.3 },
  { name: "Ringas Jn", code: "RGS", time: "21:55", dist: 60.1 },
  { name: "Palsana", code: "PLSN", time: "22:15", dist: 82.8 },
  { name: "Sikar Jn", code: "SIKR", time: "22:55", dist: 110.2 },
  { name: "Nawalgarh", code: "NWH", time: "23:20", dist: 137.6 },
  { name: "Dundlodh Mukundgarh", code: "DOB", time: "23:33", dist: 148.2 },
  { name: "Nua", code: "NUA", time: "23:48", dist: 163.1 },
  { name: "Jhunjhunu", code: "JJN", time: "00:06", dist: 174.7 },
  { name: "Ratan Shahr", code: "RSH", time: "00:23", dist: 189.1 },
  { name: "Chirawa", code: "CRWA", time: "00:38", dist: 203.7 },
  { name: "Surajgarh", code: "SRGH", time: "00:51", dist: 215.2 },
  { name: "Loharu Jn", code: "LHU", time: "01:45", dist: 232.3 },
  { name: "Satnali", code: "STNL", time: "02:12", dist: 249.4 },
  { name: "Mahendragarh", code: "MHRG", time: "02:32", dist: 273.1 },
  { name: "Kanina Khas", code: "KNNK", time: "02:48", dist: 289.5 },
  { name: "Dahina Zainabad", code: "DZB", time: "02:59", dist: 298.3 },
  { name: "Rewari Jn", code: "RE", time: "03:55", dist: 323.5 },
  { name: "Pataudi Road", code: "PTRD", time: "04:17", dist: 344.8 },
  { name: "Gurgaon", code: "GGN", time: "04:42", dist: 374.8 },
  { name: "Delhi Cantt", code: "DEC", time: "05:15", dist: 391.8 }
];

function initSainikTrack() {
  const container = document.getElementById("sainik-stations-container");
  if (!container) return;
  container.innerHTML = "";
  const totalDist = 391.8;

  sainikFullRoute.forEach((stn) => {
    const pos = (stn.dist / totalDist) * 100;
    const marker = document.createElement("div");
    marker.style.position = "absolute";
    marker.style.left = pos + "%";
    marker.style.top = "12px";
    marker.style.transform = "translateX(-50%)";
    marker.style.textAlign = "center";
    marker.innerHTML = `
            <div style="width:8px; height:8px; background:#adb5bd; border-radius:50%; margin:0 auto; border:2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>
            <div style="font-size:9px; font-weight:bold; color:#6c757d; margin-top:4px; white-space:nowrap; transform: rotate(-45deg); transform-origin: top center;">${stn.code}</div>
        `;
    container.appendChild(marker);
  });
}

function updateSainikTracker() {
   try {
     const input = document.getElementById("sainik-date");
     const countdownWrap = document.getElementById("sainik-countdown-wrap");
     const countdownText = document.getElementById("sainik-countdown-text");
     const statusBadge = document.getElementById("sainik-status-badge");
     const statusBox = document.getElementById("sainik-status-text");
     const fill = document.getElementById("sainik-progress-fill");
     const train = document.getElementById("sainik-train-icon");
     const percentText = document.getElementById("sainik-percent");
     const prevLabel = document.getElementById("sainik-prev");
     const nextLabel = document.getElementById("sainik-next");

     if (!input) return;

     const now = new Date();
     const selectedDateValue = input.value;
     
     const dateDisplay = document.getElementById("sainik-date-display");
     if (dateDisplay) {
       dateDisplay.innerText = new Date(selectedDateValue).toLocaleDateString("en-GB");
     }

     const officialTripDate = new Date("2026-05-28T00:00:00");
     const todayStart = new Date();
     todayStart.setHours(0, 0, 0, 0);

     const depTime = new Date(selectedDateValue + "T20:45:00");
     const totalJourneyMinutes = 510;
     const elapsed = Math.floor((now - depTime) / 60000);

     let pct = (elapsed / totalJourneyMinutes) * 100;
     pct = Math.max(0, Math.min(100, pct));

     if (fill) fill.style.width = pct + "%";
     if (train) train.style.left = pct + "%";
     if (percentText) percentText.innerText = Math.floor(pct) + "% Completed";

     if (todayStart < officialTripDate && selectedDateValue === "2026-05-28") {
       const diffInMs = officialTripDate - todayStart;
       const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
       if (countdownWrap) {
         countdownWrap.style.display = "block";
         if (countdownText) countdownText.innerText = `${diffInDays} ${diffInDays === 1 ? "Day" : "Days"} to Departure`;
       }
       if (statusBox) {
         statusBox.innerText = "Journey Pending";
       }
       if (statusBadge) {
         statusBadge.className = "auto-lock-badge bg-warning-subtle text-dark";
         statusBadge.innerHTML = '<i class="bi bi-clock"></i> Upcoming';
       }
       if (fill) fill.style.width = "0%";
       if (train) train.style.left = "0%";
       if (percentText) percentText.innerText = "0% Completed";
     } else {
       if (countdownWrap) countdownWrap.style.display = "none";
       if (pct >= 100) {
         if (statusBox) statusBox.innerText = "Arrived at Delhi Cantt";
         if (statusBadge) {
           statusBadge.className = "auto-lock-badge bg-success-subtle text-success";
           statusBadge.innerHTML = '<i class="bi bi-check-circle"></i> Completed';
         }
         if (prevLabel) {
           prevLabel.innerText = "Delhi Cantt (DEC)";
         }
         if (nextLabel) {
           nextLabel.innerText = "Journey End";
         }
       } else if (pct <= 0) {
         if (statusBox) statusBox.innerText = "Waiting to Depart";
         if (statusBadge) {
           statusBadge.className = "auto-lock-badge bg-primary-subtle text-primary";
           statusBadge.innerHTML = '<i class="bi bi-train-front"></i> At Origin';
         }
       } else {
         if (statusBox) statusBox.innerText = "En Route to Delhi Cantt";
         if (statusBadge) {
           statusBadge.className = "auto-lock-badge bg-danger-subtle text-danger";
           statusBadge.innerHTML = '<i class="bi bi-geo-alt-fill"></i> Live Trip';
         }
       }
     }
   } catch (e) {
     console.error("Error updating Sainik tracker:", e);
   }
}

function getSainikSmartInitialDate() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  const tripStartDate = new Date("2026-05-28T00:00:00");
  const tripEndDate = new Date("2026-05-28T23:59:59");

  if (now < tripStartDate) {
    return "2026-05-28";
  } else {
    return now.toISOString().split("T")[0];
  }
}

function initThiruvananthapuramTrack() {
  const container = document.getElementById("thiruvananthapuram-stations-container");
  if (!container) {
    console.log("Container not found");
    return;
  }
  container.innerHTML = "";

  const totalDist = 3597;
  const startMins = ThiruvananthapuramFullRoute[0].dist;
  const endMins = ThiruvananthapuramFullRoute[ThiruvananthapuramFullRoute.length - 1].dist;
  const totalRange = endMins - startMins;
  const isMobile = window.innerWidth <= 768;
  const mobileKeyStations = new Set([0, 4, 6, 10, 13, 17, 20, 23, 28, 29]);
  const keyStations = new Set([0, 4, 6, 8, 10, 13, 17, 20, 23, 26, 28, 29]);
  const activeKeyStations = isMobile ? mobileKeyStations : keyStations;

  ThiruvananthapuramFullRoute.forEach((stn, i) => {
    let position = ((stn.dist - startMins) / totalRange) * 100;
    const marker = document.createElement("div");
    const isKey = activeKeyStations.has(i);
    
    if (isMobile) {
      if (i === 28) position = Math.max(0, position - 3);
      if (i === 29) position = Math.min(100, position + 3);
    }
    
    marker.className = "stn-marker";
    marker.style.left = position + "%";
    marker.id = `thiruvananthapuram-stn-${i}`;
    marker.innerHTML = `<div class="stn-dot"></div><div class="stn-code">${stn.code}</div>`;
    
    if (isMobile && !isKey) {
      marker.style.visibility = "hidden";
      marker.style.opacity = "0";
    }
    
    container.appendChild(marker);
  });
}

function calculateThiruvananthapuramMinutes(station) {
  const timeParts = station.time.split(":");
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const depHours = 13;
  const depMinutes = 10;
  const depTotalMinutes = depHours * 60 + depMinutes;
  const stationTotalMinutes = hours * 60 + minutes;
  
  if (station.day > 1) {
    return (24 * 60 * (station.day - 1)) + stationTotalMinutes - depTotalMinutes;
  } else {
    return stationTotalMinutes - depTotalMinutes;
  }
}

function updateThiruvananthapuramTracker() {
  try {
    const input = document.getElementById("thiruvananthapuram-date");
    const countdownWrap = document.getElementById("thiruvananthapuram-countdown-wrap");
    const countdownText = document.getElementById("thiruvananthapuram-countdown-text");
    const statusBadge = document.getElementById("thiruvananthapuram-status-badge");
    const statusBox = document.getElementById("thiruvananthapuram-status-text");
    const statusTextMain = document.getElementById("thiruvananthapuram-status-text-main");
    const fill = document.getElementById("thiruvananthapuram-progress-fill");
    const train = document.getElementById("thiruvananthapuram-train-icon");
    const percentText = document.getElementById("thiruvananthapuram-percent");
    const prevLabel = document.getElementById("thiruvananthapuram-prev");
    const nextLabel = document.getElementById("thiruvananthapuram-next");
    const dateDisplay = document.getElementById("thiruvananthapuram-date-display");

    if (!input) return;

    const now = new Date();
    const selectedDateValue = input.value;

    if (dateDisplay) {
      dateDisplay.innerText = new Date(selectedDateValue).toLocaleDateString("en-GB");
    }

    const tripStartDate = new Date("2026-05-31T00:00:00");
    const tripEndDate = new Date("2026-06-03T23:59:59");
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const depTime = new Date(selectedDateValue + "T13:10:00");
    const totalJourneyMinutes = 2732;

    let elapsed = 0;
    let pct = 0;
    let prevStn = null;
    let nextStn = null;

    if (now >= depTime) {
      elapsed = Math.floor((now - depTime) / 60000);
      
      ThiruvananthapuramFullRoute.forEach((stn) => {
        const stationMinutes = calculateThiruvananthapuramMinutes(stn);
        if (elapsed >= stationMinutes) {
          prevStn = stn;
        } else if (!nextStn) {
          nextStn = stn;
        }
      });

      if (prevStn) {
        const totalDist = 3597;
        const currentDist = prevStn.dist;
        pct = (currentDist / totalDist) * 100;
      }
    }

    if (fill) fill.style.width = pct + "%";
    if (train) train.style.left = pct + "%";
    if (percentText) percentText.innerText = Math.floor(pct) + "% Completed";

    if (now < depTime) {
      const diffMs = depTime - now;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      if (countdownWrap) {
        countdownWrap.style.display = "block";
        if (countdownText) countdownText.innerHTML = `<i class="bi bi-hourglass-split"></i> Departs in ${diffDays}d ${diffHrs}h ${diffMins}m`;
      }
      if (statusBox) statusBox.innerText = "Scheduled";
      if (statusTextMain) statusTextMain.innerText = "Scheduled";
      if (statusBadge) {
        statusBadge.className = "auto-lock-badge bg-warning-subtle text-dark";
        statusBadge.innerHTML = '<i class="bi bi-clock"></i> Upcoming';
      }
      if (prevLabel) prevLabel.innerText = "---";
      if (nextLabel) nextLabel.innerText = "Amritsar Jn (ASR)";
    } else {
      if (countdownWrap) countdownWrap.style.display = "none";

      if (prevLabel) {
        prevLabel.innerText = prevStn ? `${prevStn.name} (${prevStn.code})` : "---";
      }
      if (nextLabel) {
        nextLabel.innerText = nextStn ? `${nextStn.name} (${nextStn.code})` : "Journey End";
      }

      ThiruvananthapuramFullRoute.forEach((s, i) => {
        const m = document.getElementById(`thiruvananthapuram-stn-${i}`);
        if (m) {
          const stationMinutes = calculateThiruvananthapuramMinutes(s);
          if (elapsed >= stationMinutes) m.classList.add("passed");
          else m.classList.remove("passed");
        }
      });

      if (pct >= 100) {
        if (statusBox) statusBox.innerText = "Arrived at Trivandrum North";
        if (statusTextMain) statusTextMain.innerText = "Arrived at Trivandrum North";
        if (statusBadge) {
          statusBadge.className = "auto-lock-badge bg-success-subtle text-success";
          statusBadge.innerHTML = '<i class="bi bi-check-circle"></i> Completed';
        }
        if (nextLabel) nextLabel.innerText = "Trivandrum North (TVCN)";
      } else if (pct <= 0) {
        if (statusBox) statusBox.innerText = "Waiting to Depart";
        if (statusTextMain) statusTextMain.innerText = "Waiting to Depart";
        if (statusBadge) {
          statusBadge.className = "auto-lock-badge bg-primary-subtle text-primary";
          statusBadge.innerHTML = '<i class="bi bi-train-front"></i> At Origin';
        }
      } else {
        if (statusBox) statusBox.innerText = "En Route to Trivandrum North";
        if (statusTextMain) statusTextMain.innerText = "En Route - " + (prevStn ? prevStn.name : "...");
        if (statusBadge) {
          statusBadge.className = "auto-lock-badge bg-danger-subtle text-danger";
          statusBadge.innerHTML = '<i class="bi bi-geo-alt-fill"></i> Live Trip';
        }
      }
    }
    
    const lockBadge = document.getElementById('thiruvananthapuram-lock-badge');
    if (lockBadge) {
      if (selectedDateValue === "2026-05-31") {
        lockBadge.style.display = "inline-block";
      } else {
        lockBadge.style.display = "none";
      }
    }
  } catch (e) {
    console.error("Error updating Thiruvananthapuram tracker:", e);
  }
}

function setThiruvananthapuramToday() {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  const dateString = `${y}-${m}-${d}`;
  document.getElementById("thiruvananthapuram-date").value = dateString;
  handleThiruvananthapuramDateChange(dateString);
}

function handleThiruvananthapuramDateChange(val) {
  if (!val) return;
  const [y, m, d] = val.split("-");
  document.getElementById("thiruvananthapuram-date-display").innerText = `${d}/${m}/${y}`;
  updateThiruvananthapuramTracker();
}

function getThiruvananthapuramSmartInitialDate() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  const tripStartDate = new Date("2026-05-31T00:00:00");
  const tripEndDate = new Date("2026-06-03T00:00:00");

  if (now < tripStartDate) {
    return "2026-05-31";
  } else if (now > tripEndDate) {
    return now.toISOString().split("T")[0];
  } else {
    return now.toISOString().split("T")[0];
  }
}

function showAadhar() {
  const aadharEl = document.getElementById("aadhar-section");

  if (aadharEl && aadharEl.style.display === "block") {
    showToast("Already viewing Aadhar Vault");
    return;
  }

  hideAll();

  if (aadharEl) {
    aadharEl.style.display = "block";
    aadharEl.style.opacity = "1";
  }

  const prevCol = document.getElementById("prevCol");
  const dropCol = document.getElementById("dropCol");
  if (prevCol) prevCol.classList.add("d-none");
  if (dropCol) dropCol.classList.replace("col-6", "col-9");

  const nav = document.getElementById("nav-wrapper");
  const navbar = document.querySelector(".navbar");
  if (nav && navbar) {
    navbar.classList.remove("fixed-top");
    nav.classList.add("sticky-top");
    nav.style.top = "0px";
    nav.style.zIndex = "1019";
    nav.style.pointerEvents = "auto";
    document.body.style.paddingTop = "0px";
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(reveal, 100);
}

function showEntertainment() {
  const entertainmentEl = document.getElementById("entertainment-page");

  if (entertainmentEl && entertainmentEl.style.display === "block") {
    showToast("Already viewing Entertainment");
    return;
  }

  hideAll();

  if (entertainmentEl) {
    entertainmentEl.style.display = "block";
    entertainmentEl.style.opacity = "1";
  }

  const nav = document.getElementById("nav-wrapper");
  const navbar = document.querySelector(".navbar");
  if (nav && navbar) {
    navbar.classList.remove("fixed-top");
    nav.classList.add("sticky-top");
    nav.style.top = "0px";
    document.body.style.paddingTop = "0px";
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(reveal, 100);
}

window.addEventListener("scroll", reveal);

function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    }
  }
}

reveal();

function initScrollObserver() {
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

function triggerRevealAnimations() {
  document.querySelectorAll(".reveal-on-scroll").forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("is-visible");
    }, index * 50);
  });
}

function initRetroGridsInSection(sectionId) {
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



window.goHome = goHome;
window.showDay = showDay;
window.showPDFs = showPDFs;
window.nextDay = nextDay;
window.prevDay = prevDay;
window.setToday = setToday;
window.showAadhar = showAadhar;
window.showEntertainment = showEntertainment;
window.updateDropdownText = updateDropdownText;
window.setSainikToday = setSainikToday;