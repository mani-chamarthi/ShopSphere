const DEFAULT_PRODUCTS = [
  {
    "id": 1,
    "name": "Nova Wireless Headphones",
    "category": "Electronics",
    "price": 1999,
    "originalPrice": 2999,
    "discount": 33,
    "rating": 4.5,
    "reviews": 128,
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85",
    "description": "Wireless over-ear headphones with rich sound, comfortable cushions and long battery life.",
    "stock": 25,
    "featured": true,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Electronics",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 2,
    "name": "Pulse Smart Watch",
    "category": "Electronics",
    "price": 2499,
    "originalPrice": 3999,
    "discount": 38,
    "rating": 4.4,
    "reviews": 96,
    "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85",
    "description": "Fitness-focused smartwatch with notifications, activity tracking and a bright display.",
    "stock": 18,
    "featured": true,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Electronics",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 3,
    "name": "Aero Bluetooth Speaker",
    "category": "Electronics",
    "price": 1499,
    "originalPrice": 2299,
    "discount": 35,
    "rating": 4.3,
    "reviews": 84,
    "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=900&q=85",
    "description": "Portable Bluetooth speaker with punchy audio and compact travel-friendly design.",
    "stock": 30,
    "featured": true,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Electronics",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 4,
    "name": "Vision 24-inch Monitor",
    "category": "Electronics",
    "price": 7999,
    "originalPrice": 9999,
    "discount": 20,
    "rating": 4.6,
    "reviews": 71,
    "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&q=85",
    "description": "Full HD monitor with slim bezels, vivid colors and versatile connectivity.",
    "stock": 12,
    "featured": false,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Electronics",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 5,
    "name": "Swift Mechanical Keyboard",
    "category": "Electronics",
    "price": 2899,
    "originalPrice": 3499,
    "discount": 17,
    "rating": 4.7,
    "reviews": 143,
    "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&q=85",
    "description": "Tactile mechanical keyboard designed for productive typing and gaming.",
    "stock": 20,
    "featured": true,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Electronics",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 6,
    "name": "ClickPro Wireless Mouse",
    "category": "Electronics",
    "price": 999,
    "originalPrice": 1499,
    "discount": 33,
    "rating": 4.4,
    "reviews": 210,
    "image": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=900&q=85",
    "description": "Ergonomic wireless mouse with adjustable DPI and quiet clicks.",
    "stock": 45,
    "featured": false,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Electronics",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 7,
    "name": "Urban Classic Sneakers",
    "category": "Fashion",
    "price": 2299,
    "originalPrice": 3299,
    "discount": 30,
    "rating": 4.5,
    "reviews": 188,
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85",
    "description": "Everyday sneakers with cushioned comfort and a clean versatile silhouette.",
    "stock": 32,
    "featured": true,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Fashion",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 8,
    "name": "Astra Denim Jacket",
    "category": "Fashion",
    "price": 2799,
    "originalPrice": 3999,
    "discount": 30,
    "rating": 4.3,
    "reviews": 77,
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&q=85",
    "description": "Classic denim jacket with durable fabric and an easy layered fit.",
    "stock": 16,
    "featured": false,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Fashion",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 9,
    "name": "Everyday Cotton Shirt",
    "category": "Fashion",
    "price": 1299,
    "originalPrice": 1799,
    "discount": 28,
    "rating": 4.2,
    "reviews": 156,
    "image": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&q=85",
    "description": "Soft cotton shirt suitable for casual days, college and weekend outings.",
    "stock": 40,
    "featured": true,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Fashion",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 10,
    "name": "Comfort Joggers",
    "category": "Fashion",
    "price": 1199,
    "originalPrice": 1699,
    "discount": 29,
    "rating": 4.4,
    "reviews": 132,
    "image": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&q=85",
    "description": "Relaxed joggers with stretch fabric, practical pockets and a soft feel.",
    "stock": 35,
    "featured": false,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Fashion",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 11,
    "name": "Luna Backpack",
    "category": "Fashion",
    "price": 1599,
    "originalPrice": 2199,
    "discount": 27,
    "rating": 4.6,
    "reviews": 98,
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=85",
    "description": "Spacious everyday backpack with padded laptop sleeve and smart organization.",
    "stock": 27,
    "featured": true,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Fashion",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 12,
    "name": "Classic Analog Watch",
    "category": "Fashion",
    "price": 1899,
    "originalPrice": 2999,
    "discount": 37,
    "rating": 4.1,
    "reviews": 63,
    "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85",
    "description": "Minimal analog watch with a timeless dial and comfortable strap.",
    "stock": 14,
    "featured": false,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Fashion",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 13,
    "name": "The Focused Student",
    "category": "Books",
    "price": 499,
    "originalPrice": 699,
    "discount": 29,
    "rating": 4.7,
    "reviews": 322,
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&q=85",
    "description": "A practical guide to study habits, focus and building consistent learning routines.",
    "stock": 60,
    "featured": true,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Books",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 14,
    "name": "Python Made Simple",
    "category": "Books",
    "price": 799,
    "originalPrice": 999,
    "discount": 20,
    "rating": 4.8,
    "reviews": 241,
    "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900&q=85",
    "description": "Beginner-friendly introduction to Python programming with hands-on examples.",
    "stock": 38,
    "featured": true,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Books",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 15,
    "name": "The Startup Notebook",
    "category": "Books",
    "price": 599,
    "originalPrice": 899,
    "discount": 33,
    "rating": 4.4,
    "reviews": 118,
    "image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=900&q=85",
    "description": "Ideas and lessons on turning small concepts into useful products.",
    "stock": 42,
    "featured": false,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Books",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 16,
    "name": "World Atlas Explorer",
    "category": "Books",
    "price": 899,
    "originalPrice": 1299,
    "discount": 31,
    "rating": 4.6,
    "reviews": 92,
    "image": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=900&q=85",
    "description": "Illustrated atlas covering countries, geography and fascinating world facts.",
    "stock": 22,
    "featured": false,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Books",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 17,
    "name": "Mindful Minutes",
    "category": "Books",
    "price": 449,
    "originalPrice": 599,
    "discount": 25,
    "rating": 4.3,
    "reviews": 76,
    "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900&q=85",
    "description": "Short daily reflections designed to encourage calm and thoughtful routines.",
    "stock": 50,
    "featured": false,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Books",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 18,
    "name": "Web Design Handbook",
    "category": "Books",
    "price": 699,
    "originalPrice": 999,
    "discount": 30,
    "rating": 4.7,
    "reviews": 174,
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&q=85",
    "description": "A visual guide to modern HTML, CSS, responsive layouts and interface thinking.",
    "stock": 31,
    "featured": true,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Books",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 19,
    "name": "Metro Steel Bottle",
    "category": "Accessories",
    "price": 699,
    "originalPrice": 999,
    "discount": 30,
    "rating": 4.5,
    "reviews": 205,
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=85",
    "description": "Leak-resistant stainless steel bottle for school, college, work and travel.",
    "stock": 55,
    "featured": true,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Accessories",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 20,
    "name": "Flex Laptop Sleeve",
    "category": "Accessories",
    "price": 899,
    "originalPrice": 1299,
    "discount": 31,
    "rating": 4.4,
    "reviews": 88,
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=85",
    "description": "Protective padded sleeve with a slim profile for everyday laptop carry.",
    "stock": 28,
    "featured": false,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Accessories",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 21,
    "name": "Orbit Sunglasses",
    "category": "Accessories",
    "price": 999,
    "originalPrice": 1499,
    "discount": 33,
    "rating": 4.2,
    "reviews": 119,
    "image": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=900&q=85",
    "description": "Lightweight everyday sunglasses with a modern frame and UV protection.",
    "stock": 25,
    "featured": false,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Accessories",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 22,
    "name": "Cable Organizer Kit",
    "category": "Accessories",
    "price": 399,
    "originalPrice": 599,
    "discount": 33,
    "rating": 4.3,
    "reviews": 147,
    "image": "https://resources.sanborns.com.mx/medios-plazavip/mkt/649cf3af79c1e_dise-o-sin-t-tulojpg.jpg?qlty=75&scale=700",
    "description": "Reusable cable ties and organizers to keep desks and bags tidy.",
    "stock": 70,
    "featured": true,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Accessories",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 23,
    "name": "Travel Comfort Kit",
    "category": "Accessories",
    "price": 799,
    "originalPrice": 1099,
    "discount": 27,
    "rating": 4.1,
    "reviews": 61,
    "image": "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=900&q=85",
    "description": "Compact travel essentials kit for organized and comfortable journeys.",
    "stock": 24,
    "featured": false,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Accessories",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 24,
    "name": "Minimal Desk Lamp",
    "category": "Home & Living",
    "price": 1299,
    "originalPrice": 1799,
    "discount": 28,
    "rating": 4.5,
    "reviews": 102,
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=85",
    "description": "Adjustable LED desk lamp with a clean design for study and work spaces.",
    "stock": 33,
    "featured": true,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Home & Living",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 25,
    "name": "Cozy Cushion Set",
    "category": "Home & Living",
    "price": 999,
    "originalPrice": 1499,
    "discount": 33,
    "rating": 4.4,
    "reviews": 69,
    "image": "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=900&q=85",
    "description": "Set of soft decorative cushions to add comfort and character to your room.",
    "stock": 29,
    "featured": false,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Home & Living",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 26,
    "name": "Aroma Diffuser",
    "category": "Home & Living",
    "price": 1599,
    "originalPrice": 2299,
    "discount": 30,
    "rating": 4.6,
    "reviews": 83,
    "image": "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=900&q=85",
    "description": "Compact diffuser with gentle ambient lighting for a relaxing home atmosphere.",
    "stock": 21,
    "featured": true,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Home & Living",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 27,
    "name": "Kitchen Storage Set",
    "category": "Home & Living",
    "price": 1199,
    "originalPrice": 1699,
    "discount": 29,
    "rating": 4.3,
    "reviews": 57,
    "image": "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=900&q=85",
    "description": "Stackable containers designed for neat and efficient kitchen organization.",
    "stock": 36,
    "featured": false,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Home & Living",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 28,
    "name": "Foldable Study Table",
    "category": "Home & Living",
    "price": 2499,
    "originalPrice": 3499,
    "discount": 29,
    "rating": 4.2,
    "reviews": 44,
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=85",
    "description": "Space-saving foldable table for study, reading and compact rooms.",
    "stock": 15,
    "featured": false,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Home & Living",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 29,
    "name": "Sprint Yoga Mat",
    "category": "Sports",
    "price": 899,
    "originalPrice": 1299,
    "discount": 31,
    "rating": 4.6,
    "reviews": 154,
    "image": "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=900&q=85",
    "description": "Cushioned non-slip yoga mat for stretching, yoga and floor exercises.",
    "stock": 40,
    "featured": true,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Sports",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 30,
    "name": "Pro Football",
    "category": "Sports",
    "price": 1299,
    "originalPrice": 1799,
    "discount": 28,
    "rating": 4.5,
    "reviews": 127,
    "image": "https://images.unsplash.com/photo-1626248801379-51a0748a5f96?w=900&q=85",
    "description": "Durable training football with reliable grip for practice and recreational play.",
    "stock": 26,
    "featured": false,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Sports",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 31,
    "name": "Power Skipping Rope",
    "category": "Sports",
    "price": 499,
    "originalPrice": 799,
    "discount": 38,
    "rating": 4.4,
    "reviews": 201,
    "image": "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=900&q=85",
    "description": "Adjustable skipping rope with smooth bearings for cardio workouts.",
    "stock": 65,
    "featured": true,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Sports",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  },
  {
    "id": 32,
    "name": "Trail Sports Bag",
    "category": "Sports",
    "price": 1499,
    "originalPrice": 2199,
    "discount": 32,
    "rating": 4.3,
    "reviews": 73,
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=85",
    "description": "Lightweight sports duffel with roomy compartments for training essentials.",
    "stock": 19,
    "featured": false,
    "specs": {
      "Brand": "ShopSphere",
      "Category": "Sports",
      "Warranty": "6 months demo warranty",
      "Material": "Premium quality"
    }
  }
];
