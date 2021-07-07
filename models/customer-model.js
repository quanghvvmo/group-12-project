import db from '../config/db.js';
import sequelize from 'sequelize';

const Customer = db.define('customer', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
    },

    name: {
        type: sequelize.STRING,
    },

    description: {
        type: sequelize.STRING,
    },

    createAt: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    },

    createBy: {
        type: sequelize.STRING(36),
    },

    updateBy: {
        type: sequelize.STRING(36),
    },

    updateAt: {
        type: sequelize.DATE,
    },

    isDeleted: {
        type: sequelize.BOOLEAN,
        defaultValue: 0
    }
},
    {
        freezeTableName: true,
    }
);

export default Customer;