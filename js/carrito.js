const productosContainer = document.querySelector(".products");

function keysLs() {
  const keys = Object.keys(localStorage);
  return keys;
}

function showProductos() {
  //obtenemos las keys del  localstorage
  const keys = keysLs();

  keys.forEach((key, index) => {
    const producto = JSON.parse(localStorage.getItem(key));
    productosContainer.innerHTML += `
    <div class="product">
    <div class="img-product">
        <img src="${producto.img}" alt="nada">
    </div>
    <div class="product-info">
        <h2 class="product-name">${producto.name}</h2>
        <p class="precio">${producto.value}</p>
        <input class="cantidad" type="number" name="cantidad"  min="1" value="1">
    </div>
    <button type="button" class="btn btn-danger delete"><span class="material-symbols-outlined">
    delete
    </span></button>
    </div >
`;
  });
  const elementsPrecio = [...document.querySelectorAll(".precio")];
  total(elementsPrecio);

  [...document.querySelectorAll(".cantidad")].forEach((btn, index) =>
    btn.addEventListener("click", (e) => {
      elementsPrecio[index].innerHTML = 20000 * e.target.value;
      total(elementsPrecio)
    })
  );

  // Borrar elementos
   [...document.querySelectorAll(".delete")].forEach((del, index) =>
    del.addEventListener("click", (e) => {
      localStorage.removeItem(keys[index]);
      document
        .querySelector(".products")
        .removeChild(document.querySelector(".products").children[index]);
        const full = total(elementsPrecio)
        full.innerHTML =  (parseInt(full.innerHTML)-parseInt(elementsPrecio[index].innerHTML))
    })
  );
  
}

function total(precios) {
  const totalContainer = document.querySelector('.precioTotal')
  totalContainer.innerHTML = precios.reduce((total, precio) => total + parseInt(precio.innerHTML), 0)
  return totalContainer
}

showProductos();
