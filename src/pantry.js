import $ from 'jquery';

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
    let ingredientsNeeded = ingredientDetails.filter(ingr => ingr.qty > 0);
    return ingredientsNeeded;
  }

  evaluateIfEnoughIngredients(chosenRecipe) {
    let ingredientsNeeded = this.compareRecipeToPantryIngredients(chosenRecipe);
    return (ingredientsNeeded.length > 0) ? false : true;
  }

  determineAdditionalNeededIngredients(chosenRecipe) {
    let ingredientsNeeded = this.compareRecipeToPantryIngredients(chosenRecipe);
    let neededQuantity = ingredientsNeeded.map(ingredient => {
      return `<li class="tempIng">${ingredient.qty.toFixed(2)} ${ingredient.unit} - ${ingredient.name}</li>`
    })
    return neededQuantity
  }

  calculateCostOfAdditionalIngredients(chosenRecipe) {
    let ingredientsNeeded = this.compareRecipeToPantryIngredients(chosenRecipe);
    let totalCost = ingredientsNeeded.reduce((cost, cur) => {
      cost += (cur.qty * cur.cost)/100
      return cost
    }, 0).toFixed(2)
    return totalCost;
  }

  updatePantryContent(user, chosenRecipe) {
    let ingredientsNeeded = this.compareRecipeToPantryIngredients(chosenRecipe).map(el => {
      return {
        "userID": user.id,
        "ingredientID": el.id,
        "ingredientModification": el.qty
      }
    })
    ingredientsNeeded.forEach(ingredientObject => {
      fetch("https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredientObject),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error.message))
    })
    $('.ingredients-confirmation').text(`You have all the ingredients needed for this recipe!`);
    $('.ingredients-cost').text('');

  }

  removeConsumedIngredients(user, chosenRecipe) {
    let consumedIngredients = chosenRecipe.ingredients.map(el => {
      return {
        "userID": user.id,
        "ingredientID": el.id,
        "ingredientModification": -el.quantity.amount
      }
    })
    consumedIngredients.forEach(ingredientObject => {
      fetch("https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredientObject),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error.message))
    })
  }

}

export default Pantry;
