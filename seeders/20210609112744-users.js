"use strict";
const passwordHash = require("password-hash");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("Users", [
            {
                name: "admin",
                password: passwordHash.generate("asdf"),
                admin: 1,
            },
            {
                name: "admin2",
                password: passwordHash.generate("asdf"),
                admin: 1,
            },
            {
                name: "Niels",
                password: passwordHash.generate("asdf"),
                admin: 0,
            },
            {
                name: "Joris",
                password: passwordHash.generate("asdf"),
                admin: 0,
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
