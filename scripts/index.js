const API_URL = `https://pokeapi.co/api/v2/pokemon`

const pokemonContainer = document.querySelector('.pokemon-container')
const spinner = document.querySelector('#spinner')
const btnPrevious = document.querySelector('#previous')
const btnNext = document.querySelector('#next')

let offset = 1
let limit = 23

btnPrevious.addEventListener('click', () => {
    if (offset != 1) {
        offset -= 24
        fetchPokemons(offset, limit)
        console.log(offset, limit)
    }
})

btnNext.addEventListener('click', () => {
    offset += 24
    fetchPokemons(offset, limit)
    console.log(offset, limit)
})

document.addEventListener('DOMContentLoaded', () =>{
    fetchPokemons(offset, limit)
})

function fetchPokemon(id) {
    pokemonContainer.innerHTML = ``
  fetch(`${API_URL}/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        listPokemon(data)
        spinner.style.display = "none"
        //console.log(data)
  })
}

//No logré aplicar el método de paginación explicado en clase, por lo que usé los offsets y limits html como alternativa
function fetchPokemons(offset, limit){
    spinner.style.display = "block"
    for (let i = offset; i <= offset + limit; i++){
        fetchPokemon(i)
    }
}

function listPokemon(pokemon) {
    const card = document.createElement('div')
    card.classList.add('card')

    const spriteContainer = document.createElement('div')
    spriteContainer.classList.add('img-container')
    
    
    const sprite = document.createElement('img')
    sprite.src = pokemon.sprites.front_default
    sprite.classList.add('card-img-top')

    spriteContainer.appendChild(sprite)

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    const number = document.createElement('h4')
    number.classList.add('card-title')
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`
    

    const name = document.createElement('h5')
    name.classList.add('name')
    name.classList.add('card-title')
    name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

    const info = document.createElement('ul')
    info.classList.add('list-group')
    info.classList.add('list-group-flush')

    const baseHP = document.createElement('li')
    baseHP.classList.add('list-group-item')
    baseHP.textContent = `HP: ${pokemon.stats[0].base_stat}`

    const baseATK = document.createElement('li')
    baseATK.classList.add('list-group-item')
    baseATK.textContent = `ATK: ${pokemon.stats[1].base_stat}`

    const baseDEF = document.createElement('li')
    baseDEF.classList.add('list-group-item')
    baseDEF.textContent = `DEF: ${pokemon.stats[2].base_stat}`

    const baseSPD = document.createElement('li')
    baseSPD.classList.add('list-group-item')
    baseSPD.textContent = `SPD: ${pokemon.stats[5].base_stat}`

    card.appendChild(spriteContainer)
    card.appendChild(cardBody)
    cardBody.appendChild(number)
    cardBody.appendChild(name)
    cardBody.appendChild(info)
    info.appendChild(baseHP)
    info.appendChild(baseATK)
    info.appendChild(baseDEF)
    info.appendChild(baseSPD)
    
    pokemonContainer.appendChild(card)
}
