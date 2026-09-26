/* ShopSphere demo authentication & authorization.
   Client-only demo: credentials live in this browser's localStorage. */
const USERS_KEY = "shopsphere_users";
const SESSION_KEY = "shopsphere_session";

function getUsers() {
  return get(USERS_KEY, {});
}
function saveUsers(users) {
  set(USERS_KEY, users);
}
function normalizeUser(user) {
  if (!user) return null;
  return {
    name: String(user.name || ""),
    email: String(user.email || "").toLowerCase(),
    role: user.role === "admin" ? "admin" : "customer",
    createdAt: user.createdAt || null,
    passwordHash: user.passwordHash || "",
  };
}
function seedAdmin() {
  const users = getUsers();
  const email = "admin@shopsphere.demo";
  if (!users[email]) {
    users[email] = {
      name: "ShopSphere Admin",
      email,
      passwordHash: "",
      role: "admin",
      createdAt: new Date().toISOString(),
      demoSeed: true,
    };
    saveUsers(users);
  }
}
function currentUser() {
  const email = sessionStorage.getItem(SESSION_KEY);
  if (!email) return null;
  const user = getUsers()[email.toLowerCase()] || null;
  return normalizeUser(user);
}
function isLoggedIn() {
  return !!currentUser();
}
function requireAuth(redirect = pageUrl("login.html")) {
  if (!isLoggedIn()) {
    const next = location.pathname.split("/").pop() || "index.html";
    location.href = `${redirect}?next=${encodeURIComponent(next)}`;
    return false;
  }
  return true;
}
function requireRole(role, redirect = pageUrl("index.html")) {
  const user = currentUser();
  if (!user) {
    requireAuth();
    return false;
  }
  if (user.role !== role) {
    toast("You are not authorized to open this page.");
    setTimeout(() => (location.href = redirect), 700);
    return false;
  }
  return true;
}
function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem("shopsphere_user");
  toast("You have been logged out.");
  setTimeout(() => (location.href = pageUrl("index.html")), 500);
}
async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
function validatePassword(p) {
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(p);
}
function switchAuth(mode) {
  $("#loginPanel")?.classList.toggle("hide", mode !== "login");
  $("#registerPanel")?.classList.toggle("hide", mode !== "register");
  $$(".tabs button").forEach((b) =>
    b.classList.toggle("active", b.dataset.mode === mode),
  );
}
async function loginDemo(e) {
  e.preventDefault();
  const email = $("#loginEmail").value.trim().toLowerCase(),
    password = $("#loginPassword").value;
  const user = getUsers()[email];
  if (!user) {
    toast("No account found. Please register first.");
    return;
  }
  const validDemoAdmin =
    user.demoSeed &&
    email === "admin@shopsphere.demo" &&
    password === "Admin@123";
  if (!validDemoAdmin && user.passwordHash !== (await hashPassword(password))) {
    toast("Incorrect email or password.");
    return;
  }
  sessionStorage.setItem(SESSION_KEY, email);
  set("shopsphere_user", {
    name: user.name,
    email: user.email,
    role: user.role,
  });
  toast("Login successful!");
  const next = new URLSearchParams(location.search).get("next");
  setTimeout(
    () =>
      (location.href =
        next && /^[\w-]+\.html$/.test(next)
          ? pageUrl(next)
          : pageUrl("index.html")),
    450,
  );
}
async function registerDemo(e) {
  e.preventDefault();
  const name = $("#regName").value.trim(),
    email = $("#regEmail").value.trim().toLowerCase();
  const password = $("#regPassword").value,
    confirm = $("#regPasswordConfirm").value;
  if (name.length < 2) {
    toast("Enter your full name.");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    toast("Enter a valid email address.");
    return;
  }
  if (!validatePassword(password)) {
    toast("Password must be 8+ characters with a letter and number.");
    return;
  }
  if (password !== confirm) {
    toast("Passwords do not match.");
    return;
  }
  const users = getUsers();
  if (users[email]) {
    toast("An account with this email already exists.");
    return;
  }
  const role = "customer";
  users[email] = {
    name,
    email,
    passwordHash: await hashPassword(password),
    role,
    createdAt: new Date().toISOString(),
  };
  saveUsers(users);
  sessionStorage.setItem(SESSION_KEY, email);
  set("shopsphere_user", { name, email, role });
  toast("Account created successfully!");
  setTimeout(() => (location.href = pageUrl("index.html")), 450);
}
function renderAuthHeader() {
  const user = currentUser();
  $$(".user-label").forEach((x) => {
    if (user) {
      x.textContent = `Hi, ${user.name.split(" ")[0]}`;
      x.href = pageUrl("profile.html");
      x.title = "Open profile";
    } else {
      x.textContent = "Login";
      x.href = pageUrl("login.html");
      x.title = "Login / Register";
    }
  });
  $$(".auth-only-link").forEach((x) => x.classList.toggle("hide", !user));
  $$("#mobileNav a[href$='login.html']").forEach((x) => {
    x.textContent = user ? "My Profile" : "Login / Register";
    x.href = user ? pageUrl("profile.html") : pageUrl("login.html");
  });
}
function authGuard() {
  const page = location.pathname.split("/").pop() || "index.html";
  const protectedPages = [
    "profile.html",
    "orders.html",
    "wishlist.html",
    "checkout.html",
  ];
  if (protectedPages.includes(page) && !requireAuth()) return;
  if (page === "admin.html" && !requireRole("admin")) return;
  if (page === "login.html" && currentUser()) {
    // Keep login available for switching accounts, but show the active-account state.
    $("#activeAccount")?.classList.remove("hide");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  seedAdmin();
  authGuard();
  renderAuthHeader();
  $("#loginForm")?.addEventListener("submit", loginDemo);
  $("#registerForm")?.addEventListener("submit", registerDemo);
  $$(".tabs button").forEach((b) =>
    b.addEventListener("click", () => switchAuth(b.dataset.mode)),
  );
  $("#logoutBtn")?.addEventListener("click", logout);
  $("#profileLogout")?.addEventListener("click", logout);
  $("#profileForm")?.addEventListener("submit", saveProfile);
  $("#preferencesForm")?.addEventListener("submit", saveProfilePreferences);
  renderProfile();
});

