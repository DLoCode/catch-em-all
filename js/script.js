// global state
let pokemonList = [
  {name: "charmander" , height: 27 , types: ["fire" , "flying"]},
  {name: "squirtle" , height: 18 , types: "water"},
  {name: "bulbasaur" , height: 16 , types: "grass"}
];
// iife format
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("incorrect pokemon");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function addListItem(pokemon) {
    //selecting the container of the pokemonList
    let pokemonList = document.querySelector(".pokemon-list");
    //creating an li element inside the ul parent
    let listpokemon = document.createElement("li");
    // creating a button for each pokemon
    let button = document.createElement("button");
    // setting the inner text of each button
    button.innerText = pokemon.name;
    // adding the class poke-button to each created button
    button.classList.add("poke-button");
    // putting the button inside the li element
    listpokemon.appendChild(button);
    // putting li element and its contents inside the ul
    pokemonList.appendChild(listpokemon);
    // event listerner for 'click' to log pokemon information
    button.addEventListener('click',function(event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e)
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  // data is now loaded
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
