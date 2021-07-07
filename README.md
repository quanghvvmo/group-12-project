# HR Management System

- Developer: Ducbla
- Mentor: QuangHV
- Technology: Node.js - Express.js - Sequelize - MySQL

# How to run

- Step 1: Install all the packages

```bash
npm install
```

- Step 2: Config database by editting config.json file in `config/config.json`

```js
  "development": {
    "username": "your_username",
    "password": "your_password",
    "database": "your_db_name",
    "host": "localhost",
    "dialect": "mysql"
  },
```

- Step 3: Create database using sequelize

```bash
sequelize db:create
```

- Step 4: Run those commands in [sequelize.txt](https://github.com/quanghvvmo/group-12-project/tree/ducbla/docs/sequelize.txt) to create tables

- Step 5: Run server

```bash
npm start
```

# Folder Structure

```
HR Management System Project
│
└───config
│   │_ config.json
│
└───controllers
|    │_  auth.controllers.js
|    │_  form.controllers.js
|    |_  mail.controllers.js
|    |_  module.controllers.js
|    |_  permission.controllers.js
|    |_  report.controllers.js
|    |_  role.controllers.js
|    |_  upload.controllers.js
|    |_  user-role.controllers.js
|    |_  user.controllers.js
│
└───docs
|    │_  postman documents
|    │_  sequelize.txt
|
└───middlewares
     |_  permission.middlewares.js
     |_  verify-token.js
|
└───migrations
     |_ migration files of models
|
└───models
|    |_  account.js
|    |_  form.js
|    |_  index.js
|    |_  modules.js
|    |_  role-permission-form.js
|    |_  role.js
|    |_  user-role.js
|    |_  user.js
|
└───routes
|    |_  auth.routes.js
|    |_  form.routes.js
|    |_  module.routes.js
|    |_  user-role.routes.js
|    |_  user.routes.js
|
└───sql
|    |_  sql-script.sql
|
└───uploads
|    |_  *images
|
└───index.js
```
