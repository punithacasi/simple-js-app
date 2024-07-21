//This array contains Pokémon data to display in your application.

/* name - make this a string 
   height - this will be a number 
   types - make this an array of strings */

let pokemonList = [
  { name: 'Bulbasaur', height: 7, types: ['grass', 'poison'] },
  { name: 'Ivysaur', height: 1, types: ['grass', 'poison'] },
  { name: 'Venusaur', height: 2, types: ['grass', 'poison'] }
];


//“Bulbasaur (height: 7)”.
//Wow, that’s big!
for (i = 0; i < pokemonList.length; i++) {
  let myText = pokemonList[i].name + " (height:" + pokemonList[i].height + ")";
  if (pokemonList[i].height > 5) {
    myText += " Wow, that’s big!";
  }
  myText += "<br>";
  document.write(myText);

}

