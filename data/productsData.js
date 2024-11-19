
export const productsData = []; // Declare productsData in the global scope

export async function loadProductsFetch() {
  try {
    
    const promise =  await fetch('https://supersimplebackend.dev/products');
    const productsDetails = await promise.json();
    productsDetails.map(value => {
              productsData.push(value);
            
          });
          console.log(productsData);
   
  }catch(error){
    console.error('failed to load products',error);
  }
    
};


  await loadProductsFetch(); // Call the function to load products
    
export  function getProduct(productId){
     let matchingProduct;
    //  console.log(productsData);
  productsData.forEach((products)=>{
    if(products.id === productId){
      matchingProduct = products;
      console.log(productId);
      console.log(products.id);
    }else{
      console.log("id not found");
    }
  });
  
  return matchingProduct;
 }



