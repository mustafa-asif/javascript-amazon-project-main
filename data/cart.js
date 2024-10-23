// import { RenderCart } from "../scripts/amazon.js";

export let cart= JSON.parse(localStorage.getItem('cart'));
if(!cart){
 cart= [
    {
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 2
    },
    {
      productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity : 1
  
    }
  ];
}

export  function RenderCart(){
  let cartQuantity=0;
  cart.forEach((item) =>{
    cartQuantity +=item.quantity;
    // updateCartQuanity(item.productId,cartQuantity);
  });
  SaveCartStorage();
  return cartQuantity; 
};

 export function SaveCartStorage() {
  // save cart to local storage
  localStorage.setItem('cart', JSON.stringify(cart));
};

export   function  AddToCart(productId) {
  const itemQuantity=document.getElementById(`${productId}`);
  const itemQuantityValue=Number(itemQuantity.value);

  let matchingItem;
  cart.forEach((item) =>{
  
    if(productId === item.productId){
      matchingItem=item;
    }
  });

  if(matchingItem){
    matchingItem.quantity +=itemQuantityValue;
  }else{
    cart.push({
      productId,
      quantity:itemQuantityValue
    });
  }
  // RenderCart();
  // updateCartQuanity(productId,itemQuantityValue);
  SaveCartStorage();

};

 export function RemoveCartItem(productId){
  const newCart=[];
  cart.forEach((item) =>{
    if(item.productId !== productId){
      newCart.push(item);
  }
  cart=newCart;
});
SaveCartStorage();
};

export function updateCartQuanity(productId,newQuantity){
  //  let updatedQuanity=newQuantity;
  cart.forEach((item)=>{
    if(item.productId === productId){
      item.quantity =newQuantity;
    }
  })
  SaveCartStorage();
  return newQuantity;
}