const pokemonName = document.getElementById("pokeName");
const pokemonImage = document.getElementById("pokeImage");
const pokemonType = document.getElementById("pokeType");
const button = document.getElementById("newPokemonBtn");

let totalPokemon = 0;

// in case total count changes
async function getTotalPokemon(){
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await response.json();
    // it's currently 1328 
    totalPokemon = data.count;
    console.log(`Total Pokemon: ${totalPokemon}`);
}
button.addEventListener("click", fetchRandomPokemon);

async function fetchRandomPokemon(){
    try{
        if(!totalPokemon){
            await getTotalPokemon();
        } 

        const randomId = Math.floor(Math.random() * totalPokemon) + 1;

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        
        if(!response.ok){
            throw new Error("Could not fetch Pokemon");
        }
        const data = await response.json();

        pokemonName.textContent = data.name.toUpperCase();
        pokemonImage.src = data.sprites.front_default;
        pokemonType.textContent = "Type: " + data.types.map(t => t.type.name).join(", ");

    }
    catch(error){
        console.error(error);
        pokemonName.textContent = "Error loading Pokémon";
        pokemonImage.src = "";
        pokemonType.textContent = "";
    }
}

getTotalPokemon();


