import db from '../config/db.js';
import sequelize from 'sequelize';
import Employee from './employee-model.js';
import Tech from './tech-model.js';

const EmployeeTech = db.define('employeetech', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
    },

    employeeId: {
        type: sequelize.UUID,
        references: {
            model: Employee,
            key: 'id'
        }
    },

    techId: {
        type: sequelize.UUID,
        references: {
            model: Tech,
            key: 'id'
        }
    },
},
    {
        freezeTableName: true,
    }
);

Employee.belongsToMany(Tech, { through: EmployeeTech, foreignKey: 'employeeId' });
Tech.belongsToMany(Employee, { through: EmployeeTech, foreignKey: 'techId' });

export default EmployeeTech;