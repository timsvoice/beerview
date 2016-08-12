const resolvers = {
  Query: {
    beer() {
      return {
        id: 'aOx1',
        name: 'Beer',
        description: 'A really good beer',
      };
    },
  },
};

export default resolvers;
