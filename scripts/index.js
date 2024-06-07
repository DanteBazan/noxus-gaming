// contenedor de productos
const productsContainer = document.querySelector(".container__products");
// contenedor del carrito
const cartProducts = document.querySelector(".container__cards-products");
// total del carrito
const cartTotal = document.querySelector(".cart__total");
// boton para agregar al carrito
const addButton = document.querySelector("#add-button");
//  contenedor de categorias
const containerCategorys = document.querySelector(".categorys");
// lista de categorias
const categoriesList = document.querySelectorAll(".category__button");
// boton de ver mas
const seeMoreBtn = document.querySelector(".button__see-more");
// boton de comprar
const buyBtn = document.querySelector("#buy-button");
// burbuja del carrito
const cartBubble = document.querySelector(".cart__bubble");
// boton para borrar todo en el carrito
const deleteButtonCart = document.querySelector("#delete-cart-button");
// modal para cuando se agrega un producto al carrito
const seeModal = document.querySelector(".modal__add");

// Seteamos el carrito , vacío o lo que este en el localStorage según corresponda, igual que en los proyectos anteriores

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/**
 * Función para guardar el carrito en el localStorage
 */
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

/*---------------------------------------------------------------------- */
/*---------------------- Lógica de productos---------------------------- */
/*---------------------------------------------------------------------- */

/**
 * Función para crear el html de un producto
 * IMPORTANTE: Hacer hincapie en los data-attributes del botón de agregar al carrito
 * @param {object} product  Objeto con la información del producto
 * @returns  {string}  html del producto
 */

const createTemplateProduct = (product) => {
  const { id, name, precio, gameImg } = product;
  return `
    <div class="hero__card">
        <img
        src="${gameImg}"
        alt="${name}"
        class="card__img"
        />
         <h3>${name}</h3>
            <div class="card__hero-info">
              <span>$ ${precio}</span>
              <button data-id="${id} data-name="${name}" data-precio="${precio}" data-img="${gameImg}">Agregar</button>
         </div>
    </div>
  `;
};

/**
 * Función para renderizar una lista de productos
 * @param {object[]} productsList  Array de productos
 */

const renderProducts = (productsList) => {
  productsContainer.innerHTML += productsList
    .map(createTemplateProduct)
    .join("");
};

/*---------------------------------------------------------------------- */
/*---------------------- Lógica de "ver más"---------------------------- */
/*---------------------------------------------------------------------- */

/**
 * Función para saber si el índice actual renderizado de la lista de productos productos es igual al límite de productos
 * @returns {boolean}  true si el índice actual de productos es igual al límite de productos (Total de subarrays en el array de productos divididos), false en caso contrario
 */

const isLastIndexOf = () => {
  return appState.currentProductsIndex === appState.productsLimit - 1;
};

/**
 * Función para renderizar más productos cuando se apreta el botón de "ver más"
 * Si luego de renderizar se alcanza el límite de productos (Total de subarrays en el array de productos divididos), se oculta el botón
 */

const showMoreProducts = () => {
  appState.currentProductsIndex += 1;

  let { products, currentProductsIndex } = appState;
  renderProducts(products[currentProductsIndex]);
  if (isLastIndexOf()) {
    seeMoreBtn.classList.add("hidden__btn");
    return;
  }
};

/**
 *  Función para mostrar u ocultar el botón de "ver más" según corresponda
 */

const setShowMoreVisivility = () => {
  if (!appState.activeFilter) {
    seeMoreBtn.classList.remove("hidden__btn");
    return;
  }
  seeMoreBtn.classList.add("hidden__btn");
};

/*---------------------------------------------------------------------- */
/*------------------------ Lógica de filtros --------------------------- */
/*---------------------------------------------------------------------- */

/**
 * Función para cambiar el estado de los botones de categorías
 * NOTA: Se utiliza el operador spread para convertir el NodeList en un array y poder utilizar el método forEach
 * @param  {string} selectedCategory  Nombre de la categoría seleccionada
 */

