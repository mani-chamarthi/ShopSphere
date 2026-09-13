const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const money = n => `₹${Number(n).toLocaleString("en-IN")}`;
const get = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const pageUrl = page => {
  const inPages = location.pathname.includes("/pages/");
  if (page === "index.html") return inPages ? "../index.html" : "index.html";
  return inPages ? page : `pages/${page}`;
};
const assetUrl = asset => asset && asset.startsWith("images/") && location.pathname.includes("/pages/") ? `../${asset}` : asset;

function allProducts() {
  const custom = get("shopsphere_custom_products", []);
  const removed = get("shopsphere_removed_products", []);
  const customIds = new Set(custom.map(p => p.id));
  return [...DEFAULT_PRODUCTS.filter(p => !removed.includes(p.id) && !customIds.has(p.id)), ...custom];
}
function productById(id) { return allProducts().find(p => String(p.id) === String(id)); }

function toast(message) {
  let el = $("#toast");
  if (!el) { el = document.createElement("div"); el.id = "toast"; el.className = "toast"; document.body.appendChild(el); }
  el.textContent = message; el.classList.add("show");
  clearTimeout(window.__toastTimer); window.__toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
}
function themeInit() {
  const dark = get("shopsphere_theme", "light") === "dark";
  document.body.classList.toggle("dark", dark);
  const btn = $("#themeToggle"); if (btn) btn.textContent = dark ? "☀️" : "🌙";
}
function toggleTheme() { const dark = !document.body.classList.contains("dark"); set("shopsphere_theme", dark ? "dark" : "light"); themeInit(); }
function cart() { return get("shopsphere_cart", []); }
function saveCart(c) { set("shopsphere_cart", c); updateHeader(); }
function wishlist() { return get("shopsphere_wishlist", []); }
function saveWishlist(w) { set("shopsphere_wishlist", w); updateHeader(); }
function cartCount() { return cart().reduce((sum, x) => sum + (x.qty ?? x.quantity ?? 0), 0); }
function updateHeader() {
  const cc = $("#cartCount"), wc = $("#wishlistCount");
  if (cc) cc.textContent = cartCount();
  if (wc) wc.textContent = wishlist().length;
  const user = get("shopsphere_user", null);
  $$(".user-label").forEach(x => x.textContent = user?.name ? `Hi, ${user.name.split(" ")[0]}` : "Login");
}

// ---- Preference engine ---------------------------------------------------
function defaultPreferences() { return { categories: [], maxPrice: 5000, minRating: 0 }; }
function preferenceKey() {
  try { const email = sessionStorage.getItem("shopsphere_session"); return email ? `shopsphere_preferences_${email.toLowerCase()}` : "shopsphere_preferences"; } catch { return "shopsphere_preferences"; }
}
function getPreferences() { return { ...defaultPreferences(), ...get(preferenceKey(), {}) }; }
function savePreferences(prefs) { set(preferenceKey(), prefs); }
function getInterest() { return get("shopsphere_interest", {}); }
function trackProductInterest(id, action = "view") {
  const p = productById(id); if (!p) return;
  const data = getInterest();
  data[p.category] = data[p.category] || { views: 0, cart: 0, wishlist: 0 };
  data[p.category][action] = (data[p.category][action] || 0) + 1;
  data.recent = data.recent || [];
  data.recent = [p.id, ...data.recent.filter(x => x !== p.id)].slice(0, 10);
  set("shopsphere_interest", data);
}
function preferenceScore(p) {
  const pref = getPreferences(), interest = getInterest();
  let score = 0;
  if (pref.categories.length) score += pref.categories.includes(p.category) ? 55 : -8;
  if (p.price <= pref.maxPrice) score += 18; else score -= Math.min(25, (p.price - pref.maxPrice) / 200);
  if (p.rating >= pref.minRating) score += 12; else score -= 12;
  const activity = interest[p.category];
  if (activity) score += Math.min(25, (activity.views || 0) * 2 + (activity.cart || 0) * 7 + (activity.wishlist || 0) * 5);
  if (p.featured) score += 7;
  score += Math.min(10, p.discount / 5);
  score += p.rating * 2;
  return score;
}
function personalizedProducts(limit = 6) {
  return [...allProducts()].sort((a, b) => preferenceScore(b) - preferenceScore(a)).slice(0, limit);
}
function preferenceSummary() {
  const p = getPreferences();
  const cats = p.categories.length ? p.categories.join(", ") : "your browsing activity";
  return `Based on ${cats}; up to ${money(p.maxPrice)} and ${p.minRating ? p.minRating + "★+" : "all ratings"}.`;
}

