import { expect } from 'chai';

import Pantry from '../src/pantry.js';
import Recipe from '../src/recipe.js';
import User from '../src/user.js';
import recipeData from '../src/data/recipes.js';
import ingredientsData from '../src/data/ingredients.js';



describe('Pantry', function() {

  let recipe, userData, user1, pantry1

  beforeEach(function() {

    userData = {
      "id": 1,
      "name": "Saige O'Kon",
      "pantry": [
        {
          "ingredient": 11477,
          "amount": 1
        },
        {
          "ingredient": 93820,
          "amount": 1
        },
        {
          "ingredient": 11297,
          "amount": 3
        }]
    };

    user1 = new User(userData);

    pantry1 = new Pantry(user1.pantry)
    recipe = new Recipe(recipeData[47], ingredientsData, recipeData);
  })

  it('should be a function', function() {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instantiation of the Pantry class', function() {
    expect(pantry1).to.be.an.instanceof(Pantry);
  });

  it('should be able to evaluate if the pantry contains enough ingredients to cook a chosen recipe', function() {
    console.log(pantry1.evaluateIfEnoughIngredients(recipeData[47], ingredientsData))
    expect(pantry1.evaluateIfEnoughIngredients(recipeData[47])).to.deep.equal(false)
  });
  //
  // it.skip('should be', function() {
  //   expect(pantry.evaluateIfEnoughIngredients()).to.deep.equal()
  // });
  //
  // it.skip('should be', function() {
  //   expect(pantry.determineAdditionalNeededIngredients()).to.deep.equal()
  // });
  //
  // it.skip('should be', function() {
  //   expect(pantry.calculateCostOfAdditionalIngredients()).to.deep.equal()
  // });
  //
  // it.skip('should be', function() {
  //   expect(pantry.updatePantryContent()).to.deep.equal()
  // });
  //
  // it.skip('should be', function() {
  //   expect(pantry.removeConsumedIngredients()).to.deep.equal()
  // });
})