const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active__category");
      return;
    }
    categoryBtn.classList.add("active__category");
  });
};

/**
 * Función para cambiar el estado del filtro activo.
 * Recibe el botón que se apretó y guarda el dataset.category en el estado de la app como nuevo filtro actual.
 * Llama a la función changeBtnActiveState para cambiar el estado de los botones de categorías.
 * Llama a la función setShowMoreVisibility para mostrar u ocultar el botón de "ver más" según corresponda.
 * @param {object} btn  Botón que se apretó
 */

const changeFilterState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  changeBtnActiveState(appState.activeFilter);
  setShowMoreVisivility(appState.activeFilter);
};

/**
 * Función para aplicar el filtro cuando se apreta un botón de categoría
 * Si el botón que se apretó no es un botón de categoría o ya está activo, no hace nada.
 * Llama a la función changeFilterState para cambiar el estado del filtro activo.
 * Limpia el html de los productos renderizados.
 * Si hay un filtro activo, llama a la función renderFilteredProducts para renderizar los productos filtrados.
 * Si se apreta el boton de todas, al no tener un dataset.category ese botón, el filtro activo se vuelve undefined y se renderizan todos los productos.
 * @param {event} event  Evento de click (usamos destructuring para tomar el target del evento)
 */

const applyFilter = ({ target }) => {
  if (!isInactiveFilterBtn(target)) return;
  changeFilterState(target);
  productsContainer.innerHTML = "";
  if (appState.activeFilter) {
    renderFilterProducts();
    appState.currentProductsIndex = 0;
    return;
  }
  renderProducts(appState.products[0]);
};

/**
 * Función para saber si el elemento que se apretó es un botón de categoría y no está activo
 * @param {object} btn elemento que se apreto
 * @returns {boolean} true si el elemento es un botón de categoría y no está activo, false en caso contrario
 */

const isInactiveFilterBtn = (element) => {
  return (
    element.classList.contains("category__button") &&
    !element.classList.contains("active__category")
  );
};

/**
 * Función para filtrar los productos por categoría y renderizarlos.
 */

const renderFilterProducts = () => {
  const filteredProducts = products.filter(
    (product) => product.category === appState.activeFilter);
  renderProducts(filteredProducts);
};

/*-----------------------------------------------------------------------------*/
/*--------------------Logica de agregar al carrito --------------------------*/
/*-----------------------------------------------------------------------------*/

/**
 * Función para crear el template de un producto del carrito
 * @param {object} cartProduct  Objeto con la información del producto que se quiere agregar al carrito
 * @returns {string}  Template del producto del carrito
 */

const createProductOfCart = (cartProduct) => {
  const { id, name, precio, gameImg, quantity } = cartProduct;
  return `
  <div class="cart__product">
  <div>
    <img
      class="cart__img"
      src="${gameImg}"
      alt="${name}"
    />
  </div>
  <div class="container__cart-info">
    <h4>Juego</h4>
    <p>${name}</p>
    <span>$ ${precio}</span>
  </div>
  <div class="container__add-cart">
    <button class="button__cart-less" data-id="${id}" ><i class="bi bi-dash"></i></button>
    <span>${quantity}</span>
    <button class="button__cart-more" data-id="${id}"><i class="bi bi-plus"></i></button>
  </div>
</div>
  `;
};

/**
 * Función para renderizar los productos del carrito o el mensaje de  "No hay productos en el carrito"
 * Revisa si el array del carrito está vacío, si lo está, renderiza el mensaje de "No hay productos en el carrito", sino, renderiza los productos del carrito
 */

const renderCart = () => {
  if (!cart.length) {
    cartProducts.innerHTML = `<p class="msj-empty">No hay productos en el carrito</p>`;
    return;
  }
  cartProducts.innerHTML = cart.map(createProductOfCart).join("");
};

