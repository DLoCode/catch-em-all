// iife function //
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  //let modalContainer = document.querySelector('#modal-container');

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('incorrect pokemon');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
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
      })
    }).catch(function (e) {
      console.error(e);
    });
  }

  function addListItem(pokemon) {
    //selecting the container of the pokemonList
    let pokemonList = document.querySelector('.list-group');
    //creating an li element inside the ul parent
    let listPokemon = document.createElement('li');
    // adding class to li items
    listPokemon.classList.add('group-list-item', 'col-sm-6');
    // creating a button for each pokemon
    let button = document.createElement('button');
    // setting the inner text of each button
    button.innerText = pokemon.name;
    // adding the class poke-button to each created button
    button.classList.add('btn', 'btn-primary', 'btn-block', 'poke-button');
    // setting attributes for buttons
    button.setAttribute('data-target', '#exampleModal');
    button.setAttribute('data-toggle', 'modal');
    // putting the button inside the li element
    listPokemon.appendChild(button);
    // putting li element and its contents inside the ul
    pokemonList.appendChild(listPokemon);
    // event listerner for 'click' to log pokemon information
    button.addEventListener('click',function() {
      showDetails(pokemon);
    })
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now add the details to the item
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal (pokemon) {
    /* $ = document.querySelector() */

    let titleElement = $('#pokemon-name');

    titleElement.empty();
    $('#pokemon-height').empty();
    $('#pokemon-image').empty();
    $('#pokemon-types').empty();

    let nameElement = $('<h5>' + pokemon.name + '</h5>');

    let heightElement = $('<p>' + 'height: ' + pokemon.height + '</p>');

    let imgElement = $('<img src="' + pokemon.imageUrl + '"alt=' + pokemon.name + '>');

      // Setting up an array of types
     let typesArr = [];
     // loop over the pokemon types and push the types into the new array
     pokemon.types.forEach(function (type) {
       typesArr.push(type.type.name);
     });

    let typesElement = $('<p>' + 'types: ' + typesArr.toString() + '</p>');

      // appending elements
    $('#pokemon-name').html(nameElement);
    $('#pokemon-height').append(heightElement);
    $('#pokemon-image').append(imgElement);
    $('#pokemon-types').append(typesElement);
    $('#modal').modal('show');
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };
})()

pokemonRepository.loadList().then(function() {
    // data is now loaded
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  })
})
