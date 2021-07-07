import db from '../config/db.js';
import sequelize from 'sequelize';
import Admin from './admin-model.js';

const Department = db.define('department', {
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

    foundingDate: {
        type: sequelize.DATE,
    },

    adminId: {
        type: sequelize.UUID,
        references: {
            model: Admin,
            key: 'id'
        }
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

Admin.hasOne(Department, { foreignKey: 'adminId' });
Department.belongsTo(Admin, { foreignKey: 'adminId' });

export default Department;