// pokemonRepository
let pokemonRepository = (function () {
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

 
  function showLoadingMessage(){ 
    let loading = document.querySelector(".loading");
    loading.innerText = "Loading data...";
    loading.classList.add("is-visible");

}

function hideLoadingMessage(){
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

  function loadDetails(pokemon){
    showLoadingMessage();   
    return fetch(pokemon.detailsUrl).then(function (response) {
       //console.log(response);
        return response.json();
    
    }).then(function (json) {
      hideLoadingMessage();
          pokemon.image = json.sprites.front_default;
          pokemon.height = json.height;
         
        console.log(pokemon);  
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
    elementbutton.classList = 'button-class';
    addEventListener(elementbutton, pokemon);
    elementbutton.innerText = pokemon.name;
    elementList.appendChild(elementbutton);
    elementContainer.appendChild(elementList);
  }

 

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList:loadList,
    loadDetails:loadDetails,
    showDetails:showDetails
  };
})();

 
//console.log(pokemonRepository.getAll());

// assigned to keys with the same name in the returned objec
 
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});