const { GraphQLDateTime } = require("graphql-iso-date");
const fs = require("fs");
const path = require("path");

const files = fs
    .readdirSync(path.join(__dirname))
    .filter((filename) => filename !== "index.js");

let resolvers = { Date: GraphQLDateTime, Query: {}, Mutation: {} };

files.forEach((file) => {
    const fileResolvers = require(path.join(__dirname, `./${file}`));
    Object.keys(fileResolvers).map((key) => {
        resolvers[key] = { ...resolvers[key], ...fileResolvers[key] };
    });
});

if (process.env.NODE_ENV === "development") console.log(resolvers);

module.exports = resolvers;
