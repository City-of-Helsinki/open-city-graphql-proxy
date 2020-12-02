exports.sharedSchema = `

  scalar DateTime

  type NodeMeta {
    id: ID!
    createdAt: DateTime
    updatedAt: DateTime
  }

  """TODO: merge all free tags, categories, and keywords"""
  type Keyword {
    name: String!
  }

  """TODO: take from Profile or external source"""
  enum Language {
    FI
  }

  """
  any kind of description answering the question "when".
  """
  type TimeDescription {
    starting: DateTime
    ending: DateTime
    otherTime: TimeDescription
  }

  """
  Resources (media) that provide extra description of a resource,
  facility, event or venue, such as images, videos, info pages, etc.
  """
  type DescriptionResources {
    mediaResources: [MediaResource!]!
    infoUrls: [String!]!
    externalLinks: [String!]!
  }

  """TODO: take this from Linked events Image type."""
  type MediaResource {
    meta: NodeMeta
    todo: String
  }

`;
