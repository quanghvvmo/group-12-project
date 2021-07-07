import db from '../config/db.js';
import sequelize from 'sequelize';

const Employee = db.define('employee', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
    },

    name: {
        type: sequelize.STRING,
    },

    dob: {
        type: sequelize.DATE,
    },

    address: {
        type: sequelize.STRING,
    },

    idNumber: {
        type: sequelize.STRING,
    },

    phone: {
        type: sequelize.STRING,
    },

    experienceYear: {
        type: sequelize.INTEGER,
    },

    foreignLanguage: {
        type: sequelize.STRING,
    },

    certificate: {
        type: sequelize.STRING,
    },

    isAdmin: {
        type: sequelize.BOOLEAN,
        defaultValue: 0
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

export default Employee;