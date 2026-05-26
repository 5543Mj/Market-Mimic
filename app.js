const STORAGE_KEY = 'mimicMart';

const DEFAULT_ICONS = {
  box: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7l8-4 8 4-8 4-8-4Z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path></svg>`,
  drink: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8v3l2 3v12H6V9l2-3V3Z"></path><path d="M9 3h6"></path><path d="M8 10h8"></path></svg>`,
  cart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2 11h10l2-7H7"></path><circle cx="10" cy="19" r="1.5"></circle><circle cx="17" cy="19" r="1.5"></circle></svg>`,
  apple: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7c2-3 5-3 6-1 1 2 1 5-1 7-1 2-3 4-5 4s-4-2-5-4c-2-2-2-5-1-7 1-2 4-2 6 1Z"></path><path d="M12 6c0-2 1-3 3-4"></path></svg>`,
  basket: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9h14l-1 10H6L5 9Z"></path><path d="M8 9c0-3 2-5 4-5s4 2 4 5"></path></svg>`,
  bread: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10c0-4 4-7 8-7s8 3 8 7v9H4v-9Z"></path><path d="M8 10v9M12 10v9M16 10v9"></path></svg>`,
};

const STORE_OPTIONS = ['Walmart', 'Costco', 'Amazon']; 
const STORE_HOME_URLS = {
  'Walmart': 'https://www.walmart.com/',
  'Costco': 'https://www.costco.com/',
  'Amazon': 'https://www.amazon.com/'
};
const THEMES = ['default', 'ocean', 'sunset'];

function migrateState(rawState) {
  if (!rawState) return null;
  if (rawState.items) {
    rawState.items.forEach(item => {
      if (item.stores && !item.storeDetails) {
        item.storeDetails = {};
        item.stores.forEach(s => {
          item.storeDetails[s] = {
            price: item.price || '',
            unitPrice: item.unitPrice || '',
            unitType: 'oz',
            url: item.url || STORE_HOME_URLS[s] || ''
          };
        });
        delete item.price; delete item.unitPrice; delete item.url; delete item.stores;
      }
    });
  }
  if (rawState.shopping) {
     rawState.shopping.forEach(item => {
       if (item.stores && !item.storeDetails) {
          item.storeDetails = {};
          item.stores.forEach(s => {
            item.storeDetails[s] = { price: item.price || '', unitPrice: item.unitPrice || '', unitType: 'oz', url: item.url || STORE_HOME_URLS[s] || '' };
          });
          delete item.price; delete item.unitPrice; delete item.url; delete item.stores;
       }
     });
  }
  return rawState;
}

const state = migrateState(loadState()) ?? {
  items: [
    {
      id: crypto.randomUUID(),
      name: 'Milk',
      iconKey: 'drink',
      tags: ['dairy', 'drink'],
      storeDetails: {
        'Walmart': { price: 3.49, unitPrice: 0.22, unitType: 'oz', url: 'https://www.walmart.com/' }
      },
      createdAt: Date.now() - 86400000,
    },
  ],
  shopping: [],
  settings: { theme: 'default' },
  filters: { query: '', store: '', tag: '', minPrice: '', maxPrice: '', onlyWithUrl: false },
};

