import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import cors from 'cors';
import db from './config/db.js';

//import model to sync
import Admin from './models/admin-model.js';
import Customer from './models/customer-model.js';
import Deparment from './models/department-model.js';
import Employee from './models/employee-model.js';
import Project from './models/project-model.js';
import Tech from './models/tech-model.js';
import ProjectType from './models/project-type-model.js';
import EmployeeTech from './models/employee-tech-model.js';
import ProjectTech from './models/project-tech-model.js';
import ProjectEmployee from './models/project-employee-model.js';
import DepartmentEmployee from './models/department-employee-model.js';
import DepartmentProject from './models/department-project-model.js';

//decalre router
import employeeRoutes from './routes/employee-route.js';
import techRoutes from './routes/tech-route.js';
import customerRoutes from './routes/customer-route.js';
import projectTypeRoutes from './routes/project-type-route.js';
import adminRoutes from './routes/admin-route.js';
import departmentRoutes from './routes/department-route.js';
import projectRoutes from './routes/project-route.js';
import reportRoutes from './routes/report-route.js';

//check connection 
db.authenticate()
    .then(() => console.log('Database connect successfully!'))
    .catch(err => console.log('Error' + err))
//db sync
db.options.maxConcurrentQueries = 1
db.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(function () {
        return db.sync();
    })
    .then(function () {
        return db.query('SET FOREIGN_KEY_CHECKS = 1')
    })
    .then(function () {
        console.log('Database synchronised.');
    }, function (err) {
        console.log(err);
    });

app.use(cors())
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/techs', techRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/project-types', projectTypeRoutes);
app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/departments', departmentRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/reports', reportRoutes);

export default app;