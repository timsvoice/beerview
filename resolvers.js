// In order for our GraphQL server to return data
// we need to create a resolver. Here. we're going
// make a simple test resolver that returns some dummy data.
// Later we're going to use this resolver to get data
// from our actual database

// We're going to create and expose a resolvers object
// on this object, create a RootQuery with a Beer method
// the beer method should return an object with an id, name, and description

// Import the Review object from your connectors
import { Review } from './connectors.js';

const resolvers = {
  RootQuery: {
    // Lesson #3 will require us to add a review method to the query so
    // users can retrieve reviews from the database. We will also need to import
    // the review from our new connector

    // create a review method that accepts two arguemnts (_, agrs)
    // This method should return a review from the Mongoose model
    // #hint: you can call findOne on the Review object and pass
    // it an object with an _id field (use args to get this value)
    review(_, args) {
      // Return a review using the _id passed in by args
    },
    // create a reviews method that returns a collection of
    // reviews from the Mongoose model
    // #hint: you can call find() on the the Review object
    // and then limit the number of documents returned with the limit() method
    // This will return a promise, so you will need to call then() to return the documents
    reviews() {
      // Return 10 reviews from the mongoDB
    },
    beer() {
      return {
        id: 'aOx1',
        name: 'Beer',
        description: 'A really good beer',
      };
    },
  },
  // We're also going to add a Mutation to allow users to add their own reviews
  // This will need to create a new Review, and pass in a beerId, raitng, and location
  // We can decide what the Mutation returns, but generally it's a good idea to return
  // the saved record. You can also console.log() the error if there is one.
  // #hint: first create a new Review and then perform the save() method on that object
  // save() takes two arguments: (err, res)
  Mutation: {
    // create your Mutation action here
  },
};

// Export the resolvers object as the default
export default resolvers;
