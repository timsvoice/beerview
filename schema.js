// This is where we define the shape of the data we want
// GraphQL to return. We do this by defining a Beer type
// and a RootQuery that returns data in that shape.
// Contain all of this is a typeDefinitions object that
// we can export.

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
