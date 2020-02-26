import $ from 'jquery';
import Recipe from './recipe';

let recipeObject;

let domUpdates = {
  greetUser(user) {
    $('.user-name').html(user.name.split(' ')[0] + ' ' + user.name.split(' ')[1][0])
  },

  viewFavorites(user, cookbook) {
    $('.all-cards').removeClass('all')
    if (!user.favoriteRecipes.length) {
      $('.view-favorites').html('No favorites!');
      this.populateCards(cookbook.recipes, user);
      return
    } else {
      $('.view-favorites').html('Refresh Favorites');
      $('.all-cards').html('');
      this.createRecipeCards(user.favoriteRecipes);
    }
    this.checkFavoriteActive(user);
  },

  populateCards(recipes, user) {
    $('.all-cards').html('');
    $('.all-cards').removeClass('all');
    this.createRecipeCards(recipes);
    this.checkFavoriteActive(user);
    this.checkRecipeToCookActive(user);
  },

  createRecipeCards(selectedRecipeData) {
    selectedRecipeData.forEach(recipe => {
      $('.all-cards').prepend(
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
  },

  checkFavoriteActive(user) {
    if (!user.favoriteRecipes.length) {
      return
    } else {
      user.favoriteRecipes.forEach(recipe => {
        $(`.favorite${recipe.id}`).addClass('favorite-active')
      })
    }
  },

  checkRecipeToCookActive(user) {
    if (!user.recipesToCook.length) {
      return
    } else {
      user.recipesToCook.forEach(recipe => {
        $(`.to-cook${recipe.id}`).addClass('to-cook-active');
      })
    }
  },

  viewRecipesToCook(user, cookbook) {
    $('.all-cards').removeClass('all')
    if (!user.recipesToCook.length) {
      $('.view-recipe-to-cook').html('No recipes saved!');
      this.populateCards(cookbook.recipes, user);
      return
    } else {
      $('.all-cards').html('');
      $('.view-recipe-to-cook').html('Refresh Recipes to Cook');
      this.createRecipeCards(user.recipesToCook);
    }
    this.checkRecipeToCookActive(user);
  },

  favoriteCard(event, cookbook, user) {
    let specificRecipe = cookbook.recipes.find(recipe => {
      if (recipe.id  === Number(event.target.dataset.id)) {
        return recipe;
      }
    })
    if (!$(event.target).hasClass('favorite-active')) {
      $(event.target).addClass('favorite-active');
      $('.view-favorites').html('View Favorites');
      user.addToFavorites(specificRecipe);
    } else if ($(event.target).hasClass('favorite-active')) {
      $(event.target).removeClass('favorite-active');
      user.removeFromFavorites(specificRecipe)
    }
  },

  recipeToCookCard(event, cookbook, user) {
    let specificRecipe = cookbook.recipes.find(recipe => {
      if (recipe.id  === Number(event.target.dataset.id)) {
        return recipe;
      }
    })
    if (!$(event.target).hasClass('to-cook-active')) {
      $(event.target).addClass('to-cook-active');
      $('.view-recipe-to-cook').html('View Recipes to Cook');
      user.addToRecipeToCook(specificRecipe);
    } else if ($(event.target).hasClass('to-cook-active')) {
      $(event.target).removeClass('to-cook-active');
      user.removeFromRecipeToCook(specificRecipe);
    }
  },

  displayDirections(event, cookbook, pantry, ingredientData, recipeData, user) {

    let newRecipeInfo = cookbook.recipes.find(recipe => {
      if (recipe.id === Number(event.target.dataset.id)) {
        return recipe;
      }
    })
    recipeObject = new Recipe(newRecipeInfo, ingredientData, recipeData);
    let cost = recipeObject.calculateCost().toFixed(2);
    let missingIngredients = pantry.determineAdditionalNeededIngredients(recipeObject);
    let missingCost = pantry.calculateCostOfAdditionalIngredients(recipeObject);
    $('.all-cards').addClass('all');
    $('.all-cards').html(
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
    </p>`);
    recipeObject.ingredients.forEach(ingredient => {
      let ingredientName = recipeObject.ingredientsData.find(el => el.id === ingredient.id).name;
      $('.ingredients').prepend(`<ul><li>
      ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
      ${ingredientName}</li></ul>
      `)
    })
    recipeObject.instructions.forEach(instruction => {
      $('.instructions').before(`<li>
      ${instruction.instruction}</li>
      `)
    })
    if (missingIngredients.length === 0) {
      $('.ingredients-confirmation').text(`You have all the ingredients needed for this recipe!`);
      $('.ingredients-cost').text('');
    }
    $('.buy-ingredients').click(function() {
      pantry.updatePantryContent(user, recipeObject);
    })

    $('.cook-recipe').click(function() {
      pantry.removeConsumedIngredients(user, recipeObject);
    })
  }

}

export default domUpdates;
