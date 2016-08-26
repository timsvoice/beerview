/* eslint-disable func-names, prefer-arrow-callback, no-unused-vars*/

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import mockery from 'mockery';
import sinon from 'sinon';
import fs from 'fs';
import _ from 'underscore';
import rp from 'request-promise';

import Beer from '../../src/data/brewerydb.connector.js';
import Resolvers from '../../src/data/resolvers.js';

const assert = chai.assert;
chai.use(chaiAsPromised);

describe('File System', function () {
  it('should have an src folder', function (done) {
    // check that the src folder exists
    fs.stat('./src', (err, stats) => {
      if (err) console.log(err);
      assert.isNull(err);
      done();
    });
  });
  it('should have an src folder with both UI and API folders', function (done) {
    // check that the data folder exist
    fs.stat('./src/data', (err, stats) => {
      if (err) console.log(err);
      assert.isNull(err);
      done();
    });
  });
  it('should have an src folder with our GraphQL data files', function (done) {
    fs.readdir('./src/data', (err, files) => {
      // check the array of files contains the files we need
      if (err) console.log(err);
      assert.isTrue(_.contains(files, 'resolvers.js'));
      assert.isTrue(_.contains(files, 'schema.js'));
      assert.isTrue(_.contains(files, 'mongo.connector.js'));
      assert.isTrue(_.contains(files, 'brewerydb.connector.js'));
      done();
    });
  });
});

describe('Brewery DB Functions', function () {
  it('should export a findBeer function which returns a beer result', function () {
    const beerId = 'oeGSxs';
    return assert.eventually.property(Beer.find(beerId), 'id');
  });
  it('should search for a beer and return < 10 results', function () {
    const beerName = 'Miller high life';
    return assert.eventually.isArray(Beer.search(beerName), 1);
  });
});

describe('BreweryDB Resolvers', function () {
  it('should find reviews using the reviews resolver', function () {
    const mongoMock = sinon.mock(Beer);
    const args = { beerId: 'oeGSxs' };
    console.log(args);
    // const spy = sinon.spy(Resolvers.RootQuery, 'reviews');
    // call the function
    // test that the returned object has the right fields
    mongoMock.expects('find').once();
    Resolvers.RootQuery.beer('_', args);
    // verify that our mongoMock expectations were satisfied
    mongoMock.verify();
    mongoMock.restore();
  });
});
