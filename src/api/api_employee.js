import _ from "lodash"

import db from "../service/db.js";
import pagination from "../common/pagination.js"

import Employee from "../model/employee.js";
import Employee_Tech from "../model/employee_tech.js";
import Unit from "../model/unit.js";
import Unit_Employee from "../model/unit_employee.js";
import Tech from "../model/tech.js"

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
        const createBy = req.userData.id
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
                        for (let i = 0; i < tech.length; i++) {
                            let tech_name = tech[i];
                            let find_tech = await Tech.findOne({ where: { name: tech_name } })
                            if (find_tech) {
                                let new_employee_tech = await Employee_Tech.create({
                                    employeeID: new_employee.id,
                                    techID: find_tech.id
                                }, { transaction: transaction });
                            } else {
                                return res.status(404).json({
                                    message: "Invalid Tech"
                                })
                            }
                        }
                        res.status(200).json({
                            message: "Employee Added",
                            employee: new_employee
                        })
                    } catch (error) {
                        console.log(error);
                        res.status(500).json({
                            message: "Server Error"
                        })
                    }
                    await transaction.commit();
                } catch (error) {
                    await transaction.rollback();
                    console.log(error)
                    return res.status(500).json({
                        message: "Server Error"
                    });
                }
            } else {
                return res.status.json({
                    message: "Invalid Unit Name"
                })
            }
        } else {
            return res.status(400).json({
                message: "Multiple Phone Number or Work ID or ID Number are not allowed"
            })
        }
    } catch (error) {
        console.log(error)
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
                for (let i = 0; i < tech.length; i++) {
                    let tech_name = tech[i];
                    let find_tech = await Tech.findOne({ where: { name: tech_name } })
                    if (check_knowed_tech.techID !== find_tech.id) {
                        if (find_tech) {
                            let employee_new_tech = await Employee_Tech.create({
                                employeeID: find_employee.id,
                                techID: find_tech.id
                            }, { transaction: transaction });
                        } else {
                            return res.status(404).json({
                                message: "Invalid Tech"
                            })
                        }
                    } else {
                        continue;
                    }
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
        console.log(error)
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

//delete employee (later after finish all other API)

export default {
    add_employee,
    update_employee,
    employee_list,
    employee_detail,
}