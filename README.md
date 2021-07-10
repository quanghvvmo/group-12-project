# HR Management API
HR Management API is a NodeJS project of HR Management System

HRM System is a application for HR department manage information and form of employees
### Requirement

[NodeJS](https://nodejs.org/en/download/) v14.x or lastest

[MySQL Server](https://dev.mysql.com/downloads/mysql/)

### NPM
install packages: 
```
npm install 
```
### Database
* use sequelize-cli 
```JavaScript
//create database
npx sequelize db:create

//create tables from models
npx sequelize db:migrate

```
* use .sql file in folder `sql`
```JavaScript
//only database structure
HRM_project_structure.sql

//both structure and data
HRM_structure_data.sql
```
* config
```
DB_NAME = HRM_project
DB_HOST = localhost
```
### Usage
```
Run command `npm start` to run server
```

### Postman

* enviroment variable
```JavaScript
url: "localhost:8081"
```
### Swagger
import .yaml file in folder docs to  [Swagger](https://editor.swagger.io/)

### folder docs
Contain export file of Postman: folders of API

### folder sql 
Contain sql script of database: create database, create tables.


