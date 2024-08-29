// pokemonRepository
let pokemonRepository = (function () {
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=25';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }


  function showLoadingMessage() {
    let loading = document.querySelector(".loading");
    loading.innerText = "Loading data...";
    loading.classList.add("is-visible");

  }

  function hideLoadingMessage() {
    let loading = document.querySelector(".loading");
    loading.innerText = "";
    loading.classList.remove("is-visible");

  }



  //function Load all 

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    })
  }

  function loadDetails(pokemon) {
    showLoadingMessage();
    return fetch(pokemon.detailsUrl).then(function (response) {
      //console.log(response);
      return response.json();

    }).then(function (json) {
      hideLoadingMessage();

      pokemon.image_front = json.sprites.front_default;
      pokemon.image_back = json.sprites.back_default;
      pokemon.height = json.height;
      pokemon.weight = json.weight;

      console.log(pokemon);
      showModal(pokemon);
      return pokemon;
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    })
  }



  // function to display Pokemon name in console
  function showDetails(pokemon) {
    console.log(pokemon);
    loadDetails(pokemon);
  }

  // function to add click event (addEventListener) 
  function addEventListener(element, pokemon) {
    element.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }
  // function to new pokemon button
  function addListItem(pokemon) {
    let elementContainer = document.querySelector(".pokemon-list");
    let elementList = document.createElement('li');
    let elementbutton = document.createElement('button');
    elementList.classList = 'list-group-item';
 
    elementbutton.setAttribute("data-toggle", "modal");
    elementbutton.setAttribute("data-target", "#myModal");
    elementbutton.classList = 'btn btn-secondary btn-lg btn-block';

    addEventListener(elementbutton, pokemon);
    elementbutton.innerText = pokemon.name;
    elementList.appendChild(elementbutton);
    elementContainer.appendChild(elementList);
  }



  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();


//console.log(pokemonRepository.getAll());

// assigned to keys with the same name in the returned objec

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


// show Modal 
function showModal(pokemon) {
  let modalTitle = document.querySelector('.modal-title');
  modalTitle.innerText = pokemon.name;

  let modalBody = document.querySelector('.modal-body');




  // Clear all existing modal content
  modalBody.innerHTML = '';

  let con = document.createElement('div');
  con.classList.add('container');
  let row = document.createElement('div');
  row.classList.add('row');
  con.appendChild(row);
  let row2 = document.createElement('div');
  row2.classList.add('row');
  con.appendChild(row2);

  let col1 = document.createElement('div');
  col1.classList.add('col-sm-6');
  col1.classList.add('text-center');
  row.appendChild(col1);

  let col2 = document.createElement('div');
  col2.classList.add('col-sm-6');
  col2.classList.add('text-center');
  row.appendChild(col2);

  let col3 = document.createElement('div');
  col3.classList.add('col-sm-6');
  col3.classList.add('text-center');
  row2.appendChild(col3);

  let col4 = document.createElement('div');
  col4.classList.add('col-sm-6');
  col4.classList.add('text-center');
  row2.appendChild(col4);

  let imageElement1 = document.createElement("img");
  imageElement1.setAttribute("src", pokemon.image_front);

  imageElement1.setAttribute("alt", "Pokemon image");
  imageElement1.setAttribute("height", "150px");
  imageElement1.classList.add('rounded');

  let imageElement2 = document.createElement("img");
  imageElement2.setAttribute("src", pokemon.image_back);

  imageElement2.setAttribute("alt", "Pokemon image");
  imageElement2.setAttribute("height", "150px");
  imageElement2.classList.add('rounded');

  let heightElement = document.createElement('p');
  heightElement.innerText = "Height: " + pokemon.height;
  let weightElement = document.createElement('p');
  weightElement.innerText = "Weight: " + pokemon.weight + " kg";


  col1.appendChild(imageElement1);
  col2.appendChild(imageElement2);

  col3.appendChild(heightElement);
  col4.appendChild(weightElement);
  modalBody.appendChild(row);
  modalBody.appendChild(row2);
}