// iife format
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  //let modalContainer = document.querySelector('#modal-container');

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
  };

  function getAll() {
    return pokemonList;
  };

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  };

  function addListItem(pokemon) {
    //selecting the container of the pokemonList
    let pokemonList = document.querySelector(".list-group");
    //creating an li element inside the ul parent
    let listPokemon = document.createElement("li");
    // adding class to li items
    listPokemon.classList.add("group-list-item");
    // creating a button for each pokemon
    let button = document.createElement("button");
    // setting the inner text of each button
    button.innerText = pokemon.name;
    // adding the class poke-button to each created button
    button.classList.add("btn", "btn-primary", "poke-button");
    // setting attributes for buttons
    button.setAttribute("data-target", "#exampleModal");
    button.setAttribute("data-toggle", "modal");
    // putting the button inside the li element
    listPokemon.appendChild(button);
    // putting li element and its contents inside the ul
    pokemonList.appendChild(listPokemon);
    // event listerner for 'click' to log pokemon information
    //button.addEventListener('click',function (event) {
      //showDetails(pokemon);
    //})
  }

  function loadList(pokemon) {
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
    // clear all existing content
    //modalContainer.innerHTML = '';

    //let modal = document.createElement('div');
    //modal.classList.add('modal');

    // add new modal content
    //let closeButtonElement = document.createElement('button');
    //closeButtonElement.classList.add('modal-close');
    //closeButtonElement.innerText = 'Close';
    //closeButtonElement.addEventListener('click', hideModal);

    let titleElement = $(".modal-title");

    let contentElement = $(".modal-body");

    let headerElement = $(".modal-header");

    titleElement.empty();
    contentElement.empty();

    let nameElement = $("<h2>" + pokemon.name + "</h2>");

    let heightElement = $("<p>" + "height: " + pokemon.height + "</p>");

    let imgElement = $ ('<img class="pokemon-image">');
    imgElement.attr("src", pokemon.imageUrl);

    let typesElement = $('<p>' + "types: " + pokemon.types + '</p>');

      // appending elements
    titleElement.append(nameElement);
    contentElement.append(heightElement);
    contentElement.append(imgElement);
    contentElement.append(typesElement);

    //modalContainer.classList.add('is-visible');
    //document.querySelector('#exampleModal').addEventListener('click', () => {
        //showModal(pokemon);
    //});

    // escape key modal close
    //window.addEventListener('keydown', (e) => {
      //if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        //hideModal();
      //}
    //});
    // event listener for modal overlay closing modal
    //modal.addEventListener('click', (e) => {
      //let target = e.target;
      //if (target === modalContainer) {
        //hideModal();
    //  }
    //})

    // outside click close modal
    //modalContainer.addEventListener('click', (e) => {
      //let target = e.target;
      //if (target === modalContainer) {
        //hideModal();
      //}
    //});
  }

  //function hideModal () {
    //modalContainer.classList.remove('is-visible');
  //}

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
