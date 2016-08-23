/* eslint-disable func-names, prefer-arrow-callback, no-unused-vars*/

import { assert } from 'chai';
import sinon from 'sinon';
import casual from 'casual';
import { Review } from '../../imports/data/connectors.js';
import Schema from '../../imports/data/schema.js';
import Resolvers from '../../imports/data/resolvers.js';
import fs from 'fs';
import _ from 'underscore';

describe('File System', function () {
  it('should have an imports folder', function (done) {
    // check that the imports folder exists
    fs.stat('./imports', (err, stats) => {
      if (err) console.log(err);
      assert.isNull(err);
      done();
    });
  });
  it('should have an imports folder with both UI and API folders', function (done) {
    // check that the data folder exist
    fs.stat('./imports/data', (err, stats) => {
      if (err) console.log(err);
      assert.isNull(err);
      done();
    });
  });
  it('should have an imports folder with our GraphQL data files', function (done) {
    fs.readdir('./imports/data', (err, files) => {
      // check the array of files contains the files we need
      if (err) console.log(err);
      assert.isTrue(_.contains(files, 'resolvers.js'));
      assert.isTrue(_.contains(files, 'schema.js'));
      assert.isTrue(_.contains(files, 'connectors.js'));
      done();
    });
  });
});
