/* eslint-disable func-names, prefer-arrow-callback*/

import { assert } from 'chai';
import Resolvers from '../resolvers.js';

describe('Resolvers', function () {
  it('should return the Resolvers object', function () {
    assert.isObject(Resolvers, 'Resolvers is an object');
  });
});
