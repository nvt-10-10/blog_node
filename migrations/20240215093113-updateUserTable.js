module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("Users", "password", {
            type: Sequelize.STRING,
            allowNull: false,
        });
        await queryInterface.addColumn("Users", "name", {
            type: Sequelize.STRING,
            allowNull: false,
        });
        await queryInterface.addColumn("Users", "address", {
            type: Sequelize.STRING,
            allowNull: false,
        });
        await queryInterface.addColumn("Users", "date", {
            type: Sequelize.DATE,
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Users", "password");
        await queryInterface.removeColumn("Users", "name");
        await queryInterface.removeColumn("Users", "address");
        await queryInterface.removeColumn("Users", "date");
    },
};
