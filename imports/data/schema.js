// This is where we define the shape of the data we want
// GraphQL to return. We do this by defining a Beer type
// and a RootQuery that returns data in that shape.
// Contain all of this is a typeDefinitions object that
// we can export.

// In lesson #3 we're going to add a Review type to the
// typeDefinitions so that we can allow users to create
// a beer review
const typeDefinitions = `
  type Review {
    _id: String,
    beerId: String,
    beer: Beer,
    rating: Int,
    location: String,
  }

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
