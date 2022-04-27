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
// definined value of pokemonRepository
  return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function () {
      return pokemonList;
    }
  };
})();

pokemonRepository.add({name: 'Pikachu', height: 12, types: 'electric'});
console.log(pokemonRepository.getAll());
// forEach loop iterating over list inside iife
pokemonList.forEach(console.log(pokemonRepository.getAll()))
