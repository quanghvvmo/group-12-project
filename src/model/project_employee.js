import db from "../service/db.js";
import Sequelize from "sequelize";

const Project_Employee = db.define('project_employee', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    employeeID:{
        type: Sequelize.STRING(300)
    },
    projectID:{
        type: Sequelize.STRING(300)
    }
})

export default Project_Employee;