// In order for our GraphQL server to return data
// we need to create a resolver. Here. we're going
// make a simple test resolver that returns some dummy data.
// Later we're going to use this resolver to get data
// from our actual database

// We're going to create and expose a resolvers object
// on this object, create a RootQuery with a Beer method
// the beer method should return an object with an id, name, and description
const resolvers = {
  RootQuery: {
    beer() {
      return {
        id: 'aOx1',
        name: 'Beer',
        description: 'A really good beer',
      };
    },
  },
};

// Export the resolvers object as the default
export default resolvers;
