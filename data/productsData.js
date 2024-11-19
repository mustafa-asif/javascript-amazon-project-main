
export const productsData = []; // Declare productsData in the global scope

export  function loadProductsFetch() {
  try {
    
    const promise =  fetch('https://supersimplebackend.dev/products')
    .then((response)=>{
      const values=response.json();
      return values;
    })
    .then((productsDetails)=>{
      
      productsDetails.forEach(value => {
          if (!productsData.some(item => item.id === value.id)) {
            productsData.push(value);
          }
        });
      
    });
    return promise;
  }catch(error){
    console.error('failed to load products',error);
  }
    
};

 await loadProductsFetch() 
    
export  function getProduct(productId){
     let matchingProduct;
  productsData.forEach((products)=>{
    if(products.id === productId){
      matchingProduct = products;
    }else{
      console.log("id not found");
    }
  });
  
  return matchingProduct;
 }