function saveProfile(e) {
  e.preventDefault();
  const user = currentUser();
  if (!user) return;
  const name = $("#profileName").value.trim();
  if (name.length < 2) {
    toast("Please enter a valid name.");
    return;
  }
  const users = getUsers();
  if (!users[user.email]) return;
  users[user.email].name = name;
  saveUsers(users);
  set("shopsphere_user", {
    name: user.name,
    email: user.email,
    role: user.role,
  });
  renderAuthHeader();
  renderProfile();
  toast("Profile updated.");
}
function saveProfilePreferences(e) {
  e.preventDefault();
  const categories = $$("input[name=profileCategory]:checked").map(
    (x) => x.value,
  );
  const maxPrice = Number($("#profileMaxPrice").value),
    minRating = Number($("#profileMinRating").value);
  savePreferences({ categories, maxPrice, minRating });
  toast("Preferences saved. Your recommendations are updated.");
  renderProfile();
}
function renderProfile() {
  const root = $("#profilePage");
  if (!root) return;
  const user = currentUser();
  if (!user) return;
  const initials = user.name
    .split(/\s+/)
    .map((x) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  $("#profileAvatar")?.replaceChildren(document.createTextNode(initials));
  $("#profileRoleName")?.replaceChildren(
    document.createTextNode(`Welcome back, ${user.name.split(" ")[0]}!`),
  );
  if ($("#profileName")) $("#profileName").value = user.name;
  if ($("#profileEmail")) $("#profileEmail").value = user.email;
  const roleLabel = user.role === "admin" ? "Administrator" : "Customer";
  $("#profileRole")?.replaceChildren(document.createTextNode(roleLabel));
  $("#profileSecurityRole")?.replaceChildren(
    document.createTextNode(roleLabel),
  );
  const orders = get("shopsphere_orders", []).filter(
    (o) =>
      o.customerEmail === user.email ||
      (!o.customerEmail && get("shopsphere_user", {}).email === user.email),
  );
  if ($("#profileOrders")) $("#profileOrders").textContent = orders.length;
  if ($("#profileWishlist"))
    $("#profileWishlist").textContent = wishlist().length;
  if ($("#profileCart")) $("#profileCart").textContent = cartCount();
  const p = getPreferences();
  if ($("#profileMaxPrice")) $("#profileMaxPrice").value = p.maxPrice;
  if ($("#profileMinRating")) $("#profileMinRating").value = p.minRating;
  $$("input[name=profileCategory]").forEach(
    (x) => (x.checked = p.categories.includes(x.value)),
  );
}
