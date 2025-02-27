document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

function fetchProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            // ...existing code...
        });
}
