 import { renderOrderSummaryAll } from "./checkout/orderSummary.js";
 import { renderPaymentSummary } from "./checkout/paymentSummary.js";
 import {  loadProductsFetch } from "../data/productsData.js";
//  import '../data/backend-practice.js';


async function loadPage(){
  try {
    await loadProductsFetch();
    
  } catch (error) {
    console.log('try again later ',error);
    
  }
  renderOrderSummaryAll();
  renderPaymentSummary();
 
}

loadPage();


// Promise.all([
//   await  loadProductsFetch(),
//   new Promise((resolve)=>{
//     console.log("start promise");
//     resolve();
//   })
  
// ])
// .then(()=>{
//   console.log('next step');
//   renderOrderSummaryAll();
//   renderPaymentSummary();
// })

// loadProducts(()=>{
//   renderOrderSummaryAll();
//   renderPaymentSummary();
// })

