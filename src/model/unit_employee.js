import db from "../service/db.js";
import Sequelize from "sequelize";

const Unit_Employee = db.define('unit_employee', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    employeeID:{
        type: Sequelize.STRING(300)
    },
    unitID:{
        type: Sequelize.STRING(300)
    }
})

export default Unit_Employee;