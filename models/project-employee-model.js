import db from '../config/db.js';
import sequelize from 'sequelize';
import Project from './project-model.js';
import Employee from './employee-model.js';

const ProjectEmployee = db.define('projectemployee', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
    },

    projectId: {
        type: sequelize.UUID,
        references: {
            model: Project,
            key: 'id'
        }
    },

    employeeId: {
        type: sequelize.UUID,
        references: {
            model: Employee,
            key: 'id'
        }
    },
},
    {
        freezeTableName: true,
    }
);

Project.belongsToMany(Employee, { through: ProjectEmployee, foreignKey: 'projectId' });
Employee.belongsToMany(Project, { through: ProjectEmployee, foreignKey: 'employeeId' });

export default ProjectEmployee;