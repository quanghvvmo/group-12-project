# VMO Stage 3: Project management system
Project management system is a Nodejs project that allow admin to manage projects information and emlpoyees information in departments

#Requirement
```
Nodejs v14.17.0
MySQL
```

### Setup
*Change `.env.example` file to `.env`

*Dependency install
```
npm install
```

*Run or import one of these sql file
    *For database structure only
        ```
        VMOGD3(Structure only).sql
        ```
    *For database structure and data
        ```
        VMOGD3(Structure+Data).sql
        ```

### Run project
To run as a local user use `npm start`
To run as a dev for bug fixing and testing use `npm run dev`

### Run api
Import `VMOGD3swagger.yaml` or `VMOGD3swagger.json` to [Swagger](https://editor.swagger.io/)
***Make sure to run project with `npm start` or `npm run dev` first*** 

### SQL folder
Contain 2 .sql files, one with project sql commands for database structure only and one with sql commands for both data and structure

### Docs folder
Contain postman export file, import this file to postman to test and run all apis
Contain swagger json file and swagger yaml file, import either of these files to swagger editor to run and test apis
