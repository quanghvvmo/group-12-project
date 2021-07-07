- Create User Table

```bash
sequelize model:generate --name user --attributes employee_code:string,first_name:string,last_name:string,email:string,phone:string,avatar:string,identification_card:string,social_insurance:string,address:string,department:string,parent:string,position:string
```

- Create Role Table

```bash
sequelize model:generate --name role --attributes role_name:string
```

- Create User Role Table

```bash
sequelize model:generate --name user_role --attributes role_id:string,user_id:string
```

- Create Account Table

```bash
sequelize model:generate --name account --attributes user_id:string,password:string,email:string
```

- Create Role Permission Form Table

```bash
sequelize model:generate --name role_permission_form --attributes role_id:string,module_id:string,canCreate:integer,canRead:integer,canUpdate:integer,canDelete:integer,canApprove:integer
```

- Create Module Table

```bash
sequelize model:generate --name module --attributes module_name:string
```

- Create Form Table

```bash
sequelize model:generate --name form --attributes user_id:string,form_type:string,manager:string,status:string,personal_review:string,manager_review:string,hr_review:string,task:string,archivement:string
```