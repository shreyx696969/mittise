# Mitti Se (मिट्टी से) — Organic Food E-Commerce Website

An authentic, high-converting, premium e-commerce storefront for **Mitti Se**, an organic Indian food brand specializing in:
- **A2 Desi Cow Vedic Bilona Ghee** (Churned from whole curd)
- **Wood-Pressed Kacchi Ghani Mustard Oil** & Cold-Pressed Sesame/Groundnut Oils
- **Unpolished Heritage Rices** (Kalanamak Buddha Rice, Ancient Rakthashali Red Rice)
- **Stone-Ground Chakki Atta** (Whole grain Kathiya wheat flour)
- **Raw Wild Forest Honey**

---

## 🌟 Key Features Built-in

1. **Design System & Aesthetics:**
   - Earthy, warm palette (Terracotta clay `#b25329`, deep Vedic forest green `#203c2b`, warm cream parchment `#faf7f2`, and mustard gold `#dfa837`).
   - Classic editorial serif headings (`Playfair Display`) paired with clean modern interface typography (`Plus Jakarta Sans`).
   - Fully responsive on mobile phones, tablets, and desktops.

2. **Interactive Shopping Catalog (`products.js`):**
   - Filter by categories: *A2 Vedic Ghee*, *Wood-Pressed Oils*, *Heritage Rice*, *Stone-Ground Flour*, and *Raw Honey*.
   - Dynamic weight/size variant selectors (e.g. 500ml / 1L / 5L) with instant price and MRP calculations.
   - Quick-view modals with complete nutritional information, farm origin details, and purity highlights.

3. **Persistent Shopping Cart & Checkout Drawer:**
   - Real-time subtotal and live cart badge counter.
   - **Dynamic Free Shipping Progress Bar** (unlocks free delivery across India for orders above ₹799).
   - Promo coupon engine (pre-loaded with code `MITTI10` for 10% off).
   - Multi-step checkout simulation with address collection and payment selection (UPI, Credit/Debit Cards, Cash on Delivery).
   - Order confirmation screen with unique order IDs and WhatsApp notification notices.
   - LocalStorage persistence (cart items remain saved even after refreshing the browser).

4. **"The Mitti Se Difference" Comparison Matrix:**
   - Side-by-side comparison table explaining why slow wooden cold-pressing, whole grain stone milling, and Vedic bilona churning are vastly superior to commercial factory foods.

5. **Interactive Batch & Lab Report Verification System:**
   - Consumers can enter or click sample batch numbers (e.g., `MS-GHEE-B42`, `MS-OIL-M108`, `MS-RICE-KN77`) to see authentic NABL-accredited laboratory test reports verifying **0.00 ppm pesticide residues**, absence of heavy metals, and pure fat/oil assays.

6. **Farmer Mission & Social Proof:**
   - Customer testimonials from doctors, nutritionists, and mothers.
   - The "Soil to Soul" farm story showcasing support for 4,200+ regenerative Indian farmers.

---

## 🚀 How to Run & Preview the Website

### Method 1: Instant Direct Launch (No software needed)
Simply locate the project folder on your computer:
`C:\Users\shrey\OneDrive\Desktop\MITTISE`
and **double-click `index.html`**. It will open instantly in Google Chrome, Microsoft Edge, or any default browser.

### Method 2: Launch with any local server
If you use VS Code, install the **Live Server** extension and click **"Go Live"**.
Or if you have Python installed in your path:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000`.

---

## 📁 File Structure

```
MITTISE/
├── index.html        # Main semantic HTML structure, SEO tags & modals
├── styles.css        # Complete custom responsive design system & animations
├── products.js       # Product database, variants, nutritional data & lab reports
├── app.js            # State management, cart drawer, coupons, lab viewer & checkout
├── brand.config.js   # Brand constants
└── README.md         # Documentation & guide
```

---

## 🛠️ Customizing Products & Content

To add or modify products, open [products.js](file:///c:/Users/shrey/OneDrive/Desktop/MITTISE/products.js). Each product is a clear JSON object with:
- `name` and `hindiName`
- `category` (`ghee`, `oils`, `rice`, `grains`, `honey`)
- `variants` (array of sizes, prices, and MRPs)
- `batch` details (code, farm cluster, lab results)
- `image` URL (Unsplash or your own product photos)

---

## 🌐 Deploying to the Web

When you're ready to share this live with customers or investors:
1. **Netlify or Vercel (1-Minute Free Hosting):** Drag and drop this `MITTISE` folder into [app.netlify.com/drop](https://app.netlify.com/drop) to get a live URL immediately.
2. **Shopify Integration:** If you choose Shopify for backend fulfillment, you can use these exact designs, copy, and product layouts as custom Shopify Liquid sections.
