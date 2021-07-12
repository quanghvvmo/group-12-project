import db from "../service/db.js";
import Sequelize from "sequelize";
import Enum_Project_Status from "../common/constant.js"
const Project = db.define('project', {
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
    },
    name:{
        type: Sequelize.STRING(300)
    },
    description:{
        type: Sequelize.STRING(2000)
    },
    customerID:{
        type: Sequelize.STRING(300)
    },
    startDate:{
        type: Sequelize.DATE
    },
    status:{
        type: Sequelize.STRING,
        enum: Enum_Project_Status
    },
    type_id:{
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
        type: Sequelize.DATE
    },
    updateAt:{
        type: Sequelize.DATE
    }
})

export default Project;