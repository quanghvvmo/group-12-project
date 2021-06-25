import db from "../service/db.js";
import Sequelize from "sequelize";

const Unit_In_Proj = db.define('unit_in_proj', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    unitID:{
        type: Sequelize.STRING(300)
    },
    projectID: {
        type: Sequelize.STRING(300)
    }
})

export default Unit_In_Proj;