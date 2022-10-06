
const buscarBtn = document.getElementById('buscar');
const drinksContainer = document.querySelector('.drinks')
let comprarBtns = []

buscarBtn.addEventListener('click', e=>{
    e.preventDefault();
    drinksContainer.innerHTML = ''
    searchByLetter(formulario_busqueda.letter.value)
})




function searchByLetter(letter) {
    if(letter === '') letter = 'a'
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
    .then(response => response.json())
    .then(data => {
        return showDrinks(data)
        
    })
}

function showDrinks(drinks){
    const listDrikns = [...drinks.drinks]
    listDrikns.forEach(drink => {
        drinksContainer.innerHTML += `<div class="card" style="width: 18rem;">
        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
        <div class="card-body">
          <h5 class="card-title">${drink.strDrink}</h5>
          <p class="card-text">$20000</p>
          <button class="btn btn-primary" id='comprar'>Comprar</button>
        </div>
      </div>`
    });
    comprarBtns = [...document.querySelectorAll('#comprar')]

    comprarBtns.forEach((comprarBtn,index) => {
        comprarBtn.addEventListener('click', () => {
            const drink = {
                id: listDrikns[index].idDrink,
                name: listDrikns[index].strDrink,
                img: listDrikns[index].strDrinkThumb,
                value: 20000
            }
            localStorage.setItem(listDrikns[index].idDrink, JSON.stringify(drink))
        })
    })
}

searchByLetter('a')

const alcoholicDrinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic';

