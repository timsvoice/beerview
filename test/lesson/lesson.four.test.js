/* eslint-disable func-names, prefer-arrow-callback, no-unused-vars*/

import { assert } from 'chai';
import sinon from 'sinon';
import casual from 'casual';
import { Review } from '../../connectors.js';
import Schema from '../../schema.js';
import Resolvers from '../../resolvers.js';
import fs from 'fs';
import _ from 'underscore';

describe('File System', function () {
  it('should have an imports folder', function (done) {
    // check that the imports folder exists
    fs.stat('./imports', (err, stats) => {
      assert.isTrue(stats.isFile());
      done();
    });
  });
  it('should have an imports folder with both UI and API folders', function (done) {
    // check that both the UI and API folders exist
    fs.stat('./imports/ui', (err, stats) => {
      assert.isTrue(stats.isFile());
    });
    fs.stat('./imports/api', (err, stats) => {
      assert.isTrue(stats.isFile());
      done();
    });
  });
  it('should have an imports folder with our GraphQL data files', function (done) {
    fs.readdir('./imports/api', (err, files) => {
      // check the array of files contains the files we need
      assert.isTrue(_.contains(files, 'resolvers.js'));
      assert.isTrue(_.contains(files, 'schema.js'));
      assert.isTrue(_.contains(files, 'server.js'));
    });
  });
});
