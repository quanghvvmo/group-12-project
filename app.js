import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import cors from 'cors';
import db from './src/config/db.js';

//declare router
import employeeRoutes from './src/routes/employee-route.js';
import techRoutes from './src/routes/tech-route.js';
import customerRoutes from './src/routes/customer-route.js';
import projectTypeRoutes from './src/routes/project-type-route.js';
import adminRoutes from './src/routes/admin-route.js';
import departmentRoutes from './src/routes/department-route.js';
import projectRoutes from './src/routes/project-route.js';
import reportRoutes from './src/routes/report-route.js';

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