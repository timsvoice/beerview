/* eslint-disable func-names, prefer-arrow-callback*/

import { assert } from 'chai';
import sinon from 'sinon';
import casual from 'casual';
import { Review } from '../../connectors.js';
import Schema from '../../schema.js';
import Resolvers from '../../resolvers.js';

describe('MongoDB Setup', function () {
  it('should create a valid review from the Mongoose schema', function () {
    const review = {
      beerId: casual.integer(-1000, 1000),
      location: casual.sentence,
      rating: casual.integer(0, 5),
    };
    // create a new review
    const newReview = new Review(review);
    // test that review is valid
    newReview.validate((err) => {
      assert.isNull(err, 'No Error');
    });
  });

  it('should not create a valid review without a beerId, location, and rating', function (done) {
    const review = {};

    // create a new review
    const newReview = new Review(review);

    // test that review is not valid and that it
    // returns an error saying beerId is required
    newReview.validate((err) => {
      assert.equal(
        err.errors.beerId.message,
        'Path `beerId` is required.'
      );
      assert.equal(
        err.errors.rating.message,
        'Path `rating` is required.'
      );
      assert.equal(
        err.errors.location.message,
        'Path `location` is required.'
      );
      done();
    });
  });
});

describe('Review Schema', function () {
  it('should return a schema string with a new Review type', function () {
    // test that Schema returns a string
    assert.isString(Schema);
    // test that all fields are included in the string
    assert.include(Schema, 'Review', 'Schema contains Review type');
  });
});

describe('Review Resolvers', function () {
  it('should find reviews using the reviews resolver', function () {
    const mongoMock = sinon.mock(Review);
    // const spy = sinon.spy(Resolvers.RootQuery, 'reviews');
    // call the function
    Resolvers.RootQuery.reviews();
    // test that the returned object has the right fields
    mongoMock.expects('find').once();
  });
  it('should findOne review when passed an _id value', function () {
    const mongoMock = sinon.mock(Review);
    const args = { _id: casual.integer(0, 100) };
    // setup the expectation
    mongoMock.expects('findOne').once().withArgs(args);
    // call the function. '_' is here because GraphQL
    // gives the first argument in a query
    Resolvers.RootQuery.review('_', args);
    // verify that our mongoMock expectations were satisfied
    mongoMock.verify();
    mongoMock.restore();
  });
});
