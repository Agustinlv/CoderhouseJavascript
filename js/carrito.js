const cartItemContainer = document.getElementById('cartItemContainer');
const checkoutButtonDOM = document.getElementById('checkoutBtn');
const cartDetailMessageDOM = document.getElementById('cartDetailMessage');

function populateCart(){
    let storedCartArr = JSON.parse(localStorage.getItem(cartKey)).sort();
    cartItemContainer.replaceChildren();
    for(let i = 0; i < storedCartArr.length; i++){
        //Creo el div que va a contener el detalle de cada item en el carrito
        let cartItemDOM = document.createElement('div');
        cartItemDOM.className = "cartItem";
        //El img
        let cartItemImgDOM = document.createElement('img');
        cartItemImgDOM.id = "cartItemImg"
        //Busco el objeto con el id que haya en el índice actual y lo uso para sacar los datos de ese objeto.
        let itemObject = catalog.find(obj => obj.id == storedCartArr[i]);
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
};

function removeFromCart(){
    let storedCartArr = JSON.parse(localStorage.getItem(cartKey));
    let elementIdx = storedCartArr.indexOf(parseInt(this.id));
    console.log(elementIdx);
    if(elementIdx >= 0){
        storedCartArr.splice(elementIdx,1);
        console.log(storedCartArr);
    };
    
    localStorage.setItem(cartKey,JSON.stringify(storedCartArr));
    updateCartMenuItem(getCartSize());
    populateCart();
};

function checkout(){
    cartDetailMessageDOM.textContent = "Gracias por su compra!";
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