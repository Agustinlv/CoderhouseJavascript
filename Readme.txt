El sitio va a ser el portal de ventas de la fábrica de puzzles Chunky. Por el momento sólo estoy simulando un carrito de compras rudimentario.

- Para poder iniciar el simulador de compra, hay que generar un usuario.
- Si no hay ningún usuario creado, con ingresar los datos que pide es suficiente. Se guarda en el Local Storage y a partir de ahí si valida el pass contra el usuario (el nombre no importa).
- Una vez logueado, se hacen visibles la solapa de COMPRAR y CARRITO.
- Cuando se hace click en AGREGAR AL CARRITO, se agrega el item al carrito (un array de IDs en Local Storage) y se agrega el item a la sección CARRITO.
- Cuando se elimina del carrito, se borra el item de la sección y se recalcula la cantidad de items en el carrito.