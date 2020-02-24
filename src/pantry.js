class Pantry {
  constructor(userIngredients, ingredientsData) {
    this.contents = userIngredients,
    this.ingredientsData = ingredientsData
  }

  compareRecipeToPantryIngredients(chosenRecipe) {

    let ingredientDetails = chosenRecipe.ingredients.map(ingredient => {
      return {
        name: (this.ingredientsData.find(el => el.id === ingredient.id)).name,
        id: ingredient.id,
        qty: ingredient.quantity.amount,
        unit: ingredient.quantity.unit,
        cost: this.ingredientsData.find(ingredientInfo => {
          return ingredientInfo.id === ingredient.id
        }).estimatedCostInCents
      };
    });

    ingredientDetails.forEach(ingredient => {
      let pantryMatch = this.contents.find(item => {
        if (ingredient.id === item.ingredient) {
          ingredient.qty -= item.amount
        };
      });
    });

    let ingredientsNeeded = ingredientDetails.reduce((need, ingr) => {
      if (ingr.qty > 0) {
        need.push(ingr)
      }
      return need
    }, []);
    return ingredientsNeeded;
  }

  evaluateIfEnoughIngredients(chosenRecipe) {
    let ingredientsNeeded = this.compareRecipeToPantryIngredients(chosenRecipe);
    return (ingredientsNeeded.length > 0) ? false : true;
  }


  determineAdditionalNeededIngredients(chosenRecipe) {
    let ingredientsNeeded = this.compareRecipeToPantryIngredients(chosenRecipe);
    let neededQuantity = ingredientsNeeded.map(ingredient => {
      return `<li>${ingredient.name} ${ingredient.qty} ${ingredient.unit}</li>`
    })
    return neededQuantity
  }

  calculateCostOfAdditionalIngredients(chosenRecipe) {
    let ingredientsNeeded = this.compareRecipeToPantryIngredients(chosenRecipe);
    let additionalIngredientCost = ingredientsNeeded.map(ingredient => {
      return ingredient.name + ' $' + (ingredient.qty * ingredient.cost)/100
    })
    let totalCost = ingredientsNeeded.reduce((cost, cur) => {
      cost += (cur.qty * cur.cost)/100
      return cost
    }, 0).toFixed(2)
    additionalIngredientCost.push('total $' + totalCost)
    return additionalIngredientCost
  }

  updatePantryContent() {

  }

  removeConsumedIngredients() {

  }

}

export default Pantry;
