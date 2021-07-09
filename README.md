# HR Management System
HR Management System is a NodeJS project for HR department manage informantion and form of employees
### Requirement
```
NodeJS 14.x
npm 6.x
MySQL Server
```

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
* use .sql file in folder sql
```JavaScript
//only database structure
HRM_project_structure.sql

//both structure and data
HRM-structure-data.sql
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

### Swagger
import .yaml file in folder docs to  [Swagger](https://editor.swagger.io/)

### folder docs
Contain export file of Postman: folders of API

### folder sql 
Contain sql script of database: create database, create tables.


