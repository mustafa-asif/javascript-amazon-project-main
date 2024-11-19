import {cart,RemoveCartItem,updateCartQuanity,SaveCartStorage,updateDeliveryOptions} from '../../data/cart.js';
import { getProduct } from '../../data/productsData.js';
import { FormatCurrrency } from '../util/money.js';
import { RenderCart } from '../../data/cart.js';
import {renderPaymentSummary} from './paymentSummary.js';
import { delieveryOptions,getDelieveryOption } from '../../data/delieveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'


let renderOrder=document.getElementById('js-render-order');
const checkoutQuantity=document.getElementById('checkout-quantity');

// render all functions
  export function  renderOrderSummaryAll() {
    
  
  renderOrderSummary();
  DeleteItem();
  UpdatingQuantity();
  SavingUpdatedQuantity();
  renderUpdatedDelieveryOptions();
};


function renderOrderSummary() {
  let orderSummary='';
    cart.forEach(  (cartItem)=>{
      const productId=cartItem.productId;
      // console.log(cartItem.productId);
      // console.log(productId);
      const  matchingProduct =getProduct(productId);
      // console.log(matchingProduct);
      
  

    const deliverOptionId = cartItem.delieveryOptionsId;
    
    let dateFormat;
    const deliveryOption= getDelieveryOption(deliverOptionId);
    
  
      const today=dayjs();
      let deliveryDate=today.add(
        deliveryOption.delieveryDays,'days'
      );
      
      const dateString=deliveryDate.format('dddd, MMMM DD');
      dateFormat=dateString;



  const orderGenerating = `
  <div class="cart-item-container "
  id="js-cart-${matchingProduct.id}">
    <div class="delivery-date">
         Delivery date: ${dateFormat}


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
              Quantity: <span id="js-value-${matchingProduct.id}"
               data-product-id=${matchingProduct.id}
                class="quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
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
          ${generateOptions(matchingProduct,cartItem)}
      </div>
    </div>
  </div> `;
    orderSummary +=orderGenerating;
  });
    renderOrder.innerHTML=orderSummary;
    checkoutQuantity.innerHTML=`${RenderCart()} items`;

    
};



// function for generarting options
function generateOptions(matchingProduct,cartItem){
  let renderOptions='';
  delieveryOptions.forEach((option)=>{
    const today=dayjs();
    let deliveryDate=today.add(
      option.delieveryDays,'days'
    );
    const dateString=deliveryDate.format('dddd, MMMM DD');

    const price=option.priceCents=== 0
    ? 'FREE'
    : `$${FormatCurrrency(option.priceCents)} - `;

    const isChecked = option.id === cartItem.delieveryOptionsId;
    

    const optionHtml = ` 
    <div class="delivery-option">
      <input type="radio" 
      ${isChecked  ? 'checked' : '' }
        class="delivery-option-input js-delivery-option"
        data-delivery-id=${option.id} 
        data-product-id=${matchingProduct.id}
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${price} Shipping
        </div>
      </div>
    </div>`;
    renderOptions+=optionHtml;
  })
  return  renderOptions;
};



// Deleting items from checkout
function DeleteItem(){
  
  const deleteItem=document.querySelectorAll('.js-product-delete');
  deleteItem.forEach((link =>{
    link.addEventListener('click',()=>{
      const productId=link.dataset.productId;
      RemoveCartItem(productId);
      renderPaymentSummary();
      
      const container=document.getElementById(`js-cart-${productId}`);
      container.remove();
      checkoutQuantity.innerHTML=`${RenderCart()} items`;
      
    });
  }));
};



// updating items in cart

 function UpdatingQuantity(){

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
        
        
        changeQuantity.innerHTML=updateCartQuanity(productId,quantityValue);
        renderPaymentSummary();
    checkoutQuantity.innerHTML=`${RenderCart()} items`;
    if(quantityValue ===0){
      container.remove();
      renderPaymentSummary();
      
      
     }
   });
  });
};




renderOrderSummaryAll();

function renderUpdatedDelieveryOptions (){

  const deliveryElement=document.querySelectorAll('.js-delivery-option');
  deliveryElement.forEach((element)=>{
    element.addEventListener('click',()=>{
      const {deliveryId,productId}=element.dataset;
      updateDeliveryOptions(productId,deliveryId);
      renderOrderSummaryAll();
      renderPaymentSummary();
      
    })
    
  });
};






 

// console.log(orderSummary);