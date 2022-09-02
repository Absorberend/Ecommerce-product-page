
// Nav bar
const navBarMenu = document.querySelector(".nav__bar");
const closeNavBar = document.querySelector(".close__nav__bar");
const openNavBar = document.querySelector(".menu__button");

// Gallery 
const slideContainer = document.querySelector(".slide__container");
const thumbnailContainer = document.querySelector(".row");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let slides;
let columns = document.querySelectorAll(".column");
let thumbnailsEl;
let slideIndex = 1;

// Gallery modal
const slideModalContainer = document.querySelector(".slide__container__modal");
const thumbnailModalContainer = document.querySelector(".row__modal");
const prevButtonModal = document.querySelector(".prev__modal");
const nextButtonModal = document.querySelector(".next__modal");
const closeButtonModal = document.querySelector(".close__modal");
const galleryModal = document.querySelector(".gallery__modal");
let slidesModal;
let columnsModal = document.querySelectorAll(".column__modal");
let thumbnailsElModal;

// Content
const contentCompany = document.querySelector(".content__company");
const contentHeader = document.querySelector(".content__header");
const contentInfoText = document.querySelector(".content__info__text");
const contentPrice = document.querySelector(".content__price");
const contentPriceDiscount = document.querySelector(".content__price__discount");
const contentPriceFull = document.querySelector(".content__price__full");

// Order amount bar
const orderAmountTotal = document.querySelector(".order__amount__total");
const orderAmountPlus = document.querySelector(".order__amount__plus");
const orderAmountMinus = document.querySelector(".order__amount__minus");
let orderTotal = 0;

// Shopping cart
const shoppingCartIcon = document.querySelector(".shopping__cart__icon");
const shoppingCartItems = document.querySelector(".shopping__cart__items");
const shoppingCart = document.querySelector(".shopping__cart");
const shoppingCartWrapper = document.querySelector(".shopping__cart__wrapper");
const cartDisplay = document.querySelector(".shopping__cart");
let previousOrderTotal;
let cleared;
let menuClose = true;

// Order button
const orderButton = document.querySelector(".order__button");

// Checkout button 
const checkoutButton = document.querySelector(".shopping__cart__button");

//sneakers object
const sneakerProduct = {
  company: 'Sneaker Company',
  productName: 'Fall Limited Edition Sneakers',
  fullPrice: 250,
  discountAmount: 50,
  sellPrice: function() {
    return Number((this.fullPrice * this.discountAmount) / 100);
  },
  stock: 7,
  contentInfo: `These low-profile sneakers are your perfect casual wear companion. Featuring a 
  durable rubber outer sole, they'll withstand everything the weather can offer.`,
  productImages: ["image-product-4.jpg", "image-product-3.jpg", "image-product-2.jpg", "image-product-1.jpg"],
  thumbnailImages: ["image-product-4-thumbnail.jpg", "image-product-3-thumbnail.jpg", "image-product-2-thumbnail.jpg", "image-product-1-thumbnail.jpg"]
}

const showContent = () => {
  sneakerProduct.productImages.forEach(image => {
    
    const galleryImage = `
    <div class="mySlides">
      <img src="images/${image}" alt="product image ${image.substring(14, 15)}">
    </div>
    `;

    const galleryModalImage = `
    <div class="mySlides__modal">
      <img src="images/${image}" alt="product image ${image.substring(14, 15)}">
    </div>
    `;
    
    slideContainer.insertAdjacentHTML("afterbegin", galleryImage);
    slideModalContainer.insertAdjacentHTML("afterbegin", galleryModalImage);
  })

  sneakerProduct.thumbnailImages.forEach(thumbnail => {
    const thumbnailImage = `
    <div class="column">
      <img class="demo cursor" src="images/${thumbnail}" data-slide-number="${thumbnail.substring(14, 15)}" alt="product image thumbnail ${thumbnail.substring(14, 15)}">
    </div>
    `;

    const thumbnailModalImage = `
    <div class="column__modal">
      <img class="demo__modal cursor" src="images/${thumbnail}" data-slide-number="${thumbnail.substring(14, 15)}" alt="product image thumbnail ${thumbnail.substring(14, 15)}">
    </div>
    `;

    thumbnailContainer.insertAdjacentHTML("afterbegin", thumbnailImage);
    thumbnailModalContainer.insertAdjacentHTML("afterbegin", thumbnailModalImage);
  })

    contentCompany.insertAdjacentHTML("afterbegin", `<h3>${sneakerProduct.company}</h3>`);
    contentHeader.insertAdjacentHTML("afterbegin", `<h1>${sneakerProduct.productName}</h1>`);
    contentInfoText.insertAdjacentHTML("afterbegin", `<p>${sneakerProduct.contentInfo}</p>`);
    contentPrice.insertAdjacentHTML("afterbegin", `<span>$${sneakerProduct.sellPrice().toFixed(2)}</span>`);
    contentPriceDiscount.insertAdjacentHTML("afterbegin", `<span>${sneakerProduct.discountAmount}%</span>`);
    contentPriceFull.insertAdjacentHTML("afterbegin", `<span>$${sneakerProduct.fullPrice.toFixed(2)}</span>`);
}

