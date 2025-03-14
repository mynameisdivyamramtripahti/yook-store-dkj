document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = document.getElementById("cart-count");

    function updateCartUI() {
        const cartContainer = document.getElementById("cart-items");
        cartContainer.innerHTML = "";
        cart.forEach((item, index) => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `<p>${item.name} - $${item.price}</p> 
                                  <button class='remove-from-cart' data-index='${index}'>🗑️</button>`;
            cartContainer.appendChild(cartItem);
        });

        // Store cart data in localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        cartCount.innerText = cart.length;
        cartCount.style.display = cart.length > 0 ? "block" : "none";
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let name = this.getAttribute("data-name");
            let price = this.getAttribute("data-price");
            cart.push({ name, price });
            updateCartUI();
        });
    });

    document.getElementById("cart-items").addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-from-cart")) {
            let index = e.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCartUI();
        }
    });

    // Load Cart Data from localStorage
    updateCartUI();
});


