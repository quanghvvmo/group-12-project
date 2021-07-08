import { Sequelize } from "sequelize";

const db = new Sequelize('project', 'root', 'vinhviral', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,
    },
    logging: false
});

export default db;