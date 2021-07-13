import db from "../service/db.js";
import Sequelize from "sequelize";
import Enum_Project_Status from "../common/constant.js"
import Customer from "./customer.js";
import Type from "./type.js";
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
        type: Sequelize.UUID,
        references:{
            model: Customer,
            key: 'id'
        }
    },
    startDate:{
        type: Sequelize.DATE
    },
    status:{
        type: Sequelize.STRING,
        enum: Enum_Project_Status
    },
    type_id:{
        type: Sequelize.UUID,
        references:{
            model: Type,
            key: 'id'
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

Customer.hasOne(Project, {foreignKey: 'customerID'})
Project.belongsTo(Customer, {foreignKey: 'customerID'})

Type.hasOne(Project, {foreignKey: 'type_id'})
Project.belongsTo(Type, {foreignKey: 'type_id'})

export default Project;