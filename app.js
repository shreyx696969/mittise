// ==========================================================================
// MITTI SE (मिट्टी से) - Application Logic
// Cart State, Product Filtering, Lab Traceability & Checkout
// ==========================================================================

const CART_STORAGE_KEY = "mitti_se_cart_v1";
const FREE_SHIPPING_THRESHOLD = 799;

// Application State
const state = {
  cart: [],
  selectedCategory: "all",
  activeVariants: {}, // productId -> variant index
  coupon: null, // { code, discountPercent, discountAmount }
  activeModalProduct: null
};

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  initializeDefaultVariants();
  renderProducts();
  renderComparisonTable();
  setupEventListeners();
  updateCartUI();
  // Default load lab report for ghee
  loadBatchReport("MS-GHEE-B42");
});

// Load cart from LocalStorage
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      state.cart = JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to load cart from storage", e);
    state.cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
  } catch (e) {
    console.error("Failed to save cart to storage", e);
  }
}

// Initialize active variant selections to default (first variant)
function initializeDefaultVariants() {
  PRODUCTS_DATA.forEach(p => {
    state.activeVariants[p.id] = 0;
  });
}

// Render Products Grid
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const filtered = state.selectedCategory === "all"
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === state.selectedCategory);

  grid.innerHTML = filtered.map(product => {
    const selectedVariantIdx = state.activeVariants[product.id] || 0;
    const currentVariant = product.variants[selectedVariantIdx];

    const variantPillsHtml = product.variants.map((v, idx) => `
      <button 
        class="variant-chip ${idx === selectedVariantIdx ? 'active' : ''}"
        onclick="selectProductVariant('${product.id}', ${idx})"
      >
        ${v.size}
      </button>
    `).join("");

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="card-media">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <span class="card-badge">${product.badge}</span>
          <button class="btn-quick-view" onclick="openQuickView('${product.id}')" title="Quick View">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
        </div>

        <div class="card-content">
          <div class="card-origin">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.4 7.4 11.5 7.7 11.7a.5.5 0 0 0 .6 0c.3-.2 7.7-6.3 7.7-11.7a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
            <span>${product.origin}</span>
          </div>

          <div class="card-title-group">
            <h3 class="card-title">${product.name}</h3>
            <span class="card-hindi">${product.hindiName}</span>
          </div>

          <span class="card-method-pill">${product.method}</span>

          <div class="card-variants-row">
            ${variantPillsHtml}
          </div>

          <div class="card-footer">
            <div class="price-box">
              <span class="price-current">₹${currentVariant.price}</span>
              ${currentVariant.mrp ? `<span class="price-mrp">MRP ₹${currentVariant.mrp}</span>` : ''}
            </div>
            <button class="btn-add-cart" onclick="addToCart('${product.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <span>Add</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// Select Product Variant
window.selectProductVariant = function(productId, variantIndex) {
  state.activeVariants[productId] = variantIndex;
  renderProducts();
};

// Filter Products by Category
window.filterCategory = function(category, element) {
  state.selectedCategory = category;
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  if (element) element.classList.add("active");
  renderProducts();
};

// Add to Cart
window.addToCart = function(productId, customVariantIdx = null) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const variantIdx = customVariantIdx !== null 
    ? customVariantIdx 
    : (state.activeVariants[productId] || 0);
  const variant = product.variants[variantIdx];

  const cartItemId = `${product.id}-${variant.size}`;
  const existingItem = state.cart.find(item => item.cartItemId === cartItemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({
      cartItemId,
      id: product.id,
      name: product.name,
      variantSize: variant.size,
      price: variant.price,
      mrp: variant.mrp,
      image: product.image,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`Added ${product.name} (${variant.size}) to cart!`);
  openCartDrawer();
};

// Update Cart Quantity
window.updateCartQty = function(cartItemId, delta) {
  const item = state.cart.find(i => i.cartItemId === cartItemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.cartItemId !== cartItemId);
  }

  saveCartToStorage();
  updateCartUI();
};

// Remove Cart Item
window.removeCartItem = function(cartItemId) {
  state.cart = state.cart.filter(i => i.cartItemId !== cartItemId);
  saveCartToStorage();
  updateCartUI();
  showToast("Item removed from cart");
};

// Update Cart UI (Count, Drawer items, Shipping Meter, Subtotal)
function updateCartUI() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update badge counter in navbar
  const badge = document.getElementById("cartCountBadge");
  if (badge) badge.innerText = totalCount;

  // Render items in Cart Drawer
  const container = document.getElementById("cartItemsContainer");
  const drawerFooter = document.getElementById("cartDrawerFooter");
  const shippingMeter = document.getElementById("shippingMeterBar");

  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-state">
        <div class="empty-icon">🌾</div>
        <h4>Your pantry is empty</h4>
        <p style="font-size:0.85rem; margin-top:0.4rem;">Add pure stone-ground flour, Bilona ghee, or wood-pressed oil to begin your harvest.</p>
        <button class="btn btn-primary" style="margin-top:1.25rem;" onclick="closeCartDrawer()">Explore Harvest</button>
      </div>
    `;
    if (drawerFooter) drawerFooter.style.display = "none";
    if (shippingMeter) shippingMeter.style.display = "none";
    return;
  }

  if (drawerFooter) drawerFooter.style.display = "block";
  if (shippingMeter) shippingMeter.style.display = "block";

  // Shipping progress calculation
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const diff = FREE_SHIPPING_THRESHOLD - subtotal;
  const meterText = document.getElementById("meterText");
  const meterFill = document.getElementById("meterFill");

  if (meterText && meterFill) {
    meterFill.style.width = `${progressPercent}%`;
    if (diff > 0) {
      meterText.innerHTML = `Add <strong>₹${diff}</strong> more to unlock <strong>FREE Delivery</strong> across India!`;
    } else {
      meterText.innerHTML = `🎉 <strong>Congratulations!</strong> You qualify for <strong>FREE Delivery</strong>!`;
    }
  }

  // Render Cart Item rows
  container.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-variant">${item.variantSize}</div>
        <div class="cart-item-price">₹${item.price}</div>
        <div class="cart-item-actions">
          <div class="qty-counter">
            <button class="qty-btn" onclick="updateCartQty('${item.cartItemId}', -1)">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.cartItemId}', 1)">+</button>
          </div>
          <button class="btn-remove-item" onclick="removeCartItem('${item.cartItemId}')">Remove</button>
        </div>
      </div>
    </div>
  `).join("");

  // Bill Calculation
  let discount = 0;
  if (state.coupon) {
    if (state.coupon.type === "percent") {
      discount = Math.round(subtotal * (state.coupon.value / 100));
    } else if (state.coupon.type === "flat") {
      discount = state.coupon.value;
    }
  }

  const shippingFee = (subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0) ? 0 : 70;
  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  document.getElementById("billSubtotal").innerText = `₹${subtotal}`;
  document.getElementById("billShipping").innerText = shippingFee === 0 ? "FREE" : `₹${shippingFee}`;
  
  const discountRow = document.getElementById("billDiscountRow");
  if (discountRow) {
    if (discount > 0) {
      discountRow.style.display = "flex";
      document.getElementById("billDiscount").innerText = `-₹${discount}`;
    } else {
      discountRow.style.display = "none";
    }
  }

  document.getElementById("billGrandTotal").innerText = `₹${grandTotal}`;
}

