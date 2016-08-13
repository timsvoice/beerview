import express from 'express';
import { apolloServer } from 'apollo-server';
import Schema from './schema.js';
import Resolvers from './resolvers.js';

// Create an express server called app
const app = express();

// We're going to need to tell our server wich port to use
// We're going to deploy to Heroku later, and Heroku,
// dynamically assigns the port to our app so we need
// to read the port from an env variable.
// In local development we want to use a consistant port
// In this case, port 8000
const GRAPHQL_PORT = (process.env.PORT || 8000);

// We want to expose a /graphql endpoint and configure apolloServer
// Note: the schema and resolvers fields are required and your
// graphql server wont work without them
app.use('/graphql', apolloServer({
  // config apolloServer here
}));

// Tell your server to listen for requests on your
// GRAPHQL_PORT and log some message to the console
// so we know the server is up and running
app.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
