# 🛍️ ShopSphere

> A modern, responsive front-end e-commerce website built using **HTML5, CSS3, and Vanilla JavaScript**.

ShopSphere is a browser-based e-commerce project designed to demonstrate a complete shopping experience without a backend or database. It includes product discovery, personalized recommendations, authentication, authorization, profiles, cart, wishlist, orders, checkout, simulated payments, and an admin dashboard.

---

## 🌐 About ShopSphere

### ShopSphere = Shop + Sphere

- **Shop** represents online shopping.
- **Sphere** represents a complete digital environment or ecosystem.

The name reflects the project's goal of creating a complete online shopping ecosystem where product discovery, personalization, accounts, shopping, checkout, and administration work together.

---

## ✨ Main Features

### 🏠 Home Page

- Modern hero section
- Featured categories
- Personalized product recommendations
- Trending products
- Best sellers
- Special offers and coupons
- Store benefits
- Newsletter demo section
- Responsive layout

### 🛒 Product Shopping

- Product catalog with 32 demo products
- Product details page
- Product images
- Categories
- Ratings and review counts
- Original price and discounted price
- Stock information
- Product specifications
- Add to cart
- Add/remove wishlist
- Recently viewed products

### 🔥 Product Discovery

ShopSphere calculates product ranking using information such as:

- Product rating
- Number of reviews
- Discount
- Stock/activity signals
- User preferences
- Shopping activity

This powers sections such as:

- **Trending Products**
- **Best Sellers**
- **Picked for You**
- **Recommended Products**

### 🧠 Personalized Recommendations

Users can personalize their shopping feed using:

- Favorite categories
- Maximum preferred price
- Minimum product rating

ShopSphere combines these preferences with browser-side shopping activity to rank products for the user.

### 🔎 Search, Filter & Sort

The product catalog supports:

- Search by product name
- Search by category
- Search by description/content
- Category filtering
- Price filtering
- Rating filtering
- Product-type/trending filters
- Sorting by:
  - Default
  - Trending
  - Newest
  - Rating
  - Discount
  - Price: Low to High
  - Price: High to Low

---

## 🔐 Authentication & Authorization

ShopSphere includes a browser-only authentication system.

## Registration

Users can create an account with:

- Full name
- Email
- Password
- Confirm password

Password validation requires:

- At least 8 characters
- At least one letter
- At least one number

## Login

Registered users can:

- Sign in with email and password
- Maintain a browser session
- Access protected pages
- Open their profile
- Log out

## Password Hashing

Passwords for registered users are hashed using the browser's **Web Crypto API with SHA-256** before being stored in `localStorage`.

> ⚠️ This is for educational/demo purposes. SHA-256 alone is **not suitable for production password storage**. A real application should use a server-side password hashing algorithm such as Argon2id, scrypt, or bcrypt with appropriate security controls.

## Authorization

ShopSphere supports two roles:

| Role | Access |
| --- | --- |
| Customer | Shopping, wishlist, cart, checkout, orders, profile |
| Administrator | Admin dashboard and product management |

Protected pages include:

- Profile
- Wishlist
- Orders
- Checkout
- Admin dashboard

Unauthorized users are redirected to the appropriate page.

---

## 👤 User Profile

Logged-in users get a dedicated **My Profile** page.

The profile displays:

- User avatar/initials
- Name
- Email
- Account role
- Number of orders
- Wishlist count
- Cart count
- Account/security information
- Shopping preferences

Users can also:

- Update their name
- Change recommendation preferences
- Log out

The profile preferences are connected to ShopSphere's recommendation system.

---

## 💳 Checkout & Payment Simulation

ShopSphere provides a realistic front-end checkout flow.

### Checkout

Users can review:

- Cart items
- Quantities
- Discounts
- Coupon
- Shipping
- Final order total
- Delivery option

### Payment Methods

#### Cash on Delivery

Simple demo COD option.

#### UPI

The UPI simulation includes:

- UPI app selection
- UPI ID field
- UPI ID validation
- Demo verification status
- Payment processing state

