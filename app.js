import express from "express";
import db from "./src/service/db.js"
import cors from 'cors';

import admin_router from "./src/controller/admin_router.js";
import customer_router from "./src/controller/customer_router.js";
import tech_router from "./src/controller/tech_router.js";
import type_router from "./src/controller/type_router.js";
import unit_router from "./src/controller/unit_router.js";
import employee_router from "./src/controller/employee_router.js"
import project_router from "./src/controller/project_router.js"

const app = express();

db.authenticate()
    .then(() => console.log("Database connect successfully"))
    .catch(err => console.log("Error" + err))

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/admin', admin_router);
app.use('/api/customer', customer_router);
app.use('/api/tech', tech_router);
app.use('/api/type', type_router);
app.use('/api/unit', unit_router);
app.use('/api/employee', employee_router);
app.use('/api/project', project_router);


db.sync({force: true}, {logging: console.log});

export default app;