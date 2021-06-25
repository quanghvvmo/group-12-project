import db from "../service/db.js";
import Sequelize from "sequelize";
import Enum_Project_Status from "../common/constant.js"
const Project = db.define('project', {
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
    customerID:{
        type: Sequelize.STRING(300)
    },
    startDate:{
        type: Sequelize.DATE
    },
    status:{
        type: Sequelize.STRING,
        enum: Enum_Project_Status
    }
})

export default Project;