//Show product onload 
window.onload = function() {

  //Show default order amount of 0
  orderAmountTotal.innerText = orderTotal;

  //Show the gallery images & thumbnails
  showContent();
  slides = document.querySelectorAll(".mySlides");
  thumbnailsEl = document.querySelectorAll(".demo");
  slidesModal = document.querySelectorAll(".mySlides__modal");
  thumbnailsElModal = document.querySelectorAll(".demo__modal");

  //Close modal on resize, set correct slide and add clickevents to thumbnails
  windowResizeModal();
  showSlides(slideIndex);
  clickThumbnail();
  clickThumbnailModal();

  //set shopping cart display to none
  cartDisplay.style.display = "none";  
}

// Next/previous controls for both gallerly modal and productpage
const plusSlides = (n) => {
  showSlides(slideIndex += n);
}

prevButton.addEventListener("click", function() {
  plusSlides(-1)
});

nextButton.addEventListener("click", function() {
  plusSlides(1)
});

prevButtonModal.addEventListener("click", function() {
  plusSlides(-1)
});

nextButtonModal.addEventListener("click", function() {
  plusSlides(1)
});

//add active class to clicked thumbnail
const classCheck = thumbnail => {
  if (thumbnail.classList.contains("active")) {
    thumbnail.parentElement.classList.add("active__column");
  } else {
    thumbnail.parentElement.classList.remove("active__column");
  }
}

//Change slide with clicking on (modal) thumbnail
const clickThumbnail = function() {
    thumbnailsEl.forEach(slide => {
      slide.addEventListener("click", function() {
        currentSlide(Number(slide.dataset.slideNumber));
      })
      slide.addEventListener("dblclick", function() {
        galleryModal.style.display = "block";
        cartDisplay.style.display = "none";
      })
  })
}

const clickThumbnailModal = function() {
    thumbnailsElModal.forEach(slide => {
    slide.addEventListener("click", function() {
        currentSlide(Number(slide.dataset.slideNumber));
    })
  })
}
// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;

  if (n > slides.length) {
        slideIndex = 1;
    }

  if (n < 1) {
        slideIndex = slides.length;
    }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slidesModal[i].style.display = "none";
  }

  for (i = 0; i < thumbnailsEl.length; i++) {
    thumbnailsEl[i].className = thumbnailsEl[i].className.replace(" active", "");
    thumbnailsElModal[i].className = thumbnailsEl[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  slidesModal[slideIndex-1].style.display = "block";
  thumbnailsEl[slideIndex-1].className += " active";
  thumbnailsElModal[slideIndex-1].className += " active";

  thumbnailsEl.forEach(thumbnail => {
    classCheck(thumbnail);
  })

  thumbnailsElModal.forEach(thumbnail => {
    classCheck(thumbnail);
  })
}

closeButtonModal.addEventListener('click', function() {
  galleryModal.style.display = "none";
})

closeNavBar.addEventListener('click', function() {
  navBarMenu.style.display = "none";
})

//Close gallery modal or hamburger menu when clicking on dark background
window.addEventListener("click", function(e) {
  if (e.target === galleryModal) {
    galleryModal.style.display = "none";
  }
  if (e.target === navBarMenu) {
    navBarMenu.style.display = "none";
  }
  if (menuClose === true && cartDisplay.style.display === "grid" && shoppingCartItems.contains(document.querySelector(".shopping__cart__empty_message")) && e.target.parentNode !== shoppingCart && e.target.parentNode !== shoppingCartWrapper) {
      

    cartDisplay.style.display = "none";

  }
})

//when the window size is bigger than 768px the slides can be clicked to display the gallery modal
const windowResizeModal = function() {
    slides.forEach(slide => {
    slide.addEventListener("click", function() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        galleryModal.style.display = "block";
        cartDisplay.style.display = "none";
      }
    })
  })
}

