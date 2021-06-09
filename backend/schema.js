const { gql } = require("apollo-server-express");

const typedefs = gql`
    scalar Date

    type Query {
        test: String
    }

    type Mutation {
        test: String
    }
`;

module.exports = typedefs;
