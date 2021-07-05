import db from "../service/db.js";
import Sequelize from "sequelize";

const Customer = db.define('customer', {
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

export default Customer;