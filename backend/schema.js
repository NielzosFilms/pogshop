const { gql } = require("apollo-server-express");

const typedefs = gql`
    scalar Date

    type User {
        name: String!
        admin: Boolean!
    }

    type LoginPayload {
        success: Boolean!
        token: String
    }

    type Query {
        isAuthenticated: Boolean
        getAuthenticatedUser: User
    }

    type Mutation {
        login(name: String!, password: String!): LoginPayload
        logout: Boolean
    }
`;

module.exports = typedefs;
