import {expect} from 'chai';

import ingredientsData from '../src/data/ingredients'
import Cookbook from '../src/cookbook';

let recipeData, cookbook;

describe('Cookbook', () => {
  beforeEach(() => {
    cookbook = new Cookbook(recipeData, ingredientsData);
  });

  it('Should have an array of all recipes', () => {
    expect(cookbook.recipes).to.be.an('array');
  });

  describe('findRecipe', () => {
    it('Should be able to filter through its array by ingredients', () => {
      expect(cookbook.findRecipe('eggs').length).to.equal(1);
    });

    it('Should be able to filter through its array by name', () => {
      expect(cookbook.findRecipe('Loaded Chocolate').length).to.equal(1);
    });
  });
})
