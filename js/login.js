const loginButton = document.getElementById('loginButton');
const loginMessage = document.getElementById('loginMessage');
const loginData = document.getElementById('loginData');
const loginNotesDOM = document.getElementById('loginNotes');
const realnameInput = document.getElementById('realname');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

class Login {
    realname = "";
    username = "";
    password = "";
    
    constructor(realname,username,password){
        this.realname = realname;
        this.username= username;
        this.password = password;
    };

    validateData(){
        //Si algunos de los campos requeridos no es completado, no se puede seguir adelante
        if(!this.realname || !this.username || !password){
            return false;
        };
        return true;
    };

    findUser(){
        let stored = JSON.parse(localStorage.getItem(userDBKey));
        let i = 0;
        //Si no encuentra una entrada para esta llave, es porque no hay usuarios guardados todavía. No es necesario correr ningún chequeo extra. Podemos crear al usuario.
        if(!stored){
            return false;
        };
        //Si hay ya usuarios guardados, entonces busco la entrada para ese username.
        while(i < stored.length){
            if(stored[i].username === this.username){
                //Si la encuentra, directamente me devuelve el password guardado, así valida contra el ingresado.
                return stored[i].password;
            };
            i++;
        };
        //Si no encuentra nada devuelve falso y se crea el usuario nuevo.
        return false;
    };

    saveUser(){
        let item = JSON.parse(localStorage.getItem(userDBKey));
        let stored = [];
        //Este chequeo es un poco redundante, pero si hay usuarios guardados ya, entonces los salvamos como un array antes de pushearle un nuevo usuario.
        if (item) {
            stored = item;
        };
        //A la lista ya almacenada le pusheamos el usuario nuevo y luego sobreescribimos los datos anteriores con los nuevos.
        stored.push(this);
        localStorage.setItem(userDBKey,JSON.stringify(stored));
    };
};

function login(){
    let realname = realnameInput.value;
    let username = usernameInput.value;
    let password = passwordInput.value;
    let login = new Login(realname,username,password);
    
    if(!login.validateData()){
        loginMessage.textContent = "Por favor, completar todos los campos.";
        return;
    };

    //Si todos los datos se ingresaron, entonces busco la contraseña (si existe), para el usuario ingresado
    let foundPassword = login.findUser();
    //Si la encuentra y es distinta a la que estaba guardada, entonces informo y retorno
    if(foundPassword){
        if(foundPassword != password){
            loginMessage.textContent = "La contraseña es incorrecta";
            return;
        }else{
            loginMessage.textContent = "Se ha logueado con éxito";
        };
    }else{
        loginMessage.textContent = "La cuenta ha sido creada con éxito";
        newUser.saveUser();
    };

    toggleLoguedStatus();
    toggleLoginButton(true);
};

function toggleLoguedStatus(){
    let loguedStatus = getLoguedStatus();
    if(loguedStatus == "true"){
        localStorage.setItem(loguedInKey,false);
        toggleLoginButton(false);
    }else{
        localStorage.setItem(loguedInKey,true);
    };
};

function toggleLoginButton(status){
    if(status == true){
        loginButton.textContent = closeSesionMessage;
        loginData.style = "display: none";
        loginNotesDOM.style = "display: none";
        loginButton.removeEventListener('click', login);
        loginButton.addEventListener('click', toggleLoguedStatus);
        toggleItems(true);
    }else{
        loginButton.textContent = loginButtonDefaultText;
        loginData.style = "display: flex";
        loginNotesDOM.style = "display: flex";
        loginMessage.textContent = "Se ha deslogueado exitosamente";
        loginButton.removeEventListener('click', toggleLoguedStatus);
        loginButton.addEventListener('click', login);
        toggleItems(false);
    };
};

function loginMain(){
    updateCartMenuItem(getCartSize());
    if(getLoguedStatus() === "true"){
        toggleLoginButton(true);
    }else{
        toggleLoginButton(false);
    };
};

loginMain();