const productos = [
    {
   id: 1,
    nombre: "Dulce de Frambuesas",
    img: "https://imag.bonviveur.com/mermelada-de-frambuesa.webp",
    precio: 1100, 
    cantidad: "500grs.",
    Descripcion: "gogogogoggogogogogogogogogogoggogo"
 },
 {
   id: 2,
    nombre: "Dulce de Frutillas",
    img: "https://clarin.com/img//2020/10/21/jT15zokHL_1256x620__2.jpg#1603317684387",
    precio: 1200, 
    cantidad: "500grs.",
    Descripcion: "gogogogoggogogogogogogogogogoggogo"
 },
 {
   id: 3,
    nombre: "Dulce de Rosa Mosqueta",
    img: "https://www.receteca.com/imagenes/recetas/1767.jpg",
    precio: 900,
    cantidad: "500grs.",
    Descripcion: "gogogogoggogogogogogogogogogoggogo"
 },
 {
   id: 4, 
    nombre: "Dulce de Sauco",
    img: "https://www.interpatagonia.com/recetas/dulcedesauco/dulce-sauco.jpg",
    precio: 800,
    cantidad: "500grs.",
    Descripcion: "gogogogoggogogogogogogogogogoggogo"
 },
 {
   id: 5, 
    nombre: "Dulce de Grosellas",
    img: "https://1.bp.blogspot.com/-z569RLPOozM/XhJvW7KtvRI/AAAAAAAAHi8/BR41mK32vUEuCtgYbB1e4tXXDZlPPtG2wCNcBGAsYHQ/s1600/IMG_4245ed.JPG",
    precio: 1100, 
    cantidad: "500grs.",
    Descripcion: "gogogogoggogogogogogogogogogoggogo" 
 },
 {
   id: 6,
    img: "https://img-global.cpcdn.com/recipes/38a65690869dfc05/400x400cq70/photo.jpg",
    nombre: "Dulce de Zapallo",
    precio: 1100, 
    cantidad: "500grs.",
    Descripcion: "gogogogoggogogogogogogogogogoggogo"
 },
 {
   id: 7, 
    nombre: "Frambuesas al Natural",
    img: "https://media-cdn.tripadvisor.com/media/photo-s/11/55/ab/de/conservas-de-frambuesas.jpg",
    precio: 1500,
    cantidad: "800grs.",
    Descripcion: "gogogogoggogogogogogogogogogoggogo"
 }  
 ];

 
 localStorage.setItem("productos", JSON.stringify(productos));

 if (!localStorage.getItem("productos")) {
    localStorage.setItem("productos", JSON.stringify(productos));
    }
 

