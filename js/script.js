let pokemonList = [
  {name: "charmander" , height: 27 , types: ["fire" , "flying"]},
  {name: "squirtle" , height: 18 , types: "water"},
  {name: "bulbasaur" , height: 16 , types: "grass"}
];

// forEach loop
pokemonList.forEach(function (pokemon) {
// if - else if - else conditionals
  if (pokemon.height > 25) {
    document.write(pokemon.name + " " + "height: " + pokemon.height + " " + " WOW! That's a bit pokemon! ");
  }else if (pokemon.height >= 20 && pokemon.height <= 25) {
    document.write(pokemon.name + " " + "height: " + pokemon.height + " " + " is an average sized pokemon ");
  }else {
    document.write(pokemon.name + " " + "height: " + pokemon.height);
  }
});
