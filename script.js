let ATC = document.querySelectorAll(".ATC");
let quantity = document.querySelector(".quantity");
let quantityV = parseInt(quantity.innerText);

ATC.forEach((button) => {
  button.addEventListener("click", () => {
    // Convert text to integer
    quantityV++;
    quantity.innerText = quantityV; // Update the span text
  });
});

let section = document.querySelector("#section");

let cartIcon = document.querySelector("#icon");
let sidePart = document.querySelector(".side-part");
cartIcon.addEventListener("click", () => {
  sidePart.classList.add("open");
  section.classList.add("section1");
});

let closebtn = document.querySelector("#close");
closebtn.addEventListener("click", () => {
  sidePart.classList.remove("open");
  section.classList.remove("section1");
});

let totalbtn = document.querySelector("#total");
let totalPrice = 0;

const products = [
    { id: 1, imgSrc: "photo1.jpg", name: "PRODUCT 1", price: "72$" },
    { id: 2, imgSrc: "photo2.jpg", name: "PRODUCT 2", price: "92$" },
    { id: 3, imgSrc: "photo3.jpg", name: "PRODUCT 3", price: "99$" },
    { id: 4, imgSrc: "photo7.jpg", name: "PRODUCT 4", price: "120$" },
    { id: 5, imgSrc: "photo5.png", name: "PRODUCT 5", price: "56$" },
    { id: 6, imgSrc: "photo4.webp", name: "PRODUCT 6", price: "86$" }
];

const addedProducts = {}; // To keep track of added products

products.forEach((product) => {
    document.getElementById(`ATC${product.id}`).addEventListener("click", () => {
        addProductToList(product.id, product.imgSrc, product.name, product.price);
    });
});

function addProductToList(itemId, imgSrc, name, price) {
    function getPriceFromString(priceString) {
        return parseInt(priceString.replace("$", ""), 10);
    }
    let intprice = getPriceFromString(price);

    if (addedProducts[itemId]) {
        let quantityValue = document.getElementsByClassName(`quantity-value-${itemId}`)[0];
        let currentQuantity = parseInt(quantityValue.innerText);
        quantityValue.innerText = currentQuantity + 1;
        totalPrice += intprice;
    } else {
        let newdiv = document.createElement("div");
        newdiv.classList.add("shopping1");
        newdiv.innerHTML = `
            <div class="shopping1-first">
                <img src="${imgSrc}" class="shopping1-img">
                <p class="shopping1-name">${name}</p>
            </div>

            <p class="shopping1-price">${price}</p>
            <div class="shopping-quantity">
                <i class="fa-regular fa-minus" id="less-than-${itemId}"></i>
                <p class="quantity-value-${itemId}">1</p>
                <i class="fa-regular fa-plus" id="greater-than-${itemId}"></i>
               
            </div>
            
        `
       ;
        document.getElementById(`item${itemId}`).appendChild(newdiv);

        addedProducts[itemId] = true;
        totalPrice += intprice;

        document.getElementById(`less-than-${itemId}`).addEventListener("click", function () {
            let quantityValue = document.getElementsByClassName(`quantity-value-${itemId}`)[0];
            let currentQuantity = parseInt(quantityValue.innerText);
            if (currentQuantity > 1) {
                quantityValue.innerText = currentQuantity - 1;
                totalPrice -= intprice;
            } else {
                // Remove the product if the quantity becomes zero
                document.getElementById(`item${itemId}`).removeChild(newdiv);
                delete addedProducts[itemId];
                totalPrice -= intprice;
            }
            totalbtn.innerText = `${totalPrice}$`; // Update total price display
            quantityV--;
            quantity.innerText = quantityV;
        });

        document.getElementById(`greater-than-${itemId}`).addEventListener("click", function () {
            let quantityValue = document.getElementsByClassName(`quantity-value-${itemId}`)[0];
            let currentQuantity = parseInt(quantityValue.innerText);
            quantityValue.innerText = currentQuantity + 1;
            totalPrice += intprice;
            totalbtn.innerText = `${totalPrice}$`; // Update total price display
            quantityV++;
    quantity.innerText = quantityV;
        });
    }

    totalbtn.innerText = `${totalPrice}$`; // Update total price display
}
