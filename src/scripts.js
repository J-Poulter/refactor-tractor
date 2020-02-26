import './css/styles.scss';
import $ from 'jquery';
import domUpdates from './domUpdates';

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

Promise.all([recipeData, ingredientData, users])
  .then(data => {
    recipeData = data[0];
    ingredientData = data[1];
    users = data[2];
    onStartup(users, ingredientData, recipeData);
    recipesToCookButton.addEventListener('click', handleRecipesToCook);
    favButton.addEventListener('click', handleFavorites);
    cardArea.addEventListener('keyup', checkKeyPressed);
    searchButton.addEventListener('click', searchRecipes);
    searchInput.addEventListener('keyup', checkKeyPressedForSearch);
    document.addEventListener('click', cardButtonConditionals);
  })
  .catch(error => console.log(error.message))

let user, pantry, cookbook;
let favButton = document.querySelector('.view-favorites');
let searchInput = document.querySelector('#search-input');
let recipesToCookButton = document.querySelector('.view-recipe-to-cook');
let homeButton = document.querySelector('.home');
let searchButton = document.querySelector('#search-button');
let cardArea = document.querySelector('.all-cards');

function searchRecipes() {
  let searchResults = cookbook.findRecipe(searchInput.value.toLowerCase());
  domUpdates.populateCards(searchResults, user);
  searchInput.value = ''
}

function handleFavorites() {
  domUpdates.viewFavorites(user, cookbook);
}

function handleRecipesToCook() {
  domUpdates.viewRecipesToCook(user, cookbook);
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
  domUpdates.populateCards(cookbook.recipes, user);
  domUpdates.greetUser(user);
}
/////////////////////////////

// CONDITIONALS //
function cardButtonConditionals(event) {
  if (event.target.classList.contains('favorite')) {
    domUpdates.favoriteCard(event, cookbook, user);
  } else if (event.target.classList.contains('card-picture')) {
    domUpdates.displayDirections(event, cookbook, pantry, ingredientData, recipeData, user);
  } else if (event.target.classList.contains('home')) {
    favButton.innerHTML = 'View Favorites';
    recipesToCookButton.innerHTML = 'View Recipes to Cook';
    domUpdates.populateCards(cookbook.recipes, user);
  } else if (event.target.classList.contains('add-recipe-to-cook-button')) {
    domUpdates.recipeToCookCard(event, cookbook, user);
  }
}

function checkKeyPressed(event) {
  if (event.keyCode === 13 && event.target.classList.contains('card-picture')) {
    domUpdates.displayDirections(event, cookbook, pantry, ingredientData, recipeData);
  }
}

function checkKeyPressedForSearch(event) {
  if (event.keyCode === 13) {
    searchRecipes()
  }
}
/////////////////////////////
