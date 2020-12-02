const { makeExecutableSchema, gql, ApolloServer } = require('apollo-server');
const { actorSchema } = require('./schemata/actor.js');
const { eventSchema } = require('./schemata/event.js');
const { locationSchema } = require('./schemata/location.js');
const { reservationSchema } = require('./schemata/reservation.js');
const { sharedSchema } = require('./schemata/shared.js');

const schema = gql`

  """TODO: take from Profile"""
  type Person {
    meta: NodeMeta
    name: String
    identificationStrength: IdentificationStrength
    contactDetails: ContactInfo
    preferredLanguages: [Language!]
    preferredMedium: ContactMedium
  }

  enum IdentificationStrength {
    "If this person is just a pseudoperson for contacting"
    NONIDENTIFIABLE
    "If the identity of this person is not known at all"
    UNIDENTIFIED
    "If the person has authenticated with at least some method"
    AUTHENTICATED
    "If the person has done some identifiable action such as payment"
    INDIRECT
    "If the person has proved their legal identity"
    LEGALLY_CONNECTED
  }

  """TODO: merge beta.kultus organisation, etc"""
  type Organisation {
    meta: NodeMeta
    contactDetails: ContactInfo
  }

  union LegalEntity = Person | Organisation

  """
  An organised event - something that happens at a specific time, has a
  specific topic or content, and people can participate.  Examples include
  meetups, concerts, volunteering occasions (or bees), happenings.  This
  corresponds to Linked events/courses event, beta.kultus
  PalvelutarjotinEventNode, Kukkuu event.
  """
  type Event {
    meta: NodeMeta
    name: String!
    description: String
    shortDescription: String
    descriptionResources: DescriptionResources
    keywords: [Keyword!]!
    eventDataSource: String
    occurrences: [EventOccurrence!]!
    pricing: [EventPricing!]
    organiser: LegalEntity
    publisher: LegalEntity
    contactPerson: LegalEntity
    eventLanguages: [Language!]!
    subEvents: [Event!]!
    superEvent: Event
    enrolmentPolicy: EnrolmentPolicy
    targetAudience: [Keyword!]
  }

  """TODO: improve (a lot) over Linked events' offer type"""
  type EventPricing {
    meta: NodeMeta
    todo: String
  }

  type EventOccurrence {
    meta: NodeMeta
    "which event this is an occurrence of"
    ofEvent: Event
    happensAt: TimeDescription

    """
    for information - for example, to guide people who are looking for
    big or small events, or to give city officials a hint on how much
    equipment is needed
    """
    estimatedAttendeeCount: Int

    location: LocationDescription
    status: EventOccurrenceStatus
    enrolments: [Enrolment!]!
    minimumAttendeeCount: Int
    maximumAttendeeCount: Int
    currentlyAvailableParticipantCount: Int
    "for events where equipment is requested from the City of Helsinki"
    cityEquipmentRequests: [EquipmentRequest!]
  }

  enum EventOccurrenceStatus {
    UNPUBLISHED
    PUBLISHED
    CANCELLED
    RESCHEDULED
    POSTPONED
  }

  """
  Rules about who can enroll to an event and how
  """
  type EnrolmentPolicy {
    meta: NodeMeta
    type: [EnrolmentPolicyType!]!
    enrolmentTime: TimeDescription
    allowedParticipantCategories: [Keyword!]!
    participantMinimumAge: Int!
    participantMaximumAge: Int!
    "minimum number of people who can enrol together (at the same time)"
    minimumEnrolmentCount: Int
    "maximum number of people who can enrol together (at the same time)"
    maximumEnrolmentCount: Int
  }

  enum EnrolmentPolicyType {
    NO_ENROLMENT_NEEDED
    GROUPS
    GROUPS_WITH_SUPERVISORS
    INDIVIDUALS
  }

  """
  Information about enrolled participant(s) in an event occurrence
  """
  type Enrolment {
    meta: NodeMeta
    event: EventOccurrence
    enroller: Person
    participantCount: Int!
    participants: [Person!]
    participantCategory: Keyword
    overseerCount: Int
    overseers: [Person!]
    requestedMethodOfNotification: ContactMedium
    status: EnrolmentStatus
    extraInformation: String
  }

  enum ContactMedium {
    SMS
    EMAIL
    SMS_AND_EMAIL
    MOBILE_NOTIFICATION
    ASIOINTI
  }

  enum EnrolmentStatus {
    REQUESTED
    QUEUED
    CONFIRMED
    CANCELLED
    DECLINED
  }

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
  Contact details for a person, legal entity, venue or project
  """
  type ContactInfo {
    contactUrl: String
    phoneNumbers: [PhoneNumber!]!
    emailAddresses: [String!]!
    postalAddresses: [Address!]!
  }

  type PhoneNumber {
    countryCode: String!
    restNumber: String!
  }

  """TODO: give real structure"""
  type Address {
    streetAddress: String!
  }

  """
  This should be just any GeoJSON object, see
  https://github.com/ghengeveld/graphql-geojson
  """
  type GeographicalLocation {
    type: String!
    coordinates: [Float!]!
  }

  """
  Request for equipment - if someone needs equipment for a purpose such
  as organising a volunteering event (as is the case in park cleaning
  bees), a specification of what is being requested.
  """
  type EquipmentRequest {
    meta: NodeMeta
    requestedEquipment: String!
    estimatedAmount: Int
    requestedForEvent: Event
    deliveryLocation: LocationDescription
    returnLocation: LocationDescription
    extraInformation: String!
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
