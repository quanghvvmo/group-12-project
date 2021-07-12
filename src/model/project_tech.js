import db from "../service/db.js";
import Sequelize from "sequelize";
import Project from "./project.js";
import Tech from "./tech.js";

const Project_Tech = db.define('project_tech', {
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
    },
    projectID:{
        type: Sequelize.STRING(300),
        references:{
            model: Project,
            key: 'id'
        }
    },
    techID: {
        type: Sequelize.STRING(300),
        references: Tech,
        key: 'id'
    }
})

Project.belongsToMany(Tech, {through: Project_Tech, foreignKey: 'projectID'});
Tech.belongsToMany(Project, {through: Project_Tech, foreignKey: 'techID'});

export default Project_Tech;