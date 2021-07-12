import db from "../service/db.js";
import Sequelize from "sequelize";
import Employee from "./employee.js";
import Project from "./project.js";

const Project_Employee = db.define('project_employee', {
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
    projectID:{
        type: Sequelize.STRING(300),
        references:{
            model: Project,
            key: 'id'
        }
    }
})

Employee.belongsToMany(Project, {through: Project_Employee, foreignKey: 'employeeID'});
Project.belongsToMany(Employee, {through: Project_Employee, foreignKey: 'projectID'});

export default Project_Employee;