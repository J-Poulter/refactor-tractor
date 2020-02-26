import $ from 'jquery';

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
    // checkRecipeToCookActive();
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
  }


}

export default domUpdates;
