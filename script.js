
// CART & LOCAL STORAGE
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

function updateCartCount() {
    document.getElementById('cartCount').innerText = cart.length;
}

function addToCart(product, price) {
    cart.push({product, price});
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(product + " added to cart!");
}

function showPage(page) {
    document.getElementById('homePage').classList.remove('active');
    document.getElementById('cartPage').classList.remove('active');
    document.getElementById('ordersPage').classList.remove('active');

    const footer = document.getElementById('footer');
    footer.style.display = 'none'; // hide by default

    if(page==='home') document.getElementById('homePage').classList.add('active');
    if(page==='cart') {
        document.getElementById('cartPage').classList.add('active');
        renderCart();
    }
    if(page==='orders') {
        document.getElementById('ordersPage').classList.add('active');
        renderOrders();
        footer.style.display = 'block'; // show footer only on orders
    }
}

function showAbout() {
    document.getElementById('aboutModal').style.display = 'flex';
}

function closeAbout() {
    document.getElementById('aboutModal').style.display = 'none';
}

function renderCart() {
    let cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    if(cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty</p>";
        return;
    }
    cart.forEach((item, index) => {
        let div = document.createElement('div');
        div.className = 'cart-item';
        div.style.animationDelay = (index * 0.1) + 's';
        div.innerHTML = `<span>${item.product} - ₹${item.price}</span> <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(div);
    });
}

function removeFromCart(index) {
    cart.splice(index,1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function placeOrder() {
    if(cart.length === 0) { alert("Cart is empty!"); return; }
    orders.push(...cart);
    localStorage.setItem('orders', JSON.stringify(orders));
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert("Order placed successfully!");
    showPage('orders');
}

function renderOrders() {
    let orderList = document.getElementById('orderList');
    orderList.innerHTML = '';
    if(orders.length === 0) {
        orderList.innerHTML = "<p>No orders placed yet.</p>";
        return;
    }
    orders.forEach((item, index) => {
        let div = document.createElement('div');
        div.className = 'order-item';
        div.style.animationDelay = (index * 0.1) + 's';
        div.innerHTML = `<span>${item.product} - ₹${item.price}</span>`;
        orderList.appendChild(div);
    });
}

// SEARCH
function searchProduct() {
    let input = document.getElementById("search").value.toLowerCase();
    let cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        let title = card.querySelector("h3").innerText.toLowerCase();
        card.style.display = title.includes(input) ? "block" : "none";
    });
}

// INITIALIZE
updateCartCount();
showPage('home');
