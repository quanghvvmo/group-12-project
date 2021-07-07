import db from '../config/db.js';
import sequelize from 'sequelize';
import Employee from './employee-model.js';

const Admin = db.define('admin', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
    },

    employeeId: {
        type: sequelize.UUID,
        references: {
            model: Employee,
            key: 'id'
        }
    },

    username: {
        type: sequelize.STRING,
    },

    password: {
        type: sequelize.STRING,
    },

    name: {
        type: sequelize.STRING,
    },

    status: {
        type: sequelize.BOOLEAN,
        defaultValue: 1,
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

Employee.hasOne(Admin, { foreignKey: 'employeeId' });
Admin.belongsTo(Employee, { foreignKey: 'employeeId' });

export default Admin;