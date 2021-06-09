const resolvers = {
    Query: {
        test: async (root, args, { loggedIn }) => {
            return "Hello world";
        },
    },
    Mutation: {
        test: async (root, args, { models }) => {
            return "Hello world";
        },
    },
};

module.exports = resolvers;
