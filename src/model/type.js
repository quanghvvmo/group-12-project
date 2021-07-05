import db from "../service/db.js";
import Sequelize from "sequelize";

const Type = db.define('type', {
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING(300)
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
        type: Sequelize.STRING(300)
    },
    updateAt:{
        type: Sequelize.STRING()
    }
})

export default Type;