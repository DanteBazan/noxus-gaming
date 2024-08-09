const products = [
  // AVENTURA
  {
    id: 1,
    name: "Minecraft: Java & Bedrock (PC)",
    precio: "12500",
    category: "aventura",
    gameImg: "../imgs/juegos/minecraft.webp",
  },
  {
    id: 2,
    name: "Fallout 76 (PC)",
    precio: 10000,
    category: "aventura",
    gameImg: "../imgs/juegos/fallout.webp",
  },
  {
    id: 3,
    name: "Ghost of Tsushima (PC)",
    precio: 20000,
    category: "aventura",
    gameImg: "../imgs/juegos/ghost-of-tsushima.avif",
  },
  {
    id: 4,
    name: "Grand Theft Auto V (PC)",
    precio: 15000,
    category: "aventura",
    gameImg: "../imgs/juegos/grand-theft-auto.avif",
  },
  {
    id: 5,
    name: "Red Dead Redemption 2 (PC)",
    precio: 18000,
    category: "aventura",
    gameImg: "../imgs/juegos/red-dead-redemption.jpeg",
  },
  {
    id: 6,
    name: "Dark Souls: Remastered (PC)",
    precio: 22500,
    category: "aventura",
    gameImg: "../imgs/juegos/dark-souls.avif",
  },
  // DEPORTES
  {
    id: 7,
    name: "NBA 2K24 (PC)",
    precio: 12600,
    category: "deportes",
    gameImg: "../imgs/juegos/nba-2k24.jpeg",
  },
  {
    id: 8,
    name: "EA SPORTS FC 24 (PC)",
    precio: "20900",
    category: "deportes",
    gameImg: "../imgs/juegos/fifa2024.webp",
  },
  {
    id: 9,
    name: "PGA TOUR 2K23 (PC)",
    precio: 13600,
    category: "deportes",
    gameImg: "../imgs/juegos/pga-tour-2k23.jpeg",
  },
  {
    id: 10,
    name: "NASCAR Heat 5 (PC)",
    precio: 2700,
    category: "deportes",
    gameImg: "../imgs/juegos/nascar-heat-5.avif",
  },
  {
    id: 11,
    name: "WWE 2K23 (PC)",
    precio: 21000,
    category: "deportes",
    gameImg: "../imgs/juegos/wwe-2k23.webp",
  },
  {
    id: 12,
    name: "Football Manager 2024 (PC)",
    precio: 14000,
    category: "deportes",
    gameImg: "../imgs/juegos/football-manager-2024.webp",
  },
  // CARRERAS
  {
    id: 13,
    name: "Assetto Corsa (PC)",
    precio: 12500,
    category: "carreras",
    gameImg: "../imgs/juegos/assetto-corsa.avif",
  },
  {
    id: 14,
    name: "Forza Horizon 5 (PC)",
    precio: 25000,
    category: "carreras",
    gameImg: "../imgs/juegos/forza-horizon-5.avif",
  },
  {
    id: 15,
    name: "Need for Speed Unbound (PC)",
    precio: 12000,
    category: "carreras",
    gameImg: "../imgs/juegos/need-for-speed-unbound.webp",
  },
  {
    id: 16,
    name: "DiRT Rally 2.0",
    precio: 12300,
    category: "carreras",
    gameImg: "../imgs/juegos/dirty-rally-2.0.jpeg",
  },
  {
    id: 17,
    name: "Need for Speed Heat (PC)",
    precio: 20000,
    category: "carreras",
    gameImg: "../imgs/juegos/need-for-speed-heat.webp",
  },
  {
    id: 18,
    name: "Dirt: Showdown",
    precio: "3000",
    category: "carreras",
    gameImg: "../imgs/juegos/dirty-showdown.avif",
  },
  // DISPAROS
  {
    id: 19,
    name: "7 Days to Die",
    precio: 12780,
    category: "disparos",
    gameImg: "../imgs/juegos/7-days-to-die.avif",
  },
  {
    id: 20,
    name: "Killing Floor 2 (PC)",
    precio: 5000,
    category: "disparos",
    gameImg: "../imgs/juegos/killing-floor-2.webp",
  },
  {
    id: 21,
    name: "Battlefield 2042 (PC) ",
    precio: 20400,
    category: "disparos",
    gameImg: "../imgs/juegos/battlefield-2042.webp",
  },
  {
    id: 22,
    name: "Dead Island 2 (PC)",
    precio: 30000,
    category: "disparos",
    gameImg: "../imgs/juegos/dead-island-2.webp",
  },
  {
    id: 23,
    name: "PAYDAY 2",
    precio: 3000,
    category: "disparos",
    gameImg: "../imgs/juegos/payday-2.avif",
  },
  {
    id: 24,
    name: "Star Wars Battlefront 2 (PC)",
    precio: 12500,
    category: "disparos",
    gameImg: "../imgs/juegos/stars-wars-battlefront-2.webp",
  },
  // GRATIS
  {
    id: 25,
    name: "Valorant",
    precio: 0,
    category: "gratis",
    gameImg: "../imgs/juegos/valorant.jpg",
  },
  {
    id: 26,
    name: "NARAKA:BLADEPOINT",
    precio: 0,
    category: "gratis",
    gameImg: "../imgs/juegos/naraka-bladepoint.jpg",
  },
  {
    id: 27,
    name: "League of Legends",
    precio: 0,
    category: "gratis",
    gameImg: "../imgs/juegos/league-of-legends.jpeg",
  },
  {
    id: 28,
    name: "PUBG:BATTLEGROUNDS",
    precio: 0,
    category: "gratis",
    gameImg: "../imgs/juegos/pubg-battlegrounds.png",
  },
  {
    id: 29,
    name: "SMITE",
    precio: 0,
    category: "gratis",
    gameImg: "../imgs/juegos/smite.webp",
  },
  {
    id: 30,
    name: "Los Simps 4",
    precio: 0,
    category: "gratis",
    gameImg: "../imgs/juegos/los-sims-4.webp",
  },
];

/**
 * Función para dividir los productos en arrays de "size" productos.
 * Usaremos este array dividido en subarrays para manejar la paginación con el boton "ver más".
 * @param {number} size tamaño de los arrays que se van a crear al dividir los productos.
 * @returns {array} array de arrays con los productos divididos.
 */

const divideProductsInParts = (size) => {
  let productsList = [];

  for (let i = 0; i < products.length; i += size)
    productsList.push(products.slice(i, i + size));
  return productsList;
};

//Función para dividir los productos en arrays de 6 productos y manejar la páginación

const appState = {
  products: divideProductsInParts(6),
  currentProductsIndex: 0,
  productsLimit: divideProductsInParts(6).length,
  activeFilter: null,
};


