async function generateCatalog(){
    const catalog = await fetchCatalog();
    for(let i = 0; i < catalog.length; i++){
        let productContainer = document.createElement('div');
        let prodImgCont = document.createElement('div');
        let prodDescCont = document.createElement('div');
        let prodDescList = document.createElement('ul');
        let prodAction = document.createElement('div');
        let button = document.createElement('button');
        let prodImg = document.createElement('img');
        
        //Seteo los contenedores principales
        productContainer.id = "productContainer";
        prodImgCont.id = "prodImgCont";
        prodDescCont.id = "prodDescCont";
        prodDescList.id = "prodDescList";
        prodAction.id = "prodAction";
        
        //Seteo el botón
        button.className = "addToCartButton";
        button.id = catalog[i].id;
        button.textContent = "agregar al carrito";
        button.addEventListener('click',addToCart);
        
        //Seteo la imagen
        prodImg.id = "prodImg";
        prodImg.src = catalog[i].image;

        //Seteo la descripcion
        for(let n = 1; n < 4; n++){
            let li = document.createElement('li');
            li.textContent = Object.values(catalog[i])[n];
            switch (n){
                //El primer item siempre es el título, así que le asigno un id distinto
                case 1:
                    li.id = "prodTitle";
                    break;
                //El segundo item es el precio, así que le agrego un símbolo $ al comienzo
                case 2:
                    li.textContent = `$${li.textContent}`;
                    break;
                //El tercer item es la canitdad de piezas, así que le agrego la palabra piezas al final
                case 3:
                    li.textContent = `${li.textContent} piezas`;
                    break;
            };
            prodDescList.appendChild(li);
        };

        //Agrego en secuencia los elementos que forman cada producto del catálogo
        prodAction.appendChild(button);
        prodImgCont.appendChild(prodImg);
        productContainer.appendChild(prodImgCont);
        productContainer.appendChild(prodDescList);
        productContainer.appendChild(prodAction);
        
        //Finalmente agrego el contenedor de producto al contenedor del catálogo
        catalogContainer.appendChild(productContainer);
    };
};

function addToCart(){
    let storedCart = JSON.parse(localStorage.getItem(cartKey));
    let currentCart = [];
    let addToCartButtonDOM = document.getElementById(this.id);
    
    if(storedCart){
        currentCart = storedCart;
    };

    addToCartButtonDOM.textContent = "agregado!";
    addToCartButtonDOM.style = "background-color:  rgb(104, 218, 69)";
    addToCartButtonDOM.removeEventListener('click',addToCart);
    currentCart.push(parseInt(this.id));
    localStorage.setItem(cartKey,JSON.stringify(currentCart));
    updateCartMenuItem(getCartSize());
    
    setTimeout(()=>{
        addToCartButtonDOM.textContent = "agregar al carrito";
        addToCartButtonDOM.style = "background-color: none";
        addToCartButtonDOM.addEventListener('click',addToCart);
    }, 1500);
};

function comprar_main(){
    let loguedStatus = getLoguedStatus();
    updateCartMenuItem(getCartSize());
    if(loguedStatus == "true"){
        toggleItems(true);
    }else{
        toggleItems(false);
    };
    generateCatalog();
};

comprar_main();