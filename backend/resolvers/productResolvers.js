const resolvers = {
    Query: {
        products: async (root, args, { models, loggedIn }) => {
            if (!loggedIn) return null;
            return await models.Product.findAll();
        },
    },
    Mutation: {},
};

module.exports = resolvers;
