import db from "../service/db.js";
import Sequelize from "sequelize";

const Unit = db.define('unit', {
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING(300)
    },
    description:{
        type: Sequelize.STRING(2000)
    },
    adminID:{
        type: Sequelize.STRING(300)
    },
    date:{
        type: Sequelize.STRING(1000),
    }
})

export default Unit;