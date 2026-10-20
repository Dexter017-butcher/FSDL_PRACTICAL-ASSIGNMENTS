const productList = document.getElementById("product-list");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";

    div.innerHTML = `
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id}, this)">Add to Cart</button>
    `;

    productList.appendChild(div);
});

function addToCart(id, btn) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    btn.innerText = "✓ Added";
    btn.style.background = "#16a34a";

    setTimeout(() => {
        btn.innerText = "Add to Cart";
        btn.style.background = "";
    }, 1000);
}