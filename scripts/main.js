// boton para abrir
const openMenu = document.querySelector(".open__menu");
// navbarlist
const navBarList = document.querySelector(".navbar__list");
// boton para cerrar
const closeMenu = document.querySelector(".close__menu");
// boton del carrito
const buttonCart = document.querySelector(".cart");
// contenedor de cart
const cartContainer = document.querySelector(".container__cart");

// funcion para mostrar menu
const viewMenu = () => {
  navBarList.classList.add("visibilite");
};

// funcion para ocultar menu
const hideMenu = () => {
  navBarList.classList.remove("visibilite");
};

const showCart = () => {
  cartContainer.classList.toggle("show__cart");
};

// funcion inicializadora
const init = () => {
  openMenu.addEventListener("click", viewMenu);
  closeMenu.addEventListener("click", hideMenu);
  buttonCart.addEventListener("click", showCart);
};

init();
