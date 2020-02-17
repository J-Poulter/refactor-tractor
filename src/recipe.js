class Recipe {
  constructor(recipe, ingredientsData, recipeData) {
    this.name = recipe.name;
    this.id = recipe.id;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
    this.ingredientsData = ingredientsData;
    this.recipeData = recipeData;
  }

  calculateCost() {
    let costCounter = 0;
    this.ingredients.forEach(ingredient => {
      this.ingredientsData.find(specificIngredient => {
        if (specificIngredient.id === ingredient.id) {
          costCounter += (Number(specificIngredient.estimatedCostInCents) *
          Number(ingredient.quantity.amount))
        }
      })
    });
    return costCounter;
  }

  filterRecipesByTag(selectedTag) {
    return this.recipeData.filter(recipe => recipe.tags.includes(selectedTag))
  }
  //
  // filterRecipesByIngredient(selectedIngredient) {
  //   return this.recipeData.filter(recipe => recipe.ingredients.includes(name[selectedIngredient]))
  // }

}

export default Recipe;