let activeTab = 'history';
let editingItemId = null;
let editingIconItemId = null; 
let editingStoreDetails = {}; 
let swipeStartX = null;
let currentModalTags = [];

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const els = {
  tabs: $$('.tab-btn'),
  panels: { history: $('#historyPanel'), shopping: $('#shoppingPanel'), settings: $('#settingsPanel') },
  historyList: $('#historyList'),
  shoppingList: $('#shoppingList'),
  viewTitle: $('#viewTitle'),
  viewSubtitle: $('#viewSubtitle'),
  searchInput: $('#searchInput'),
  filterBtn: $('#filterBtn'),
  historyToolbar: $('#historyToolbar'),
  openAddBtn: $('#openAddBtn'),
  themeBtn: $('#themeBtn'),
  backupBtn: $('#backupBtn'),
  restoreBtn: $('#restoreBtn'),
  restoreInput: $('#restoreInput'),
  itemModal: $('#itemModal'),
  itemModalBackdrop: $('#itemModalBackdrop'),
  itemForm: $('#itemForm'),
  closeItemModal: $('#closeItemModal'),
  cancelItem: $('#cancelItem'),
  deleteItemBtn: $('#deleteItemBtn'),
  itemModalTitle: $('#itemModalTitle'),
  itemId: $('#itemId'),
  itemName: $('#itemName'),
  iconKey: $('#iconKey'),
  openIconBtn: $('#openIconBtn'),
  iconModal: $('#iconModal'),
  iconModalBackdrop: $('#iconModalBackdrop'),
  closeIconModal: $('#closeIconModal'),
  iconGrid: $('#iconGrid'),
  storeOptions: $('#storeOptions'),
  storeDetailsContainer: $('#storeDetailsContainer'),
  tagChipContainer: $('#tagChipContainer'),
  tagInputField: $('#tagInputField'),
  filterModal: $('#filterModal'),
  filterModalBackdrop: $('#filterModalBackdrop'),
  closeFilterModal: $('#closeFilterModal'),
  filterStore: $('#filterStore'),
  filterTag: $('#filterTag'),
  filterMinPrice: $('#filterMinPrice'),
  filterMaxPrice: $('#filterMaxPrice'),
  onlyWithUrl: $('#onlyWithUrl'),
  clearFilters: $('#clearFilters'),
  applyFilters: $('#applyFilters'),
};

function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function loadState() { try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; } }

function escapeHtml(str = '') { return String(str).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;'); }

function money(value) {
  const n = Number(value);
  return Number.isFinite(n) ? `$${n.toFixed(2)}` : '—';
}

function parseTags(str = '') { return str.split(',').map((t) => t.trim()).filter(Boolean); }
function uniq(arr) { return [...new Set(arr)]; }

function renderModalTags() {
    els.tagChipContainer.innerHTML = currentModalTags.map((tag, index) => `
        <span class="ao3-tag">
            ${escapeHtml(tag)}
            <button type="button" class="ao3-tag-delete" data-index="${index}">&times;</button>
        </span>
    `).join('');
}

function iconMarkup(key) { return DEFAULT_ICONS[key] || DEFAULT_ICONS.box; }

function renderUIOptions() {
  els.filterStore.innerHTML = `<option value="">All stores</option>` +
    STORE_OPTIONS.map((store) => `<option value="${escapeHtml(store)}">${escapeHtml(store)}</option>`).join('');

  els.storeOptions.innerHTML = STORE_OPTIONS.map((store) => `
    <button type="button" class="chip-btn form-store-chip" data-store="${escapeHtml(store)}">${escapeHtml(store)}</button>
  `).join('');

  els.iconGrid.innerHTML = Object.entries(DEFAULT_ICONS).map(([key, svg]) => `
    <button type="button" class="icon-grid-item" data-icon="${key}" title="${key}">
       ${svg}
    </button>
  `).join('');
}

function updateSelectedIconDisplay() { els.openIconBtn.innerHTML = iconMarkup(els.iconKey.value); }

function setTheme(theme) {
  state.settings.theme = theme;
  document.documentElement.dataset.theme = theme === 'default' ? '' : theme;
  saveState();
}

function openModal(modal, backdrop) { modal.classList.remove('hidden'); backdrop.classList.remove('hidden'); }
function closeModal(modal, backdrop) { modal.classList.add('hidden'); backdrop.classList.add('hidden'); }

// --- Modal & Store Detail Management ---
function openItemModal(item = null) {
  editingItemId = item?.id ?? null;
  els.itemModalTitle.textContent = item ? 'Edit Grocery Item' : 'Add Grocery Item';
  els.itemId.value = item?.id ?? '';
  els.itemName.value = item?.name ?? '';
  els.iconKey.value = item?.iconKey ?? 'box';
  updateSelectedIconDisplay();
  
  // NEW: Handle AO3 tags
  currentModalTags = item?.tags ? [...item.tags] : [];
  renderModalTags();
  els.tagInputField.value = '';

  if (item) {
      els.deleteItemBtn.classList.remove('hidden');
  } else {
      els.deleteItemBtn.classList.add('hidden');
  }

  editingStoreDetails = item?.storeDetails ? structuredClone(item.storeDetails) : {};
  syncStoreChipsInModal(); renderStoreDetailsFields();
  openModal(els.itemModal, els.itemModalBackdrop);
}

function closeItemModal() { closeModal(els.itemModal, els.itemModalBackdrop); }

function syncStoreChipsInModal() {
  $$('.form-store-chip').forEach((btn) => {
    btn.classList.toggle('active', !!editingStoreDetails[btn.dataset.store]);
  });
}

function toggleStoreInModal(store) {
  if (editingStoreDetails[store]) delete editingStoreDetails[store];
  else editingStoreDetails[store] = { price: '', unitPrice: '', unitType: 'oz', url: STORE_HOME_URLS[store] || '' };
  syncStoreChipsInModal(); renderStoreDetailsFields();
}

function renderStoreDetailsFields() {
  const stores = Object.keys(editingStoreDetails);
  if (stores.length === 0) {
     els.storeDetailsContainer.innerHTML = '<div class="small" style="padding-bottom:10px;">Select a store above to add pricing.</div>';
     return;
  }

  els.storeDetailsContainer.innerHTML = stores.map(store => {
    const data = editingStoreDetails[store];
    return `
      <div class="store-detail-box">
         <h5>${escapeHtml(store)}</h5>
         <div class="split-inputs">
            <label>Total Price
              <input type="number" step="0.01" min="0" data-store="${store}" data-field="price" value="${data.price}" placeholder="3.49" />
            </label>
            <label>Size & Unit Price
              <div class="unit-inputs">
                <input type="number" step="0.01" min="0" data-store="${store}" data-field="unitSize" value="${data.unitSize || ''}" placeholder="Qty (e.g. 16)" />
                <input type="number" step="0.01" min="0" data-store="${store}" data-field="unitPrice" value="${data.unitPrice}" placeholder="Unit $" />
                <select data-store="${store}" data-field="unitType">
                   <option value="oz" ${data.unitType === 'oz' ? 'selected' : ''}>oz</option>
                   <option value="lb" ${data.unitType === 'lb' ? 'selected' : ''}>lb</option>
                </select>
              </div>
            </label>
         </div>
         <label>URL (Auto defaults if blank)
            <input type="url" data-store="${store}" data-field="url" value="${escapeHtml(data.url)}" placeholder="https://..." />
         </label>
      </div>
    `;
  }).join('');
}

els.storeDetailsContainer.addEventListener('input', (e) => {
   const store = e.target.dataset.store; 
   const field = e.target.dataset.field;
   if (!store || !field) return;
   
   editingStoreDetails[store][field] = e.target.value;

   // Auto-calculate unit price if price or size changes
   if (field === 'price' || field === 'unitSize') {
       const price = parseFloat(editingStoreDetails[store].price);
       const size = parseFloat(editingStoreDetails[store].unitSize);
       
       if (!isNaN(price) && !isNaN(size) && size > 0) {
           const calculated = (price / size).toFixed(2);
           editingStoreDetails[store].unitPrice = calculated;
           
           // Update the UI directly without re-rendering to keep keyboard focus
           const unitPriceInput = els.storeDetailsContainer.querySelector(`input[data-store="${store}"][data-field="unitPrice"]`);
           if (unitPriceInput) unitPriceInput.value = calculated;
       }
   }
});

function openFilterModal() {
  els.filterStore.value = state.filters.store; 
  els.filterTag.value = state.filters.tag; 
  els.filterMinPrice.value = state.filters.minPrice || ''; 
  els.filterMaxPrice.value = state.filters.maxPrice || ''; 
  els.onlyWithUrl.checked = state.filters.onlyWithUrl;
  openModal(els.filterModal, els.filterModalBackdrop);
}
function closeFilterModal() { closeModal(els.filterModal, els.filterModalBackdrop); }

// --- Render Logic ---
function getVisibleItems() {
  const f = state.filters;
  const query = f.query.trim().toLowerCase();

  return state.items.filter((item) => {
    const stores = Object.keys(item.storeDetails || {});
    const text = [item.name, ...(item.tags || []), ...stores].join(' ').toLowerCase();

    if (query && !text.includes(query)) return false;
    if (f.store && !stores.includes(f.store)) return false;
    if (f.tag && !(item.tags || []).some((tag) => tag.toLowerCase().includes(f.tag.toLowerCase()))) return false;
    if (f.onlyWithUrl && !Object.values(item.storeDetails || {}).some(d => !!d.url)) return false;
    
    // Check Price Range (If ANY store is within range, show the item)
    if (f.minPrice !== '' || f.maxPrice !== '') {
        const min = f.minPrice === '' ? 0 : Number(f.minPrice);
        const max = f.maxPrice === '' ? Infinity : Number(f.maxPrice);
        const hasValidPrice = Object.values(item.storeDetails || {}).some(d => {
            const p = Number(d.price);
            return p > 0 && p >= min && p <= max;
        });
        if (!hasValidPrice) return false;
    }
    
    return true;
  });
}

function generateCardHTML(item, isShoppingList = false) {
    const stores = Object.keys(item.storeDetails || {});
    
    const selectedStore = (item.lastSelectedStore && stores.includes(item.lastSelectedStore)) 
        ? item.lastSelectedStore 
        : (stores[0] || null);

    const tags = (item.tags || []).map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join('');
    
    const storeChipsMarkup = stores.map((s) => 
        `<button class="chip store-tab-btn ${s === selectedStore ? 'active-store' : ''}" data-action="switch-store" data-item-id="${item.id}" data-store="${escapeHtml(s)}">${escapeHtml(s)}</button>`
    ).join('');

    let priceMarkup = '<div class="small">No prices saved</div>';
    let linkMarkup = '';
    
    if (selectedStore) {
        const d = item.storeDetails[selectedStore];
        
        const unitMarkup = d.unitPrice 
           ? `<div class="price-group"><div class="small">Per ${d.unitType || 'oz'}</div><div class="small" style="color:var(--text);">${money(d.unitPrice)}</div></div>` 
           : '';

        priceMarkup = `
            <div class="price-group"><div class="price">${money(d.price)}</div></div>
            ${unitMarkup}
        `;
        if (d.url) linkMarkup = `<a class="chip url-link" href="${escapeHtml(d.url)}" target="_blank" rel="noopener">Visit ${escapeHtml(selectedStore)}</a>`;
    }

    let actionMarkup;
    if (isShoppingList) {
        actionMarkup = `
            <button class="action-btn" data-action="edit-shopping" data-id="${item.id}" title="Edit">✎</button>
            <button class="action-btn danger-text" data-action="remove-from-cart" data-id="${item.id}" title="Remove from list">✕</button>
            <label class="check-btn" title="Check off list">
               <input type="checkbox" data-action="toggle-bought" data-id="${item.id}" ${item.bought ? 'checked' : ''} />
            </label>
        `;
    } else {
        const inCart = state.shopping.some((x) => x.sourceId === item.id || x.id === item.id);
        const addBtn = inCart 
           ? `<button class="action-btn in-cart check-remove-btn" data-action="remove-from-cart" data-id="${item.id}" title="Remove from Cart">✓</button>`
           : `<button class="action-btn plus-text" data-action="add-to-shopping" data-id="${item.id}" title="Add to Cart">＋</button>`;
           
        actionMarkup = `
            <button class="action-btn" data-action="edit-item" data-id="${item.id}" title="Edit">✎</button>
            ${addBtn}
        `;
    }

    return `
      <article class="card ${isShoppingList && item.bought ? 'bought' : ''}">
        <div class="card-header">
          <div class="item-main">
            <button type="button" class="icon-badge" data-action="change-icon" data-id="${item.id}" title="Change icon">
               ${iconMarkup(item.iconKey)}
            </button>
            <div class="item-info">
              <h4>${escapeHtml(item.name)}</h4>
              <div class="chips">${tags}</div>
            </div>
          </div>
          <div class="top-actions">
            ${actionMarkup}
          </div>
        </div>
        
        ${storeChipsMarkup ? `<div class="chips">${storeChipsMarkup}</div>` : ''}
        
        <div class="price-row" id="price-row-${item.id}">
           <div class="price-stats" id="price-stats-${item.id}">${priceMarkup}</div>
           <div class="link-wrap" id="link-wrap-${item.id}">${linkMarkup}</div>
        </div>
      </article>
    `;
}

function renderHistory() {
  const items = getVisibleItems().sort((a, b) => b.createdAt - a.createdAt);
  if (!items.length) { els.historyList.innerHTML = `<div class="card"><p>No items match.</p></div>`; return; }
  els.historyList.innerHTML = items.map(item => generateCardHTML(item, false)).join('');
}

function renderShopping() {
  if (!state.shopping.length) { els.shoppingList.innerHTML = `<div class="card"><p>Your list is empty.</p></div>`; return; }
  els.shoppingList.innerHTML = state.shopping.map(item => generateCardHTML(item, true)).join('');
}

function renderViewTitle() {
  const map = { history: ['History', 'Add and manage your grocery catalog.'], shopping: ['Shopping List', 'Check items off after you buy them.'], settings: ['Settings', 'Backup, restore, and theme controls.'] };
  els.viewTitle.textContent = map[activeTab][0]; els.viewSubtitle.textContent = map[activeTab][1];
}

function showTab(tab) {
  activeTab = tab;
  els.tabs.forEach((btn) => { const on = btn.dataset.tab === tab; btn.classList.toggle('active', on); btn.setAttribute('aria-selected', String(on)); });
  Object.entries(els.panels).forEach(([name, panel]) => panel.classList.toggle('active', name === tab));
  $('#historyToolbar').style.display = tab === 'history' ? 'flex' : 'none';
  renderViewTitle();
}

function updateAndRender() { saveState(); renderHistory(); renderShopping(); }

function numOrNull(v) { const n = Number(v); return Number.isFinite(n) ? n : ''; }

function upsertItem() {
  Object.keys(editingStoreDetails).forEach(store => {
     const d = editingStoreDetails[store];
     d.price = numOrNull(d.price); d.unitPrice = numOrNull(d.unitPrice); d.url = d.url.trim() || STORE_HOME_URLS[store] || '';
  });

  const existingItem = state.items.find((x) => x.id === els.itemId.value);

  const item = {
    id: els.itemId.value || crypto.randomUUID(), 
    name: els.itemName.value.trim(), 
    iconKey: els.iconKey.value,
    storeDetails: structuredClone(editingStoreDetails), 
    tags: [...currentModalTags], // <-- Change this line
    createdAt: existingItem?.createdAt || Date.now(),
    lastSelectedStore: existingItem?.lastSelectedStore || null
  };

  const idx = state.items.findIndex((x) => x.id === item.id);
  if (idx >= 0) state.items[idx] = item; else state.items.unshift(item);

  const shoppingIdx = state.shopping.findIndex((x) => x.sourceId === item.id || x.id === item.id);
  if (shoppingIdx >= 0) state.shopping[shoppingIdx] = { ...state.shopping[shoppingIdx], ...item, sourceId: item.id };

  updateAndRender();
}

// --- Action Handlers ---
function addToShopping(itemId) {
  const item = state.items.find((x) => x.id === itemId);
  if (!item) return;
  if (state.shopping.some((x) => x.sourceId === item.id || x.id === item.id)) return;
  state.shopping.unshift({ ...structuredClone(item), id: crypto.randomUUID(), sourceId: item.id, bought: false });
  updateAndRender();
}

function toggleBought(itemId, checked) {
  const item = state.shopping.find((x) => x.id === itemId);
  if (!item) return;
  item.bought = checked;
  updateAndRender();
}

function deleteItem(itemId) {
  state.items = state.items.filter((x) => x.id !== itemId);
  state.shopping = state.shopping.filter((x) => x.sourceId !== itemId && x.id !== itemId);
  updateAndRender();
}

function switchCardStoreInfo(actionEl) {
   const itemId = actionEl.dataset.itemId;
   const storeName = actionEl.dataset.store;
   const card = actionEl.closest('.card');
   
   card.querySelectorAll('.store-tab-btn').forEach(c => c.classList.remove('active-store'));
   actionEl.classList.add('active-store');

   let found = false;
   const historyItem = state.items.find(x => x.id === itemId);
   if (historyItem) { historyItem.lastSelectedStore = storeName; found = true; }

   const shoppingItem = state.shopping.find(x => x.id === itemId);
   if (shoppingItem) { shoppingItem.lastSelectedStore = storeName; found = true; }
   
   if (found) saveState();

   const item = historyItem || shoppingItem;
   if (!item || !item.storeDetails || !item.storeDetails[storeName]) return;
   
   const d = item.storeDetails[storeName];
   
   const priceStats = card.querySelector(`#price-stats-${item.id}`);
   if(priceStats) {
      const unitMarkup = d.unitPrice ? `<div class="price-group"><div class="small">Per ${d.unitType || 'oz'}</div><div class="small" style="color:var(--text);">${money(d.unitPrice)}</div></div>` : '';
      priceStats.innerHTML = `<div class="price-group"><div class="price">${money(d.price)}</div></div>${unitMarkup}`;
   }
   
   const linkWrap = card.querySelector(`#link-wrap-${item.id}`);
   if(linkWrap) {
      linkWrap.innerHTML = d.url ? `<a class="chip url-link" href="${escapeHtml(d.url)}" target="_blank" rel="noopener">Visit ${escapeHtml(storeName)}</a>` : '';
   }
}

function exportBackup() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `mimicMart-${new Date().toISOString().slice(0, 10)}.json`;
  a.click(); URL.revokeObjectURL(a.href);
}

