import db from '../config/db.js';
import sequelize from 'sequelize';
import Department from './department-model.js';
import Project from './project-model.js';

const DepartmentProject = db.define('departmentproject', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
    },

    departmentId: {
        type: sequelize.UUID,
        references: {
            model: Department,
            key: 'id'
        }
    },

    projectId: {
        type: sequelize.UUID,
        references: {
            model: Project,
            key: 'id'
        }
    },
},
    {
        freezeTableName: true,
    }
);

Department.belongsToMany(Project, { through: DepartmentProject, foreignKey: 'departmentId' });
Project.belongsToMany(Department, { through: DepartmentProject, foreignKey: 'projectId' });

export default DepartmentProject;