#### Credit/Debit Card

The card simulation includes:

- Cardholder name
- Card number
- Card number formatting
- Expiry date
- CVV
- Validation
- Payment processing state
- Successful payment confirmation

> ⚠️ No real payment is processed. Card/UPI information is not sent to a payment gateway.

---

## 📦 Orders

After a successful demo checkout, an order is created and stored in the browser.

Users can view:

- Order ID
- Order date
- Ordered products
- Quantities
- Delivery option
- Payment method
- Order total
- Order status

A dedicated order-success page is provided after checkout.

---

## ❤️ Wishlist

Logged-in users can:

- Add products to wishlist
- Remove products
- View wishlist
- See wishlist count in the header

---

## 🛒 Shopping Cart

The cart supports:

- Add products
- Remove products
- Increase/decrease quantity
- Stock-aware quantity handling
- Cart total calculation
- Coupon discounts
- Shipping calculation
- Checkout navigation

---

## 🏷️ Coupons & Offers

Demo coupons include:

| Coupon | Benefit |
| --- | --- |
| `SHOP10` | 10% off |
| `SAVE200` | ₹200 off |
| `WELCOME` | 5% off |

These coupons are part of the front-end demo and do not represent real commercial offers.

---

## 👨‍💼 Admin Dashboard

The demo administrator can manage the product catalog.

Admin functionality includes:

- View products
- Add products
- Edit products
- Delete products
- View product stock
- View product pricing
- View orders

Access is controlled through the administrator role.

### Demo Admin Account

```text
Email:    admin@shopsphere.demo
Password: Admin@123
Role:     Administrator
```

> Change/remove demo credentials before using the project outside a classroom/demo environment.

---

## 🌙 Dark Mode

ShopSphere includes:

- Light mode
- Dark mode
- Theme persistence using browser storage
- Responsive dark-mode styling

---

## 📱 Responsive Design

The interface is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile devices

Responsive styling is implemented using CSS media queries.

---

## 🧰 Technologies Used

| Technology | Purpose |
| --- | --- |
| **HTML5** | Page structure and semantic markup |
| **CSS3** | Styling, layouts, responsive design and dark mode |
| **Vanilla JavaScript** | Application logic and interactivity |
| **Web Crypto API** | Demo password hashing |
| **localStorage** | Browser-side application data |
| **sessionStorage** | Login session |
| **Unsplash image URLs** | Product photography |

### No Frameworks

This project intentionally does **not** use:

- React
- Vue
- Angular
- Bootstrap
- Tailwind CSS
- jQuery
- Node.js
- PHP
- Python
- Backend frameworks
- SQL/NoSQL databases

---

## 📁 Project Structure

```text
ShopSphere/
│
├── index.html
│
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── dark-mode.css
│
├── js/
│   ├── app.js
│   ├── products.js
│   ├── auth.js
│   ├── cart.js
│   ├── checkout.js
│   ├── orders.js
│   ├── products.js
│   ├── search.js
│   ├── wishlist.js
│   └── admin.js
│
├── images/
│   ├── product-1.svg
│   ├── product-2.svg
│   ├── ...
│   └── product-32.svg
│
└── pages/
    ├── admin.html
    ├── cart.html
    ├── checkout.html
    ├── login.html
    ├── order-success.html
    ├── orders.html
    ├── product.html
    ├── products.html
    ├── profile.html
    └── wishlist.html
```

> Product records are defined in `js/products.js`. Product images currently use remote image URLs from Unsplash; the `images/` directory contains the project's fallback/demo SVG assets.

---

## 💾 Browser Storage

Because ShopSphere has no backend, browser storage is used to simulate application persistence.

Examples include:

```text
shopsphere_users
shopsphere_session
shopsphere_cart
shopsphere_wishlist
shopsphere_orders
shopsphere_preferences
shopsphere_recent
shopsphere_custom_products
shopsphere_removed_products
shopsphere_theme
```

Storage is local to the browser/device.

Clearing browser site data will remove the stored demo state.

---

## 🚀 How to Run

