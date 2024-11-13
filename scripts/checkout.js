 import { renderOrderSummaryAll } from "./checkout/orderSummary.js";
 import { renderPaymentSummary } from "./checkout/paymentSummary.js";
 import { loadProducts } from "../data/productsData.js";
//  import '../data/backend-practice.js';

loadProducts(()=>{
  renderOrderSummaryAll();
  renderPaymentSummary();
})

