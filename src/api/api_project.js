import _ from "lodash";

import db from "../service/db.js";
import pagination from "../common/pagination.js";

import Unit from "../model/unit.js";
import Customer from "../model/customer.js";
import Type from "../model/type.js"
import Project from "../model/project.js";
import Unit_In_Proj from "../model/unit_in_proj.js";
import Project_Tech from "../model/project_tech.js";
import Tech from "../model/tech.js";
import Employee from "../model/employee.js";
import Project_Employee from "../model/project_employee.js";

const add_project = async (req, res) => {
    try {
        const {
            name,
            description,
            customer,
            type,
            tech,
            unit,
            status,
            employee_work_id,
        } = req.body;
        const createBy = req.userData.id
        const transaction = await db.transaction();
        const check_name = await Project.findOne({where: {name: name}})
        const find_unit = await Unit.findOne({ where: { name: unit } });
        const find_customer = await Customer.findOne({ where: { name: customer } });
        const find_type = await Type.findOne({ where: { name: type } });
        const find_date = await new Date();
        const date = find_date.toString();
        const createAt = find_date.toString();
        if (find_customer && find_type && find_unit && check_name === null) {
            try {
                const new_project = await Project.create({
                    name,
                    description,
                    type_id: find_type.id,
                    customerID: find_customer.id,
                    startDate: date,
                    status,
                    createBy, 
                    createAt
                }, { transaction: transaction });
                const new_unit_proj = await Unit_In_Proj.create({
                    projectID: new_project.id,
                    unitID: find_unit.id
                }, { transaction: transaction });
                for (let i = 0; i < tech.length; i++) {
                    let tech_name = tech[i];
                    let find_tech = await Tech.findOne({ where: { name: tech_name } })
                    if (find_tech) {
                        let new_project_tech = await Project_Tech.create({
                            projectID: new_project.id,
                            techID: find_tech.id
                        }, { transaction: transaction });
                    } else {
                        return res.status(404).json({
                            message: `${tech[i]} Invalid Tech`
                        })
                    }
                }
                for (let i = 0; i < employee_work_id.length; i++) {
                    let employee_id = employee_work_id[i];
                    let find_employee = await Employee.findOne({ where: { workID: employee_id } })
                    if (find_employee) {
                        let new_project_employee = await Project_Employee.create({
                            projectID: new_project.id,
                            employeeID: find_employee.id
                        }, { transaction: transaction });
                    } else {
                        return res.status(404).json({
                            message: `${employee_work_id[i]} Invalid Employee Work ID`
                        })
                    }
                }
                await transaction.commit();
                return res.status(200).json({
                    message: "New Project Added"
                })
            } catch (error) {
                await transaction.rollback();
                res.status(500).json({
                    message: "Server Error"
                })
            }
        } else {
            await transaction.rollback();
            return res.status(404).json({
                message: "Invalid Project Info"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}

const update_project = async (req, res) => {
    let transaction = await db.transaction();
    const id = req.params.id;
    try {
        const {
            name,
            description,
            type,
            tech,
            unit,
            status,
            employee_work_id,
        } = req.body
        const date = await new Date();
        const updateAt = date.toString();
        const updateBy = req.userData.id
        const check_name = await Project.findOne({where: {name: name}});
        const find_unit = await Unit.findOne({ where: { name: unit}});
        const find_type = await Type.findOne({ where: { name: type}});
        if(find_type && find_unit && check_name === null){
            Project.update({
                name,
                description,
                type_id: find_type.id,
                status,
                updateBy,
                updateAt
            },{where: {id:id}}, {transaction: transaction});
            Unit_In_Proj.update({
                unitID: find_unit.id,
            }, {where: {projectID: id}}, {transaction: transaction});
            const check_current_tech = await Project_Tech.findOne({where: {projectID: id}})
            const check_current_empployee = await Project_Employee.findOne({where: {projectID: id}})
            await Project_Tech.destroy({ where: {projectID: id}});
            await Project_Employee.destroy({where: {projectID:id}});
            for (let i = 0; i < tech.length; i++) {
                let tech_name = tech[i];
                let find_tech = await Tech.findOne({ where: { name: tech_name } })
                if (check_current_tech.techID !== find_tech.id) {
                    if (find_tech) {
                        let project_new_tech = await Project_Tech.create({
                            projectID: id,
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
            for (let i = 0; i < employee_work_id.length; i++) {
                let employee_id = employee_work_id[i];
                let find_employee = await Employee.findOne({ where: { workID: employee_id } })
                if (check_current_empployee.employeeID !== find_employee.id) {
                    if (find_employee) {
                        let new_project_employee = await Project_Employee.create({
                            employeeID: find_employee.id,
                            projectID: id
                        }, { transaction: transaction });
                    } else {
                        return res.status(404).json({
                            message: "Invalid Employee"
                        })
                    }
                } else {
                    continue;
                }
            }
            if(status == "Closed"){
                await Project_Employee.destroy({where: {projectID: id}}, {transaction: transaction})
                await Unit_In_Proj.destroy({where: {projectID: id}}, {transaction: transaction})
            }
            await transaction.commit();
            return res.status(200).json({
                message: "ok"
            })
        }else{
            await transaction.rollback();
            return res.status(404).json({
                message: "Invalid project info"
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

const list_project = async (req, res) => {
    const page = req.query.page;
    const page_size = req.query.pagesize;
    try {
        const all_project = await Project.findAll({
            raw: true,
            attributes: ['name']
        })
        const arr_project = Object.entries(all_project);
        const sort_project = _.orderBy(arr_project, prop => prop.name, 'desc');
        const page_list = await pagination(sort_project, page, page_size);
        return res.status(200).json({
            message: "All Project",
            data: page_list
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const project_detail = async (req, res) => {
    const id = req.params.id;
    try {
        const find_project = await Project.findOne({ where: { id: id } });
        if (find_project) {
            return res.status(200).json({
                data: find_project
            })
        } else {
            return res.status(404).json({
                message: "No Project Found"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const delete_project = async (req, res) => {
    const id = req.params.id;
    const find_project = await Project.findOne({where: {id: id}})
    const check_status = find_project.status
    const check_employee = await Project_Employee.findAll({where: {projectID: id}})
    const check_unit = await Unit_In_Proj.findOne({where: {projectID: id}})
    try {
        if(check_employee.length === 0 && check_status == "Closed" && check_unit === null){
            await Project.update({
                isDelete: 1
            }, {where: {id: id}})
            return res.status(200).json({
                message: "Deleted"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const project_stat = async (req, res) => {
    const {
        filter,
        tech_id,
        type_id,
        status,
        customer_id,
    } = req.body
    try {
        if(filter == "status"){
            const filter_by = await Project.findAll({where: {status: status}});
            if(filter_by.length !== 0){
                return res.status(200).json({
                    message: `${filter_by.length} project(s)`
                })
            }else{
                return res.status(404).json({
                    message: "Invalid Status"
                })
            }
        }else if(filter == "type"){
            const filter_by = await Project.findAll({where: {type_id: type_id}});
            if(filter_by.length !== 0){
                return res.status(200).json({
                    message: `${filter_by.length} project(s)`
                })
            }else{
                return res.status(404).json({
                    message: "Invalid Type"
                })
            }
        }else if(filter == "tech"){
            const filter_by = await Project_Tech.findAll({where: {techID: tech_id}});
            if(filter_by.length !== 0){
                return res.status(200).json({
                    message: `${filter_by.length} project(s)`
                })
            }else{
                return res.status(404).json({
                    message: "Invalid Tech"
                })
            }
        }else if(filter == "customer"){
            const filter_by = await Project.findAll({where: {customerID: customer_id}});
            if(filter_by.length !== 0){
                return res.status(200).json({
                    message: `${filter_by.length} project(s)`
                })
            }else{
                return res.status(404).json({
                    message: "Invalid Customer ID"
                })
            }
        }else{
            return res.status(400).json({
                message:"Invalid Filter"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Server Error"
        })
    }
}

export default {
    add_project,
    update_project,
    list_project,
    project_detail,
    delete_project,
    project_stat,
}