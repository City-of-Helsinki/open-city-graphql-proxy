const { makeExecutableSchema, ApolloServer } = require('apollo-server');

const { actorSchema } = require('./schemata/actor.js');
const { eventSchema } = require('./schemata/event.js');
const { locationSchema } = require('./schemata/location.js');
const { reservationSchema } = require('./schemata/reservation.js');
const { sharedSchema } = require('./schemata/shared.js');
const { geoSchema } = require('./schemata/geojson.js');
const { searchSchema, searchExample } = require('./schemata/search.js');

const querySchema = `

  directive @origin(service: String, type: String, attr: String)
  repeatable on OBJECT | FIELD_DEFINITION

  type Query {
    """
    me: Person!
    people: [Person!]!
    events: [Event!]!
    venues: [Venue!]!
    """
    unifiedSearch(
      q: String,
      categories: [UnifiedSearchResultCategory!],
      excludedCategories: [UnifiedSearchResultCategory!],
      first: Int,
      after: String): SearchResultConnection
  }

`;

const resolvers = {
  Query: {
    //me() { return { name: "Matti Meikäläinen" }; },
    //people() { return []; },
    unifiedSearch() { return searchExample; },
  },
};

const combinedSchema = makeExecutableSchema({
  typeDefs: [querySchema, sharedSchema, geoSchema, searchSchema,
    actorSchema, eventSchema, locationSchema, reservationSchema],
  resolvers
});

const server = new ApolloServer({schema: combinedSchema});
server.listen().then(({url}) => console.log(`😅 server maybe at ${url}`));

// vi:set sw=2:
