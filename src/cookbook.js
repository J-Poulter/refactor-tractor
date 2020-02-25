class Cookbook {
  constructor(recipeData, ingredientData) {
    this.recipes = recipeData;
    this.ingredients = ingredientData;
  }

  findRecipe(searchText) {
    return this.recipes.filter(recipe => {
      let matchingIngredient;
      return recipe.ingredients.find(ingredient => {
        matchingIngredient = this.ingredients.find(specificIngredient => {
          return specificIngredient.id === ingredient.id;
        });
        return (matchingIngredient.name.toLowerCase().includes(searchText)) ||
        (recipe.name.toLowerCase().includes(searchText.toLowerCase()))
      });
    })
  }
}

export default Cookbook;
