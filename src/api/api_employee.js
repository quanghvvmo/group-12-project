import _ from "lodash"

import db from "../service/db.js";
import pagination from "../common/pagination.js"

import Employee from "../model/employee.js";
import Employee_Tech from "../model/employee_tech.js";
import Unit from "../model/unit.js";
import Unit_Employee from "../model/unit_employee.js";
import Tech from "../model/tech.js";
import Admin from "../model/admin.js";
import Project_Employee from "../model/project_employee.js";

const add_employee = async (req, res) => {
    try {
        const {
            name,
            DoB,
            address,
            id_number,
            phone,
            exp_years,
            english,
            degree,
            workID,
            tech,
            unit
        } = req.body;
        const date = await new Date();
        const createAt = date.toString();
        const createBy = req.userData.id;
        let transaction = await db.transaction();
        const find_unit = await Unit.findOne({ where: { name: unit } });
        const check_phone = await Employee.findOne({ where: { phone: phone } });
        const check_workID = await Employee.findOne({ where: { workID: workID } });
        const check_id_number = await Employee.findOne({ where: { id_number: id_number } });
        if (check_id_number === null && check_phone === null && check_workID === null) {
            if (find_unit) {
                try {
                    const new_employee = await Employee.create({
                        name,
                        DoB,
                        address,
                        id_number,
                        phone,
                        exp_years,
                        english,
                        degree,
                        workID,
                        createAt,
                        createBy
                    }, { transaction: transaction });
                    const new_employee_unit = await Unit_Employee.create({
                        employeeID: new_employee.id,
                        unitID: find_unit.id
                    }, { transaction: transaction });
                    try {
                        let find_tech = await Tech.findAll({ where: { name: tech } });
                        if (find_tech) {
                            let employee_tech = [];
                            find_tech.forEach(tech => {
                                employee_tech.push({
                                    employeeID: new_employee.id,
                                    techID: tech.id
                                })
                            })
                            await Employee_Tech.bulkCreate(employee_tech, { transaction: transaction })
                        } else {
                            return res.status(404).json({
                                message: "Invalid Tech"
                            })
                        }
                        res.status(201).json({
                            message: "Employee Added",
                            employee: new_employee
                        })
                    } catch (error) {
                        res.status(500).json({
                            message: "Server Error"
                        })
                    }
                    await transaction.commit();
                } catch (error) {
                    await transaction.rollback();
                    return res.status(500).json({
                        message: "Server Error"
                    });
                }
            } else {
                await transaction.rollback();
                return res.status.json({
                    message: "Invalid Unit Name"
                })
            }
        } else {
            await transaction.rollback();
            return res.status(400).json({
                message: "Multiple Phone Number or Work ID or ID Number are not allowed"
            })
        }
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const update_employee = async (req, res) => {
    let transaction = await db.transaction();
    const id = req.params.id;
    try {
        const {
            address,
            id_number,
            phone,
            english,
            degree,
            unit,
            leave,
            tech,
            exp_years
        } = req.body;
        const date = await new Date();
        const updateAt = date.toString();
        const updateBy = req.userData.id
        const check_id_number = await Employee.findOne({ where: { id_number: id_number } });
        const check_phone = await Employee.findOne({ where: { phone: phone } });
        if (check_phone === null && check_id_number === null) {
            const find_employee = await Employee.findOne({ where: { id: id } });
            if (find_employee) {
                const find_unit = await Unit.findOne({ where: { name: unit } });
                Employee.update({
                    address,
                    id_number,
                    phone,
                    english,
                    degree,
                    exp_years,
                    updateBy, 
                    updateAt
                }, { where: { id: id } }, { transaction: transaction })
                Unit_Employee.update({
                    unitID: find_unit.id
                }, { where: { employeeID: id } }, { transaction: transaction });
                const check_knowed_tech = await Employee_Tech.findOne({ where: { employeeID: id } })
                await Employee_Tech.destroy({ where: { employeeID: id } });
                let find_tech = await Tech.findAll({ where: { name: tech } });
                if (find_tech) {
                    let employee_tech = [];
                    find_tech.forEach(tech => {
                        employee_tech.push({
                            employeeID: id,
                            techID: tech.id
                        })
                    })
                    await Employee_Tech.bulkCreate(employee_tech, { transaction: transaction })
                } else {
                    return res.status(404).json({
                        message: "Invalid Tech"
                    })
                }
                if(leave == 1){
                    await Unit_Employee.destroy({where: {employeeID: id}}, {transaction: transaction})
                }
                await transaction.commit();
                res.status(200).json({
                    message: "Employee Updated",
                })
            } else {
                await transaction.rollback();
                return res.status(404).json({
                    message: "Invalid ID"
                })
            }
        } else {
            await transaction.rollback();
            return res.status(400).json({
                message: "Multiple Phone Number or ID Number are not allowed"
            })
        }
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const employee_list = async (req, res) => {
    const page = req.query.page;
    const page_size = req.query.pagesize;
    try {
        const all_employee = await Employee.findAll({
            raw: true,
            attributes: ['name']
        })
        const arr_employee = Object.entries(all_employee);
        const sort_employee = _.orderBy(arr_employee, prop => prop.name, 'desc');
        const page_list = await pagination(sort_employee, page, page_size);
        return res.status(200).json({
            message: "All Employee",
            data: page_list
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const employee_detail = async (req, res) => {
    const id = req.params.id;
    try {
        const find_employee = await Employee.findOne({ where: { id: id } });
        if (find_employee) {
            return res.status(200).json({
                data: find_employee
            })
        } else {
            return res.status(404).json({
                message: "No Employee Found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const delete_employee = async (req, res) => {
    const id = req.params.id;
    const find_employee = await Employee.findOne({where: {id: id}})
    const check_admin = await Admin.findOne({where: {workID: find_employee.workID}})
    const check_project = await Project_Employee.findAll({where: {employeeID: id}})
    const check_unit = await Unit_Employee.findOne({where: {employeeID: id}})
    try {
        if(check_admin === null && check_project.length === 0 && check_unit === null){
            await Employee.update({
                isDeleted: 1
            }, {where: {id: id}})
            return res.status(200).json({
                message: "Deleted Employee"
            })
        }else{
            return res.status(400).json({
                message: "Can't Deleted this employee"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
    
}

const employee_stat = async(req, res) => {
    const {
        filter,
        techID,
        projectID,
    } = req.body;
    try {
        if(filter == "tech"){
            const filter_by = await Employee_Tech.findAll({where: {techID: techID}})
            if(filter_by.length !== 0){
                return res.status(200).json({
                    message: `${filter_by.length} employee(s)`
                })
            }else{
                return res.status(404).json({
                    message: "Invalid Tech ID"
                })
            }
        }else if(filter == "project"){
            const filter_by = await Project_Employee.findAll({where: {projectID: projectID}})
            if(filter_by.length !== 0){
                return res.status(200).json({
                    message: `${filter_by.length} employee(s)`
                })
            }else{
                return res.status(404).json({
                    message: "Invalid Project ID"
                })
            }
        }else{
            return res.status(400).json({
                message: "Invalid Filter"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

export default {
    add_employee,
    update_employee,
    employee_list,
    employee_detail,
    delete_employee,
    employee_stat,
}