import db from "../service/db.js";
import Sequelize from "sequelize";
import Admin from "./admin.js";

const Unit = db.define('unit', {
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
    adminID:{
        type: Sequelize.STRING(300),
        references:{
            model: Admin,
            key:'workID'
        }
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


Admin.hasOne(Unit, {foreignKey: 'adminID'})
Unit.belongsTo(Admin, {foreignKey: 'adminID'})

export default Unit;