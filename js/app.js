// Load Products API
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    //by destructuring product object
    const { rate, count } = product.rating

    const div = document.createElement("div");
    div.classList.add("col");

    div.innerHTML = `<div class="card   single-product border border-info ">
      <div>
    <img class="product-image card-img-top "  src=${image}></img>
      </div class="card-body ">

      <h3 class="card-title text-center ">${product.title}</h3>
      <p class="text-center b-5">Category: ${product.category}</p>
      <h2 class="text-center">Price: $ ${product.price}</h2>
      <h5 class="text-center">Total-Rating : ${count}   </h5>
      <h6 class="text-center">Average-rating: ${rate}"></h6>
      <div class="d-flex justify-content-end w-100   ">
      <button onclick="addTocard(${product.id},${product.price})" id="addTocard-btn" class="buy-now btn btn-success  mx-1 ">add to card</button>
      <button id="details-btn" onclick='showDetails(${product.price},${rate})' class="btn btn-danger mx-1 " data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></div></div>
    `;

    document.getElementById("all-products").appendChild(div);
  }
};

// Show Product Details
const showDetails = (price, rating) => {



  // const x= Array.from(Array(parseInt(rating)).keys()).map((r) =>'<i class="bi bi-star-fill text-warning"></i>' )

  // console.log(x)
  document.getElementById("modal-body").innerHTML = `
  
     <div class='p-3'>
      <p>Rating: ${Array.from(Array(parseInt(rating)).keys()).map(
    (r) => '<i class="bi bi-star-fill text-warning"></i>'
  )}</p>
      <h2>Price: $ ${price}</h2>
     </div>
`;

}


let count = 0;
const addTocard = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  // console.log(price, typeof price)

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);

  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  // const convertPrice = value;
  const total = convertedOldPrice + convertPrice;
  console.log(total, typeof total)
  //  document.getElementById(id).innerText = Math.round(total);
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {

  console.log(
    getInputValue("price"),
    getInputValue("delivery-charge"),
    getInputValue("total-tax")
  );

  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");

  console.log(grandTotal)
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
