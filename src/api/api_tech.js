import _ from "lodash";

import Tech from "../model/tech.js";
import pagination from "../common/pagination.js";
import Employee_Tech from "../model/employee_tech.js";
import Project_Tech from "../model/project_tech.js";

const add_tech = async (req, res) => {
    try {
        const {
            name
        } = req.body;
        const date = await new Date();
        const createAt = date.toString();
        const createBy = req.userData.id
        const find_tech = await Tech.findOne({where:{name: name}})
        if(find_tech){
            const new_tech = await Tech.create({
                name,
                createAt,
                createBy
            });
            return res.status(201).json({
                message: "New Tech Added",
                data: new_tech
            })
        }else{
            return res.status(400).json({
                message:"This Tech is already avaiable in the database"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const update_tech = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            name,
            is_active
        } = req.body;
        const date = await new Date();
        const updateAt = date.toString();
        const updateBy = req.userData.id
        const check_tech = await Tech.findOne({where: {id:id}})
        const find_tech = await Tech.findOne({where: {name:name}})
        if(check_tech && find_tech === null){
            Tech.update({
                name,
                is_active,
                updateAt,
                updateBy
            }, {where: {id:id}});
            return res.status(200).json({
                message: "Tech Updated"
            })
        }else{
            return res.status(404).json({
                message:"Invalid Tech"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

const list_tech = async (req, res) => {
    const page = req.query.page;             
    const page_size = req.query.pagesize;
    try {
        const all_tech = await Tech.findAll({
            raw: true,
            attributes: ['name']
        })
        const arr_tech = Object.entries(all_tech);
        const sort_tech = _.orderBy(arr_tech, prop => prop.name, 'desc');
        const page_list = await pagination(sort_tech, page, page_size);
        return res.status(200).json({
            message: "All Tech",
            data: page_list
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const tech_detail = async (req, res) => {
    const id = req.params.id;
    try {
        const find_tech = await Tech.findOne({where:{id:id}});
        if(find_tech){
            return res.status(200).json({
                data: find_tech
            })
        }else{
            return res.status(404).json({
                message: "No Tech Found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const delete_tech = async (req, res) => {
    const id = req.params.id;
    const find_tech = await Tech.findOne({where: {id: id}});
    const check_tech = find_tech.is_active;
    const check_employee_tech = await Employee_Tech.findAll({where: {techID: id}});
    const check_project_tech = await Project_Tech.findAll({where: {techID: id}});
    try {
        if(check_tech === 0 && check_employee_tech.length === 0 && check_project_tech.length === 0){
            await Tech.update({
                isDeleted : 1
            }, {where: {id: id}})
            return res.status(200).json({
                message: "Deleted"
            })
        }else{
            return res.status(400).json({
                message: "Can't Deleted This Tech"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

export default {
    add_tech,
    update_tech,
    list_tech,
    tech_detail,
    delete_tech,
}