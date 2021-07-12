import db from '../config/db.js';
import sequelize from 'sequelize';
import Project from './project-model.js';
import Tech from './tech-model.js';

const ProjectTech = db.define('projecttech', {
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

    techId: {
        type: sequelize.UUID,
        references: {
            model: Tech,
            key: 'id'
        }
    },
},
    {
        freezeTableName: true,
    }
);

Project.belongsToMany(Tech, { through: ProjectTech, foreignKey: 'projectId' });
Tech.belongsToMany(Project, { through: ProjectTech, foreignKey: 'techId' });

export default ProjectTech;