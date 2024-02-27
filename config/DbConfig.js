import { Sequelize } from "sequelize";

const sequelize = new Sequelize("blog", "root", "Aa123456@", {
    host: "127.0.0.1",
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },

    dialectOptions: {
        connectTimeout: 60000,
    },
    retry: {
        max: 3,
    },
});

export default sequelize;
