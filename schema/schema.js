// schema file tells the types of data and how each data is related to one another
const graphql = require("graphql");
const axios = require("axios");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const baseURL = "http://localhost:8080";

const CompanyType = new GraphQLObjectType({
    name: "Company",
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
    },
});

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                return axios
                    .get(`${baseURL}/companies/${parentValue.companyId}`)
                    .then((res) => res.data);
            },
        },
    },
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                // need to convert this to async function so it returns a promise
                // could use axios or fetch for making HTTP requests
                // return _.find(users, { id: args.id });
                return axios
                    .get(`${baseURL}/users/${args.id}`)
                    .then((res) => res.data);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