/**
 * Función para obtener el total de la compra
 * @returns  {number} Total de la compra
 */

const getTotalCart = () => {
  return cart.reduce((acc, cur) => acc + Number(cur.precio) * cur.quantity, 0);
};

/**
 * Función para mostrar el total de la compra
 * Se utiliza el método "toFixed" para que el total tenga solo 2 decimales
 */

const showCartTotal = () => {
  cartTotal.innerHTML = `$ ${getTotalCart().toFixed(2)}`
};

/**
 * Función para actualizar la burbuja de cantidad con el número de productos en el carrito
 */

const renderCartBubble = () => {
  cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
};

/**
 * Función para habilitar o deshabilitar un botón segun corresponda
 * @param {object} btn Botón que se quiere deshabilitar
 */

const disableButton = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  };
};

/**
 * Función que ejecuta las funciones necesarias para actualizar el estado del carrito. Esto incluye renderizar los productos del carrito, mostrar el total de la compra, deshabilitar el botón de comprar y el botón de eliminar si corresponde y actualizar la burbuja de cantidad.
 * La creamos ya que todas esas funciones las vamos a necesitar en distintos momentos, por lo que es más práctico tenerlas todas juntas en una sola función.
 */

const updateCartState = () => {
  saveCart();
  renderCart();
  showCartTotal();
  disableButton(buyBtn);
  disableButton(deleteButtonCart);
  renderCartBubble();
};

/**
 * Función para crear un objeto con la información del producto que se quiere agregar al carrito o bien agregar una unidad a un producto que ya este en el carrito.
 * Se tomará la data del producto del dataset del botón clickeado para crear el objeto del producto.
 * Si el producto ya existe en el carrito, se le suma una unidad y se muestra el modal con el mensaje correspondiente.
 * Si el producto no existe en el carrito, se agrega al array del carrito agregandole la propiedad quantity y se muestra el modal con el mensaje correspondiente.
 * @param {event} e evento click
 */

const addProduct = (e) => {
  if (!e.target.classList.contains("add__button")) return;
  const product = createProductData(e.target.dataset);
  if (isExistingCartProduct(product)) {
    addUnitToProduct(product);
    showSuccessModal("Se agrego una unidad al carrito");
  } else {
    createProductOfCard(product);
    showSuccessModal("El producto se ha agregado al carrito");
  }
  updateCartState();
};

/**
 * Función para agregar una unidad a un producto que ya este en el carrito.
 * Se recorre el array del carrito y se busca el producto que se quiere agregar una unidad.
 * Si el producto pasado como parámetro es igual al producto que se está recorriendo, se le suma una unidad a la propiedad "quantity" y se actualiza el array del carrito. Si eso no ocurre, se retorna el producto que se esta recorriendo tal cual está.
 * @param {object} product Objeto con la información del producto que se quiere agregar una unidad al carrito
 */

const addUnitCartProduct = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct
  );

};

/**
 * Función para crear un objeto con la información del producto que se quiere agregar al carrito.
 * @param {object} product Objeto con la información del producto que se quiere agregar al carrito
 */

const createCartProduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
}

/**
 * Función para saber si un producto ya existe en el carrito.
 * @param {object} product  Objeto con la información del producto que se quiere agregar al carrito
 * @returns {object} Objeto con la información del producto que se quiere agregar al carrito. Undefined en caso de que no exista.
 */

const isExistingCartProduct = (product) => {
  return cart.find((item) => { item.id === product.id });
};

/**
 * Función para crear un objeto con la información del producto que se quiere crear en el carrito.
 * @param {object} product data del producto a crear o a agregar una unidad.
 * @returns {object} Objeto con la data del producto.
 */

const createProductData = (product) => {
  const { id, name, precio, gameImg } = product;
  return { id, name, precio, gameImg };
};

