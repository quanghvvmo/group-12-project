import sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const connection = new sequelize('projectdb', 'root', process.env.DATABASE_PW, {
    host: 'localhost',
    dialect: 'mysql',

    define: {
        timestamps: false,
    },
    logging: false
});

export default connection;