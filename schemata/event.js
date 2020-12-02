exports.eventSchema = `

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

  enum EnrolmentStatus {
    REQUESTED
    QUEUED
    CONFIRMED
    CANCELLED
    DECLINED
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

`;
