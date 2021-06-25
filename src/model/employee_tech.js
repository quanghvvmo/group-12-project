import db from "../service/db.js";
import Sequelize from "sequelize";

const Employee_Tech = db.define('employee_tech', {
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    employeeID:{
        type: Sequelize.STRING(300)
    },
    techID: {
        type: Sequelize.STRING(300)
    }
})

export default Employee_Tech;