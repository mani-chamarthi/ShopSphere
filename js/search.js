let filteredProducts = [];
function initProductListing() {
  const params = new URLSearchParams(location.search);
  const searchInput = $("#productSearch");
  if (searchInput) searchInput.value = params.get("search") || "";
  const category = params.get("category");
  if (category && $("#categoryFilter")) $("#categoryFilter").value = category;
  [
    "productSearch",
    "categoryFilter",
    "priceFilter",
    "ratingFilter",
    "sortFilter",
  ].forEach((id) => $("#" + id)?.addEventListener("input", renderProducts));
  renderProducts();
}
function renderProducts() {
  const q = ($("#productSearch")?.value || "").trim().toLowerCase();
  const cat = $("#categoryFilter")?.value || "All",
    price = $("#priceFilter")?.value || "All",
    rating = Number($("#ratingFilter")?.value || 0),
    sort = $("#sortFilter")?.value || "default";
  let ps = allProducts().filter(
    (p) =>
      (!q ||
        `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q)) &&
      (cat === "All" || p.category === cat) &&
      (price === "All" ||
        (price === "0-999" && p.price <= 999) ||
        (price === "1000-2499" && p.price >= 1000 && p.price <= 2499) ||
        (price === "2500-4999" && p.price >= 2500 && p.price <= 4999) ||
        (price === "5000+" && p.price >= 5000)) &&
      p.rating >= rating,
  );
  if (sort === "recommended")
    ps.sort((a, b) => preferenceScore(b) - preferenceScore(a));
  if (sort === "low") ps.sort((a, b) => a.price - b.price);
  if (sort === "high") ps.sort((a, b) => b.price - a.price);
  if (sort === "rating") ps.sort((a, b) => b.rating - a.rating);
  if (sort === "discount") ps.sort((a, b) => b.discount - a.discount);
  if (sort === "newest") ps.sort((a, b) => b.id - a.id);
  filteredProducts = ps;
  $("#productCount").textContent =
    `${ps.length} product${ps.length === 1 ? "" : "s"} found`;
  $("#productsGrid").innerHTML = ps.length
    ? ps.map(productCard).join("")
    : `<div class="empty" style="grid-column:1/-1"><h2>No products found</h2><p class="muted">Try a different search or filter.</p></div>`;
}
document.addEventListener("DOMContentLoaded", initProductListing);
