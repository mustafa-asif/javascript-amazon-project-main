
export const productsData = []; // Declare productsData in the global scope

export async function loadProducts(callback) {
  try {
    
    const response = await fetch('https://supersimplebackend.dev/products');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const values = await response.json();
    
        
    // Add only unique values to productsData (optional)
    values.forEach(value => {
      if (!productsData.some(item => item.id === value.id)) {
        productsData.push(value);
      }
    });
   
    
    console.log('load products');
    // console.log(productsData);
    callback()
    
  } catch (error) {
    console.error('Failed to load products:', error);
  }
};

await loadProducts(()=>{});


// new Promise((resolve)=>{
  //   loadProducts(()=>{
    //     productsData;
    //     resolve();
    //   })
    // });
    
    
    
    export  function getProduct(productId){
     
      let matchingProduct;
  
  
  // console.log(productsData.id);
  productsData.forEach((products)=>{
    if(products.id === productId){
      matchingProduct = products;
    }else{
      console.log("id not found");
    }
  });
  
  return matchingProduct;
 }



