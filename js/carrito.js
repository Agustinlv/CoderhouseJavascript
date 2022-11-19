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
        showCartMessage("el carrito de compras está vacío");
        return;
    };
    
    for(let i = 0; i < storedCartArr.length; i++){
        let itemObject = catalog.find(obj => obj.id === storedCartArr[i]);
        let cartItemDOM = document.createElement('div');
        let cartItemImgDOM = document.createElement('img');
        let cartItemNameDOM = document.createElement('div');
        let cartItemDescDOM = document.createElement('cartItemDesc');
        let cartQtyContDOM = document.createElement('div');
        let removeButtonDOM = document.createElement('button');
        let UlDOM = document.createElement('ul');
        
        cartItemDOM.className = "cartItem";
        cartItemImgDOM.id = "cartItemImg"
        cartItemImgDOM.src = itemObject.image;
        cartItemNameDOM.id = "cartItemName";
        cartItemNameDOM.textContent = itemObject.name;
        cartItemDescDOM.className = "cartItemDesc";
        cartQtyContDOM.id = "cartQtyCont";
        removeButtonDOM.className = "removeFromCartButton";
        removeButtonDOM.textContent = "quitar item";
        removeButtonDOM.id = itemObject.id;
        removeButtonDOM.addEventListener('click',removeFromCart);
        
        //Actualizo el valor total de la compra
        totalValue = totalValue + itemObject.value;
        cartTotalValueDOM.textContent = `$${totalValue}`;

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
        //Finalmente ensamblo todas las partes que componen cada item en la lista del carrito
        cartItemDescDOM.appendChild(UlDOM);
        cartQtyContDOM.appendChild(removeButtonDOM);
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

function showCartMessage(message){
    let cartEmptyMessageDOM = document.createElement('h2');
    cartEmptyMessageDOM.className = "cartMessage";
    cartEmptyMessageDOM.textContent = message;
    cartItemContainer.replaceChildren();
    cartItemContainer.appendChild(cartEmptyMessageDOM);
    cartDetailDOM.style	= "display: none";
};

async function checkout(){
    let url = 'https://my-json-server.typicode.com/agustinlv/coderhousejavascript/payment';
    //Estoy usando la librería axios para hacer el get. Por ahora no se me ocurre qué otra librería relevante usar y sé que voy a estar usandola mucho en mi proyecto real
    let paymentStatus = await axios.get(url);
    //Estoy simulando una pequeña chance de que falle la transacción como para mostrar otro mensaje que sea solamente el de compra exitosa
    if(Math.random() >= 0.25){
        showCartMessage(paymentStatus.data["resolve"]);
        localStorage.setItem(cartKey,JSON.stringify([]));
        updateCartMenuItem(getCartSize());
    }else{
        showCartMessage(paymentStatus.data["error"]);
    };
    //Le meto un timeout a repopular el cart luego de una compra exitosa sólo para que mensaje de compra exitosa se muestre un tiempito más. En un proyecto real esto no debería existir.
    setTimeout(()=>{
        populateCart();
    },1500)
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