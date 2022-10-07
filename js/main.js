const buscarBtn = document.getElementById("buscar");
const filtrarBtn = document.getElementById("filtrar");
const drinksContainer = document.querySelector(".drinks");

buscarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  drinksContainer.innerHTML = "";
  searchByName(formulario_busqueda.letter.value);
});

filtrarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  drinksContainer.innerHTML = "";
  const valuesFilter = {
    tipo: filtros_form.alcoholicRd.checked ? filtros_form.alcoholicRd.value : filtros_form.Non_alcoholicRd.value,
    categoria: document.getElementById("categorias").value,
    letra: filtros_form.letter.value,
  };
  console.log(valuesFilter);
  searchByFilters(valuesFilter)
});

function searchByName(drinkName) {
  if (letter === "") letter = "a";
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`)
    .then((response) => response.json())
    .then((data) => {
      drinks = getDrinks(data);
      showDrinks(drinks)
    });
}

function searchByFilters({tipo, categoria, letra}){
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}`)
  .then(response => response.json())
  .then(data => {
    const listDrinks = getDrinks(data);
    showDrinks(filtrar(listDrinks, tipo, categoria))
  })
}

function getDrinks(drinks) {
  return [...drinks.drinks];
}

function showDrinks(listDrikns) {
  listDrikns.forEach((drink) => {
    drinksContainer.innerHTML += `<div class="card" >
        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
        <div class="card-body">
          <h5 class="card-title">${drink.strDrink}</h5>
          <p class="card-text">$20000</p>
          <button class="btn btn-primary" id='comprar'>Comprar</button>
        </div>
      </div>`;
  });
  //Capturamos los botones para añadir los productos al carrito de compras y le adicionamos la accion de guardar los datos en el localstorage
  comprarBtns = [...document.querySelectorAll("#comprar")].forEach(
    (comprarBtn, index) => {
      comprarBtn.addEventListener("click", () => {
        const drink = {
          id: listDrikns[index].idDrink,
          name: listDrikns[index].strDrink,
          img: listDrikns[index].strDrinkThumb,
          value: 20000, //como toda bebida tiene el valor de 20000 , lo ponemos directamente
        };
        localStorage.setItem(listDrikns[index].idDrink, JSON.stringify(drink)); //guardamos en el LS
      });
    }
  );
}

//Funcion para mostrar desde el inicio las bebidas con alcohol.
function showAlcoholicDrinks() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic")
    .then((response) => response.json())
    .then((data) => showDrinks(getDrinks(data)));
}

function filtrar(drinksList, tipo, categoria) {
  const lista = drinksList.filter(
    (drink) =>
      drink.strCategory == categoria  && drink.strAlcoholic == tipo
  );
  return lista
}

function addCategorias() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
    .then((response) => response.json())
    .then((data) => {
      const select = document.getElementById("categorias");
      data.drinks.forEach(
        (drink) =>
          (select.innerHTML += `<option value="${drink.strCategory}">${drink.strCategory}</option>`)
      );
    });
}

showAlcoholicDrinks();
addCategorias();

const urlByName =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
const urlByLetter = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=";
