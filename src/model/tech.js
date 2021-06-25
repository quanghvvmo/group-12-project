import db from "../service/db.js";
import Sequelize from "sequelize";

const Tech = db.define('tech', {
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING(300)
    },
    is_active:{
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
})

export default Tech;