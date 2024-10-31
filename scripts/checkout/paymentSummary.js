import { cart, RenderCart } from "../../data/cart.js";
import { getDelieveryOption } from "../../data/delieveryOptions.js";
import { getProduct } from "../../data/productsData.js";
import { FormatCurrrency } from "../util/money.js";


export function renderPaymentSummary(){
  let productPriceCents=0;
  let shippingPriceCents=0;

  cart.forEach((cartItem)=>{
    const product=getProduct(cartItem.productId);
    productPriceCents +=product.priceCents * cartItem.quantity;

    const deliveryOption=getDelieveryOption(cartItem.delieveryOptionsId);
    shippingPriceCents +=deliveryOption.priceCents;
  });

  const totalBeforeTaxCents=productPriceCents + shippingPriceCents;
  const taxCents= totalBeforeTaxCents * 0.1;
  const totalCents=totalBeforeTaxCents+taxCents;

  const totalPayementSummary=`
     <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${RenderCart()}):</div>
            <div class="payment-summary-money">
            $${FormatCurrrency(productPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${FormatCurrrency(shippingPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${FormatCurrrency(totalBeforeTaxCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${FormatCurrrency(taxCents)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${FormatCurrrency(totalCents)}
            </div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;

  const renderPayement=document.querySelector('.js-payment-summary');
  renderPayement.innerHTML=totalPayementSummary;
  

}