import { expect } from 'chai';

import User from '../src/user.js';
import recipeData from '../src/data/recipes.js'

describe('User', function() {
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

  it('should have a ID based on User instance', function() {
    expect(user1.id).to.equal(1);
  });

  it('should have a pantry based on User instance', function() {
    expect(user1.pantry).to.deep.equal([
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
      }]);
  });

  it('should have a name based on User instance', function() {
    expect(user1.name).to.equal("Saige O'Kon");
  });

  describe("User - favoriteRecipes", function () {

    it('Should have a property of favoriteRecipes with a default value',
      function() {
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

    it('Should be able remove a recipes from favoriteRecipes', function() {
      user1.addToFavorites(recipeData[0]);
      user1.addToFavorites(recipeData[1]);
      user1.addToFavorites(recipeData[2]);
      user1.removeFromFavorites(recipeData[1]);

      expect(user1.favoriteRecipes).to.deep.equal([recipeData[0], recipeData[2]]);
    });

    it('Should be able to filter through favoriteRecipes by tag', function() {
      user1.addToFavorites(recipeData[0]);
      user1.addToFavorites(recipeData[1]);

      expect(user1.filterFavorites('antipasti')).to.deep.equal([recipeData[0]]);
    });

    it('Should be able to search favoriteRecipes ingredient', function() {
      user1.addToFavorites(recipeData[0]);
      user1.addToFavorites(recipeData[1]);

      expect(user1.findFavorites('egg')).to.deep.equal([recipeData[0]]);
    });

    it('Should be able to return multiple search of favoriteRecipes by ingredient', function() {
      user1.addToFavorites(recipeData[0]);
      user1.addToFavorites(recipeData[1]);
      user1.addToFavorites(recipeData[5]);

      expect(user1.findFavorites('egg')).to.deep.equal([recipeData[0],
        recipeData[5]]);
    });

    it('Should be able to search favoriteRecipes by name', function() {
      user1.addToFavorites(recipeData[0]);
      user1.addToFavorites(recipeData[1]);

      expect(user1.findFavorites('Chocolate')).to.deep.equal([recipeData[0]]);
    });

    it('Should be able to search multiple favoriteRecipes by name', function() {
      user1.addToFavorites(recipeData[0]);
      user1.addToFavorites(recipeData[1]);
      user1.addToFavorites(recipeData[3]);
      user1.addToFavorites(recipeData[6]);

      expect(user1.findFavorites('Chocolate')).to.deep.equal([recipeData[0],
        recipeData[6]]);
    });

  })

  describe("User - recipeToCook", function () {

    it('Should have a property of recipesToCook with a default value',
      function() {
        expect(user1.recipesToCook).to.deep.equal([]);
      });

    it('Should be able to add recipes to recipeToCook', function() {
      user1.addToRecipeToCook(recipeData[5]);

      expect(user1.recipesToCook).to.deep.equal([recipeData[5]]);
    });

    it('Should be able to add multiple recipes to recipeToCook', function() {
      user1.addToFavorites(recipeData[5]);
      user1.addToFavorites(recipeData[6]);

      expect(user1.favoriteRecipes).to.deep.equal([recipeData[5], recipeData[6]]);
    });

    it('Should be able remove a recipes from recipeToCook', function() {
      user1.addToRecipeToCook(recipeData[3]);
      user1.addToRecipeToCook(recipeData[4]);
      user1.addToRecipeToCook(recipeData[5]);
      user1.removeFromRecipeToCook(recipeData[4]);

      expect(user1.recipesToCook).to.deep.equal([recipeData[3], recipeData[5]]);
    });

    it('Should be able to filter through recipeToCook by tag', function() {
      user1.addToRecipeToCook(recipeData[0]);
      user1.addToRecipeToCook(recipeData[1]);

      expect(user1.filterRecipesToCook('antipasti')).to.deep.equal([recipeData[0]]);
    });

    it('Should be able to search recipeToCook ingredient', function() {
      user1.addToRecipeToCook(recipeData[0]);
      user1.addToRecipeToCook(recipeData[1]);

      expect(user1.findRecipesToCook('egg')).to.deep.equal([recipeData[0]]);
    });

    it('Should be able to search recipeToCook by name', function() {
      user1.addToRecipeToCook(recipeData[0]);
      user1.addToRecipeToCook(recipeData[1]);

      expect(user1.findRecipesToCook('Chocolate')).to.deep.equal([recipeData[0]]);
    });
  })
});
