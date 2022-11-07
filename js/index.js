
function indexMain(){
    let loguedStatus = getLoguedStatus();
    updateCartMenuItem(getCartSize());
    if(loguedStatus == "true"){
        toggleItems(true);
    }else{
        toggleItems(false);
    };
};

indexMain();