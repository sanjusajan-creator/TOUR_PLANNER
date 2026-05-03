/**
 * Packing List Module
 * Checklist with categories and progress tracking
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'tour_packing_list';

  // Default packing list template
  const DEFAULT_ITEMS = {
    clothes: [
      { name: 'T-shirts', qty: 5, packed: false },
      { name: 'Pants/Trousers', qty: 2, packed: false },
      { name: 'Underwear', qty: 5, packed: false },
      { name: 'Socks', qty: 3, packed: false },
      { name: 'Sleepwear', qty: 1, packed: false },
      { name: 'Footwear', qty: 1, packed: false }
    ],
    toiletries: [
      { name: 'Toothbrush', qty: 1, packed: false },
      { name: 'Toothpaste', qty: 1, packed: false },
      { name: 'Shampoo', qty: 1, packed: false },
      { name: 'Soap/Body wash', qty: 1, packed: false },
      { name: 'Deodorant', qty: 1, packed: false }
    ],
    documents: [
      { name: 'Photo ID', qty: 1, packed: false },
      { name: 'Train Tickets', qty: 1, packed: false },
      { name: 'Hotel Booking', qty: 1, packed: false }
    ],
    electronics: [
      { name: 'Phone', qty: 1, packed: false },
      { name: 'Phone Charger', qty: 1, packed: false },
      { name: 'Power Bank', qty: 1, packed: false },
      { name: 'Camera', qty: 1, packed: false }
    ],
    misc: [
      { name: 'Medications', qty: 1, packed: false },
      { name: 'Snacks', qty: 1, packed: false },
      { name: 'Water Bottle', qty: 1, packed: false },
      { name: 'Umbrella', qty: 1, packed: false }
    ]
  };

  let packingList = {};

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', initPacking);

  function initPacking() {
    loadPackingList();
    renderCategories();
    updateProgress();

    // Form handler
    const form = document.getElementById('packing-form');
    if (form) {
      form.addEventListener('submit', handleAddItem);
    }

    console.log('Packing list initialized');
  }

  function loadPackingList() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      packingList = stored ? JSON.parse(stored) : JSON.parse(JSON.stringify(DEFAULT_ITEMS));
    } catch (e) {
      console.error('Failed to load packing list:', e);
      packingList = JSON.parse(JSON.stringify(DEFAULT_ITEMS));
    }
  }

  function savePackingList() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(packingList));
    } catch (e) {
      console.error('Failed to save packing list:', e);
    }
  }

  function handleAddItem(e) {
    e.preventDefault();
    const nameInput = document.getElementById('packing-item');
    const categorySelect = document.getElementById('packing-category');

    if (!nameInput || !categorySelect) return;

    const name = nameInput.value.trim();
    const category = categorySelect.value;

    if (!name) return;

    if (!packingList[category]) {
      packingList[category] = [];
    }

    packingList[category].push({ name: name, qty: 1, packed: false });

    nameInput.value = '';

    savePackingList();
    renderCategories();
    updateProgress();
  }

  function toggleItem(category, index) {
    if (packingList[category] && packingList[category][index]) {
      packingList[category][index].packed = !packingList[category][index].packed;
      savePackingList();
      renderCategories();
      updateProgress();
    }
  }

  function deleteItem(category, index) {
    if (packingList[category] && packingList[category][index]) {
      packingList[category].splice(index, 1);
      savePackingList();
      renderCategories();
      updateProgress();
    }
  }

  function renderCategories() {
    Object.keys(packingList).forEach(category => {
      const list = document.getElementById(`packing-list-${category}`);
      if (!list) return;

      const items = packingList[category];
      list.innerHTML = items.map((item, index) => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div class="form-check">
            <input class="form-check-input packing-checkbox required-glow" type="checkbox"
                   ${item.packed ? 'checked' : ''}
                   onchange="togglePackingItem('${category}', ${index})" />
            <label class="form-check-label ${item.packed ? 'text-decoration-line-through text-muted' : ''}">${item.name}</label>
            ${item.qty > 1 ? `<span class="badge bg-secondary ms-2">x${item.qty}</span>` : ''}
          </div>
          <button class="btn btn-sm btn-outline-danger" onclick="deletePackingItem('${category}', ${index})">&times;</button>
        </li>
      `).join('');
    });
  }

  function updateProgress() {
    let total = 0;
    let packed = 0;

    Object.keys(packingList).forEach(category => {
      const items = packingList[category];
      const catTotal = items.length;
      const catPacked = items.filter(i => i.packed).length;

      total += catTotal;
      packed += catPacked;

      // Update category badge
      const badge = document.querySelector(`.${category}-count`);
      if (badge) {
        badge.textContent = `${catPacked} / ${catTotal}`;
      }
    });

    const percent = total > 0 ? Math.round((packed / total) * 100) : 0;

    const progressEl = document.getElementById('packing-progress');
    const barEl = document.getElementById('packing-bar');

    if (progressEl) {
      progressEl.textContent = `${packed} / ${total}`;
    }
    if (barEl) {
      // Force inline style to override Bootstrap
      barEl.setAttribute('style', `width: ${percent}% !important; background-color: #0d9488;`);
      barEl.textContent = `${percent}%`;
      barEl.setAttribute('aria-valuenow', percent);
    }
  }

  // Make functions global
  window.togglePackingItem = toggleItem;
  window.deletePackingItem = deleteItem;
  window.resetPacking = resetPacking;
  window.updatePackingProgress = updateProgress;

  // Export initialization
  window.initPacking = initPacking;

  function resetPacking() {
    if (!confirm('Reset packing list to default essentials?')) {
      return;
    }
    
    // Restore to default essentials (deep copy to avoid reference issues)
    packingList = JSON.parse(JSON.stringify(DEFAULT_ITEMS));
    
    // Save and update UI
    savePackingList();
    renderCategories();
    updateProgress();
  }
})();