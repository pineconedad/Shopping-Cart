let shop = document.getElementById("shop");



// let basket = []
let basket = JSON.parse(localStorage.getItem("data")) || [];


let generateShop = () => {
    return shop.innerHTML = shopItemsData.map((x) => {
        let {id,name,price,desc,img} = x
        let search = basket.find(x => x.id === id) || []
        return `
        <div id=product-code-${id} class="item">
            <img width="220" src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-circle"></i>
                        <div id=${id} class="quantity">
                        ${search.item === undefined ? 0 : search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-circle"></i>
                    </div>
                </div>
            </div>
        </div>`;
    }).join("")
    };

generateShop();

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
    localStorage.setItem("data", JSON.stringify(basket));
    
    // console.log(basket);
}

let update = (code) => {    
    let search = basket.find(x => x.id === code);
    search === undefined ? 0 : document.getElementById(code).innerHTML = search.item;
    calculation();
    // console.log(search);

}


let calculation = () =>{
    let cartIcon = document.getElementById("cartAmount");
    cart = basket.map(x => x.item);
    let sum = cart.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    cartIcon.innerHTML = sum;
    // console.log(sum);

}
calculation();