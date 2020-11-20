const { gql, ApolloServer } = require('apollo-server');

const schema = gql`

  type Person {
    name: String
  }

  type Query {
    me: Person!
    customers: [Person]
  }

`;

const resolvers = {
  Query: {
    me() { return { name: "Matti Meikäläinen" }; },
    customers() { return []; },
  },
};

const server = new ApolloServer({ typeDefs: schema, resolvers });
server.listen().then(({url}) => console.log(`😅 server maybe at ${url}`));

// vi:set sw=2:
