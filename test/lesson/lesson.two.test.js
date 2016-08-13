/* eslint-disable func-names, prefer-arrow-callback*/

import { assert } from 'chai';
import sinon from 'sinon';
import request from 'request';
import Schema from '../../schema.js';
import Resolvers from '../../resolvers.js';

describe('Server', function () {
  it('should exist and return a response', function () {
    request
      .get('http://localhost:8000/graphql', (err, res) => {
        assert.isDefined(res);
        assert.isUndefined(err);
      });
  });
});

describe('Schema', function () {
  it('should return a schema string with a Beer, RootQuery, and schema type', function () {
    // test that Schema returns a string
    assert.isString(Schema);
    // test that all fields are included in the string
    assert.include(Schema, 'Beer', 'Schema contains Beer type');
    assert.include(Schema, 'RootQuery', 'Schema contains Beer type');
    assert.include(Schema, 'schema', 'Schema contains Beer type');
  });
});

describe('Resolvers', function () {
  it('should return the Resolvers object', function () {
    // test that the module returns a resolver object
    assert.isObject(Resolvers, 'Resolvers is an object');
    // test that the resolver containts a Query
    assert.isObject(Resolvers.RootQuery, 'Resolver object contains a Query');
    // test that the Query has a beer method that returns
    // an id, name, and description
    const spy = sinon.spy(Resolvers.RootQuery, 'beer');
    // call the function
    Resolvers.RootQuery.beer();
    // test that the returned object has the right fields
    assert.property(spy.returnValues[0], 'id');
    assert.property(spy.returnValues[0], 'name');
    assert.property(spy.returnValues[0], 'description');
  });
});
