const GeoJSONDef = require('graphql-geojson');
const { GraphQLSchema } = require('graphql');

exports.geoSchema = new GraphQLSchema(GeoJSONDef);

