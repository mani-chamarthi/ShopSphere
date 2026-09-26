function adminProducts() {
  return allProducts();
}
function renderAdmin() {
  const ps = adminProducts(),
    orders = get("shopsphere_orders", []);
  $("#statProducts").textContent = ps.length;
  $("#statOrders").textContent = orders.length;
  $("#statCustomers").textContent =
    new Set(orders.map((o) => o.customer)).size || 0;
  $("#statRevenue").textContent = money(
    orders.reduce((s, o) => s + o.total, 0),
  );
  $("#adminProducts").innerHTML = ps
    .map(
      (p) =>
        `<tr><td>${p.id}</td><td>${p.name}</td><td>${p.category}</td><td>${money(p.price)}</td><td>${p.stock}</td><td><button class="btn btn-outline btn-sm" onclick="openEdit(${p.id})">Edit</button> <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Delete</button></td></tr>`,
    )
    .join("");
  $("#recentOrders").innerHTML =
    orders
      .slice(0, 5)
      .map(
        (o) =>
          `<tr><td>#${o.id}</td><td>${o.customer}</td><td>${money(o.total)}</td><td>${o.status}</td></tr>`,
      )
      .join("") || `<tr><td colspan="4" class="muted">No orders yet.</td></tr>`;
}
function openAdminModal(product = null) {
  $("#productModal").classList.add("open");
  $("#modalTitle").textContent = product ? "Edit Product" : "Add Product";
  $("#editId").value = product?.id || "";
  $("#pName").value = product?.name || "";
  $("#pCategory").value = product?.category || "Electronics";
  $("#pPrice").value = product?.price || "";
  $("#pOriginal").value = product?.originalPrice || "";
  $("#pStock").value = product?.stock || "";
  $("#pDescription").value = product?.description || "";
}
function openEdit(id) {
  openAdminModal(productById(id));
}
function closeModal() {
  $("#productModal").classList.remove("open");
}
function saveProduct(e) {
  e.preventDefault();
  const id = Number($("#editId").value),
    name = $("#pName").value.trim(),
    price = Number($("#pPrice").value),
    original = Number($("#pOriginal").value),
    stock = Number($("#pStock").value);
  if (!name || price <= 0 || original < price || stock < 0) {
    toast("Please enter valid product data.");
    return;
  }
  const custom = get("shopsphere_custom_products", []),
    removed = get("shopsphere_removed_products", []);
  if (id) {
    const p = productById(id);
    const updated = {
      ...p,
      id,
      name,
      category: $("#pCategory").value,
      price,
      originalPrice: original,
      discount: Math.round((1 - price / original) * 100),
      stock,
      description:
        $("#pDescription").value.trim() || "Demo product description.",
      image: p.image || "images/product-1.svg",
    };
    const idx = custom.findIndex((x) => x.id === id);
    if (idx >= 0) custom[idx] = updated;
    else custom.push(updated);
    set("shopsphere_custom_products", custom);
    set(
      "shopsphere_removed_products",
      removed.filter((x) => x !== id),
    );
  } else {
    const newId = Math.max(0, ...allProducts().map((p) => p.id)) + 1;
    custom.push({
      id: newId,
      name,
      category: $("#pCategory").value,
      price,
      originalPrice: original,
      discount: Math.round((1 - price / original) * 100),
      rating: 4.2,
      reviews: 0,
      stock,
      featured: false,
      description:
        $("#pDescription").value.trim() || "Demo product description.",
      image: "images/product-1.svg",
      specs: { Brand: "ShopSphere", Category: $("#pCategory").value },
    });
    set("shopsphere_custom_products", custom);
  }
  closeModal();
  renderAdmin();
  toast("Product saved.");
}
function deleteProduct(id) {
  if (!confirm("Delete this demo product?")) return;
  const custom = get("shopsphere_custom_products", []),
    ci = custom.findIndex((p) => p.id === id);
  if (ci >= 0) {
    custom.splice(ci, 1);
    set("shopsphere_custom_products", custom);
  } else {
    const removed = get("shopsphere_removed_products", []);
    if (!removed.includes(id)) removed.push(id);
    set("shopsphere_removed_products", removed);
  }
  renderAdmin();
  toast("Product deleted.");
}
document.addEventListener("DOMContentLoaded", () => {
  renderAdmin();
  $("#productForm")?.addEventListener("submit", saveProduct);
  $("#addProduct")?.addEventListener("click", () => openAdminModal());
  $("#closeModal")?.addEventListener("click", closeModal);
});
