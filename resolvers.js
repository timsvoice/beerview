// In order for our GraphQL server to return data
// we need to create a resolver. Here. we're going
// make a simple test resolver that returns some dummy data.
// Later we're going to use this resolver to get data
// from our actual database

// We're going to create and expose a resolvers object
// on this object, create a RootQuery with a Beer method
// the beer method should return an object with an id, name, and description

import { Review } from './connectors.js';

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
    beer() {
      return {
        id: 'aOx1',
        name: 'Beer',
        description: 'A really good beer',
      };
    },
  },
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
