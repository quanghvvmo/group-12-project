import db from "../service/db.js";
import Sequelize from "sequelize";

const Employee = db.define('employee', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique:true
    },
    name:{
        type: Sequelize.STRING(300)
    },
    workID:{
        type: Sequelize.STRING(300),
        unique: true
    },
    DoB:{
        type: Sequelize.STRING(300)
    },
    address:{
        type: Sequelize.STRING(300)
    },
    id_number:{
        type: Sequelize.INTEGER(15)
    },
    phone:{
        type: Sequelize.INTEGER(15)
    },
    exp_years:{
        type: Sequelize.INTEGER(2)
    },
    english:{
        type: Sequelize.STRING(300)
    },
    degree:{
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



export default Employee;