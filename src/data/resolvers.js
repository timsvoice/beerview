// In order for our GraphQL server to return data
// we need to create a resolver. Here. we're going
// make a simple test resolver that returns some dummy data.
// Later we're going to use this resolver to get data
// from our actual database

// We're going to create and expose a resolvers object
// on this object, create a RootQuery with a Beer method
// the beer method should return an object with an id, name, and description

import { Review } from './mongo.connector.js';
import Beer from './brewerydb.connector.js';

const resolvers = {
  RootQuery: {
    // Lesson #3 will require us to add a review method to the query so
    // users can retrieve reviews from the database. We will also need to import
    // the review from our new connector
    review(_, args) {
      // return a review from the local mongoDB using an _id
      return Review.findOne({ _id: args._id });
    },
    reviews() {
      // Return 10 reviews from the mongoDB
      return Review.find().limit(10).then((res) => res);
    },
    // We can now replace our fake data with some real
    // data from the brewerydb API
    beer(_, args) {
      //  return a beer from the breweryDB via id
      return Beer.find(args.beerId);
    },
    beerSearch(_, args) {
      // return a beer array from the breweryDB via name search
      return Beer.searchBeer(args.query);
    },
  },
  // We're also going to add a Mutation to allow users to add their own reviews
  // This will need to create a new Review, and pass in a beerId, raitng, and location
  // We can decide what the Mutation returns, but generally it's a good idea to return
  // the saved record. You can also console.log() the error if there is one.
  // #hint: first create a new Review and then perform the save() method on that object
  // save() takes two arguments: (err, res)
  Mutation: {
    submitReview(_, { beerId, rating, location }) {
      const review = new Review({ beerId, rating, location });
      return review.save((err, res) => {
        if (err) console.log(err);
        console.log(res);
        return res;
      });
    },
  },
};

// Export the resolvers object as the default
export default resolvers;
