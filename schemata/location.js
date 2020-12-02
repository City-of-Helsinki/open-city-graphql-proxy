exports.locationSchema = `

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

`;
