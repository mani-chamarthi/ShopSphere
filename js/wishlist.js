
function renderWishlist() {
  const grid = $("#wishlistGrid"); if (!grid) return;
  const ps = wishlist().map(productById).filter(Boolean);
  if (!ps.length) { grid.innerHTML = `<div class="empty"><h2>Your wishlist is empty</h2><p class="muted">Save products here to find them quickly later.</p><a class="btn btn-primary mt-3" href="products.html">Explore Products</a></div>`; return; }
  grid.innerHTML = ps.map(p => productCard(p)).join("");
}
document.addEventListener("DOMContentLoaded", () => { renderWishlist(); updateHeader(); });
