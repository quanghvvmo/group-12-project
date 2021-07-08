import db from "../service/db.js";
import Sequelize from "sequelize";

const Admin = db.define('admin', {
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    workID:{
        type: Sequelize.STRING(300)
    },
    name:{
        type: Sequelize.STRING(300)
    },
    username:{
        type: Sequelize.STRING(300)
    },
    password:{
        type: Sequelize.STRING(300)
    },
    isActive:{
        type: Sequelize.INTEGER(1),
        defaultValue: 1
    }
})

export default Admin;