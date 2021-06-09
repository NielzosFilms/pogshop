const passwordHash = require("password-hash");
const crypto = require("crypto");

const resolvers = {
    Query: {
        isAuthenticated: async (root, args, { models, loggedIn }) => {
            return loggedIn;
        },
        getAuthenticatedUser: async (
            root,
            args,
            { models, loggedIn, user }
        ) => {
            return user;
        },
    },
    Mutation: {
        login: async (root, { name, password }, { models, loggedIn }) => {
            if (loggedIn) return false;
            const foundUser = await models.User.findOne({
                where: {
                    name,
                },
            });
            if (foundUser) {
                if (passwordHash.verify(password, foundUser.password)) {
                    const token = crypto.randomBytes(64).toString("hex");

                    const session = await models.Session.create({
                        token,
                        user_id: foundUser.id,
                    });
                    await session.save();

                    return { success: true, token };
                }
            }
            throw new Error("Incorrect username and or password.");
        },
        logout: async (root, args, { models, loggedIn, user }) => {
            if (!loggedIn) return false;
            await models.Session.destroy({
                where: {
                    id: user.id,
                },
            });
            return true;
        },
    },
};

module.exports = resolvers;
