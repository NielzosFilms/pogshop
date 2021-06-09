"use strict";

const faker = require("faker");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let products = Array();
        for (let i = 0; i < 100; i++) {
            products.push({
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.datatype.float(),
                inStock: faker.datatype.boolean(),
            });
        }

        await queryInterface.bulkInsert("Products", products);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Products", null, {});
    },
};
