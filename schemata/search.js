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
    searchCategories: [UnifiedSearchResultCategory!]!
  }

`;

exports.searchExample = {
  "count": 1,
  "max_score": 0.486115,
  "pageInfo": {
    "hasNextPage": false,
    "hasPreviousPage": false,
    "startCursor": "iofj934ji43jfi3j4fire",
    "endCursor": null,
  },
  edges: [
    {
      "cursor": "iofj934ji43jfi3j4fire",
      "node": {
	"_score": 0.486115,
	"id": "lippupiste:serie-2804177",
	"name": {
	  "fi": "Vain Parasta Minulle",
	  "text": "Vain Parasta Minulle",
	  "defaultLanguage": "FI",
	},
	"description": {
	  "fi": "<p><strong>Helsingin Kaupunginteatterin pienellä näyttämöllä esitettävät ...</strong></p>",
	  "text": "<p><strong>Helsingin Kaupunginteatterin pienellä näyttämöllä esitettävät ...</strong></p>",
	  "defaultLanguage": "FI",
	},
	"resources": {
	  "infoUrls": ["https://www.lippu.fi/tickets.html?affiliate=adv&doc=erdetaila&fun=erdetail&erid=2856915"],
	  "mediaResources": [],
	},
	"canonicalUrl": "https://tapahtumat.hel.fi/fi/event/helsinki:af2tbff5zm",
	"searchCategories": ["EVENT"],
      },
    },
  ],
};

// vi:set sw=2:
