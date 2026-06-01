const STORAGE_KEY = 'mimicMart';

const DEFAULT_ICONS = {
  apple: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="64" height="64" viewBox="0 0 512 512" style="color: rgb(255, 255, 255);"><path fill="currentColor" d="M452.415 213.048c-10.609-27.192-27.511-48.256-48.92-61.078a157.7 157.7 0 0 1-17.583 26.757l.115.063c31.881 18.323 50.423 65.148 45.091 113.871c-8.833 80.721-33.35 136.043-69.036 155.775c-23.2 12.827-52.133 11-86-5.424l-3.308-1.6h-24.389l-3.307 1.6c-33.867 16.426-62.8 18.251-86 5.424c-35.685-19.732-60.2-75.054-69.036-155.775c-5.332-48.723 13.211-95.549 45.091-113.871a66.6 66.6 0 0 1 33.74-8.768c24.143 0 51.966 11.311 82.2 33.656l1.078.8s43.583-5.299 60.849-13.138c52.021-23.617 63.5-61.156 65.536-66.254a121.9 121.9 0 0 0-1.021-93.559l-4.073-10.169l-10.949.11A122.777 122.777 0 0 0 242.039 159.7c-18.9-10.59-37.278-17.343-54.884-20.14c-24.943-3.965-47.811-.1-67.968 11.486c-22.138 12.724-39.581 34.164-50.442 62c-9.874 25.307-13.608 54.817-10.514 83.094c10.142 92.681 39.659 155.027 85.361 180.3a99.9 99.9 0 0 0 49.1 12.543c19.585 0 40.629-5.194 62.975-15.575h9.83c42.394 19.693 80.085 20.718 112.071 3.032c45.7-25.271 75.221-87.617 85.363-180.3c3.092-28.275-.642-57.785-10.516-83.092M328.019 60.826a90.5 90.5 0 0 1 23.693-6.564a90.8 90.8 0 0 1-75.056 115.205a90.84 90.84 0 0 1 51.363-108.641"></path></svg>`,
  basket: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9h14l-1 10H6L5 9Z"></path><path d="M8 9c0-3 2-5 4-5s4 2 4 5"></path></svg>`,
  box: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="64" height="64" viewBox="0 0 24 24" style="color: rgb(255, 255, 255);"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 21l7.794-4.5v-9M12 21l-7.794-4.5v-9M12 21v-9m7.794-4.5L12 3L4.206 7.5m15.588 0L12 12M4.206 7.5L12 12"></path></svg>`,
  bread: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="64" height="64" viewBox="0 0 24 24" style="color: rgb(255, 255, 255);"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8.5 4C5.043 4 2 5.593 2 7.559c0 1.364 1.643 2.38 1.433 3.662l-.244 4.557c-.106 1.98-.159 2.97.41 3.596C4.17 20 5.126 20 7.036 20h2.93c1.91 0 2.865 0 3.435-.626c.57-.625.517-1.616.41-3.596l-.243-4.557C13.357 9.938 15 8.923 15 7.559C15 5.593 11.957 4 8.5 4Z"></path><path d="M11 20h6.184c1.827 0 2.74 0 3.286-.626c.545-.625.494-1.616.393-3.596l-.234-4.557C20.429 9.938 22 8.923 22 7.559C22 5.593 19.09 4 15.783 4H8"></path></g></svg>`,
  candy: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="64" height="64" viewBox="0 0 16 16" style="color: rgb(255, 255, 255);"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="8" r="3.25"></circle><path d="m7.25 11.25c0 1-.5 2.5-1.5 3-.75 0-1.5-1-2-2-1-.5-2-1.5-2-2 .5-1 2-1.5 3-1.5m4-4c0-1 .5-2.5 1.5-3 .75 0 1.5 1 2 2 1 .5 2 1.5 2 2-.5 1-2 1.5-3 1.5"></path></g></svg>`,
  carrot: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="64" height="64" viewBox="0 0 24 24" style="color: rgb(255, 255, 255);"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 23q10-2 14-6a1 1 0 0 0-8-8q-4 4-6 14m3-9l2 2m9 1l-3-3m3-13a1 1 0 0 0 8 8q-4-4-8 0q4-4 0-8"></path></svg>`,
  drink: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="64" height="64" viewBox="0 0 24 24" style="color: rgb(255, 255, 255);"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M8 2h8M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"></path><path d="M7 15a6.47 6.47 0 0 1 5 0a6.47 6.47 0 0 0 5 0"></path></g></svg>`,
  jar: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="64" height="64" viewBox="0 0 48 48" style="color: rgb(255, 255, 255);"><g fill="none" stroke="currentColor" stroke-width="4"><path stroke-linecap="round" d="M15 24s-.5 3 1 9"></path><path stroke-linecap="round" stroke-linejoin="round" d="M37.567 12C38.727 14.81 40 18.642 40 21.938c0 3.877-1.345 11.412-2.315 16.339c-.544 2.765-2.982 4.723-5.8 4.723H16.042c-2.785 0-5.203-1.914-5.762-4.642C9.314 33.638 8 26.402 8 21.938c0-3.679 1.444-7.306 2.827-9.938"></path><path d="M11.587 6.457a1 1 0 0 1 .84-.457h23.147a1 1 0 0 1 .84.457l2.587 4a1 1 0 0 1-.84 1.543H9.839a1 1 0 0 1-.84-1.543z"></path></g></svg>`,
  sugar: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="64" height="64" viewBox="0 0 48 48" style="color: rgb(255, 255, 255);"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M34.459 10.048a1 1 0 0 1 .973.207l8.235 7.379a1 1 0 0 1 .31.958l-2.353 10.783a1 1 0 0 1-.718.753l-10.588 2.838a1 1 0 0 1-.961-.254l-4.56-4.5a1 1 0 1 1 1.406-1.424l4.15 4.098l9.447-2.532l2.099-9.62l-7.374-6.606l-9.556 3.073l-1.018 3.11a1 1 0 1 1-1.901-.622l1.176-3.595a1 1 0 0 1 .645-.64z"></path><path d="M32.722 20.025a1 1 0 0 1 .753 1.197l-2.5 11a1 1 0 0 1-1.95-.444l2.5-11a1 1 0 0 1 1.197-.753"></path><path d="M23.738 13.853a1 1 0 0 1 1.409-.116l7.265 6.16l6.825-1.862a1 1 0 1 1 .526 1.93l-7.333 2a1 1 0 0 1-.91-.202l-7.666-6.5a1 1 0 0 1-.116-1.41m-12.996 1.424a1 1 0 0 1 .965-.239l8.27 2.361a1 1 0 0 1 .695.714l2.297 8.972a1 1 0 0 1-.308.999L16.23 33.75a1 1 0 0 1-.936.212L7.023 31.6a1 1 0 0 1-.69-.7l-2.298-8.5a1 1 0 0 1 .275-.984zm.967 1.842L6.12 22.452l1.994 7.38l7.202 2.056l5.563-4.9l-2.003-7.823z"></path><path d="M17.707 20.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-.974.256l-8-2.222a1 1 0 1 1 .535-1.927l7.438 2.066l3.587-3.587a1 1 0 0 1 1.414 0"></path><path d="M12.758 24.03a1 1 0 0 1 1.212.727l2 8a1 1 0 0 1-1.94.486l-2-8a1 1 0 0 1 .728-1.213"></path></g></svg>`
};

//item: `<svg>`,

const STORE_OPTIONS = ['Albertsons', 'Amazon', 'Costco', 'HEB', 'Kroger', 'Target', "Trader Joe's", 'Walmart', 'WinCo']; 
const STORE_HOME_URLS = {
  'Albertsons': 'https://www.albertsons.com/',
  'Amazon': 'https://www.amazon.com/',
  'HEB': 'https://www.heb.com/',
  'Kroger': 'https://www.kroger.com/',
  'Target': 'https://www.target.com/',
  'TraderJoes': 'https://www.traderjoes.com/',
  'Walmart': 'https://www.walmart.com/',
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
      name: 'Gallon of Milk',
      iconKey: 'drink',
      tags: ['Dairy', 'Drink'],
      storeDetails: {
        'Albertsons': { price: 3.49, unitSize: 128, unitPrice: 2.73, unitType: 'oz', url: 'https://www.albertsons.com/shop/product-details.136010121.html' },
        'Amazon': { price: 5.19, unitSize: 128, unitPrice: 4.05, unitType: 'oz', url: 'https://www.amazon.com/dp/B074VDFX51' },
        'Costco': { price: 6.59, unitSize: 256, unitPrice: 2.57, unitType: 'oz' },
        'HEB': { price: 3.86, unitSize: 128, unitPrice: 3.02, unitType: 'oz', url: 'https://www.heb.com/product-detail/h-e-b-whole-milk-1-gal/314130' },
        'Kroger': { price: 3.29, unitSize: 128, unitPrice: 2.57, unitType: 'oz', url: 'https://www.kroger.com/p/kroger-vitamin-d-whole-milk-gallon/0001111040101' },
        'Target': { price: 4.59, unitSize: 128, unitPrice: 3.59, unitType: 'oz', url: 'https://www.target.com/p/meadow-gold-milk/-/A-94758362?preselect=81585047' },
        'TraderJoes': { price: 5.69, unitSize: 64, unitPrice: 8.89, unitType: 'oz', url: 'https://www.traderjoes.com/home/products/pdp/organic-lactose-free-reduced-fat-milk-082978' },
        'Walmart': { price: 3.82, unitSize: 128, unitPrice: 2.98, unitType: 'oz', url: 'https://www.walmart.com/ip/Great-Value-Whole-Vitamin-D-Milk-Gallon-Plastic-Jug-128-Fl-Oz/10450114' },
        'WinCo': { price: 3.75, unitSize: 128, unitPrice: 2.93, unitType: 'oz' }
      },
      },
  ],
  shopping: [],
  settings: { theme: 'default' },
  filters: { query: '', store: '', tag: '', minPrice: '', maxPrice: '', onlyWithUrl: false, sortBy: 'name', sortDesc: false },
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
  shoppingStoreFilter: $('#shoppingStoreFilter'),
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
  tagSuggestions: $('#tagSuggestions'),
  filterModal: $('#filterModal'),
  filterModalBackdrop: $('#filterModalBackdrop'),
  closeFilterModal: $('#closeFilterModal'),
  filterStore: $('#filterStore'),
  filterTag: $('#filterTag'),
  filterTagSuggestions: $('#filterTagSuggestions'),
  filterMinPrice: $('#filterMinPrice'),
  filterMaxPrice: $('#filterMaxPrice'),
  filterSortBy: $('#filterSortBy'),
  filterSortOrder: $('#filterSortOrder'),
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

