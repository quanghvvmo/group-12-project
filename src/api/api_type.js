import _ from "lodash";

import Type from "../model/type.js";
import Project from "../model/project.js";
import pagination from "../common/pagination.js";

const add_tpye = async (req, res) => {
    try {
        const {
            name
        } = req.body;
        const date = await new Date();
        const createAt = date.toString();
        const createBy = req.userData.id
        const new_type = await Type.create({
            name,
            createBy,
            createAt
        });
        return res.status(201).json({
            message: "A New Type Added",
            data: new_type
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const update_tpye = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            name,
        } = req.body;
        const date = await new Date();
        const updateAt = date.toString();
        const updateBy = req.userData.id
        const check_tpye = await Type.findOne({where: {id:id}})
        if(check_tpye){
            Type.update({
                name,
                updateAt,
                updateBy
            }, {where: {id:id}});
            return res.status(200).json({
                message: "Type Updated"
            })
        }else{
            return res.status(404).json({
                message:"No Type of Project Found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

const list_type = async (req, res) => {
    const page = req.query.page;             
    const page_size = req.query.pagesize;
    try {
        const all_type = await Type.findAll({
            raw: true,
            attributes: ['name']
        })
        const arr_type = Object.entries(all_type);
        const sort_type = _.orderBy(arr_type, prop => prop.name, 'desc');
        const page_list = await pagination(sort_type, page, page_size);
        return res.status(200).json({
            message: "All Type of Project",
            data: page_list
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const type_detail = async (req, res) => {
    const id = req.params.id;
    try {
        const find_type = await Type.findOne({where:{id:id}});
        if(find_type){
            return res.status(200).json({
                data: find_type
            })
        }else{
            return res.status(404).json({
                message: "No Type of Project Found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const delete_type = async (req, res) => {
    const id = req.params.id;
    const check_type = await Project.findAll({where: {type_id: id}})
    try {
        if(check_type.length === 0){
            await Type.update({
                isDeleted: 1
            }, {where: {id: id}})
        }else{
            for(let i = 0; i < check_type.length; i++){
                if(check_type[i].isDeleted === 1 || check_type.length === 0){
                    await Type.update({
                        isDeleted: 1
                    }, {where: {id: id}})
                }else{
                    return res.status(400).json({
                        message: "Can't delete this project type"
                    })
                }
            }
        }
        return res.status(200).json({
            message: "Deleted Success"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}
export default {
    add_tpye,
    update_tpye,
    list_type,
    type_detail,
    delete_type,
}