async function restoreBackup(file) {
  const parsed = JSON.parse(await file.text());
  if (!parsed || !Array.isArray(parsed.items) || !parsed.settings) throw new Error('Invalid backup file');
  Object.assign(state, migrateState(parsed));
  setTheme(state.settings.theme || 'default'); updateAndRender();
}

// --- Events Setup ---
function initEvents() {
  els.tabs.forEach((btn) => btn.addEventListener('click', () => showTab(btn.dataset.tab)));
  els.searchInput.addEventListener('input', () => { state.filters.query = els.searchInput.value; saveState(); renderHistory(); });
  els.filterBtn.addEventListener('click', openFilterModal);
  els.openAddBtn.addEventListener('click', () => { editingIconItemId = null; openItemModal(); });

  // Icon Modal Logic
  els.openIconBtn.addEventListener('click', () => { editingIconItemId = null; openModal(els.iconModal, els.iconModalBackdrop); });
  els.closeIconModal.addEventListener('click', () => closeModal(els.iconModal, els.iconModalBackdrop));
  els.iconModalBackdrop.addEventListener('click', () => closeModal(els.iconModal, els.iconModalBackdrop));
  
  els.iconGrid.addEventListener('click', (e) => {
     const btn = e.target.closest('.icon-grid-item');
     if (btn) {
         if (editingIconItemId) {
             const item = state.items.find(x => x.id === editingIconItemId) || state.shopping.find(x => x.id === editingIconItemId);
             if (item) { item.iconKey = btn.dataset.icon; updateAndRender(); }
         } else {
             els.iconKey.value = btn.dataset.icon; updateSelectedIconDisplay();
         }
         closeModal(els.iconModal, els.iconModalBackdrop);
     }
  });

  els.itemForm.addEventListener('submit', (e) => { e.preventDefault(); upsertItem(); closeItemModal(); });
  els.closeItemModal.addEventListener('click', closeItemModal); els.cancelItem.addEventListener('click', closeItemModal); els.itemModalBackdrop.addEventListener('click', closeItemModal);
  
  els.deleteItemBtn.addEventListener('click', () => {
    if (editingItemId && confirm('Are you sure you want to completely delete this item from your catalog?')) {
        deleteItem(editingItemId);
        closeItemModal();
    }
  });

  els.storeOptions.addEventListener('click', (e) => {
    const btn = e.target.closest('.form-store-chip');
    if (btn) toggleStoreInModal(btn.dataset.store);
  });

  els.filterModalBackdrop.addEventListener('click', closeFilterModal); els.closeFilterModal.addEventListener('click', closeFilterModal);
  els.applyFilters.addEventListener('click', () => {
    state.filters.store = els.filterStore.value; 
    state.filters.tag = els.filterTag.value; 
    state.filters.minPrice = els.filterMinPrice.value; 
    state.filters.maxPrice = els.filterMaxPrice.value; 
    state.filters.onlyWithUrl = els.onlyWithUrl.checked;
    saveState(); renderHistory(); closeFilterModal();
  });
  els.clearFilters.addEventListener('click', () => {
    state.filters = { query: '', store: '', tag: '', minPrice: '', maxPrice: '', onlyWithUrl: false };
    els.searchInput.value = ''; els.filterStore.value = ''; els.filterTag.value = ''; els.filterMinPrice.value = ''; els.filterMaxPrice.value = ''; els.onlyWithUrl.checked = false;
    saveState(); renderHistory();
  });

  els.themeBtn.addEventListener('click', () => {
    const next = THEMES[(THEMES.indexOf(state.settings.theme || 'default') + 1) % THEMES.length]; setTheme(next);
  });
  els.backupBtn.addEventListener('click', exportBackup); els.restoreBtn.addEventListener('click', () => els.restoreInput.click());
  els.restoreInput.addEventListener('change', async () => {
    if (!els.restoreInput.files?.[0]) return;
    try { await restoreBackup(els.restoreInput.files[0]); alert('Backup restored!'); } catch (err) { alert('Could not restore backup.'); }
    els.restoreInput.value = '';
  });

  // Global Card Events
  document.body.addEventListener('click', (e) => {
    const actionEl = e.target.closest('[data-action]');
    if (!actionEl) return;
    const { action, id } = actionEl.dataset;

    if (action === 'change-icon') {
       editingIconItemId = id;
       openModal(els.iconModal, els.iconModalBackdrop);
    }
    if (action === 'add-to-shopping') addToShopping(id);
    if (action === 'remove-from-cart') {
       state.shopping = state.shopping.filter((x) => x.sourceId !== id && x.id !== id);
       updateAndRender();
    }
    if (action === 'edit-item' || action === 'edit-shopping') {
      const source = action === 'edit-shopping' ? state.shopping : state.items;
      const item = source.find((x) => x.id === id);
      if (item) { editingIconItemId = null; openItemModal(item); }
    }
    if (action === 'switch-store') switchCardStoreInfo(actionEl);
  });

  els.shoppingList.addEventListener('change', (e) => {
    const input = e.target.closest('[data-action="toggle-bought"]');
    if (input) toggleBought(input.dataset.id, input.checked);
  });

  els.tagInputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
          e.preventDefault(); // Stop the whole form from submitting
          const val = e.target.value.trim();
          if (val && !currentModalTags.includes(val)) {
              currentModalTags.push(val);
              renderModalTags();
          }
          e.target.value = '';
      }
  });

  els.tagChipContainer.addEventListener('click', (e) => {
      // 1. Use closest() to ensure we get the button even if the inner text is clicked
      const deleteBtn = e.target.closest('.ao3-tag-delete');
      if (!deleteBtn) return;

      // 2. Stop the click from bubbling up and triggering anything else
      e.preventDefault();
      e.stopPropagation();

      const indexAttr = deleteBtn.getAttribute('data-index');
      if (indexAttr === null) return;

      const idx = parseInt(indexAttr, 10);
      
      // 3. Strict safety check: Only splice if idx is a valid number
      if (!isNaN(idx) && idx >= 0 && idx < currentModalTags.length) {
          currentModalTags.splice(idx, 1);
          renderModalTags();
      }
  });

  const swipeArea = document.querySelector('.main-panel');
  swipeArea.addEventListener('touchstart', (e) => swipeStartX = e.changedTouches[0].clientX, { passive: true });
  swipeArea.addEventListener('touchend', (e) => {
    if (swipeStartX === null) return;
    const dx = e.changedTouches[0].clientX - swipeStartX;
    if (Math.abs(dx) > 60) {
      const order = ['history', 'shopping', 'settings'];
      const idx = order.indexOf(activeTab);
      if (dx < 0 && idx < order.length - 1) showTab(order[idx + 1]);
      if (dx > 0 && idx > 0) showTab(order[idx - 1]);
    }
    swipeStartX = null;
  }, { passive: true });
}

function loadQuotes() {
    fetch('quotes.txt').then(r => { if (!r.ok) throw new Error(); return r.text(); })
        .then(t => {
            const qs = t.split(/\r?\n/).filter(l => l.trim() !== '');
            if (qs.length > 0) {
                const q = qs[Math.floor(Math.random() * qs.length)];
                if ($('#quote-desktop')) $('#quote-desktop').innerText = q;
                if ($('#quote-mobile')) $('#quote-mobile').innerText = q;
            }
        }).catch(() => {});
}

function init() {
  renderUIOptions();
  setTheme(state.settings.theme || 'default');
  els.searchInput.value = state.filters.query || '';
  els.filterStore.value = state.filters.store || '';
  els.filterTag.value = state.filters.tag || '';
  els.filterMinPrice.value = state.filters.minPrice || '';
  els.filterMaxPrice.value = state.filters.maxPrice || '';
  els.onlyWithUrl.checked = !!state.filters.onlyWithUrl;
  initEvents(); updateAndRender(); showTab(activeTab); loadQuotes();
}

init();