function addToCart(id, qty = 1) {
  const p = productById(id); if (!p) return;
  const c = cart(); const item = c.find(x => x.id === p.id);
  if (item) item.qty = Math.min((item.qty ?? item.quantity) + qty, p.stock);
  else c.push({ id: p.id, qty: Math.min(qty, p.stock) });
  trackProductInterest(id, "cart"); saveCart(c); toast("Product added to cart!");
}
function removeFromCart(id) { saveCart(cart().filter(x => x.id !== id)); toast("Product removed from cart."); }
function setCartQty(id, qty) {
  const p = productById(id), c = cart(), item = c.find(x => x.id === id); if (!item || !p) return;
  item.qty = Math.max(1, Math.min(Number(qty), p.stock)); saveCart(c);
}
function toggleWishlist(id) {
  const w = wishlist(); const n = Number(id), idx = w.indexOf(n);
  if (idx >= 0) { w.splice(idx, 1); toast("Removed from wishlist."); } else { w.push(n); trackProductInterest(n, "wishlist"); toast("Added to wishlist!"); }
  saveWishlist(w);
}
function isWishlisted(id) { return wishlist().includes(Number(id)); }
function trendingScore(p) { return Math.round(p.rating * 10 + Math.min(p.reviews / 5, 30) + p.discount / 2 + (p.featured ? 12 : 0) + Math.max(0, 100 - p.stock) / 12); }
function productCard(p) {
  const score = trendingScore(p);
  const badge = p.discount >= 35 ? "DEAL" : (p.featured ? "TRENDING" : "");
  return `<article class="product-card">
    ${badge ? `<span class="product-badge">${badge}</span>` : ""}
    <button class="heart" aria-label="Toggle wishlist" onclick="toggleWishlist(${p.id});renderPageIfNeeded()">${isWishlisted(p.id) ? "♥" : "♡"}</button>
    <a class="product-image" href="${pageUrl("product.html")}?id=${p.id}" onclick="trackProductInterest(${p.id},'view')"><img src="${assetUrl(p.image)}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'" /></a>
    <div class="product-info">
      <div class="muted">${p.category}</div><h3><a href="${pageUrl("product.html")}?id=${p.id}" onclick="trackProductInterest(${p.id},'view')">${p.name}</a></h3>
      <div class="product-meta"><span class="rating">★ ${p.rating}</span><span>${p.reviews} reviews</span></div>
      <div><span class="price">${money(p.price)}</span><span class="old-price">${money(p.originalPrice)}</span> <span class="discount">${p.discount}% off</span></div>
      <div class="trend-line">🔥 Trending score ${score}<span>${p.stock} left</span></div>
      <div class="card-actions"><button class="btn btn-primary btn-sm" onclick="addToCart(${p.id})">Add to cart</button><a class="btn btn-outline btn-sm" href="${pageUrl("product.html")}?id=${p.id}">View</a></div>
    </div>
  </article>`;
}
function renderPageIfNeeded() { if (typeof renderProducts === "function") renderProducts(); if (typeof renderWishlist === "function") renderWishlist(); }
function updatePrefLabels() {
  const budget = $("#prefBudget");
  const rating = $("#prefRating");
  if (budget) $("#prefBudgetValue").textContent = money(Number(budget.value));
  if (rating) $("#prefRatingValue").textContent = Number(rating.value) > 0 ? `${Number(rating.value).toFixed(1)}★+` : "Any";
}
function openPreferenceModal() {
  const modal = $("#preferenceModal");
  if (!modal) return;
  const prefs = getPreferences();
  const budget = $("#prefBudget");
  const rating = $("#prefRating");
  if (budget) budget.value = prefs.maxPrice ?? 5000;
  if (rating) rating.value = prefs.minRating ?? 0;
  $$('input[type="checkbox"]').forEach(cb => {
    if (cb.closest(".pref-chip")) cb.checked = (prefs.categories || []).includes(cb.value);
  });
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  updatePrefLabels();
}
function closePreferenceModal() {
  const modal = $("#preferenceModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}
function setupHeader() {
  themeInit(); updateHeader();
  $("#themeToggle")?.addEventListener("click", toggleTheme);
  $("#menuToggle")?.addEventListener("click", () => $("#mobileNav")?.classList.toggle("open"));
  $$(".global-search").forEach(form => form.addEventListener("submit", e => {
    e.preventDefault(); const q = $("#globalSearch", form)?.value.trim() || $("input", form)?.value.trim();
    location.href = `${pageUrl("products.html")}?search=${encodeURIComponent(q || "")}`;
  }));
}
document.addEventListener("DOMContentLoaded", setupHeader);
