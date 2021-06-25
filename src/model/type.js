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
})

export default Type;