import db from "../service/db.js";
import Sequelize from "sequelize";
import Unit from "./unit.js";
import Project from "./project.js";

const Unit_In_Proj = db.define('unit_in_proj', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
    },
    unitID:{
        type: Sequelize.STRING(300),
        references:{
            model: Unit,
            key: 'id'
        }
    },
    projectID: {
        type: Sequelize.STRING(300),
        references: {
            model: Project,
            key: 'id'
        }
    }
})

Unit.belongsToMany(Project, {through: Unit_In_Proj, foreignKey: 'unitID'});
Project.belongsToMany(Unit, {through: Unit_In_Proj, foreignKey: 'projectID'})

export default Unit_In_Proj;