/**
 * Función para mostrar el modal de éxito al agregar o añadir un producto.
 * @param {string} msg  Mensaje que se quiere mostrar en el modal
 */

const showSuccessModal = (msg) => {
  showSuccessModal.classList.add("active-modal");
  showSuccessModal.textContent = msg;
  setTimeout(() => {
    showSuccessModal.classList.remove("active-modal");
  }, 1500);
};

/**
 * Función para manejar el evento click del botón de más de cada producto del carrito.
 * @param {string} id Id del producto que se quiere agregar una unidad al carrito
 */

const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id == id);
  addUnitCartProduct(existingCartProduct);
};

/**
 * Función para manejar el evento click del botón de menos de cada producto del carrito.
 * @param {string} id Id del producto que se quiere eliminar una unidad al carrito
 */

const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id == id);
  if (existingCartProduct.quantity === 1) {
    if (window.confirm("¿Quiere elimar el producto del carrito?")) {
      removeProductFromCart(existingCartProduct);
    }
    return;
  }
  substractProductUnit(existingCartProduct);
}

/**
 * Función para quitar una unidad de producto.
 * Se recorre el array del carrito y se busca el producto que se quiere eliminar una unidad. Si el producto pasado como parámetro es igual al producto que se está recorriendo, se le resta una unidad a la propiedad "quantity" y se actualiza el array del carrito. Si eso no ocurre, se retorna el producto que se esta recorriendo tal cual está.
 * @param {object} existingProduct Objeto con la información del producto que se quiere eliminar una unidad al carrito
 */

const substractProductUnit = (existingProduct) => {
  cart = cart.map((product) => {
    return product.id === existingProduct.id
      ? { ...product, quantity: Number(product.quantity) - 1 }
      : product;
  });
};
/**
 * Función para eliminar un producto del carrito.
 * @param {object} existingProduct Objeto con la información del producto que se quiere eliminar del carrito
 */

const removeProductFromCart = (existingProduct) => {
  cart = cart.filter((product) => product.id !== existingProduct.id);
  updateCartState();
};

/**
 * Función que maneja los eventos de apretar el botón de más o de menos según corresponda.
 * @param {event} e evento click
 */

const handleQuantity = (e) => {
  if (e.target.classList.contains("button__cart-less")) {
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("button__cart-more")) {
    handlePlusBtnEvent(e.target.dataset.id);
  }
  updateCartState();
};

/**
 * Función para vaciar el carrito.
 */

const resetCartItems = () => {
  cart = [];
  updateCartState();
};

/**
 * Función para completar la compra o vaciar el carrito.
 * @param {string} confirmMsg   Mensaje de pregunta para confirmar la acción.
 * @param {*} successMsg   Mensaje de éxito para mostrar al completar la acción.
 */

const completeCartAction = (confirmMsg, succesMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) {
    resetCartItems();
    alert(succesMsg);
  }
};

/**
 * Función para disparar el mensaje de compra exitosa y su posterior mensaje de exito en caso de darse la confirmación.
 */

const completeBuy = () => {
  completeCartAction("¿Desea completar su compra?", "Gracias por su compra");
};

const deleteCart = () => {
  completeCartAction("¿Desea vaciar el carrito?", "No hay mas productos en el carrito");
}

const mainInit = () => {
  renderProducts(appState.products[0]);
  seeMoreBtn.addEventListener("click", showMoreProducts);
  containerCategorys.addEventListener("click", applyFilter);
  document.body.addEventListener("DOMContentLoaded", renderCart);
  document.body.addEventListener("DOMContentLoaded", showCartTotal);
  productsContainer.addEventListener("click", addProduct);
  cartProducts.addEventListener("click", handleQuantity);
  buyBtn.addEventListener("click", completeBuy);
  deleteButtonCart.addEventListener("click", deleteCart);
  disableButton(buyBtn);
  disableButton(deleteButtonCart);
  renderCartBubble(cart);
};

mainInit();