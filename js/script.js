let pokemonList = [
  {name: "charmander" , height: 27 , types: ["fire" , "flying"]},
  {name: "squirtle" , height: 18 , types: "water"},
  {name: "bulbasaur" , height: 16 , types: "grass"}
];

// for loop
for (let i = 0; i < pokemonList.length; i++){
  // nested if else if conditionals below
  // references the pokemon from list and displays height
  if (pokemonList[i].height > 25) {
    // also adds a size threshold for big pokemon classification
    document.write(pokemonList[i].name + " " + " height: " + pokemonList[i].height + " WOW! That's a big pokemon! ");
  }else if (pokemonList[i].height >=20 && pokemonList[i].height <=25) {
    document.write(pokemonList[i].name + " " + " height: " + pokemonList[i].height + " " + " is an average size pokemon ");
  }else {
    document.write(pokemonList[i].name + " " + " height: " + pokemonList[i].height + " ");
  }
}