### Option 1 — VS Code Live Server

1. Extract the ShopSphere ZIP.
2. Open the `ShopSphere` folder in VS Code.
3. Install the **Live Server** extension if needed.
4. Open `index.html`.
5. Right-click the file.
6. Select **Open with Live Server**.

The website will open in your browser.

### Option 2 — Any Local HTTP Server

Serve the project directory using any simple static HTTP server and open the generated local address.

Using an HTTP server is recommended because it gives the project a consistent origin for browser storage and asset loading.

### Option 3 — Directly Open `index.html`

The project is designed as a static website and may work by opening `index.html` directly, but **Live Server/local HTTP hosting is recommended** for the most reliable behavior.

---

## 🧪 Suggested Testing Flow

For a complete demonstration:

### 1. Create a Customer Account

Go to:

```text
pages/login.html
```

Choose **Register** and create an account.

### 2. Personalize

Open:

```text
My Profile
```

Choose:

- Favorite categories
- Maximum price
- Minimum rating

Return to Home and check **Picked for You**.

### 3. Browse Products

Open **Products** and test:

- Search
- Category
- Price
- Rating
- Trending
- Sorting

### 4. Shopping

- Open a product
- Add it to wishlist
- Add it to cart
- Change quantity
- Apply a coupon

### 5. Checkout

Test:

- Delivery option
- COD
- UPI
- Credit/Debit Card
- Validation
- Payment processing
- Order confirmation

### 6. Orders

Open **Orders** and verify the newly created demo order.

### 7. Admin

Log out and sign in using:

```text
admin@shopsphere.demo
Admin@123
```

Open the Admin dashboard and test product management.

---

## 🔒 Security Disclaimer

ShopSphere is an **educational front-end project**.

It should **not** be used as a real e-commerce application without a secure backend.

In particular:

- User accounts are stored in browser storage.
- Authentication is performed entirely in JavaScript.
- Authorization is client-side.
- Demo orders are stored locally.
- No real payment gateway is connected.
- No real card/UPI transaction is performed.
- Client-side authorization can be bypassed by someone who controls the browser.
- Production applications must validate authorization on the server.
- Production passwords should be hashed server-side using a password-specific algorithm.
- Production payment processing should use a certified payment provider.

---

## 🎯 Project Objectives

The main objectives of ShopSphere are to demonstrate:

1. Modern e-commerce UI design
2. Responsive web development
3. DOM manipulation
4. JavaScript application logic
5. Product filtering and sorting
6. Personalized recommendations
7. Browser storage
8. Authentication concepts
9. Authorization and role-based access
10. Shopping cart management
11. Wishlist management
12. Order management
13. Checkout workflows
14. Payment UI simulation
15. Admin product management
16. Dark-mode implementation

---

## 🔮 Possible Future Improvements

If a backend is allowed in a future version, ShopSphere can be upgraded with:

- Real database
- Server-side authentication
- Secure password hashing
- JWT/session authentication
- Email verification
- Password reset
- OAuth/social login
- Real payment gateway
- Product database
- Server-side search
- Inventory management
- Real order tracking
- Customer support/chat
- Product reviews
- Seller accounts
- Admin analytics
- Sales reports
- Cloud image storage
- Real-time notifications

---

## 🎓 Academic Project

**Project Name:** ShopSphere  
**Project Type:** E-Commerce Web Application  
**Architecture:** Front-End / Client-Side Demo  
**Primary Technologies:** HTML5, CSS3, Vanilla JavaScript  
**Database:** None  
**Backend:** None  
**Payment:** Simulated  
**Authentication:** Client-side demo  
**Authorization:** Client-side role-based demo

---

## 📄 License

This project is intended for **educational and demonstration purposes**.

---

## 👋 Conclusion

ShopSphere demonstrates how a feature-rich e-commerce experience can be built using only standard web technologies.

It combines **product discovery, personalization, authentication, user profiles, shopping, checkout, simulated payments, orders, and administration** into one responsive front-end application.

> **ShopSphere — Everything you want, all in one sphere.**
