import db from "../service/db.js";
import Sequelize from "sequelize";
import Employee from "./employee.js";
import Tech from "./tech.js";

const Employee_Tech = db.define('employee_tech', {
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
    },
    employeeID:{
        type: Sequelize.STRING(300),
        references:{
            model: Employee,
            key: 'id'
        }
    },
    techID: {
        type: Sequelize.STRING(300),
        references: {
            model: Tech,
            key: 'id'
        }
    }
})

Employee.belongsToMany(Tech, {through: Employee_Tech, foreignKey: 'employeeID'})
Tech.belongsToMany(Employee, {through: Employee_Tech, foreignKey: 'techID'})

export default Employee_Tech;