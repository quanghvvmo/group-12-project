import db from '../config/db.js';
import sequelize from 'sequelize';
import ProjectType from './project-type-model.js';
import Customer from './customer-model.js';

const Project = db.define('project', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
    },

    name: {
        type: sequelize.STRING(100),
    },

    description: {
        type: sequelize.STRING(300),
    },

    projectTypeId: {
        type: sequelize.UUID,
        references: {
            model: ProjectType,
            key: 'id'
        }
    },

    projectStatus: {
        type: sequelize.ENUM('InProgress', 'Maintain', 'Closed')
    },

    customerId: {
        type: sequelize.UUID,
        references: {
            model: Customer,
            key: 'id'
        }
    },

    startDate: {
        type: sequelize.DATE,
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

ProjectType.hasOne(Project, { foreignKey: 'projectTypeId' });
Project.belongsTo(ProjectType, { foreignKey: 'projectTypeId' });

Customer.hasOne(Project, { foreignKey: 'customerId' });
Project.belongsTo(Customer, { foreignKey: 'customerId' });

export default Project;