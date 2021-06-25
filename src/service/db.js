import { Sequelize } from "sequelize";

const db = new Sequelize('postgres', 'postgres', 'vinhviral', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: false,
    },
    logging: false
});

export default db;