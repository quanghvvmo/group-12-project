# HR Management System

- Developer: Ducbla
- Mentor: QuangHV
- Technology: Node.js - Express.js - Sequelize - MySQL

# Application Requirements

## For Windows

- [Node.js](https://nodejs.org/en/) v10.x or latest
- [MySQL](https://dev.mysql.com/downloads/installer/) v8.x or lastest
- [Postman](https://www.postman.com/downloads/) for testing APIs

## For Linux

- [Node.js](https://nodejs.org/en/) v10.x or latest
- [MySQL](https://dev.mysql.com/downloads/repo/apt/) v8.x or lastest
- [Postman](https://www.postman.com/downloads/) for testing APIs

### Install MySQL For Ubuntu

- Step 1: Open terminal and run update

```bash
sudo apt update
```

- Step 2: Install MySQL Server

```bash
sudo apt install mysql-server
```

- Step 3: Configure MySQL by following [this](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04) documents

```bash
sudo mysql-secure-installation
```

- Step 4: Run MySQL

```bash
sudo mysql
```

- Step 5: Setup user account

```bash
# 1. Run this command to get user, authentication_string and plugin data
select user, authentication_string, plugin from mysql.user;

# 2. Setup an account
ALTER USER 'root'@'localhost' IDENTIFIED WITH <plugin_name> by '<your_password>'

# 3. Run this to free up any memory that the server cached as a result of the preceding ALTER USER statement
FlUSH PRIVILEGES;
```

- Step 6: Run MySQL with root user

```bash
sudo mysql -u root -p
```

### Install MySQL Workbench

- Step 1: Download [MySQL API Repository](https://dev.mysql.com/downloads/repo/apt/). Then you got a DEB file

- Step 2: Run install with that `.deb` file

```bash
sudo apt install ./<file_name>.deb
```

- Step 3: Update api-cache

```bash
sudo apt update
```

- Step 4: Installing MySQL Workbench

```bash
sudo apt install mysql-workbench-community
```

- Step 5: Launch MySQL Workbench

```bash
mysql-workbench
```

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

- Step 4: Open MySQL Workbench. Login to local instance, from side bar click to Administration. You can see `Data Import/Restore` function. Click on that function. After that load folder contents from [sql](https://github.com/quanghvvmo/group-12-project/blob/ducbla/sql/hrm-script.sql) file. Next, select `Default Target Schema` (name of database) and start import. All the datas and database structure will be imported

- Step 5: Create a new `.env` file in the root folder

```bash
PORT=5000
SECRET_TOKEN=your_secret_token
EMAIL=your_email
PASSWORD=your_password
```

- Step 6: Run server

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
|    |_  permission.middlewares.js
|    |_  verify-token.js
|
└───migrations
|    |_ migration files of models
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
