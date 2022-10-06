const productosContainer = document.querySelector(".products")

function showProductos() {
  //obtenemos las keys del  localstorage
  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    const producto = JSON.parse(localStorage.getItem(key))
    productosContainer.innerHTML += `
    <div class="img-product">
        <img src="${producto.img}" alt="nada">
    </div>
    <div class="product-info">
        <h2 class="product-name">${producto.name}</h2>
        <p class="precio">${producto.precio}</p>
        <input type="number" name="cantidad" id="cantidad" min="1">
    </div>
`
  });
}

showProductos()
