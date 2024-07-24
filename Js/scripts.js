//This array contains Pokémon data to display in your application.

/* name - make this a string 
   height - this will be a number 
   types - make this an array of strings */

  
let pokemonRepository = (function () {
  let pokemonList = [];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

pokemonRepository.add({ name: 'Bulbasaur', height: 7, types: ['grass', 'poison'] });
pokemonRepository.add({ name: 'Ivysaur', height: 1, types: ['grass', 'poison'] });
pokemonRepository.add({ name: 'Venusaur', height: 2, types: ['grass', 'poison'] });
console.log(pokemonRepository.getAll());

//ForEach
pokemonRepository.getAll().forEach(function(item){
  let myText = item.name + " (height:" + item.height + ")";
  if (item.height > 5) {
    myText += " Wow, that’s big!";
  }
  myText += "<br>";
  document.write(myText);
});

modified for IIFE immplimentation