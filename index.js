const { makeExecutableSchema, gql, ApolloServer } = require('apollo-server');
const { actorSchema } = require('./schemata/actor.js');
const { eventSchema } = require('./schemata/event.js');
const { locationSchema } = require('./schemata/location.js');
const { reservationSchema } = require('./schemata/reservation.js');
const { sharedSchema } = require('./schemata/shared.js');

const schema = gql`

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

const server = new ApolloServer({schema: makeExecutableSchema({
  typeDefs: [schema, sharedSchema,
    actorSchema, eventSchema, locationSchema, reservationSchema],
  resolvers
})});
server.listen().then(({url}) => console.log(`😅 server maybe at ${url}`));

// vi:set sw=2:
