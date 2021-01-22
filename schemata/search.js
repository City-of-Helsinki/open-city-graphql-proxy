exports.searchSchema = `

  enum UnifiedSearchResultCategory {
    POINT_OF_INTEREST
    EVENT
    RESERVABLE
    ENROLLABLE
    ARTWORK
    ARTICLE
    SERVICE
  }

  type SearchResultConnection {
    count: Int
    max_score: Float
    pageInfo: SearchResultPageInfo
    edges: [SearchResultEdge!]!
  }

  type SearchResultPageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type SearchResultEdge {
    cursor: String!
    node: SearchResultNode!
  }

  type SearchResultNode {
    _score: Float
    id: ID!
    name: LanguageString!
    description: LanguageString!
    resources: DescriptionResources
    canonicalUrl: String!
  }

`;

exports.searchExample = {

};

// vi:set sw=2:
