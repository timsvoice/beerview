/* eslint-disable func-names, prefer-arrow-callback, no-unused-vars*/

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import mockery from 'mockery';
import { findBeer, searchBeer } from '../../src/data/brewery.db.js';
import fs from 'fs';
import _ from 'underscore';
import rp from 'request-promise';

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
      assert.isTrue(_.contains(files, 'connectors.js'));
      done();
    });
  });
});

describe('Brewery DB Functions', function () {
  it('should export a findBeer function which returns a beer result', function () {
    const beerId = 'oeGSxs';
    return assert.eventually.property(findBeer(beerId), 'id');
  });
  it('should search for a beer and return < 10 results', function () {
    const beerName = 'Miller High Life';
    searchBeer('Miller high life').then((res, err) => {
      console.log(err, res);
    });
  });
});
