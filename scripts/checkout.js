 import { renderOrderSummaryAll } from "./checkout/orderSummary.js";
 import { renderPaymentSummary } from "./checkout/paymentSummary.js";
 import { loadProducts } from "../data/productsData.js";
//  import '../data/backend-practice.js';

new Promise((resolve)=>{
  console.log("start promise");
  loadProducts(()=>{
    console.log('finished loading');
   
    resolve();
  })
}).then(()=>{
  console.log('next step');
  renderOrderSummaryAll();
  renderPaymentSummary();
})

// loadProducts(()=>{
//   renderOrderSummaryAll();
//   renderPaymentSummary();
// })

