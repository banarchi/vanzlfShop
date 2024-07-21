let cart_list = document.querySelector('.cart-items-list')
let cart_total = document.querySelector('.cart-total')
let orderBtn = document.querySelector("#orderBtn")
let orderSection = document.querySelector(".order")


function get_item(item) {
    return `<div class = "cart-item">
        <h4 class="cart-item-title">${item.title}</h4>
        
        <div class="cart-item-quantity">Кількість: 
        <input data-item="${item.title}" class="form-control quantity-input" type="number" name="quantity" min="0" value="${item.quantity}">
        </div>
        <div class="cart-item-price" data-price="${item.price}">${item.price * item.quantity} грн</div>
        <img class="delete" width="50" src="img/99205_recycle_bin_full_icon.png" >
        </div>`
}

// Assuming your cart items are rendered within a container element
const cartContainer = document.getElementById('cart');

// Event listener for the delete button using event delegation
cartContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        // Find the closest parent element with class .cart-item
        const cartItem = event.target.closest('.cart-item');
        
        // If a cart item is found, remove it from the DOM
        if (cartItem) {
            cartItem.remove();
            console.log('Cart item deleted.');
        }
    }
});

function deleteItem(e){
    console.log(123245)
    if (e.target.classList.contains('delete')) {
        // Find the parent product element (div.product)
        const productElement = e.target.closest('.cart-item');
        
        // If a product element is found, remove it from the DOM
        if (productElement) {
            productElement.remove();
            console.log('Product deleted from cart.');
        }
    }
}

function showCartList() {
    cart_list.innerHTML = ''
    for (let key in cart.items) { // проходимося по всіх ключах об'єкта cart.items
        cart_list.innerHTML += get_item(cart.items[key])
    }
    cart_total.innerHTML = cart.calculateTotal()


}

showCartList()

cart_list.addEventListener('change', (event) => {
        let target = event.target 
        const itemTitle = target.getAttribute('data-item')
        const newQuantity = +target.value
        if (newQuantity > 0) {
            cart.updateQuantity(itemTitle, newQuantity)
            showCartList() // Оновити список товарів у кошику
        }
    });

    //анімація появи кошика поступова поява кошика
    anime({
        targets: '.cart',
        opacity: 1, // Кінцева прозорість (1 - повністю видимий)
        duration: 500, // Тривалість анімації в мілісекундах
        easing: 'easeInOutQuad'
    })

orderBtn.addEventListener("click", function (event) {
        orderBtn.style.display = "none"
        orderSection.style.display = "block"
        anime({
            targets: '.order',
            opacity: 1, // Кінцева прозорість (1 - повністю видимий)
            duration: 1000, // Тривалість анімації в мілісекундах
            easing: 'easeInOutQuad'
        })
})

