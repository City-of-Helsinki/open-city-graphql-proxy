const { makeExecutableSchema, ApolloServer } = require('apollo-server');
// const { mergeSchemas } = require('@graphql-tools/merge');

const { actorSchema } = require('./schemata/actor.js');
const { eventSchema } = require('./schemata/event.js');
const { locationSchema } = require('./schemata/location.js');
const { reservationSchema } = require('./schemata/reservation.js');
const { sharedSchema } = require('./schemata/shared.js');
const { geoSchema } = require('./schemata/geojson.js');

const schema = `

  type Query {
    me: Person!
    people: [Person!]!
    events: [Event!]!
    venues: [Venue!]!
  }

`;

const resolvers = {
  Query: {
    me() { return { name: "Matti Meikäläinen" }; },
    people() { return []; },
  },
};

const combinedSchema = //mergeSchemas({ schemas: [
  makeExecutableSchema({
    typeDefs: [schema, sharedSchema,
      actorSchema, eventSchema, locationSchema, reservationSchema],
    resolvers
  })//,
//  geoSchema
//]});

const server = new ApolloServer({schema: combinedSchema});
server.listen().then(({url}) => console.log(`😅 server maybe at ${url}`));

// vi:set sw=2:
