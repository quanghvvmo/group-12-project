import db from '../config/db.js';
import sequelize from 'sequelize';
import Department from './department-model.js';
import Employee from './employee-model.js';

const DepartmentEmployee = db.define('departmentemployee', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
    },

    departmentId: {
        type: sequelize.UUID,
        references: {
            model: Department,
            key: 'id'
        }
    },

    employeeId: {
        type: sequelize.UUID,
        references: {
            model: Employee,
            key: 'id'
        }
    },
},
    {
        freezeTableName: true,
    }
);

Department.belongsToMany(Employee, { through: DepartmentEmployee, foreignKey: 'departmentId' });
Employee.belongsToMany(Department, { through: DepartmentEmployee, foreignKey: 'employeeId' });

export default DepartmentEmployee;