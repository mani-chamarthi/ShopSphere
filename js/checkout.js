function renderCheckout() {
  const box = $("#checkoutSummary"); if (!box) return;
  const t = cartTotals();
  if (!t.items.length) { box.innerHTML = `<div class="empty"><h2>No items to checkout</h2><a class="btn btn-primary mt-3" href="products.html">Shop Now</a></div>`; return; }
  box.innerHTML = `<h2>Order Summary</h2>${t.items.map(({ x, p }) => `<div class="summary-row"><span>${p.name} × ${x.qty}</span><strong>${money(p.price * x.qty)}</strong></div>`).join("")}
  <div class="summary-row"><span>Discount</span><strong>−${money(t.discount)}</strong></div><div class="summary-row"><span>Shipping</span><strong>${t.shipping ? money(t.shipping) : "FREE"}</strong></div>
  <div class="summary-row summary-total"><span>Total</span><strong>${money(t.total)}</strong></div><div class="secure-note">🔐 Demo checkout · No real payment is processed.</div>`;
  if ($("#payAmountLabel")) $("#payAmountLabel").textContent = `Pay ${money(t.total)}`;
}
function paymentMethod() { return $("#checkoutForm")?.querySelector('input[name="payment"]:checked')?.value || "Cash on Delivery"; }
function setPaymentPanels() {
  const method = paymentMethod();
  $$(".payment-choice").forEach(x => x.classList.toggle("active", x.querySelector("input").checked));
  $("#upiPanel")?.classList.toggle("hide", method !== "UPI");
  $("#cardPanel")?.classList.toggle("hide", method !== "Credit/Debit Card");
  if ($("#payButton")) $("#payButton").textContent = method === "Cash on Delivery" ? "Place Demo Order" : `Pay ${money(cartTotals().total)}`;
}
function verifyUpi() {
  const val = $("#upiId")?.value.trim(); const ok = /^[\w.-]{2,}@[\w.-]{2,}$/.test(val);
  const status = $("#upiStatus"); if (!status) return ok;
  status.textContent = ok ? "✓ UPI ID verified for this demo" : "Enter a valid demo UPI ID such as name@bank"; status.className = `payment-status ${ok ? "success-text" : "error-text"}`; return ok;
}
function validateCard() {
  const name = $("#cardName")?.value.trim(), num = $("#cardNumber")?.value.replace(/\s/g, ""), exp = $("#cardExpiry")?.value.trim(), cvv = $("#cardCvv")?.value.trim();
  const ok = name.length >= 2 && /^\d{16}$/.test(num) && /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp) && /^\d{3,4}$/.test(cvv);
  const st = $("#cardStatus"); if (st) { st.textContent = ok ? "✓ Card details look valid for this demo" : "Use 16 digits, MM/YY and a 3–4 digit demo CVV."; st.className = `payment-status ${ok ? "success-text" : "error-text"}`; } return ok;
}
function formatCard(e) { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim(); }
function formatExpiry(e) { let v = e.target.value.replace(/\D/g, "").slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2); e.target.value = v; }
function processDemoPayment() {
  const method = paymentMethod();
  if (method === "UPI" && !verifyUpi()) return false;
  if (method === "Credit/Debit Card" && !validateCard()) return false;
  return true;
}
function placeOrder(e) {
  e.preventDefault();
  if (!cart().length) { toast("Your cart is empty."); return; }
  const f = e.target, name = $("#customerName").value.trim(), phone = $("#phone").value.trim(), address = $("#address").value.trim();
  if (name.length < 2 || phone.length < 8 || address.length < 8) { toast("Please complete your delivery details."); return; }
  if (!processDemoPayment()) return;
  const t = cartTotals(), orders = get("shopsphere_orders", []), method = paymentMethod();
  const user = currentUser?.(); const order = {
    id: "SS" + Date.now().toString().slice(-8), date: new Date().toISOString(), customer: name, customerEmail: user?.email || "", phone, address,
    delivery: $("#delivery").value, payment: method, paymentApp: method === "UPI" ? $(".upi-app.active")?.dataset.app || "UPI" : undefined,
    items: t.items.map(({ x, p }) => ({ id: p.id, name: p.name, price: p.price, qty: x.qty, image: p.image })), subtotal: t.subtotal, discount: t.discount, shipping: t.shipping, total: t.total, status: "Confirmed"
  };
  const finish = () => { orders.unshift(order); set("shopsphere_orders", orders); localStorage.removeItem("shopsphere_cart"); localStorage.removeItem("shopsphere_coupon"); set("shopsphere_last_order", order.id); location.href = `${pageUrl("order-success.html")}?id=${encodeURIComponent(order.id)}`; };
  if (method === "Cash on Delivery") { finish(); return; }
  const btn = $("#payButton"); btn.disabled = true; btn.textContent = "Processing secure payment…";
  setTimeout(() => { toast("Payment successful — demo order confirmed!"); setTimeout(finish, 500); }, 1400);
}
document.addEventListener("DOMContentLoaded", () => {
  renderCheckout();
  const form = $("#checkoutForm"); form?.addEventListener("submit", placeOrder);
  $$('input[name="payment"]').forEach(r => r.addEventListener("change", setPaymentPanels));
  $$(".upi-app").forEach(b => b.addEventListener("click", () => { $$(".upi-app").forEach(x => x.classList.remove("active")); b.classList.add("active"); }));
  $("#verifyUpi")?.addEventListener("click", verifyUpi);
  $("#cardNumber")?.addEventListener("input", formatCard);
  $("#cardExpiry")?.addEventListener("input", formatExpiry);
  $("#cardCvv")?.addEventListener("input", e => e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4));
  $("#cardNumber")?.addEventListener("blur", validateCard); $("#cardExpiry")?.addEventListener("blur", validateCard); $("#cardCvv")?.addEventListener("blur", validateCard);
  setPaymentPanels();
});
