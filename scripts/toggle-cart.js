// boton para abrir
const openMenu = document.querySelector(".open__menu");
// navbarlist
const navBarList = document.querySelector(".navbar__list");
// boton del carrito
const buttonCart = document.querySelector(".cart");
// contenedor de cart
const cartContainer = document.querySelector(".container__cart");

// funcion para mostrar menu
const viewMenu = () => {
  navBarList.classList.toggle("visibilite");
  if (cartContainer.classList.contains("show__cart")) {
    cartContainer.classList.remove("show__cart");
    return;
  }
};

// funcion para mostrar el carrito
const showCart = () => {
  cartContainer.classList.toggle("show__cart");
  if (navBarList.classList.contains("visibilite")) {
    navBarList.classList.remove("visibilite");
    return;
  }
};

/*-----------------------------------------------------*/
/*--------------------Menu interface-------------------*/
/*-----------------------------------------------------*/

/**
 * Función para cerrar el menú hamburguesa y el overlay cuando se hace click en un link del menú
 * Al clickear un enlace del menú hamburguesa, lo cierra. Si lo que clickeemos dentro de el ul no contiene la clase "navbar-link" no pasa nada.
 * @pam.comram {event} e   Evento de click
 * @returns
 */

const closeOnClick = (e) => {
  if (!e.target.classList.contains("navbar__link")) return;
  navBarList.classList.remove("visibilite");
  cartContainer.classList.remove("show__cart");
};

const closeOnScroll = () => {
  if (
    navBarList.classList.contains("visivilite") ||
    cartContainer.classList.contains("show__cart")
  ) {
    navBarList.classList.remove("visibilite");
    cartContainer.classList.remove("show__cart");
  }
};

// funcion inicializadora
const init = () => {
  openMenu.addEventListener("click", viewMenu);
  buttonCart.addEventListener("click", showCart);
  window.addEventListener("scroll", closeOnScroll);
  navBarList.addEventListener("click", closeOnClick);
};

init();
