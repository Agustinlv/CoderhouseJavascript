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
const catalog = [
    {
        id: 1,
        name: "joker",
        value: 4500,
        count: 200,
        image: "../img/thumbs/joker-van-gogh.png"
    },
    {
        id: 2,
        name: "gato pop",
        value: 3500,
        count: 250,
        image: "../img/thumbs/gato-pop.png"
    },
    {
        id: 3,
        name: "lapices de colores",
        value: 3000,
        count: 220,
        image: "../img/thumbs/lapices.png"
    },
    {
        id: 4,
        name: "leon multicolor",
        value: 4000,
        count: 500,
        image: "../img/thumbs/leon-multicolor.png"
    },
    {
        id: 5,
        name: "gradientes",
        value: 3500,
        count: 200,
        image: "../img/thumbs/gradientes.png"
    },
    {
        id: 6,
        name: "catrina",
        value: 6000,
        count: 500,
        image: "../img/thumbs/catrina.png"
    }
];

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
    return localStorage.getItem(loguedInKey);
};