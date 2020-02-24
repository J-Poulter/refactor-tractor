import './css/base.scss';
import './css/styles.scss';

import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';

let users = fetch("https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData")
  .then(response => response.json())
  .then(data => data.wcUsersData)
  .catch(error => console.log(error.message))

let ingredientData = fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/ingredients/ingredientsData')
  .then(response => response.json())
  .then(data => data.ingredientsData)
  .catch(error => console.log(error.message));

let recipeData = fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/recipes/recipeData')
  .then(response => response.json())
  .then(data => data.recipeData)
  .catch(error => console.log(error.message));
//
Promise.all([recipeData, ingredientData, users])
  .then(data => {
    recipeData = data[0];
    ingredientData = data[1];
    users = data[2];
    onStartup(users, ingredientData, recipeData)
  })
  .catch(error => console.log(error.message))

let favButton = document.querySelector('.view-favorites');
let recipesToCookButton = document.querySelector('.view-recipe-to-cook');
let homeButton = document.querySelector('.home');
let searchButton = document.querySelector('#search-button');
let cardArea = document.querySelector('.all-cards');
let user, pantry, cookbook;

homeButton.addEventListener('click', cardButtonConditionals);
recipesToCookButton.addEventListener('click', viewRecipesToCook);
favButton.addEventListener('click', viewFavorites);
cardArea.addEventListener('click', cardButtonConditionals);
cardArea.addEventListener('keyup', checkKeyPressedForAdd);
cardArea.addEventListener('keyup', checkKeyPressed);
searchButton.addEventListener('click', searchRecipes);

function searchRecipes() {
  let searchInput = document.querySelector('#search-input');
  let searchResults = cookbook.findRecipe(searchInput.value.toLowerCase());

  populateCards(searchResults);
  searchInput.value = ''
}

// ONLOAD DISPLAY //
function onStartup(usersData, ingredientData, recipesData) {
  let userId = (Math.floor(Math.random() * 49) + 1)
  let newUser = usersData.find(user => {
    return user.id === Number(userId);
  });
  user = new User(newUser)
  pantry = new Pantry(newUser.pantry, ingredientData)
  cookbook = new Cookbook(recipesData);
  populateCards(cookbook.recipes);
  greetUser();
}

function greetUser() {
  const userName = document.querySelector('.user-name');
  userName.innerHTML =
  user.name.split(' ')[0] + ' ' + user.name.split(' ')[1][0];
}
/////////////////////////////

// CONDITIONALS //
function cardButtonConditionals(event) {
  if (event.target.classList.contains('favorite')) {
    favoriteCard(event);
  } else if (event.target.classList.contains('card-picture')) {
    displayDirections(event);
  } else if (event.target.classList.contains('home')) {
    favButton.innerHTML = 'View Favorites';
    recipesToCookButton.innerHTML = 'View Recipe To Cook';
    populateCards(cookbook.recipes);
  } else if (event.target.classList.contains('recipe-to-cook')) {
    recipeToCookCard(event);
  }
}

function checkKeyPressed(event) {
  if (event.keyCode === 13 && event.target.classList.contains('card-picture')) {
    displayDirections(event);
  }
}

function checkKeyPressedForAdd(event) {
  if (event.keyCode === 13 && event.target.classList.contains('add-button')) {
    recipeToCookCard(event)
  }
}
/////////////////////////////

// FAVORITE FUNCTIONS //
function viewFavorites() {
  cardArea.classList.remove('all')
  if (!user.favoriteRecipes.length) {
    favButton.innerHTML = 'You have no favorites!';
    populateCards(cookbook.recipes);
    return
  } else {
    favButton.innerHTML = 'Refresh Favorites'
    cardArea.innerHTML = '';
    createRecipeCards(user.favoriteRecipes);
  }
  checkFavoriteActive();
}

function favoriteCard(event) {
  let specificRecipe = cookbook.recipes.find(recipe => {
    if (recipe.id  === Number(event.target.dataset.id)) {
      return recipe;
    }
  })
  if (!event.target.classList.contains('favorite-active')) {
    event.target.classList.add('favorite-active');
    favButton.innerHTML = 'View Favorites';
    user.addToFavorites(specificRecipe);
  } else if (event.target.classList.contains('favorite-active')) {
    event.target.classList.remove('favorite-active');
    user.removeFromFavorites(specificRecipe)
  }
}

