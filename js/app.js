let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let contactUsHTML = document.querySelector('.contactUs');
let iconCartSpan = document.querySelector('.icon-cart span');
let listProducts = [];
let products = [];
var cart = [];
var getCartItems = [];
var openButton = document.getElementById("open-popup");
var popup = document.getElementById("popup");

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})


const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0){
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">₹<strike>${product.mrpprice}</strike>  ₹${product.price}</div>
                <button class="addCart" id="open-popup">Add To Cart</button>
                <div id="popup"><h5>ADDED</h5></div>
			`;
            listProductHTML.appendChild(newProduct);
        })
    }
}

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
})

openButton.addEventListener("click", () => {
  popup.classList.add("show"); 
  setTimeout(() => {popup.classList.remove("show");}, 800);
})


const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == item.product_id);
            let info = listProducts[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">
				    ₹${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantity(product_id, type);
    }
})
const changeQuantity = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let valueChange = cart[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    cart[positionItemInCart].quantity = valueChange;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}

function getCart() {
    if(localStorage.getItem('cart')){
        getCartItems = JSON.parse(localStorage.getItem('cart'));
    }
	if(getCartItems.length > 0){
		var wa_msg = "Hello! Health Adda!\r\n\r\nI would like to place an order for the following items:\r\n\r\n"
		var grandTotal = 0;
        getCartItems.forEach(item => {
            let positionProduct2 = listProducts.findIndex((value) => value.id == item.product_id);
            let info2 = listProducts[positionProduct2];
			wa_msg += `${info2.name}\r\n                           ₹${info2.price} x ${item.quantity} = ₹${info2.price * item.quantity}\r\n`;
  			grandTotal += (info2.price * item.quantity);
        })
		wa_msg += `\r\n *Total Bill Amount: ₹${grandTotal}*\r\n\r\n`;
		wa_msg += `I'll make the payment of ₹${grandTotal} to this same number (7093603760) through GPay/PhonePe or any UPI app or cash after I receive the delivery.\r\n\r\nI'll share the delivery address/location in the next message.`;
    } else {
		wa_msg = `Dear Customer, Your Cart is Empty!! Please add some products before clicking ORDER. Thank you.\r\n`;
	}
	return wa_msg;
}

function send_handle() {
  wa_msg = getCart()
  wa_msg = window.encodeURIComponent(wa_msg)
  const win = window.open(`https://wa.me/917093603760?text=${wa_msg}`, '_blank');
  localStorage.removeItem('cart');
  var cart = [];
  var getCartItems = [];
}

const addContactToHTML = () => {
    contactUsHTML.innerHTML = `
        <h4 style="color:black;">CONTACT US</h4>
        <a href="tel:+917093603760" class="spaced-link"><i class="fa fa-phone" style="font-size:36px;color:black"></i></a>
        <a href="mailto:health.adda.oils@gmail.com" class="spaced-link"><i class="fa fa-envelope" style="font-size:36px;color:black"></i></a>
        <a href="https://maps.app.goo.gl/sPzAQJF6wusfymZP8" target="_blank" rel="noopener noreferrer" class="spaced-link"><i class="fa fa-map-marker" style="font-size:36px;color:black"></i></a>
        <a href="https://wa.me/917093603760?text=Hi!%20Health%20Adda!"><i class="fa fa-whatsapp" style="font-size:36px;color:green"></i></a>
	`;
}

const initApp = () => {
    // get data product
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
		
		addContactToHTML();
    })
}
initApp();