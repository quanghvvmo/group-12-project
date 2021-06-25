import db from "../service/db.js";
import Sequelize from "sequelize";

const Project_Tech = db.define('project_tech', {
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    projectID:{
        type: Sequelize.STRING(300)
    },
    techID: {
        type: Sequelize.STRING(300)
    }
})

export default Project_Tech;