const { makeExecutableSchema, ApolloServer } = require('apollo-server');

const { actorSchema } = require('./schemata/actor.js');
const { eventSchema } = require('./schemata/event.js');
const { locationSchema } = require('./schemata/location.js');
const { reservationSchema } = require('./schemata/reservation.js');
const { sharedSchema } = require('./schemata/shared.js');
const { geoSchema } = require('./schemata/geojson.js');

const querySchema = `

  directive @origin(service: String, type: String, attr: String)
  repeatable on OBJECT | FIELD_DEFINITION

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

const combinedSchema = makeExecutableSchema({
  typeDefs: [querySchema, sharedSchema, geoSchema,
    actorSchema, eventSchema, locationSchema, reservationSchema],
  resolvers
});

const server = new ApolloServer({schema: combinedSchema});
server.listen().then(({url}) => console.log(`😅 server maybe at ${url}`));

// vi:set sw=2:
