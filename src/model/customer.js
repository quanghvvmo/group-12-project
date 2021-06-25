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
    }
})

export default Customer;