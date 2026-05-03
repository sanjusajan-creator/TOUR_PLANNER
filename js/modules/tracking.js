/**
 * Tracking Module - Handles train tracking and journey progress visualization
 */

// Main train route schedule
export const tripSchedule = [
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

// Marudhar Express route (Varanasi to Jodhpur)
export const marudharFullRoute = [
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

// Sainik Express route (Jaipur to Delhi)
export const sainikFullRoute = [
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

/**
 * @description Initialize station markers on the main tracking bar based on trip schedule
 * @returns {void}
 */
export function initMarkers() {
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

/**
 * @description Update the main train tracker display with current position and status
 * @returns {void}
 */
export function updateTracker() {
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

/**
 * @description Set the journey date input to today's date
 * @returns {void}
 */
export function setToday() {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");

  const dateString = `${y}-${m}-${d}`;
  document.getElementById("journey-date").value = dateString;
  handleDateChange(dateString);
}

/**
 * @description Sync and update live position of the train
 * @returns {void}
 */
export function syncLive() {
  updateTracker();
}

/**
 * @description Set initial date based on trip schedule and current date
 * @returns {void}
 */
export function setInitialDate() {
  const dateInput = document.getElementById("journey-date");
  const display = document.getElementById("formatted-date-display");
  const now = new Date();

  const tripStartDate = new Date("2026-05-24T00:00:00");
  const tripEndDate = new Date("2026-05-26T23:59:59");

  let initialDate;

  if (now < tripStartDate) {
    initialDate = tripStartDate;
    const badge = document.querySelector(".auto-lock-badge");
    if (badge) badge.style.display = "inline-block";
  } 
  else if (now >= tripStartDate && now <= tripEndDate) {
    initialDate = now;
    const badge = document.querySelector(".auto-lock-badge");
    if (badge) badge.style.display = "inline-block";
  }
  else {
    initialDate = now;
    const badge = document.querySelector(".auto-lock-badge");
    if (badge) badge.style.display = "none";
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

/**
 * @description Handle date input change and update tracker display
 * @param {string} val - The date value in YYYY-MM-DD format
 * @returns {void}
 * @listens change - Journey date input
 */
export function handleDateChange(val) {
  if (!val) return;
  const [y, m, d] = val.split("-");
  document.getElementById("formatted-date-display").innerText =
    `${d}/${m}/${y}`;
  updateTracker();
}

/**
 * @description Setup initial date configuration with countdown display if applicable
 * @returns {void}
 */
export function setupDate() {
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

/**
 * @description Update countdown timer display every second until target date
 * @param {Date} target - Target date/time to count down to
 * @returns {void} Starts interval that updates countdown display
 */
export function updateCountdown(target) {
  setInterval(() => {
    const diff = target - new Date();
    const days = Math.floor(diff / 86400000);
    const hrs = Math.floor((diff % 86400000) / 3600000);
    document.getElementById("countdown-text").innerHTML =
      `<i class="bi bi-hourglass-split"></i> Departs in ${days}d ${hrs}h`;
  }, 1000);
}

// ============ Marudhar Track Functions ============

/**
 * Get smart initial date for Marudhar journey
 * @returns {string} Date string in YYYY-MM-DD format
 */
export function getSmartInitialDate() {
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

/**
 * @description Initialize Marudhar Express station markers on the tracking bar
 * @returns {void}
 */
export function initMarudharTrack() {
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

/**
 * Calculate minutes from departure for a station
 * @param {Object} station - Station object with time and day
 * @returns {number} Minutes from departure
 */
export function calculateMinutesForStation(station) {
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

/**
 * @description Update station markers based on elapsed time showing passed and upcoming stations
 * @param {number} elapsed - Minutes elapsed since departure
 * @param {Date} depTime - Departure time
 * @param {string} selectedDateValue - Selected date string
 * @returns {void}
 */
export function updateStationMarkers(elapsed, depTime, selectedDateValue) {
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

/**
 * @description Update Marudhar Express tracker display with progress and status
 * @returns {void}
 */
export function updateMarudharTracker() {
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

/**
 * @description Set Marudhar date input to today's date and update tracker
 * @returns {void}
 */
export function setMarudharToday() {
  const input = document.getElementById("marudhar-date");
  if (input) {
    input.value = new Date().toISOString().split("T")[0];
    updateMarudharTracker();
  }
}

// ============ Sainik Track Functions ============

/**
 * Get smart initial date for Sainik journey
 * @returns {string} Date string in YYYY-MM-DD format
 */
export function getSainikSmartInitialDate() {
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

/**
 * @description Initialize Sainik Express station markers on the tracking bar
 * @returns {void}
 */
export function initSainikTrack() {
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

/**
 * @description Update Sainik Express tracker display with progress and status
 * @returns {void}
 */
export function updateSainikTracker() {
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

/**
 * @description Set Sainik date input to today's date and update tracker
 * @returns {void}
 */
export function setSainikToday() {
  const input = document.getElementById("sainik-date");
  if (input) {
    input.value = new Date().toISOString().split("T")[0];
    updateSainikTracker();
  }
}

// Make functions available globally
window.setToday = setToday;
window.setSainikToday = setSainikToday;
window.handleDateChange = handleDateChange;