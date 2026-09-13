
function renderOrders() {
  const box = $("#ordersList"); if (!box) return; const user = currentUser?.(); if (!user) return; const all = get("shopsphere_orders", []); const orders = all.filter(o => o.customerEmail === user.email || (!o.customerEmail && o.customer === user.name));
  if (!orders.length) { box.innerHTML = `<div class="empty"><h2>No orders yet</h2><p class="muted">Your simulated purchases will appear here.</p><a class="btn btn-primary mt-3" href="products.html">Shop Now</a></div>`; return; }
  box.innerHTML = orders.map(o => `<article class="order-card"><div class="order-head"><div><strong>Order #${o.id}</strong><div class="muted">${new Date(o.date).toLocaleString("en-IN")}</div></div><span class="status">${o.status}</span></div>
  ${o.items.map(i => `<div class="cart-item"><img src="${i.image}" alt="${i.name}"><div><strong>${i.name}</strong><div class="muted">${money(i.price)} × ${i.qty}</div></div><strong>${money(i.price * i.qty)}</strong></div>`).join("")}
  <div class="summary-row"><span>Delivery</span><span>${o.delivery}</span></div><div class="summary-row summary-total"><span>Total</span><strong>${money(o.total)}</strong></div></article>`).join("");
}
document.addEventListener("DOMContentLoaded", renderOrders);
