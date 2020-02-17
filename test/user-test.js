import { expect } from 'chai';

import User from '../src/user.js';
import recipeData from '../src/data/recipes.js'

describe('User', () => {
  let userData;
  let user1;

  beforeEach(() => {
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
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {
    expect(user1).to.be.an.instanceof(User);
  });

  it('Should have a property of favoriteRecipes with a default value', function() {
    expect(user1.favoriteRecipes).to.deep.equal([]);
  });

  it('Should be able to add recipes to favoriteRecipes', function() {
    user1.addToFavorites(recipeData[0]);

    expect(user1.favoriteRecipes).to.deep.equal([recipeData[0]]);
  });

  it('Should be able to add multiple recipes to favoriteRecipes', function() {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);

    expect(user1.favoriteRecipes).to.deep.equal([recipeData[0], recipeData[1]]);
  });

  it('Should be able to remove recipes from favoriteRecipes', function() {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    user1.addToFavorites(recipeData[2]);
    user1.removeFromFavorites(recipeData[1]);

    expect(user1.favoriteRecipes).to.deep.equal([recipeData[0], recipeData[2]]);
  });

  it('Should be able to filter through favoriteRecipes by tag', function() {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.filterFavorites('antipasti')).to.equal([recipeData[0]]);
  });

  it.skip('Should be able to search favoriteRecipes by name or ingredient', function(){
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.findFavorites('egg')).to.equal([recipeData[0]]);
  });

  it.skip('Should be able to check ingredients in User/s pantry for a given recipe', () => {
    expect(user1.checkPantry(recipeIngredients)).to.eql('You have the ingredients!');
  });

  it.skip('Should inform User if they lack required ingredients for a given recipe', () => {
    expect(user1.checkPantry(recipeIngredients)).to.eql(missingIngredientsWithPrice);
  });
});
