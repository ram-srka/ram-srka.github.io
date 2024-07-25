let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let slideShowHTML = document.querySelector('.slideShow');
let contactUsHTML = document.querySelector('.contactUs');
let iconCartSpan = document.querySelector('.icon-cart span');
let listProducts = [];
let products = [];
var cart = [];
var getCartItems = [];
let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

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
                <div class="quantity-controls">
                    <button class="minus">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="plus">+</button>
                </div>
			`;
            let addButton = document.createElement('button');
            addButton.classList.add('addCart');
            addButton.textContent = 'Add To Cart';
            newProduct.appendChild(addButton);
            listProductHTML.appendChild(newProduct);
        })
    }
}

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    } else if (positionClick.classList.contains('minus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        changeQuantity(product_id, 'minus');
    } else if (positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        changeQuantity(product_id, 'plus');
    }
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

// Function to show slides
function showSlides() {
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
	//dots
	var dots = document.getElementsByClassName("demo");
	for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
    }
    // Increment slideIndex and wrap around if necessary
    slideIndex = (slideIndex + slides.length) % slides.length;
    slides[slideIndex].style.display = "block";
	dots[slideIndex].className += " w3-white";
}

// Function to change slide by a specified increment (+1 or -1)
function changeSlide(n) {
    slideIndex += n;
    showSlides();
}

function currentDiv(n) {
    slideIndex = n
    showSlides();
}

// Automatic slideshow interval (change slides every 2 seconds)
setInterval(function() {
    slideIndex++;
    showSlides();
}, 2000);

const addSlideToHTML = () => {
    slideShowHTML.innerHTML = `
        <div class="w3-content w3-display-container">
            <div class="slide"><img src="image/1.jpg" alt="Slide 1" style="width:100%"></div>
            <div class="slide"><img src="image/2.jpg" alt="Slide 2" style="width:100%"></div>
            <div class="slide"><img src="image/3.jpg" alt="Slide 3" style="width:100%"></div>        
            <div class="slide"><img src="image/4.jpg" alt="Slide 4" style="width:100%"></div>
            <div class="slide"><img src="image/5.jpg" alt="Slide 5" style="width:100%"></div>
            <div class="slide"><img src="image/6.jpg" alt="Slide 6" style="width:100%"></div>
            <div class="slide"><img src="image/7.jpg" alt="Slide 7" style="width:100%"></div>
            <div class="slide"><img src="image/8.jpg" alt="Slide 8" style="width:100%"></div>
            <div class="slide"><img src="image/9.jpg" alt="Slide 9" style="width:100%"></div>
            <div class="slide"><img src="image/10.jpg" alt="Slide 10" style="width:100%"></div>
            <a class="prev" onclick="changeSlide(-1)">&#10094;</a>
            <a class="next" onclick="changeSlide(1)">&#10095;</a>
        	<div class="w3-center w3-container w3-section w3-large w3-text-white w3-display-bottommiddle" style="width:100%">
                <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(1)"></span>
                <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(2)"></span>
                <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(3)"></span>
                <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(4)"></span>
                <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(5)"></span>
                <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(6)"></span>
                <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(7)"></span>
                <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(8)"></span>
                <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(9)"></span>
                <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(10)"></span>
        	</div>
        </div>
	`;
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
		// SlideShow
		addSlideToHTML();
		//Show the first slide initially
		showSlides();
		// Contact Details
		addContactToHTML();
    })
}
initApp();