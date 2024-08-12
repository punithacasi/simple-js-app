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
          pokemon.image = json.sprites.front_shiny;
          pokemon.height = json.height;
         
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


// show Modal 
function showModal(pokemon) {
  let modalContainer = document.querySelector('#modal-container');

  // Clear all existing modal content
  modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');

  // Add the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';

  let titleElement = document.createElement('h1');
  titleElement.innerText =  pokemon.name;

   
  let imageElement = document.createElement("img");
  imageElement.setAttribute("src", pokemon.image);
  imageElement.setAttribute("width", "304");
  imageElement.setAttribute("height", "228");
  imageElement.setAttribute("alt", "Pokemon image");
  imageElement.classList.add('pokemon-img');

  
  let contentElement = document.createElement('p');
  contentElement.innerText = "Height: "+ pokemon.height+" cm";

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(imageElement);
  modal.appendChild(contentElement); 
  modalContainer.appendChild(modal);



  modalContainer.classList.add('is-visible');



  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
  
  closeButtonElement.addEventListener('click', () => {
    hideModal();
  });

}



// HideModal
function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}

// Escape Key
window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();  
  }y 
});