function updateTagSuggestions() {
    // Gather all tags, flatten them, get unique values, and sort alphabetically
    const allTags = state.items.flatMap(item => item.tags || []);
    const uniqueTags = [...new Set(allTags)].sort((a, b) => a.localeCompare(b));
    const optionsMarkup = uniqueTags.map(tag => `<option value="${escapeHtml(tag)}">`).join('');

    if (els.tagSuggestions) els.tagSuggestions.innerHTML = optionsMarkup;
    if (els.filterTagSuggestions) els.filterTagSuggestions.innerHTML = optionsMarkup;}

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

  els.shoppingStoreFilter.innerHTML = `<option value="">All stores</option>` +
    STORE_OPTIONS.map((store) => `<option value="${escapeHtml(store)}">${escapeHtml(store)}</option>`).join('');

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
  updateTagSuggestions();

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
         
         <label>Total Price
            <input type="number" step="0.01" min="0" data-store="${store}" data-field="price" value="${data.price}" placeholder="$0.00" />
         </label>
         
         <label>Size & Unit Price
            <div class="unit-inputs">
              <input type="number" step="0.01" min="0" data-store="${store}" data-field="unitSize" value="${data.unitSize || ''}" placeholder="oz/lb" />
              <input type="number" step="0.01" min="0" data-store="${store}" data-field="unitPrice" value="${data.unitPrice}" placeholder="¢ per oz/lb" />
              <select data-store="${store}" data-field="unitType">
                  <option value="oz" ${data.unitType === 'oz' ? 'selected' : ''}>oz</option>
                  <option value="lb" ${data.unitType === 'lb' ? 'selected' : ''}>lb</option>
                  <option value="ea" ${data.unitType === 'ea' ? 'selected' : ''}>item</option>
              </select>
            </div>
         </label>

         <label>URL
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
    if (field === 'price' || field === 'unitSize' || field === 'unitType') {
       const price = parseFloat(editingStoreDetails[store].price);
       const size = parseFloat(editingStoreDetails[store].unitSize);
       const type = editingStoreDetails[store].unitType || 'oz';
       
       if (!isNaN(price) && !isNaN(size) && size > 0) {
           // Treat 'ea' (item) and 'lb' as dollars, 'oz' as cents
           const calculated = (type === 'lb' || type === 'ea') 
               ? (price / size).toFixed(2) 
               : ((price / size) * 100).toFixed(2);
               
           editingStoreDetails[store].unitPrice = calculated;
           
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
  
  els.filterSortBy.value = state.filters.sortBy || 'name';
  els.filterSortOrder.value = state.filters.sortDesc ? 'desc' : 'asc';
  
  updateTagSuggestions();

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
    const stores = Object.keys(item.storeDetails || {}).sort((a, b) => {
        const dA = item.storeDetails[a];
        const dB = item.storeDetails[b];
        
        // Push stores with no prices to the back
        if (!dA.unitPrice && !dB.unitPrice) return 0;
        if (!dA.unitPrice) return 1;
        if (!dB.unitPrice) return -1;

        // Normalize both to a "cents per ounce" value to compare fairly
        const priceA = dA.unitType === 'lb' ? (Number(dA.unitPrice) * 100) / 16 : Number(dA.unitPrice);
        const priceB = dB.unitType === 'lb' ? (Number(dB.unitPrice) * 100) / 16 : Number(dB.unitPrice);
        
        return priceA - priceB;
    });
    
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
        
        const isDollarUnit = d.unitType === 'lb' || d.unitType === 'ea';
        const unitPriceNum = Number(d.unitPrice);
        let unitDisplay;
        
        if (isDollarUnit) {
            unitDisplay = `$${unitPriceNum.toFixed(2)}`;
        } else {
            // It's an ounce. If it's 100 cents ($1.00) or more, format as dollars.
            if (unitPriceNum >= 100) {
                unitDisplay = `$${(unitPriceNum / 100).toFixed(2)}`;
            } else {
                unitDisplay = `${unitPriceNum.toFixed(2)}¢`;
            }
        }
        
        const typeLabel = d.unitType === 'ea' ? 'Item' : (d.unitType || 'oz');
        
        const unitMarkup = d.unitPrice 
           ? `<div class="price-group"><div class="small">Per ${typeLabel}</div><div class="small" style="color:var(--text);">${unitDisplay}</div></div>` 
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

function getNormalizedItemPrice(item, type) {
    const stores = Object.values(item.storeDetails || {});
    let validPrices = [];
    
    if (type === 'minPricePer') {
        validPrices = stores
            .filter(d => d.unitPrice && Number(d.unitPrice) > 0)
            .map(d => {
                if (d.unitType === 'lb') return (Number(d.unitPrice) * 100) / 16;
                if (d.unitType === 'ea') return Number(d.unitPrice) * 100; // Convert item dollars to cents for fair sorting
                return Number(d.unitPrice); // oz is already in cents
            });
    }
    
    // If an item has no prices entered, assign it Infinity so it drops to the bottom
    if (validPrices.length === 0) return Infinity;
    
    // Return the smallest price found across the stores for this item
    return Math.min(...validPrices);
}

function sortItems(items) {
    const sortBy = state.filters.sortBy || 'name';
    const sortDesc = !!state.filters.sortDesc;

    return items.sort((a, b) => {
        if (sortBy === 'name') {
            const valA = a.name.toLowerCase();
            const valB = b.name.toLowerCase();
            if (valA < valB) return sortDesc ? 1 : -1;
            if (valA > valB) return sortDesc ? -1 : 1;
            return 0;
        } else {
            const valA = getNormalizedItemPrice(a, sortBy);
            const valB = getNormalizedItemPrice(b, sortBy);
            
            // Always push items with no valid prices to the very bottom, regardless of sort direction
            if (valA === Infinity && valB === Infinity) return 0;
            if (valA === Infinity) return 1;
            if (valB === Infinity) return -1;

            return sortDesc ? valB - valA : valA - valB;
        }
    });
}

function renderHistory() {
  const items = sortItems(getVisibleItems());
  if (!items.length) { els.historyList.innerHTML = `<div class="card"><p>No items match.</p></div>`; return; }
  els.historyList.innerHTML = items.map(item => generateCardHTML(item, false)).join('');
}

function renderShopping() {
  // Setup the dropdown to match saved state
  els.shoppingStoreFilter.value = state.filters.shoppingStore || '';
  
  // Dynamically update the top title
  const storeFilter = state.filters.shoppingStore;
  if (activeTab === 'shopping') {
    els.viewTitle.textContent = storeFilter ? `${storeFilter} Shopping List` : 'Shopping List';
  }

  // Filter the items based on their lastSelectedStore
  let filteredShopping = state.shopping;
  if (storeFilter) {
    filteredShopping = filteredShopping.filter(item => item.lastSelectedStore === storeFilter);
  }

  if (!filteredShopping.length) { 
    els.shoppingList.innerHTML = `<div class="card"><p>Your list is empty.</p></div>`; 
    return; 
  }
  
  filteredShopping.sort((a, b) => {
    if (a.bought && !b.bought) return 1;   // Send 'a' down if it's bought
    if (!a.bought && b.bought) return -1;  // Keep 'a' up if it's not bought
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase()); // Alphabetical fallback
  });
  els.shoppingList.innerHTML = filteredShopping.map(item => generateCardHTML(item, true)).join('');
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
  // Ensure the store name persists in the title when navigating back to shopping
  if (tab === 'shopping' && state.filters.shoppingStore) {
      els.viewTitle.textContent = `${state.filters.shoppingStore} Shopping List`;
  }
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
      const isDollarUnit = d.unitType === 'lb' || d.unitType === 'ea';
        const unitPriceNum = Number(d.unitPrice);
        let unitDisplay;
        
        if (isDollarUnit) {
            unitDisplay = `$${unitPriceNum.toFixed(2)}`;
        } else {
            // It's an ounce. If it's 100 cents ($1.00) or more, format as dollars.
            if (unitPriceNum >= 100) {
                unitDisplay = `$${(unitPriceNum / 100).toFixed(2)}`;
            } else {
                unitDisplay = `${unitPriceNum.toFixed(2)}¢`;
            }
        }        
      const typeLabel = d.unitType === 'ea' ? 'Item' : (d.unitType || 'oz');
      
      const unitMarkup = d.unitPrice 
           ? `<div class="price-group"><div class="small">Per ${typeLabel}</div><div class="small" style="color:var(--text);">${unitDisplay}</div></div>` 
           : '';
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
    
    state.filters.sortBy = els.filterSortBy.value;
    state.filters.sortDesc = els.filterSortOrder.value === 'desc';
    
    saveState(); renderHistory(); closeFilterModal();
  });
  els.clearFilters.addEventListener('click', () => {
    state.filters = { query: '', store: '', tag: '', minPrice: '', maxPrice: '', onlyWithUrl: false, sortBy: 'name', sortDesc: false };
    els.searchInput.value = ''; els.filterStore.value = ''; els.filterTag.value = ''; els.filterMinPrice.value = ''; els.filterMaxPrice.value = ''; els.onlyWithUrl.checked = false;
    
    els.filterSortBy.value = 'name';
    els.filterSortOrder.value = 'asc';
    
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

  els.shoppingStoreFilter.addEventListener('change', (e) => {
      state.filters.shoppingStore = e.target.value;
      saveState();
      renderShopping();
  });

  els.tagInputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          const rawVal = e.target.value.trim();
          if (rawVal) {
              // Capitalize the very first letter and attach the rest of the string
              const val = rawVal.charAt(0).toUpperCase() + rawVal.slice(1);
              if (!currentModalTags.includes(val)) {
                  currentModalTags.push(val);
                  renderModalTags();
              }
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

  // Fix for iOS Safari keeping the page pushed up after the keyboard closes
  document.addEventListener('focusout', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
          // A tiny delay ensures the keyboard is actually out of the way before resetting
          setTimeout(() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }, 100);
      }
  });
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
