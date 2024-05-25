// boton para abrir
const openMenu = document.querySelector(".open__menu");
// navbarlist
const navBarList = document.querySelector(".navbar__list");
// boton para cerrar
const closeMenu = document.querySelector(".close__menu");

// funcion para mostrar menu
const viewMenu = () => {
  navBarList.classList.add("visibilite");
};

// funcion para ocultar menu
const hideMenu = () => {
  navBarList.classList.remove("visibilite");
};

// funcion inicializadora
const init = () => {
  openMenu.addEventListener("click", viewMenu);
  closeMenu.addEventListener("click", hideMenu);
};

init();
