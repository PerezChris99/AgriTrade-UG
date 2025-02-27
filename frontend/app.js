document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});

function showPage(page) {
    const content = document.getElementById('content');
    fetch(`${page}.html`)
        .then(response => response.text())
        .then(html => {
            content.innerHTML = html;
            if (page === 'home') {
                fetchProducts();
            } else if (page === 'profile') {
                fetchUserProfile();
            } else if (page === 'admin') {
                fetchAdminDashboard();
            } else if (page === 'cart') {
                // You might want to fetch cart items here
            } else if (page === 'checkout') {
                // You might want to prepare checkout form here
            }
        })
        .then(() => { // Execute scripts after content is loaded
            if (page === 'login') {
                document.querySelector('form').addEventListener('submit', login);
            } else if (page === 'register') {
                document.querySelector('form').addEventListener('submit', register);
            }
        });
}

function fetchProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            const productsContainer = document.getElementById('products');
            productsContainer.innerHTML = ''; // Clear existing products
            data.products.forEach(product => {
                productsContainer.innerHTML += `
                    <div class="product">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p>Price: ${product.price}</p>
                        <button onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                `;
            });
        });
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.access_token) {
            localStorage.setItem('token', data.access_token);
            showPage('profile');
        } else {
            alert(data.message);
        }
    });
}

function register(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        showPage('login');
    });
}

function fetchUserProfile() {
    fetch('/api/users/1', { // Replace with dynamic user ID
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const profileContainer = document.getElementById('profile');
        profileContainer.innerHTML = `<h2>${data.user.username}'s Profile</h2>`;
    });
}

function fetchAdminDashboard() {
    fetch('/api/admin/dashboard', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const adminContainer = document.getElementById('admin-dashboard');
        adminContainer.innerHTML = '<h2>Admin Dashboard</h2>';
        adminContainer.innerHTML += '<h3>Users</h3>';
        data.users.forEach(user => {
            adminContainer.innerHTML += `<div>${user.username} - ${user.email}</div>`;
        });
        adminContainer.innerHTML += '<h3>Products</h3>';
        data.products.forEach(product => {
            adminContainer.innerHTML += `<div>${product.name} - ${product.price}</div>`;
        });
        adminContainer.innerHTML += '<h3>Orders</h3>';
        data.orders.forEach(order => {
            adminContainer.innerHTML += `<div>Order ID: ${order.id} - Total Price: ${order.total_price}</div>`;
        });
    });
}

function logout() {
    localStorage.removeItem('token');
    showPage('login');
}

function addToCart(productId) {
    // Add product to cart
    alert(`Product ${productId} added to cart`);
}
