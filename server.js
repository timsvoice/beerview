import express from 'express';
import { apolloServer } from 'apollo-server';
import Schema from './schema.js';
import Resolvers from './resolvers.js';

const app = express();
const GRAPHQL_PORT = (process.env.PORT || 8000);

app.use('/graphql', apolloServer({
  graphiql: true,
  pretty: true,
  schema: Schema,
  resolvers: Resolvers,
}));

app.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
