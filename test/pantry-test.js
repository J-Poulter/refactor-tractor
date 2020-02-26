import { expect } from 'chai';
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

import Pantry from '../src/pantry.js';
import Recipe from '../src/recipe.js';
import User from '../src/user.js';
import recipeData from '../src/data/recipes.js';
import ingredientsData from '../src/data/ingredients.js';

describe('Pantry', function() {

  let recipe, userData, userData2, user1, user2, pantry1, pantry2

  beforeEach(function() {

    userData = {
      "id": 1,
      "name": "Saige O'Kon",
      "pantry":
      [{
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
    userData2 = {
      "id": 2,
      "name": "Ab",
      "pantry":
      [{
          "ingredient": 1041009,
          "amount": 2
        },
        {
          "ingredient": 10018413,
          "amount": 1
        },
        {
          "ingredient": 2044,
          "amount": 3
        },
        {
          "ingredient": 10111529,
          "amount": 0.5
        },
        {
          "ingredient": 4053,
          "amount": 1
        },
        {
          "ingredient": 11477,
          "amount": 1
      }]
    };

    user1 = new User(userData);
    user2 = new User(userData2);

    pantry1 = new Pantry(user1.pantry, ingredientsData)
    pantry2 = new Pantry(user2.pantry, ingredientsData)
    recipe = new Recipe(recipeData[47], ingredientsData, recipeData);
  });

  it('should be a function', function() {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instantiation of the Pantry class', function() {
    expect(pantry1).to.be.an.instanceof(Pantry);
  });

  it('should be able to evaluate if the pantry contains enough ingredients to cook a chosen recipe', function() {
    expect(pantry2.evaluateIfEnoughIngredients(recipeData[47])).to.deep.equal(true)
  });

  it('should be able to evaluate if the pantry does not contain enough ingredients to cook a chosen recipe', function() {
    expect(pantry1.evaluateIfEnoughIngredients(recipeData[47])).to.deep.equal(false)
  });

  it('should be able to return what additional ingredients are needed and the additional quantity needed', function() {
    expect(pantry1.determineAdditionalNeededIngredients(recipeData[47])).to.deep.equal(["<li>2.00 tablespoons - cheese</li>", "<li>1.00  - flatbread</li>", "<li>3.00 leaves - fresh basil</li>", "<li>0.50 cup - grape tomato</li>", "<li>1.00 teaspoon - pure olive oil</li>"])
  });

  it('should be able to return the cost of the additional ingredients, individually and the total', function() {
    expect(pantry1.calculateCostOfAdditionalIngredients(recipeData[47])).to.deep.equal('34.24')
  });

  it.skip('should be able to update the pantrys content', function() {
    global.fetch = new Promise((resolve, reject) => {
      // resolve("Success!");
      // reject("BOO")
    });
    chai.spy.on(fetch, ['then', 'catch'], () => {});
    expect(fetch("https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData")).to.be.called(2);
  })

  //
  // it.skip('should be able to update the Pantrys content', function() {
  //   expect(pantry.updatePantryContent()).to.deep.equal()
  // });
  //
  // it.skip('should be able to remove the ingredients consumed from making a recipe', function() {
  //   expect(pantry.removeConsumedIngredients()).to.deep.equal()
  // });
})
