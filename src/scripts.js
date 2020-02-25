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
let searchInput = document.querySelector('#search-input');
let recipesToCookButton = document.querySelector('.view-recipe-to-cook');
let homeButton = document.querySelector('.home');
let searchButton = document.querySelector('#search-button');
let cardArea = document.querySelector('.all-cards');
let user, pantry, cookbook, recipeObject;

recipesToCookButton.addEventListener('click', viewRecipesToCook);
favButton.addEventListener('click', viewFavorites);
cardArea.addEventListener('keyup', checkKeyPressedForAdd);
cardArea.addEventListener('keyup', checkKeyPressed);
searchButton.addEventListener('click', searchRecipes);
searchInput.addEventListener('keyup', checkKeyPressedForSearch);
document.addEventListener('click', cardButtonConditionals)

function searchRecipes() {
  let searchResults = cookbook.findRecipe(searchInput.value.toLowerCase());

  populateCards(searchResults);
  searchInput.value = ''
}

// ONLOAD DISPLAY //
function onStartup(userData, ingredientData, recipeData) {
  let userId = (Math.floor(Math.random() * 49) + 1)
  let newUser = userData.find(user => {
    return user.id === Number(userId);
  });
  user = new User(newUser)
  pantry = new Pantry(newUser.pantry, ingredientData)
  cookbook = new Cookbook(recipeData, ingredientData);
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
  } else if (event.target.classList.contains('add-recipe-to-cook-button')) {
    recipeToCookCard(event);
  } else if (event.target.classList.contains('buy-ingredients')) {
    pantry.updatePantryContent(user, recipeObject);
  } else if (event.target.classList.contains('cook-recipe')) {
    pantry.removeConsumedIngredients(user, recipeObject);
  }
}

function checkKeyPressed(event) {
  if (event.keyCode === 13 && event.target.classList.contains('card-picture')) {
    displayDirections(event);
  }
}

function checkKeyPressedForAdd(event) {
  if (event.keyCode === 13 && event.target.classList.contains('add-recipe-to-cook-button')) {
    recipeToCookCard(event)
  }
}

function checkKeyPressedForSearch(event) {
  if (event.keyCode === 13) {
    searchRecipes()
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
  if (!user.favoriteRecipes.length) {
    return
  } else {
    user.favoriteRecipes.forEach(recipe => {
      document.querySelector(`.favorite${recipe.id}`).classList.add('favorite-active')
    })
  }
}

function checkRecipeToCookActive() {
  if (!user.recipesToCook.length) {
    return
  } else {
    user.recipesToCook.forEach(recipe => {
      document.querySelector(`.to-cook${recipe.id}`).classList.add('to-cook-active');
    })
  }
}
/////////////////////////////

// RECIPE TO COOK FUNCTIONS //
function viewRecipesToCook() {
  cardArea.classList.remove('all')
  if (!user.recipesToCook.length) {
    recipesToCookButton.innerHTML = 'You have no Recipes to Cook!';
    populateCards(cookbook.recipes);
    return
  } else {
    recipesToCookButton.innerHTML = 'Refresh Recipes to Cook'
    cardArea.innerHTML = '';
    createRecipeCards(user.recipesToCook);
  }
  checkRecipeToCookActive();
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
  checkRecipeToCookActive();
};

function createRecipeCards(selectedRecipeData) {
  selectedRecipeData.forEach(recipe => {
    cardArea.insertAdjacentHTML('afterbegin',
    `<div id='${recipe.id}' class='card'>
        <header data-id='${recipe.id}' class='card-header'>
          <label for='add-recipe-to-cook-button' class='hidden'>Click to add recipe</label>
          <button data-id='${recipe.id}' aria-label='add-recipe-to-cook-button' class='to-cook${recipe.id} add-recipe-to-cook-button card-button'>
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
  recipeObject = new Recipe(newRecipeInfo, ingredientData, recipeData);
  let cost = recipeObject.calculateCost().toFixed(2);
  let missingIngredients = pantry.determineAdditionalNeededIngredients(recipeObject);
  let missingCost = pantry.calculateCostOfAdditionalIngredients(recipeObject);
  cardArea.classList.add('all');
  cardArea.innerHTML =
  `<span><h3>${recipeObject.name}</h3>
  <p class="ingredients-confirmation">Ingredients Needed:</p>
  ${missingIngredients.join('')}
  <p class="ingredients-cost"> Cost of Missing Ingredients: $${missingCost}</p>
  <button class="close-recipe home">Close Recipe</button>
  <button class="buy-ingredients">Buy Missing Ingredients</button>
  <button class="cook-recipe">Cook Recipe</button>
  </span>
  <p class='all-recipe-info'>
  <strong>It will cost: </strong><span class='cost recipe-info'>
  $${cost}</span><br><br>
  <strong>You will need: </strong><span class='ingredients recipe-info'></span>
  <strong>Instructions: </strong><ol><span class='instructions recipe-info'>
  </span></ol>
  </p>`;

  let ingredientsSpan = document.querySelector('.ingredients');
  let instructionsSpan = document.querySelector('.instructions');
  recipeObject.ingredients.forEach(ingredient => {
    let ingredientName = recipeObject.ingredientsData.find(el => el.id === ingredient.id).name
    ingredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
    ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
    ${ingredientName}</li></ul>
    `)
  })
  recipeObject.instructions.forEach(instruction => {
    instructionsSpan.insertAdjacentHTML('beforebegin', `<li>
    ${instruction.instruction}</li>
    `)
  })

  let ingredientsConfirmation = document.querySelector('.ingredients-confirmation');
  let missingIngredientsCost = document.querySelector('.ingredients-cost');
  if (missingIngredients.length === 0) {
    ingredientsConfirmation.innerText = `You have all the ingredients needed for this recipe!`;
    missingIngredientsCost.innerText = '';
  }
}
/////////////////////////////
