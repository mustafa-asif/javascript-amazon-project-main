import {AddToCart,RenderCart} from '../data/cart.js';
import { productsData } from '../data/productsData.js';
import { FormatCurrrency } from './util/money.js';


const displayProducts =document.getElementById('js-products');
const cartTotalCount=document.getElementById('js-cart-quantity');

// console.log(displayProducts);

    // loadProductsFetch();
  
  
  function RenderProductsGrid(){
    RenderProductsLists();
    DisplayCartItem();
  }
  RenderProductsGrid();


function RenderProductsLists(){
  

      let renderProductHtml ='';
      // console.log(productsData.length);
      productsData.forEach((products)=>{
          renderProductHtml  +=`
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
              src="${products.image}">
            </div>
          
            <div class="product-name limit-text-to-2-lines">
              ${products.name}
            </div>
          
            <div class="product-rating-container">
              <img class="product-rating-stars"
              src="images/ratings/rating-${products.rating.stars * 10}.png">
            
                <div class="product-rating-count link-primary">
                  ${products.rating.count}
                </div>
            </div>

            <div class="product-price">
              $${FormatCurrrency(products.priceCents)}
            </div>
            
            <div class="product-quantity-container">
              <select class="selectOption" id="${products.id}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart" id="-${products.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>
            
            <button class="add-to-cart-button button-primary js-add-to-cart-btn" 
              data-product-id="${products.id}" >
              Add to Cart
            </button>
          </div> `;
            
          });
          
          displayProducts.innerHTML=renderProductHtml;
    
  };
  // RenderProductsLists();
  
// display added message once item is added in cart
  function MessageDisplay(productId){
    const message=document.getElementById(`-${productId}`);
    setTimeout( ()=>{
      message.classList.add("messageDisplay");
      
    },500);

    setInterval( ()=>{
      message.classList.remove("messageDisplay");
    },3000);
  };

  // display cart items 
 function DisplayCartItem(){

   cartTotalCount.innerHTML= RenderCart();
   
   
   const cartBtn=document.querySelectorAll('.js-add-to-cart-btn');
   
   cartBtn.forEach((button) =>{
     
     button.addEventListener('click', () => {
       
       const productId=button.dataset.productId;
       AddToCart(productId);
       MessageDisplay(productId);
       cartTotalCount.innerHTML=RenderCart();
       
       
      });
      
    });
  };

  // RenderProductsGrid();

  // DisplayCartItem();