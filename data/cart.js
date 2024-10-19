export const cart=[];

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

};