// pokemonRepository
let pokemonRepository = (function () {
  let pokemonList = [];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }
  // function to display Pokemon name in console
  function showDetails(pokemon) {
    console.log(pokemon.name);
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
    addListItem: addListItem

  };
})();




pokemonRepository.add({ name: 'Bulbasaur', height: 7, types: ['grass', 'poison'] });
pokemonRepository.add({ name: 'Ivysaur', height: 1, types: ['grass', 'poison'] });
pokemonRepository.add({ name: 'Venusaur', height: 2, types: ['grass', 'poison'] });
console.log(pokemonRepository.getAll());

//ForEach
pokemonRepository.getAll().forEach(function (item) {
  pokemonRepository.addListItem(item);
});

