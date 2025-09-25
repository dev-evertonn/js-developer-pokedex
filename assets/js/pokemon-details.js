const pokemonContent = document.getElementById('body')
const params = new URLSearchParams(window.location.search);
const pokemonId = params.get("id");


function convertPokemonToHtml(pokemon) {
    return `
    <section id="content" class="content ${pokemon.type}">
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

        <div class="img-pokemon">
            <img id="photo" src="${pokemon.img}" alt="foto do pokemon">
        </div>

        <div class="content-bottom">
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
    </section>
    `
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