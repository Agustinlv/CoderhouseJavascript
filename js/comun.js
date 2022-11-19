const userDBKey = "userDB";
const loguedInKey = "loguedIn";
const cartKey = "cart";
const closeSesionMessage = "cerrar sesion";
const loginButtonDefaultText = "login";
const loginMenuItem = document.getElementById('loginMenuItem');
const realnameInput = document.getElementById('realname');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const comprarMenuItem = document.getElementById('comprarMenuItem');
const cartMenuItem = document.getElementById('carritoMenuItem');
const catalogContainer = document.getElementById('catalogContainer');
const axios = require('axios').default;

class User {
    realname = "";
    username = "";
    password = "";
    constructor(realname,username,password){
        this.realname = realname;
        this.username= username;
        this.password = password;
    };
};

async function fetchCatalog(){
    let url = 'https://my-json-server.typicode.com/agustinlv/coderhousejavascript/products';
    let catalog = await fetch(url).then((response)=>response.json());
    return catalog;
};

function toggleItems(show){
    if(show == true){
        loginMenuItem.textContent = closeSesionMessage;
        cartMenuItem.style = "display: block";
        comprarMenuItem.style = "display: block";
    }else{
        loginMenuItem.textContent = loginButtonDefaultText;
        cartMenuItem.style = "display: none";
        comprarMenuItem.style = "display: none";
    };
};

function createStoredCart(){
    let storedCart = localStorage.getItem(cartKey);
    if(!storedCart){
        storedCart = [];
        localStorage.setItem(cartKey,JSON.stringify(storedCart));
        return storedCart;
    };
    return JSON.parse(storedCart);
};

function getCartSize(){
    let storedCart = createStoredCart(); 
    return storedCart.length;
};

function updateCartMenuItem(size){
    cartMenuItem.textContent = "carrito ("+size+")";
};

function getLoguedStatus(){
    let isLogued = localStorage.getItem(loguedInKey);
    if (!isLogued){
        localStorage.setItem(loguedInKey,JSON.stringify(["false"]));
        return false;
    };
    return isLogued;
};