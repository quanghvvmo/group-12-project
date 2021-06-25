import _ from "lodash";

import Tech from "../model/tech.js";
import pagination from "../common/pagination.js";

const add_tech = async (req, res) => {
    try {
        const {
            name
        } = req.body;
        const new_tech = await Tech.create({
            name
        });
        return res.status(201).json({
            message: "New Tech Added",
            data: new_tech
        })
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
        const check_tech = await Tech.findOne({where: {id:id}})
        if(check_tech){
            Tech.update({
                name,
                is_active
            }, {where: {id:id}});
            return res.status(200).json({
                message: "Tech Updated"
            })
        }else{
            return res.status(404).json({
                message:"No Tech Found"
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
        console.log(error)
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

//delete tech (later after finish all other API)

export default {
    add_tech,
    update_tech,
    list_tech,
    tech_detail,
}