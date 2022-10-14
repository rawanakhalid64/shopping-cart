const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");


cartIcon.addEventListener("click", ()=> {
    cart.classList.add("active");
});
closeCart.addEventListener("click", ()=> {
    cart.classList.remove("active");
});
// start when the document is ready
if(document.readyState == "loading"){ 
    document.addEventListener('DOMContentLoaded' , start);
}else{
    start();
}
// ////////start/////////////
function start(){
    addEvents( );
}
// //////////////update & rerender////////////
function update(){
    addEvents();
    updateTotal();
}
// /////////////////add events//////////////////////////////////
function addEvents(){
    /////remove items from cart////////
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click" , handle_removeCartItem);
    });
    // ///////change item quantity/////////////
    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
    cartQuantity_inputs.forEach(input =>{
        input.addEventListener("change", handle_changeItemQuantiy);
    });


    // Adding item to Cart//
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach((btn) =>{
        btn.addEventListener("click" , handle_addCartItem);
    })
//Buying Order//

const buy_btn = document.querySelector(".btn-buy")
buy_btn.addEventListener("click" , handle_buyOrder)
}
// //////////////handle events functions//////////////
let itemsAdded =[]
function handle_addCartItem(){

 let product = this.parentElement;
   let title = product.querySelector(".product-title").innerHTML;
   let price = product.querySelector(".product-price").innerHTML;
   let imgSrc = product.querySelector(".product-img").src;
   console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  }
//handle item is already exist//
if(itemsAdded.find((el) => el.title == newToAdd.title)){
    alert("This Item is Already Exist");
    return;
}else{
    itemsAdded.push(newToAdd);
}


  //adding product to cart//
  let cartBoxElement = cartBoxComponent(title, price, imgSrc);

  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);
  update();


}

function handle_removeCartItem(){
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(el=>el.title != this.parentElement.querySelector(".cart-product-title").innerHTML)
    update();
}

function handle_changeItemQuantiy(){
    if(isNaN(this.value) || this.value <1){
        this.value =1;
    }
    this.value = Math.floor(this.value); //for keeping it integer

    update()

}
function handle_buyOrder(){
    if(itemsAdded.length <= 0){
        alert("There is No Order to place yet! \n please make an order first.")
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "" ;
    alert("Your Order is Placed Successfully:")
}
//////////////////////////////////////////updating functions////////////////////
function updateTotal(){
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) => {
        let PriceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(PriceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    })



    //for keeping 2 digits after the decimal points//
    total = total.toFixed(2);
   

    totalElement.innerHTML = "$" + total;
}


///////////////// HTML COMPONENTS //////////

function cartBoxComponent(title, price, imgSrc){
    return `



            <div class="cart-box">
                    <img src=${imgSrc} alt="" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                        </div>
                    
                     <i class='bx bxs-trash-alt cart-remove' ></i>
                     
                    </div> ` ;
                    
        }