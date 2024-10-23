import {cart,RemoveCartItem,updateCartQuanity,SaveCartStorage} from '../data/cart.js';
import { productsData } from '../data/productsData.js';
import { FormatCurrrency } from './util/money.js';
import { RenderCart } from '../data/cart.js';


let renderOrder=document.getElementById('js-render-order');
const checkoutQuantity=document.getElementById('checkout-quantity');



function renderOrderSummary() {
  let orderSummary='';
    cart.forEach( (cartItem)=>{
    let matchingProduct;
    const productId=cartItem.productId;
    productsData.forEach((products)=>{
      if(products.id === productId){
        matchingProduct = products;
        // AddToCart(productId);
      }
    });

  const orderGenerating = `
  <div class="cart-item-container "
  id="js-cart-${matchingProduct.id}">
    <div class="delivery-date">
        Delivery date: 
    </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}"
        >

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name};
          </div>
          <div class="product-price">
            $${FormatCurrrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span id="js-value-${matchingProduct.id}" data-product-id=${matchingProduct.id} class="quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-product-update" data-product-id="${matchingProduct.id}">
              Update
            </span>
            
            
            <input type="number" max=10 min=0 name="" id="input-value-${matchingProduct.id}" class="quantity-input">
            <span class="save-quantity-link link-primary js-product-save" data-product-id=${matchingProduct.id}>
             
              Save
            </span>
            <span class="delete-quantity-link link-primary js-product-delete" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
      </div>
    </div>
  </div> `;
    orderSummary +=orderGenerating;
  });
    renderOrder.innerHTML=orderSummary;
    checkoutQuantity.innerHTML=`${RenderCart()} items`;

    // quantity.innerHTML=RenderCart();
};

renderOrderSummary();

// Deleting items from checkout
function Deleteitem(){

  const deleteItem=document.querySelectorAll('.js-product-delete');
  deleteItem.forEach((link =>{
    link.addEventListener('click',()=>{
      const productId=link.dataset.productId;
      RemoveCartItem(productId);
      const container=document.getElementById(`js-cart-${productId}`);
      container.remove();
      checkoutQuantity.innerHTML=`${RenderCart()} items`;
      
    });
  }));
};

Deleteitem();

 function UpdatingQuantity(){

   // updating items in cart
   const updateItem=document.querySelectorAll('.js-product-update');
   //  console.log(updateItem);
   updateItem.forEach((link) =>{
     link.addEventListener('click',()=>{
       const productId=link.dataset.productId;
       // console.log(productId);
       const container=document.getElementById(`js-cart-${productId}`);
       container.classList.add("is-editing-quantity");
      });
    });
  };
  UpdatingQuantity();


//  saving  updated quantity and rendering on checkout items too
function SavingUpdatedQuantity(){

  const saveItem=document.querySelectorAll('.js-product-save');
  
saveItem.forEach((link) =>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId;
    
    const container=document.getElementById(`js-cart-${productId}`);
    container.classList.remove("is-editing-quantity");
    const quantityInput=document.getElementById(`input-value-${productId}`);
    
    const quantityValue=Number(quantityInput.value);
    
    
    let changeQuantity=document.querySelector(`.quantity-label-${productId}`);
    
    
    console.log(changeQuantity);
    
    changeQuantity.innerHTML=updateCartQuanity(productId,quantityValue);
    checkoutQuantity.innerHTML=`${RenderCart()} items`;
    if(quantityValue ===0){
      container.remove();
      SaveCartStorage();
     }
   });
  });
};

SavingUpdatedQuantity();






 

// console.log(orderSummary);