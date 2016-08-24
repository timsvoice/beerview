/* eslint-disable func-names, prefer-arrow-callback, no-unused-vars*/

import { assert } from 'chai';
import sinon from 'sinon';
import casual from 'casual';
import { Review } from '../../src/data/connectors.js';
import Schema from '../../src/data/schema.js';
import Resolvers from '../../src/data/resolvers.js';
import { findBeer } from '../../src/data/brewery.db.js';
import fs from 'fs';
import _ from 'underscore';
import rp from 'request-promise';

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
  before(function () {
    const beer = {
      id: casual.word,
      name: casual.name,
      description: casual.sentence,
      abv: casual.integer(0, 10),
      glasswareId: casual.word,
      style: casual.name,
      label: casual.url,
    };
    sinon.mock(rp).returns(beer);
  });

  after(function () {
    rp.restore();
  });

  it('should export a findBeer function', function (done) {
    const beerId = 'ax1b';
    findBeer(beerId).then((res, err) => {
      console.log(res, err);
      // assert.isTrue(request.get.called);
      done();
    }).catch((err) => { console.log(err); done(); });
  });
});
