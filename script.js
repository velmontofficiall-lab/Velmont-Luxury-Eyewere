// VELMONT starter storefront. Replace sample products, prices and contact settings before launch.
const STORE_CONFIG = {
  whatsappNumber: "918347950657", // Replace with your WhatsApp number including country code, digits only.
  instagramUrl: "https://www.instagram.com/velmont.officiall/" // Confirm your preferred handle before launch.
};

const products = [
  {id:1,name:"Aviator One",category:"Sunglasses",price:899,tag:"BESTSELLER",desc:"Classic metal-frame inspired silhouette.",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85"},
  {id:2,name:"Noir Square",category:"Sunglasses",price:999,tag:"NEW EDIT",desc:"A confident shape for everyday styling.",image:"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=85"},
  {id:3,name:"Modern Round",category:"Sunglasses",price:799,tag:"",desc:"A clean, vintage-inspired look.",image:"https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=700&q=85"},
  {id:4,name:"Chrono Classic",category:"Watches",price:1499,tag:"FEATURED",desc:"A versatile timepiece for your rotation.",image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=85"},
  {id:5,name:"Minimal Steel",category:"Watches",price:1799,tag:"",desc:"Understated design with a refined finish.",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85"},
  {id:6,name:"Street Form",category:"Shoes",price:1299,tag:"NEW EDIT",desc:"A clean everyday sneaker silhouette.",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"},
  {id:7,name:"Urban Runner",category:"Shoes",price:1599,tag:"",desc:"Sport-inspired styling for daily wear.",image:"https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=700&q=85"},
  {id:8,name:"Studio Sound",category:"Gadgets",price:1199,tag:"FEATURED",desc:"A sleek audio accessory for your setup.",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85"}
];

let activeFilter = "All";
let cart = JSON.parse(localStorage.getItem("velmont-cart") || "[]");
const productGrid = document.getElementById("productGrid");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const toast = document.getElementById("toast");
const money = n => "₹" + Number(n).toLocaleString("en-IN");

function renderProducts(){
  const term = document.getElementById("searchInput").value.trim().toLowerCase();
  const visible = products.filter(p => (activeFilter==="All" || p.category===activeFilter) && (p.name+" "+p.category+" "+p.desc).toLowerCase().includes(term));
  productGrid.innerHTML = visible.length ? visible.map(p => `
    <article class="product-card">
      <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy">${p.tag?`<span class="product-tag">${p.tag}</span>`:""}<button class="quick-add" data-add="${p.id}">ADD TO BAG +</button></div>
      <div class="product-info"><div class="product-category">${p.category}</div><h3 class="product-name">${p.name}</h3><div class="product-description">${p.desc}</div><div class="product-price">${money(p.price)}</div></div>
    </article>`).join("") : `<p class="empty-cart">No products found. Try another search.</p>`;
  productGrid.querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>addToCart(Number(b.dataset.add))));
}
function saveCart(){localStorage.setItem("velmont-cart",JSON.stringify(cart));renderCart();}
function addToCart(id){const found=cart.find(x=>x.id===id);if(found)found.qty++;else cart.push({id,qty:1});saveCart();showToast("Added to your bag");}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart();}
function renderCart(){
  const count=cart.reduce((s,x)=>s+x.qty,0);
  document.getElementById("cartCount").textContent=count;
  const subtotal=cart.reduce((s,x)=>s+(products.find(p=>p.id===x.id)?.price||0)*x.qty,0);
  document.getElementById("cartSubtotal").textContent=money(subtotal);
  const holder=document.getElementById("cartItems");
  holder.innerHTML=cart.length?cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-item"><img src="${p.image}" alt=""><div><strong>${p.name}</strong><small>${money(p.price)}</small><div class="qty-controls"><button data-qty="${p.id}" data-delta="-1">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-delta="1">+</button></div></div><button class="remove-item" data-remove="${p.id}" aria-label="Remove ${p.name}">×</button></div>`}).join(""):`<p class="empty-cart">Your bag is waiting for something special.</p>`;
  holder.querySelectorAll("[data-qty]").forEach(b=>b.addEventListener("click",()=>changeQty(Number(b.dataset.qty),Number(b.dataset.delta))));
  holder.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>changeQty(Number(b.dataset.remove),-999)));
}
function openCart(){cartDrawer.classList.add("open");cartOverlay.classList.add("open");cartDrawer.setAttribute("aria-hidden","false");}
function closeCart(){cartDrawer.classList.remove("open");cartOverlay.classList.remove("open");cartDrawer.setAttribute("aria-hidden","true");}
function showToast(message){toast.textContent=message;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),1800);}
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;activeFilter=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts();});
document.querySelectorAll(".collection-card").forEach(b=>b.addEventListener("click",()=>{activeFilter=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===activeFilter));renderProducts();document.getElementById("shop").scrollIntoView({behavior:"smooth"});}));
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.getElementById("openCart").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
cartOverlay.addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});
document.getElementById("checkoutButton").addEventListener("click",()=>{
  if(!cart.length){showToast("Your bag is empty");return;}
  if(STORE_CONFIG.whatsappNumber.includes("X")){showToast("Add your WhatsApp number in script.js first");return;}
  const lines=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `${p.name} (${p.category}) x ${x.qty} — ${money(p.price*x.qty)}`;});
  const total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);
  const message=`Hello Velmont! I'd like to place an order:\n\n${lines.join("\n")}\n\nSubtotal: ${money(total)}\n\nPlease confirm availability, shipping and final amount.`;
  window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`,"_blank","noopener");
});
document.getElementById("instagramLink").href=STORE_CONFIG.instagramUrl;
document.getElementById("footerInstagram").href=STORE_CONFIG.instagramUrl;
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
renderProducts();renderCart();
// ===== VELMONT PREMIUM UPGRADE =====

// Save wishlist
let wishlist = JSON.parse(localStorage.getItem("velmont-wishlist") || "[]");

function saveWishlist() {
  localStorage.setItem("velmont-wishlist", JSON.stringify(wishlist));
  updateWishlistCount();
}

function updateWishlistCount() {
  const btn = document.getElementById("openWishlist");
  if (btn) {
    const count = btn.querySelector("span");
    if (count) count.textContent = wishlist.length;
  }
}

// Modal helpers
function showModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
}

function hideModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
}

// Wishlist display
function renderWishlist() {
  const modal = document.querySelector("#wishlistModal .wishlist-modal");
  if (!modal) return;

  const items = products.filter(p => wishlist.includes(p.id));

  modal.innerHTML = `
    <button class="modal-close" onclick="hideModal('wishlistModal')">×</button>
    <p class="eyebrow">YOUR FAVOURITES</p>
    <h2>My Wishlist</h2>
    ${items.length ? items.map(p => `
      <div class="wishlist-item">
        <img src="${p.image}" alt="${p.name}" style="width:75px;height:75px;object-fit:cover">
        <div>
          <h3>${p.name}</h3>
          <p>${money(p.price)}</p>
          <button onclick="addToCartFromWishlist(${p.id})">ADD TO BAG</button>
          <button onclick="removeWishlist(${p.id})">REMOVE</button>
        </div>
      </div>
    `).join("") : "<p>Your wishlist is waiting for something special.</p>"}
  `;
}

function removeWishlist(id) {
  wishlist = wishlist.filter(x => x !== id);
  saveWishlist();
  renderWishlist();
}

function addToCartFromWishlist(id) {
  addToCart(id);
  openCart();
}

// Product quick view
function showProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  const modal = document.querySelector("#productModal .product-modal");
  if (!modal) return;

  modal.innerHTML = `
    <button class="modal-close" onclick="hideModal('productModal')">×</button>
    <img src="${p.image}" alt="${p.name}" style="width:100%;max-height:320px;object-fit:cover">
    <p class="eyebrow">${p.category}</p>
    <h2>${p.name}</h2>
    <p>${p.desc}</p>
    <h3>${money(p.price)}</h3>
    <button class="button button-gold" onclick="addToCart(${p.id});hideModal('productModal')">ADD TO BAG</button>
    <button onclick="toggleWishlist(${p.id})">♡ SAVE TO WISHLIST</button>
  `;

  showModal("productModal");
}

function toggleWishlist(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(x => x !== id);
    showToast("Removed from wishlist");
  } else {
    wishlist.push(id);
    showToast("Saved to wishlist ❤️");
  }

  saveWishlist();
  renderWishlist();
}

// Add premium buttons to product cards
function enhanceProductCards() {
  document.querySelectorAll("#productGrid .product-card").forEach(card => {
    if (card.dataset.premiumReady) return;

    card.dataset.premiumReady = "true";

    const name = card.querySelector(".product-name")?.textContent.trim();
    const p = products.find(x => x.name === name);
    if (!p) return;

    const actions = document.createElement("div");
    actions.className = "detail-actions";

    actions.innerHTML = `
      <button onclick="showProduct(${p.id})">QUICK VIEW</button>
      <button onclick="toggleWishlist(${p.id})">♡</button>
    `;

    card.appendChild(actions);
  });
}

// Product grid observer
const productObserver = new MutationObserver(enhanceProductCards);
if (productGrid) {
  productObserver.observe(productGrid, {childList:true, subtree:true});
}

// Wishlist button
document.getElementById("openWishlist")?.addEventListener("click", () => {
  renderWishlist();
  showModal("wishlistModal");
});

// Close modals
document.querySelectorAll(".modal-backdrop").forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) hideModal(modal.id);
  });
});

// Initialize
saveWishlist();
enhanceProductCards();

console.log("VELMONT PREMIUM FEATURES READY");
