import { expect } from 'chai';

import Pantry from '../src/pantry.js';
import Recipe from '../src/pantry.js';
import User from '../src/user.js';

describe('Pantry', function() {


  it('should be a function', function() {
    let pantry = new Pantry('aa')
    expect(Pantry).to.be.a('function');
  });


  it('should be an instantiation of the Pantry class', function() {
    let pantry = new Pantry('aa')
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it.skip('should be', function() {
    expect(pantry.evaluateIfEnoughIngredients()).to.deep.equal()
  });

  it.skip('should be', function() {
    expect(pantry.evaluateIfEnoughIngredients()).to.deep.equal()
  });

  it.skip('should be', function() {
    expect(pantry.determineAdditionalNeededIngredients()).to.deep.equal()
  });

  it.skip('should be', function() {
    expect(pantry.calculateCostOfAdditionalIngredients()).to.deep.equal()
  });

  it.skip('should be', function() {
    expect(pantry.updatePantryContent()).to.deep.equal()
  });

  it.skip('should be', function() {
    expect(pantry.removeConsumedIngredients()).to.deep.equal()
  });

})
