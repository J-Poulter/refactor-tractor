import { expect } from 'chai';

import Recipe from '../src/recipe.js';
import recipeData from '../src/data/recipes.js';
import ingredientsData from '../src/data/ingredients.js';

let recipe;

describe('Recipe', () => {
  beforeEach(() => {
    recipe = new Recipe(recipeData[47], ingredientsData, recipeData);
  });

  it('Should be able to calculate the cost of its ingredients', () => {
    expect(recipe.calculateCost()).to.equal(4166);
  })

  it('Should be able to filter recipes by tag', () => {
    let filteredRecipes = recipe.filterRecipesByTag('side dish');
    expect(filteredRecipes.length).to.equal(22);
  })

  it('Should be able to filter recipes by ingredient', () => {
    let filteredRecipes = recipe.filterRecipesByIngredient('sea salt');
    expect(filteredRecipes.length).to.equal(3);
  })

  describe('Recipe Data', () => {

    it('Should hold its own ingredient data', () => {
      expect(recipe.ingredients).to.equal(recipeData[47].ingredients);
    })

    it('Should hold its own instruction data', () => {
      expect(recipe.instructions).to.equal(recipeData[47].instructions);
    })
  })

});
