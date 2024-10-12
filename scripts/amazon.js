
const displayProducts =document.getElementById('js-products');
// console.log(displayProducts);

const productsData =[
    {
        productImage:'images/products/athletic-cotton-socks-6-pairs.jpg',
        productName :' Black and Gray Athletic Cotton Socks - 6 Pairs',
        rating : {
            stars : 4.5,
            reviews : 87
        },
        productpriceCents : 1090
    },
    {
        productImage : 'images/products/intermediate-composite-basketball.jpg',
        productName : 'Intermediate Size Basketball',
        rating : {
            stars : 4,
            reviews : 127
        },
        productpriceCents : 2095
    },
    {
        productImage :'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
        productName :' Adults Plain Cotton T-Shirt - 2 Pack - Teal',
        rating : {
            stars : 4.5,
            reviews : 87
        },
        productpriceCents : 799
    },
    
];
let renderProductHtml ='';
productsData.forEach((products)=>{
    renderProductHtml  +=`
     <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.productImage}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${products.productName}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${products.rating.stars * 10}.png">
            
            <div class="product-rating-count link-primary">
              ${products.rating.reviews}
            </div>
          </div>

          <div class="product-price">
            $${(products.productpriceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>
    
    `;
});
// console.log(renderProductHtml);
displayProducts.innerHTML=renderProductHtml;