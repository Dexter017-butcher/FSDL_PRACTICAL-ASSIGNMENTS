const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px">
            <img src="${item.image}" width="60">
            <span>${item.name} - ₹${item.price}</span>
        </div>
        <button onclick="removeItem(${index})">Remove</button>
    `;

    cartItems.appendChild(div);
});

totalDisplay.innerText = "Total: ₹" + total;

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}