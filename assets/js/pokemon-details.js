const pokeApi = {}
const pokemonContent = document.getElementById('content')
const params = new URLSearchParams(window.location.search);
const pokemonId = params.get("id");


function convertPokemonToHtml(pokemon) {
    return `
        <div class="content-top">
            <div class="buttons">
                <a href="../../index.html"><img src="https://cdn-icons-png.flaticon.com/512/271/271220.png" alt=""
                        srcset=""></a>
                <a href=""><img src="https://cdn-icons-png.flaticon.com/512/8978/8978668.png" alt=""></a>
            </div>
            <div class="detail-principal">
                <div class="name-number">
                    <h1 id="name">${pokemon.name}</h1>
                    <ol>
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
                <p id="number">#001</p>
            </div>

        </div>

        <div class="content-bottom">
            <img id="photo"
                src="${pokemon.img}"
                alt="">
            <div class="details">
                <ul>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Base Stats</a></li>
                    <li><a href="#">Evoltution</a></li>
                    <li><a href="#">Moves</a></li>
                </ul>

                <div class"description">
                    <table>
                        <tr>
                            <th>Species</th>
                            <td>${pokemon.species}</td>
                        </tr>
                        <tr>
                            <th>Height</th>
                            <td>${pokemon.height} cm</td>
                        </tr>
                        <tr>
                            <th>Weight</th>
                            <td>${pokemon.weight} kg</td>
                        </tr>
                        <tr>
                            <th>Abilities</th>
                            <td>${pokemon.abilities.map((ability) => ability).join(', ')}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `
}


function convertPokeApiToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    pokemon.types = types

    pokemon.img = pokeDetail.sprites.other.dream_world.front_default
    pokemon.abilities = pokeDetail.abilities.map((slot) => slot.ability.name)
    pokemon.weight = pokeDetail.weight
    pokemon.height = pokeDetail.height
    pokemon.species = pokeDetail.species.name

    return pokemon
}

pokeApi.getPokemon = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`

    return fetch(url)
        .then((response) => response.json())
        // Ensure convertPokeApiDetailToPokemon returns an array of promises
        .then(convertPokeApiToPokemon)
        .then((pokemonsDetails) => pokemonsDetails)
}

function loadPokemon(id) {
    pokeApi.getPokemon(id).then((pokemon) => {
        const newHtml = convertPokemonToHtml(pokemon)
        pokemonContent.innerHTML = newHtml
    })
}
// Se houver ID, carrega o Pokémon
if (pokemonId) {
    loadPokemon(pokemonId);
}