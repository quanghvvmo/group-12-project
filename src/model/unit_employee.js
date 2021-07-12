import db from "../service/db.js";
import Sequelize from "sequelize";
import Employee from "./employee.js";
import Unit from "./unit.js";

const Unit_Employee = db.define('unit_employee', {
    id: {
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
    unitID:{
        type: Sequelize.STRING(300),
        references: {
            model: Unit,
            key: 'id'
        }
    }
})

Employee.belongsToMany(Unit, {through: Unit_Employee, foreignKey: 'employeeID'});
Unit.belongsToMany(Employee, {through: Unit_Employee, foreignKey: 'unitID'})

export default Unit_Employee;