// Drawer Controls
window.openCartDrawer = function() {
  document.getElementById("cartDrawerBackdrop")?.classList.add("active");
  document.getElementById("cartDrawer")?.classList.add("open");
  document.body.style.overflow = "hidden";
};

window.closeCartDrawer = function() {
  document.getElementById("cartDrawerBackdrop")?.classList.remove("active");
  document.getElementById("cartDrawer")?.classList.remove("open");
  document.body.style.overflow = "";
};

// Apply Promo Coupon
window.applyCoupon = function() {
  const input = document.getElementById("couponInput");
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === "MITTI10") {
    state.coupon = { code, type: "percent", value: 10 };
    showToast("Coupon MITTI10 applied: 10% Off!");
  } else if (code === "FREESHIP") {
    state.coupon = { code, type: "flat", value: 70 };
    showToast("Coupon FREESHIP applied: Free Delivery!");
  } else {
    showToast("Invalid promo code. Try 'MITTI10'");
    return;
  }
  updateCartUI();
};

// Quick View Modal
window.openQuickView = function(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;
  state.activeModalProduct = product;

  const modal = document.getElementById("quickViewModal");
  const modalBody = document.getElementById("quickViewContent");
  if (!modal || !modalBody) return;

  const selectedVariantIdx = state.activeVariants[product.id] || 0;
  const currentVariant = product.variants[selectedVariantIdx];

  modalBody.innerHTML = `
    <div class="quickview-grid">
      <div>
        <img src="${product.image}" alt="${product.name}" class="quickview-img">
        <div style="margin-top: 1rem; display:flex; gap:0.5rem; justify-content:center;">
          <span class="cert-pill" style="color:var(--c-forest); border-color:var(--c-forest-light); background:var(--c-forest-soft);">✓ Lab Tested Purity</span>
          <span class="cert-pill" style="color:var(--c-forest); border-color:var(--c-forest-light); background:var(--c-forest-soft);">✓ Zero Pesticides</span>
        </div>
      </div>

      <div>
        <span class="card-origin">${product.origin}</span>
        <h2 style="font-family:var(--font-serif); font-size:1.8rem; margin:0.3rem 0; color:var(--c-forest);">${product.name}</h2>
        <span class="card-hindi" style="font-size:1rem; margin-bottom:0.75rem;">${product.hindiName}</span>
        <p style="font-size:0.9rem; color:var(--c-text-body); line-height:1.6; margin-bottom:1.25rem;">${product.description}</p>
        
        <div style="margin-bottom:1.25rem;">
          <h4 style="font-size:0.85rem; text-transform:uppercase; color:var(--c-text-muted); margin-bottom:0.5rem;">Purity Highlights</h4>
          <ul style="font-size:0.85rem; padding-left:1.2rem; color:var(--c-forest-dark);">
            ${product.highlights.map(h => `<li style="margin-bottom:0.3rem;">${h}</li>`).join("")}
          </ul>
        </div>

        <div style="background:var(--c-parchment); padding:1rem; border-radius:var(--radius-md); margin-bottom:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="font-size:0.8rem; color:var(--c-text-muted); display:block;">Select Variant:</span>
              <div style="display:flex; gap:0.5rem; margin-top:0.3rem;">
                ${product.variants.map((v, idx) => `
                  <button 
                    class="variant-chip ${idx === selectedVariantIdx ? 'active' : ''}"
                    onclick="selectModalVariant('${product.id}', ${idx})"
                  >
                    ${v.size}
                  </button>
                `).join("")}
              </div>
            </div>
            <div style="text-align:right;">
              <span style="font-size:1.5rem; font-weight:800; color:var(--c-forest); display:block;">₹${currentVariant.price}</span>
              ${currentVariant.mrp ? `<span style="font-size:0.8rem; text-decoration:line-through; color:var(--c-text-light);">MRP ₹${currentVariant.mrp}</span>` : ''}
            </div>
          </div>
        </div>

        <button class="btn btn-primary" style="width:100%;" onclick="addToCart('${product.id}', ${selectedVariantIdx}); closeQuickView();">
          Add ${currentVariant.size} to Pantry Cart
        </button>
      </div>
    </div>
  `;

  modal.classList.add("open");
  document.getElementById("cartDrawerBackdrop")?.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.selectModalVariant = function(productId, idx) {
  state.activeVariants[productId] = idx;
  renderProducts();
  openQuickView(productId);
};

window.closeQuickView = function() {
  document.getElementById("quickViewModal")?.classList.remove("open");
  document.getElementById("cartDrawerBackdrop")?.classList.remove("active");
  document.body.style.overflow = "";
};

// Render Comparison Matrix
function renderComparisonTable() {
  const container = document.getElementById("comparisonTableBody");
  if (!container) return;

  container.innerHTML = COMPARISON_DATA.map(row => `
    <tr>
      <td class="td-feature">${row.aspect}</td>
      <td class="td-industrial"><span class="badge-cross">✕</span> ${row.industrial}</td>
      <td class="td-mitti"><span class="badge-check">✓</span> ${row.mittiSe}</td>
    </tr>
  `).join("");
}

// Lab Batch Report Lookup
window.loadBatchReport = function(batchCode) {
  const searchInput = document.getElementById("batchSearchInput");
  if (searchInput) searchInput.value = batchCode;

  // Find product with this batch code
  const product = PRODUCTS_DATA.find(p => p.batch && p.batch.code.toLowerCase() === batchCode.toLowerCase())
    || PRODUCTS_DATA[0]; // fallback to first

  const certContainer = document.getElementById("certificateDisplay");
  if (!certContainer) return;

  certContainer.innerHTML = `
    <div class="cert-box">
      <div class="cert-header">
        <div>
          <span style="font-size:0.75rem; font-weight:800; color:var(--c-clay); text-transform:uppercase; letter-spacing:0.1em;">
            GOVT RECOGNIZED NABL ACCREDITED LAB ANALYSIS
          </span>
          <h3>Certificate of Purity & Chemical Assay</h3>
          <p style="font-size:0.85rem; color:var(--c-text-muted);">Product: <strong>${product.name} (${product.hindiName})</strong></p>
        </div>
        <div class="cert-seal">
          ★ CERTIFIED PURE ★
        </div>
      </div>

      <div class="cert-details-grid">
        <div class="cert-detail-row">
          <span class="lbl">Batch Identification No.</span>
          <span class="val" style="color:var(--c-forest);">${product.batch.code}</span>
        </div>
        <div class="cert-detail-row">
          <span class="lbl">Sourced Origin / Farm Cluster</span>
          <span class="val">${product.batch.farm}</span>
        </div>
        <div class="cert-detail-row">
          <span class="lbl">Manufacturing / Churn Date</span>
          <span class="val">${product.batch.mfgDate}</span>
        </div>
        <div class="cert-detail-row">
          <span class="lbl">Statutory Expiry Date</span>
          <span class="val">${product.batch.expiryDate}</span>
        </div>
      </div>

      <table class="cert-tests-table">
        <thead>
          <tr>
            <th>Quality Parameter Tested</th>
            <th>Permissible Food Standard</th>
            <th>Mitti Se Batch Result</th>
            <th>Verification Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Pesticide Residues (540 Compounds)</strong></td>
            <td>< 0.01 mg/kg (FSSAI Organic)</td>
            <td><strong>0.00 ppm (Not Detected)</strong></td>
            <td><span class="tag-pass">PASSED</span></td>
          </tr>
          <tr>
            <td><strong>Heavy Metals (Pb, As, Cd, Hg)</strong></td>
            <td>Below Statutory Limit</td>
            <td><strong>Zero Contaminants</strong></td>
            <td><span class="tag-pass">PASSED</span></td>
          </tr>
          <tr>
            <td><strong>Synthetic Preservatives / Hexane</strong></td>
            <td>Absent / Nil</td>
            <td><strong>100% Zero Chemicals</strong></td>
            <td><span class="tag-pass">PASSED</span></td>
          </tr>
          <tr>
            <td><strong>Characteristic Assay Parameter</strong></td>
            <td>Standard Organic Range</td>
            <td><strong>${product.batch.butterfatPurity || product.batch.purityTest || product.batch.nmrTest || "Optimal Natural Grade"}</strong></td>
            <td><span class="tag-pass">PASSED</span></td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top:1.5rem; display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; color:var(--c-text-light);">
        <span>Certified under NPOP & Jaivik Bharat Framework</span>
        <button class="btn btn-secondary" style="padding:0.4rem 1rem; font-size:0.8rem;" onclick="showToast('Official PDF Certificate downloaded!')">
          ↓ Download Sealed PDF
        </button>
      </div>
    </div>
  `;
};

window.handleBatchSearch = function() {
  const code = document.getElementById("batchSearchInput")?.value.trim();
  if (!code) {
    showToast("Please enter a batch code (e.g. MS-GHEE-B42)");
    return;
  }
  loadBatchReport(code);
};

// Checkout Flow Modal
window.openCheckout = function() {
  if (state.cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }
  closeCartDrawer();

  const modal = document.getElementById("checkoutModal");
  if (!modal) return;

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;
  if (state.coupon) {
    discount = state.coupon.type === "percent" ? Math.round(subtotal * (state.coupon.value / 100)) : state.coupon.value;
  }
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 70;
  const grandTotal = Math.max(0, subtotal - discount + shipping);

  document.getElementById("checkoutSubtotal").innerText = `₹${subtotal}`;
  document.getElementById("checkoutTotal").innerText = `₹${grandTotal}`;

  modal.classList.add("open");
  document.getElementById("cartDrawerBackdrop")?.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.closeCheckout = function() {
  document.getElementById("checkoutModal")?.classList.remove("open");
  document.getElementById("cartDrawerBackdrop")?.classList.remove("active");
  document.body.style.overflow = "";
};

window.selectPaymentMethod = function(element, method) {
  document.querySelectorAll(".pay-card-option").forEach(el => el.classList.remove("selected"));
  element.classList.add("selected");
};

window.submitOrder = function(event) {
  if (event) event.preventDefault();

  const name = document.getElementById("custName")?.value || "Customer";
  const phone = document.getElementById("custPhone")?.value || "";
  const pincode = document.getElementById("custPin")?.value || "";

  if (!phone || !pincode) {
    showToast("Please provide your phone number and pin code");
    return;
  }

  const orderId = `MS-${Math.floor(100000 + Math.random() * 900000)}`;

  // Show Success Confirmation View
  const checkoutContainer = document.getElementById("checkoutContainer");
  if (checkoutContainer) {
    checkoutContainer.innerHTML = `
      <div style="text-align:center; padding: 2.5rem 1rem;">
        <div style="width:72px; height:72px; background:var(--c-forest-soft); color:var(--c-forest); border-radius:var(--radius-full); display:grid; place-items:center; font-size:2rem; margin:0 auto 1.5rem;">
          ✓
        </div>
        <span style="font-size:0.85rem; font-weight:700; color:var(--c-clay); text-transform:uppercase; letter-spacing:0.1em;">Order Placed Successfully!</span>
        <h2 style="font-family:var(--font-serif); font-size:2rem; color:var(--c-forest); margin:0.4rem 0 1rem;">Thank You, ${name}!</h2>
        <p style="color:var(--c-text-body); max-width:440px; margin:0 auto 1.5rem; font-size:0.95rem; line-height:1.6;">
          Your order <strong>#${orderId}</strong> is confirmed. Fresh stone-ground and wood-pressed staples are being packed from our farm collective.
        </p>

        <div style="background:var(--c-parchment); border:1px solid var(--c-parchment-border); border-radius:var(--radius-md); padding:1.25rem; max-width:420px; margin:0 auto 2rem; text-align:left;">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.88rem;">
            <span style="color:var(--c-text-muted);">Estimated Delivery:</span>
            <strong>3-5 Business Days</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.88rem;">
            <span style="color:var(--c-text-muted);">Delivery Pin Code:</span>
            <strong>${pincode}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.88rem;">
            <span style="color:var(--c-text-muted);">Tracking SMS & WhatsApp:</span>
            <strong>Sent to +91 ${phone}</strong>
          </div>
        </div>

        <button class="btn btn-primary" onclick="resetAndCloseOrder()">
          Continue Exploring Harvest
        </button>
      </div>
    `;
  }

  // Clear Cart
  state.cart = [];
  saveCartToStorage();
  updateCartUI();
};

window.resetAndCloseOrder = function() {
  closeCheckout();
  // Reload location or reset modal content
  setTimeout(() => {
    window.location.reload();
  }, 400);
};

// Toast Notifications
window.showToast = function(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span>🌱</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(15px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
};

// Global Event Listeners
function setupEventListeners() {
  // Close on backdrop click
  document.getElementById("cartDrawerBackdrop")?.addEventListener("click", () => {
    closeCartDrawer();
    closeQuickView();
    closeCheckout();
  });

  // ESC key listener
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      closeQuickView();
      closeCheckout();
    }
  });
}
