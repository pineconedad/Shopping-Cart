let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () =>{
    let cartIcon = document.getElementById("cartAmount");
    cart = basket.map(x => x.item);
    let sum = cart.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    cartIcon.innerHTML = sum;
    // console.log(sum);

}
calculation();


let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

let generateCartItems = () => {

    if(basket.length !==0 ){
        return (shoppingCart.innerHTML = basket.map((x) =>{
            let {id, item} = x;
            let search = shopItemsData.find((y)=>y.id === id) || [];
            let{img,name,price} = search
            return`<div class="cart-item">
                <img width="100" src=${img} alt="">
                <div class="details">

                    <div class="title-price-x">
                        <h4 class="title-price">
                        <p>${name}</p>
                        <p class="cart-item-price">$ ${price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-circle"></i>
                    </div>
                    
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-circle"></i>
                        <div id=${id} class="quantity">
                        ${item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-circle"></i>
                    </div>
                    
                    <h3>$ ${item * search.price}</h3>
                </div>
            </div>`;
        }).join(""));
    } else{;
        label.innerHTML = `<h2>Cart is empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to home</button></a> `
        shoppingCart.innerHTML = ``
    }
};

generateCartItems();

// ${search.item === undefined ? 0 : search.item}

let increment = (id) => {
    let selectedItem = id;
    let code = selectedItem.id;
    let search = basket.find(x => x.id === code);

    if (search === undefined) {
        basket.push({id: code, item: 1});
    } else {
        search.item += 1;
    }
    update(code);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    // console.log(basket);
}

let decrement = (id) => {
    let selectedItem = id;
    let code = selectedItem.id;
    let search = basket.find(x => x.id === code) || [];
    if (search === undefined || search.item === 0) {
        return;
    } else {
        search.item -= 1;
    }
    update(code);
    basket = basket.filter(x => x.item!== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    
    // console.log(basket);
}

let update = (code) => {    
    let search = basket.find(x => x.id === code);
    search === undefined ? 0 : document.getElementById(code).innerHTML = search.item;
    calculation();
    TotalAmount();
    // console.log(search);

}


let removeItem = (id) => {
    let selectedItem = id;
    remove = selectedItem.id;
    basket = basket.filter((x)=>x.id !== remove);
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
    TotalAmount();
    calculation();
}

let TotalAmount  = () => {
    if (basket.length !== 0){
        let amount = basket.map((x)=>{
            let{item, id} = x;
            let search = shopItemsData.find((y)=>y.id === id) || [];
            return item*search.price
        }).reduce((x,y)=>x+y,0);
        label.innerHTML = `<h2> Total Bill: $ ${amount}</h2>
                           <button class="checkout">Checkout</button>
                           <button onclick="clearCart()" class="removeAll">Clear Cart</button>`
    } else {return;}
}

TotalAmount();

let clearCart = () =>{
    basket = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    calculation()
};