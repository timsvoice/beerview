const typeDefinitions = `
  type Beer {
    id: String,
    name: String,
    description: String,
    abv: String,
    glasswareId: Int,
    style: String,
    label: String,
  }

  type RootQuery {
    beer(name: String, description: String): Beer
  }

  schema {
    query: RootQuery
  }
`;

export default typeDefinitions;
