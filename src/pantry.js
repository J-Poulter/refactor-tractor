class Pantry {
  constructor(userIngredients) {
    this.contents = userIngredients
  }

  evaluateIfEnoughIngredients(chosenRecipe, ingredientsData) {
    // chosenRecipe.ingredients.forEach(ingredient => {
    //   this.contents.find(pantryIngredient => {
    //     pantryIngredient.ingredient === ingredient.id
      // })
      let ingredientDetails = chosenRecipe.ingredients.map(ingredient => {
        return {
          name: ingredient.name,
          id: ingredient.id,
          qty: ingredient.quantity.amount,
          cost: ingredientsData.find(ingredientInfo => {
            return ingredientInfo.id === ingredient.id
          }).estimatedCostInCents
        }
      })
      
    }


  determineAdditionalNeededIngredients(chosenRecipe) {

  }

  calculateCostOfAdditionalIngredients(chosenRecipe) {

  }

  updatePantryContent() {

  }

  removeConsumedIngredients() {

  }

}

export default Pantry;
