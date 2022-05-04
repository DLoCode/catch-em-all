// global state
let pokemonList = [
  {name: "charmander" , height: 27 , types: ["fire" , "flying"]},
  {name: "squirtle" , height: 18 , types: "water"},
  {name: "bulbasaur" , height: 16 , types: "grass"}
];
// iife format
let pokemonRepository = (function() {
  let pokemonList = [
    {name: "charmander" , height: 27 , types: ["fire" , "flying"]},
    {name: "squirtle" , height: 18 , types: "water"},
    {name: "bulbasaur" , height: 16 , types: "grass"}
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
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
    let name = pokemon.name;
    console.log(name);
  }
  // add a pokemon function
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
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.add({name: 'Pikachu', height: 12, types: 'electric'});
console.log(pokemonRepository.getAll());
// forEach loop iterating over list inside iife
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
