function couponInfo(code) {
  code = (code || "").trim().toUpperCase();
  return (
    {
      SHOP10: { type: "percent", value: 10 },
      SAVE200: { type: "fixed", value: 200 },
      WELCOME: { type: "percent", value: 5 },
    }[code] || null
  );
}
function cartTotals() {
  const items = cart()
    .map((x) => ({ x, p: productById(x.id) }))
    .filter((a) => a.p);
  const subtotal = items.reduce((s, a) => s + a.p.price * a.x.qty, 0);
  const coupon = get("shopsphere_coupon", null);
  let discount = 0;
  if (coupon) {
    const c = couponInfo(coupon);
    if (c)
      discount = c.type === "percent" ? (subtotal * c.value) / 100 : c.value;
  }
  discount = Math.min(discount, subtotal);
  const shipping = subtotal === 0 ? 0 : subtotal - discount >= 1999 ? 0 : 99;
  return {
    items,
    subtotal,
    discount,
    shipping,
    total: subtotal - discount + shipping,
    coupon,
  };
}
function renderCart() {
  const list = $("#cartList"),
    summary = $("#cartSummary");
  if (!list || !summary) return;
  const t = cartTotals();
  if (!t.items.length) {
    list.innerHTML = `<div class="empty"><h2>Your cart is empty</h2><p class="muted">Add something you love and it will appear here.</p><a class="btn btn-primary mt-3" href="products.html">Start Shopping</a></div>`;
    summary.innerHTML = "";
    return;
  }
  list.innerHTML = t.items
    .map(
      ({ x, p }) => `<div class="cart-item">
    <img src="${p.image}" alt="${p.name}">
    <div><h3>${p.name}</h3><p class="muted">${money(p.price)} each</p>
      <div class="qty mt-2"><button onclick="setCartQty(${p.id},${x.qty - 1});renderCart()">−</button><span>${x.qty}</span><button onclick="setCartQty(${p.id},${x.qty + 1});renderCart()">+</button></div>
    </div>
    <div class="text-center"><strong>${money(p.price * x.qty)}</strong><br><button class="btn btn-danger btn-sm mt-2" onclick="removeFromCart(${p.id});renderCart()">Remove</button></div>
  </div>`,
    )
    .join("");
  const couponText = t.coupon
    ? `${t.coupon} <button class="btn btn-sm btn-outline" onclick="clearCoupon()">Clear</button>`
    : "";
  summary.innerHTML = `<h2>Order Summary</h2>
    <div class="coupon"><input id="couponInput" class="input" placeholder="Coupon code" value="${t.coupon || ""}"><button class="btn btn-primary btn-sm" onclick="applyCoupon()">Apply</button></div>
    <div class="muted">${couponText}</div>
    <div class="summary-row"><span>Subtotal</span><strong>${money(t.subtotal)}</strong></div>
    <div class="summary-row"><span>Discount</span><strong>−${money(t.discount)}</strong></div>
    <div class="summary-row"><span>Shipping</span><strong>${t.shipping ? money(t.shipping) : "FREE"}</strong></div>
    <div class="summary-row summary-total"><span>Total</span><strong>${money(t.total)}</strong></div>
    <a class="btn btn-primary" style="width:100%;margin-top:15px" href="checkout.html">Proceed to Checkout</a>
    <p class="muted mt-2" style="font-size:.8rem">Free shipping on orders above ₹1,999.</p>`;
}
function applyCoupon() {
  const code = $("#couponInput")?.value.trim().toUpperCase();
  if (!couponInfo(code)) {
    toast("Invalid coupon code.");
    return;
  }
  set("shopsphere_coupon", code);
  toast("Coupon applied successfully!");
  renderCart();
}
function clearCoupon() {
  localStorage.removeItem("shopsphere_coupon");
  renderCart();
}
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateHeader();
});
