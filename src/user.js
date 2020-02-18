class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  // Favorite Recipe Section //
  addToFavorites(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe)
    }
  }

  removeFromFavorites(recipe) {
    const i = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(i, 1)
  }

  filterFavorites(tag) {
    return this.favoriteRecipes.filter(recipe => {
      return recipe.tags.includes(tag);
    });
  }

  findFavorites(searchWord) {
    return this.favoriteRecipes.filter(recipe => {
      return recipe.name.includes(searchWord)
      || recipe.ingredients.find(ingredient => {
        return ingredient.name.includes(searchWord)
      });
    });
  }

  // Recipe to Cook Section //
  addToRecipeToCook(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.push(recipe)
    }
  }

  removeFromRecipeToCook(recipe) {
    const i = this.recipesToCook.indexOf(recipe);
    this.recipesToCook.splice(i, 1)
  }

  filterRecipeToCook(tag) {
    return this.recipesToCook.filter(recipe => {
      return recipe.tags.includes(tag);
    });
  }

  findRecipeToCook(searchWord) {
    return this.recipesToCook.filter(recipe => {
      return recipe.name.includes(searchWord)
      || recipe.ingredients.find(ingredient => {
        return ingredient.name.includes(searchWord)
      });
    });
  }

}


export default User;
