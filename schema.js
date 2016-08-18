// This is where we define the shape of the data we want
// GraphQL to return. We do this by defining a Beer type
// and a RootQuery that returns data in that shape.
// Contain all of this is a typeDefinitions object that
// we can export.

// In lesson #3 we're going to add a Review type to the
// typeDefinitions so that we can allow users to create
// a beer review

// add your Review type here. make sure to include the fields:
// _id, beerId, beer, rating, location
// #hint: the beer field will need to be a object of the Beer type

const typeDefinitions = `
  type Beer {
    id: String,
    name: String,
    description: String
  }

  type RootQuery {
    beer(name: String): Beer
  }

  schema {
    query: RootQuery
  }
`;

// export your typeDefinitions as the default
export default typeDefinitions;