//Close the hamburger menu and gallery modal when pressing ESC
document.addEventListener('keydown', function(event){
	if(event.key === "Escape" && galleryModal.style.display === "block"){
		galleryModal.style.display = "none";
	}
  else if (event.key === "Escape") {
    navBarMenu.style.display = "none";
  }
});

//Open hamburger menu when the hamburger is clicked
openNavBar.addEventListener("click", function() {
  navBarMenu.style.display = "grid";
})

//Trigger event when risizing window to small screen
window.addEventListener("resize", function () {
  if (window.matchMedia("(max-width: 768px)").matches) {
    //Close modal on small screen
    galleryModal.style.display = "none";
    //Change from normal nav menu to hamburger menu on smaller screen
    navBarMenu.style.display = "none";
  } 
  if (window.matchMedia("(min-width: 769px)").matches) {
    navBarMenu.style.display = "block";
  } 
});

// Order amount bar
const totalOrderAmount = operator => {
  if (Number(orderAmountTotal.innerText) >= 0 && Number(orderAmountTotal.innerText) <= sneakerProduct.stock) {
    if (operator === "-" && Number(orderAmountTotal.innerText) > 0 ) {
      orderAmountTotal.innerText = orderTotal - 1;
    } else if (operator === "+"  && Number(orderAmountTotal.innerText) < sneakerProduct.stock ) {
      orderAmountTotal.innerText = orderTotal + 1;
    }
    orderTotal = Number(orderAmountTotal.innerText);
  }
}

orderAmountPlus.addEventListener("click", function(){
  totalOrderAmount("+");
});

orderAmountMinus.addEventListener("click", function(){
  totalOrderAmount("-");
});

// Open/close shopping cart
shoppingCartIcon.addEventListener("click", function() {

  if (cartDisplay.style.display === "none") {
    cartDisplay.style.display = "grid";
  } else {
    cartDisplay.style.display = "none";
  }
}); 


// Order button
orderButton.addEventListener("click", function(){
  
  if (orderTotal > 0 && sneakerProduct.stock > 0) {
    cleared = false;
    cartDisplay.style.display = "grid";
    menuClose = false;

    if(!shoppingCartItems.contains(document.querySelector(".product__name"))) {
    shoppingCartItems.innerHTML = "";
    checkoutButton.style.display = "block";
    previousOrderTotal = orderTotal;

    const cartProductInfo = `
    <div class="product__logo">
      <img src="images/${sneakerProduct.productImages[3]}">
    </div>
    <span class="product__name">${sneakerProduct.productName}</span>
    <span class="product__order__info">$${sneakerProduct.sellPrice().toFixed(2)} x ${orderTotal} ${`$${(sneakerProduct.sellPrice() * Number(orderTotal)).toFixed(2)}`.bold()}</span>
    <div class="empty__cart">
      <img src="images/icon-delete.svg">
    </div>
    `
    shoppingCartItems.insertAdjacentHTML("afterbegin", cartProductInfo);

    sneakerProduct.stock -= orderTotal;
    orderTotal = 0;
    orderAmountTotal.innerText = orderTotal;
    } else if (shoppingCartItems.contains(document.querySelector(".product__name"))) {
      if (document.querySelector(".product__name").innerText === sneakerProduct.productName) {
        previousOrderTotal = Number(previousOrderTotal) + Number(orderTotal);
        sneakerProduct.stock -= orderTotal;
        orderTotal = 0;
        orderAmountTotal.innerText = orderTotal;

        document.querySelector(".product__order__info").innerHTML = `$${sneakerProduct.sellPrice().toFixed(2)} x ${previousOrderTotal} ${`$${(sneakerProduct.sellPrice() * previousOrderTotal).toFixed(2)}`.bold()}`;
      }
    }
        //Empty shopping cart
        const emptyShoppingCart = document.querySelector(".empty__cart");

        emptyShoppingCart.addEventListener("click", function(){
          if(!cleared) {
          shoppingCartItems.innerHTML = `<span class="shopping__cart__empty_message">Your cart is empty.</span>`;
          sneakerProduct.stock = sneakerProduct.stock + previousOrderTotal;
    
          checkoutButton.style.display = "none";
          cleared = true;
          menuClose = false;

          setTimeout(() => {
            menuClose = true;
          }, 10)
        }
      });
  } 
});