function checkFavoriteActive() {
  if (user.favoriteRecipes.length) {
    user.favoriteRecipes.forEach(recipe => {
      document.querySelector(`.favorite${recipe.id}`).classList.add('favorite-active')
    })
  } else return
}

// function checkRecipeToCookActive() {
//   if (user.recipesToCook.length) {
//     user.recipesToCook.forEach(recipe => {
//       document.querySelector(`.to-cook${recipe.id}`).classList.add('to-cook-active')
//     })
//   } else return
// }
/////////////////////////////

// RECIPE TO COOK FUNCTIONS //
function viewRecipesToCook() {
  cardArea.classList.remove('all')
  if (!user.recipesToCook.length) {
    recipesToCookButton.innerHTML = 'You have no Recipe to Cook!';
    populateCards(cookbook.recipes);
    return
  } else {
    recipesToCookButton.innerHTML = 'Refresh Recipe to Cook'
    cardArea.innerHTML = '';
    createRecipeCards(user.recipesToCook)
  }
  checkFavoriteActive();
}

function recipeToCookCard(event) {
  let specificRecipe = cookbook.recipes.find(recipe => {
    if (recipe.id  === Number(event.target.dataset.id)) {
      return recipe;
    }
  })
  if (!event.target.classList.contains('to-cook-active')) {
    event.target.classList.add('to-cook-active');
    recipesToCookButton.innerHTML = 'View Recipes to Cook';
    user.addToRecipeToCook(specificRecipe);
  } else if (event.target.classList.contains('to-cook-active')) {
    event.target.classList.remove('to-cook-active');
    user.removeFromRecipeToCook(specificRecipe);
  }
}
/////////////////////////////

// RECIPE DISPLAY //
function populateCards(recipes) {
  cardArea.innerHTML = '';
  cardArea.classList.remove('all')
  createRecipeCards(recipes);
  checkFavoriteActive();
};

function createRecipeCards(selectedRecipeData) {
  selectedRecipeData.forEach(recipe => {
    cardArea.insertAdjacentHTML('afterbegin',
    `<div id='${recipe.id}' class='card'>
        <header data-id='${recipe.id}' class='card-header'>
          <label for='add-button' class='hidden'>Click to add recipe</label>
          <button data-id='${recipe.id}' aria-label='add-button' class='to-cook${recipe.id} add-button card-button'>
            <img data-id='${recipe.id}' class='add-image recipe-to-cook' src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to recipes to cook'>
          </button>
          <label for='favorite-button' class='hidden'>Click to favorite recipe</label>
          <button data-id='${recipe.id}' aria-label='favorite-button' class='favorite${recipe.id} favorite card-button'></button>
        </header>
          <span data-id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
          <img data-id='${recipe.id}' tabindex='0' class='card-picture'
          src='${recipe.image}' alt='click to view recipe for ${recipe.name}'>
    </div>`)
  })
}

function displayDirections(event) {
  let newRecipeInfo = cookbook.recipes.find(recipe => {
    if (recipe.id === Number(event.target.dataset.id)) {
      return recipe;
    }
  })
  let recipeObject = new Recipe(newRecipeInfo, ingredientData, recipeData);
  let cost = recipeObject.calculateCost()
  let costInDollars = (cost / 100).toFixed(2)
  cardArea.classList.add('all');
  cardArea.innerHTML =
  `<span><h3>${recipeObject.name}</h3>
  <p class="ingredients-confirmation">You do not have all the ingredients needed to cook this recipe! Here's what you're missing:</p>
  <p class="ingredients-cost"> Cost of Missing Ingredients:</p>
  <button>Close Recipe</button>
  <button>Buy Missing Ingredients</button>
  <button>Cook Recipe</button>
  </span>
  <p class='all-recipe-info'>
  <strong>It will cost: </strong><span class='cost recipe-info'>
  $${costInDollars}</span><br><br>
  <strong>You will need: </strong><span class='ingredients recipe-info'></span>
  <strong>Instructions: </strong><ol><span class='instructions recipe-info'>
  </span></ol>
  </p>`;
  let ingredientsSpan = document.querySelector('.ingredients');
  let instructionsSpan = document.querySelector('.instructions');
  recipeObject.ingredients.forEach(ingredient => {
    ingredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
    ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
    ${ingredient.name}</li></ul>
    `)
  })
  recipeObject.instructions.forEach(instruction => {
    instructionsSpan.insertAdjacentHTML('beforebegin', `<li>
    ${instruction.instruction}</li>
    `)
  })
}
/////////////////////////////
