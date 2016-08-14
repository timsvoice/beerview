/* eslint-disable no-unused-vars, func-names, prefer-arrow-callback */

import { assert } from 'chai';
import * as packages from '../package.json';

describe('Package Configuration', function () {
  it('should export an object that matches the master package config', function () {
    assert.isObject(packages, 'this project has a packages.json file');
  });
});
