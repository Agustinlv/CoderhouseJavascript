const { default: axios } = require("axios");

const cartItemContainer = document.getElementById('cartItemContainer');
const checkoutButtonDOM = document.getElementById('checkoutBtn');
const cartDetailMessageDOM = document.getElementById('cartDetailMessage');
const cartDetailDOM = document.getElementById('cartDetail');
const cartTotalValueDOM = document.getElementById('cartTotalValue');

async function populateCart(){
    const catalog = await fetchCatalog();
    let storedCartArr = JSON.parse(localStorage.getItem(cartKey)).sort();
    let totalValue = 0;
    //Limpiamos el div contenedor antes de volver a generar el contenido
    cartItemContainer.replaceChildren();
    
    if (storedCartArr.length === 0){
        let cartEmptyMessageDOM = document.createElement('h2');
        cartEmptyMessageDOM.className = "cartEmptyMessage";
        cartEmptyMessageDOM.textContent = "El carrito de compras está vacío";
        cartItemContainer.appendChild(cartEmptyMessageDOM);
        cartDetailDOM.style	= "display: none";
        return;
    };
    
    for(let i = 0; i < storedCartArr.length; i++){
        //Creo el div que va a contener el detalle de cada item en el carrito
        let cartItemDOM = document.createElement('div');
        cartItemDOM.className = "cartItem";
        //El img
        let cartItemImgDOM = document.createElement('img');
        cartItemImgDOM.id = "cartItemImg"
        //Busco el objeto con el id que haya en el índice actual y lo uso para sacar los datos de ese objeto.
        let itemObject = catalog.find(obj => obj.id === storedCartArr[i]);
        totalValue = totalValue + itemObject.value;
        cartTotalValueDOM.textContent = `$${totalValue}`;
        //El path a la imagen
        cartItemImgDOM.src = itemObject.image;
        //El nombre del puzzle
        let cartItemNameDOM = document.createElement('div');
        cartItemNameDOM.id = "cartItemName";
        cartItemNameDOM.textContent = itemObject.name;
        //Los detalles
        let cartItemDescDOM = document.createElement('cartItemDesc');
        cartItemDescDOM.className = "cartItemDesc";
        let UlDOM = document.createElement('ul');
        //Limito el for para que vaya del 2 al 4 porque necesito extraer la segunda y la tercera propiedad de cada elemento
        for(let n = 2; n < 4; n++){
            let li = document.createElement('li');
            li.textContent = Object.values(itemObject)[n];
            switch (n){
                //El segundo item es el precio, así que le agrego un símbolo $ al comienzo
                case 2:
                    li.textContent = `$${li.textContent}`;
                    break;
                //El tercer item es la canitdad de piezas, así que le agrego la palabra piezas al final
                case 3:
                    li.textContent = `${li.textContent} piezas`;
                    break;
            };
            UlDOM.appendChild(li);
        };
        cartItemDescDOM.appendChild(UlDOM);
        //El botón para remover el item
        let cartQtyContDOM = document.createElement('div');
        cartQtyContDOM.id = "cartQtyCont";
        let removeButtonDOM = document.createElement('button');
        removeButtonDOM.className = "removeFromCartButton";
        removeButtonDOM.textContent = "quitar item";
        removeButtonDOM.id = itemObject.id;
        removeButtonDOM.addEventListener('click',removeFromCart);
        cartQtyContDOM.appendChild(removeButtonDOM);
        //Finalmente ensamblo todas las partes que componen cada item en la lista del carrito
        cartItemDOM.appendChild(cartItemImgDOM);
        cartItemDOM.appendChild(cartItemNameDOM);
        cartItemDOM.appendChild(cartItemDescDOM);
        cartItemDOM.appendChild(cartQtyContDOM);
        //Inserto ese item en el contenedor princial
        cartItemContainer.appendChild(cartItemDOM);
    };
    cartDetailDOM.style = "display: flex";
};

function removeFromCart(){
    let storedCartArr = JSON.parse(localStorage.getItem(cartKey));
    let elementIdx = storedCartArr.indexOf(parseInt(this.id));
    let removeButtonDOM = document.getElementById(this.id);

    if(elementIdx >= 0){
        storedCartArr.splice(elementIdx,1);
    };

    //Le cambio el color al botón a rojo para más placer
    removeButtonDOM.style = "background-color: rgb(255, 71, 71)";
    //Actualizo el carrito en el local storage
    localStorage.setItem(cartKey,JSON.stringify(storedCartArr));
    updateCartMenuItem(getCartSize());
    populateCart();
};

async function checkout(){
    let url = 'https://my-json-server.typicode.com/agustinlv/coderhousejavascript/products';
    let response = await axios.get(url).then((response)=>response.json());
    localStorage.setItem(cartKey,JSON.stringify([]));
    updateCartMenuItem(getCartSize());
    populateCart();
};

function cartMain(){
    let loguedStatus = getLoguedStatus();
    checkoutButtonDOM.addEventListener('click', checkout);
    if(loguedStatus == "true"){
        toggleItems(true);
    }else{
        toggleItems(false);
    };
    updateCartMenuItem(getCartSize());
    populateCart();
};

cartMain();