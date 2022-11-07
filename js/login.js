const loginButton = document.getElementById('loginButton');
const loginMessage = document.getElementById('loginMessage');
const loginData = document.getElementById('loginData');
const loginNotesDOM = document.getElementById('loginNotes')

function login(){
    let realname = realnameInput.value;
    let username = usernameInput.value;
    let password = passwordInput.value;
    //Si no se ingresan el nombre, el usuario o la contraseña, no se puede continuar.
    if(!realname || !username || !password){
        loginMessage.textContent = "Por favor, completar todos los campos."
    }else{
        loginMessage.textContent = "";
        //Si todos los datos se ingresaron, entonces busco la contraseña (si existe), para el usuario ingresado
        let foundPassword = searchUser(username);
        //Si la encuentra y la que estaba guardada es igual a la que se ingresó, entonces se loguea correctamente.
        if(foundPassword){
            if(foundPassword===password){
                loginMessage.textContent = "Se ha logueado con éxito";
                toggleLoguedStatus();
                toggleLoginButton(true);
            }else{
                loginMessage.textContent = "La contraseña es incorrecta";
            };
        //Si no encuentra contraseña es porque no existe ese usuario todavía. Se genera una nueva entrada en la base de usuarios.
        }else{
            let newUser = new User(realname,username,password);
            saveUser(newUser);
            loginMessage.textContent = "La cuenta ha sido creada con éxito";
            toggleLoguedStatus();
            toggleLoginButton(true);
        };
    };
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

function searchUser(username){
    let stored = JSON.parse(localStorage.getItem(userDBKey));
    let i = 0;
    //Si no encuentra una entrada para esta llave, es porque no hay usuarios guardados todavía. No es necesario correr ningún chequeo extra. Podemos crear al usuario.
    if(!stored){
        return false;
    };
    //Si hay ya usuarios guardados, entonces busco la entrada para ese username.
    while(i < stored.length){
        if(stored[i].username == username){
            //Si la encuentra, directamente me devuelve el password guardado, así valida contra el ingresado.
            return stored[i].password;
        };
        i++;
    };
    //Si no encuentra nada devuelve falso y se crea el usuario nuevo.
    return false;
};

function saveUser(newUser){
    let item = JSON.parse(localStorage.getItem(userDBKey));
    let stored = [];
    //Este chequeo es un poco redundante, pero si hay usuarios guardados ya, entonces los salvamos como un array antes de pushearle un nuevo usuario.
    if (item) {
        stored = item;
    };
    //A la lista ya almacenada le pusheamos el usuario nuevo y luego sobreescribimos los datos anteriores con los nuevos.
    stored.push(newUser);
    localStorage.setItem(userDBKey,JSON.stringify(stored));
};

function loginMain(){
    let loguedStatus = getLoguedStatus();
    updateCartMenuItem(getCartSize());
    if(loguedStatus == "true"){
        toggleLoginButton(true);
    }else{
        toggleLoginButton(false);
    };
};

loginMain();