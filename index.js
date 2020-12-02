const { makeExecutableSchema, gql, ApolloServer } = require('apollo-server');
const { actorSchema } = require('./schemata/actor.js');
const { eventSchema } = require('./schemata/event.js');
const { locationSchema } = require('./schemata/location.js');
const { reservationSchema } = require('./schemata/reservation.js');
const { sharedSchema } = require('./schemata/shared.js');

const schema = gql`

  """
  Free-form location, not necessarily at a know venue.
  """
  type LocationDescription {
    url: String
    geoLocation: GeographicalLocation
    streetAddress: Address
    explanation: String
    venue: Venue
  }

  """
  A place that forms a unit and can be used for some specific purpose -
  respa unit or resource, service map unit, beta.kultus venue, linked
  events place, Kukkuu venue
  """
  type Venue {
    meta: NodeMeta
    name: String
    location: LocationDescription
    description: String
    descriptionResources: DescriptionResources
    partOf: Venue
    openingHours: OpeningHours
    manager: LegalEntity
    contactDetails: ContactInfo
    reservationPolicy: VenueReservationPolicy
    accessibilityProfile: AccessibilityProfile
    arrivalInstructions: String
    additionalInfo: String
    facilities: [VenueFacility!]
  }

  """TODO: take this from respa / Hauki"""
  type OpeningHours {
    meta: NodeMeta
    todo: String
  }

  """TODO: this comes from respa resource/unit types"""
  type VenueReservationPolicy {
    todo: String
  }

  """TODO: take this from service map / TPREK"""
  type AccessibilityProfile {
    meta: NodeMeta
    todo: String
  }

  """TODO: combine beta.kultus Venue stuff with respa equipment type"""
  type VenueFacility {
    meta: NodeMeta
    name: String!
    categories: [Keyword!]
  }

  """
  This should be just any GeoJSON object, see
  https://github.com/ghengeveld/graphql-geojson
  """
  type GeographicalLocation {
    type: String!
    coordinates: [Float!]!
  }

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
