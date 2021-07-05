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
    },
    isDeleted:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    createBy: {
        type: Sequelize.STRING(36)
    },
    updateBy:{
        type: Sequelize.STRING(36)
    },
    createAt:{
        type: Sequelize.DATE
    },
    updateAt:{
        type: Sequelize.DATE
    }
})

export default Tech;