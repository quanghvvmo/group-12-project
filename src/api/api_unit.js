import _ from "lodash";

import pagination from "../common/pagination.js";
import Admin from "../model/admin.js";
import Unit from "../model/unit.js";

const add_unit = async (req, res) => {
    try {
        const {
            name,
            description,
            adminID
        } = req.body;
        const find_date = await new Date();
        const date = find_date.toString()
        const check_admin = await Admin.findOne({where: {workID: adminID}});
        const duplicated_admin = await Unit.findOne({where:{adminID: adminID}});
        console.log(duplicated_admin)
        if(check_admin && duplicated_admin === null){
            const check_unit_existence = await Unit.findOne({where: {name: name}});
            if(check_unit_existence === null){
                const new_unit = await Unit.create({
                    name,
                    description,
                    date,
                    adminID
                })
                return res.status(200).json({
                    message: "New Unit Created",
                    data: new_unit
                })
            }else{
                return res.status(400).json({
                    message:"You can't create a existed unit"
                })
            }
        }else{
            return res.status(400).json({
                message:"Invalid Manager ID"
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const update_unit = async (req, res) => {
    const id = req.params.id;
    try {
        const {
            name,
            description,
            adminID
        } = req.body
        const check_admin = await Admin.findOne({where: {workID: adminID}});
        const duplicated_admin = await Unit.findOne({where: {adminID: adminID}});
        if(check_admin && duplicated_admin === null){
            const check_unit_existence = await Unit.findOne({where: {name: name}});
            if(check_unit_existence === null){
                Unit.update({
                    name,
                    description,
                    adminID,
                }, {where:{id:id}})
                return res.status(200).json({
                    message:"Success"
                })
            }else{
                return res.status(400).json({
                    message: "Existed Unit Name"
                });
            }
        }else{
            return res.status(400).json({
                message:"Invalid Admin ID"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const list_unit = async (req, res) => {
    const page = req.query.page;             
    const page_size = req.query.pagesize;
    try {
        const all_unit = await Unit.findAll({
            raw: true,
            attributes: ['name','description']
        })
        const arr_unit = await Object.entries(all_unit);
        const sort_unit = _.orderBy(arr_unit, prop => prop.name, 'desc');
        const page_list = await pagination(sort_unit, page, page_size);
        return res.status(200).json({
            message: "All Unit",
            unit: page_list
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const unit_detail = async (req, res) => {
    const id = req.params.id;
    try {
        const find_unit = await Unit.findOne({where: {id:id}})
        if(find_unit){
            return res.status(200).json({
                message:"Unit Found",
                unit: find_unit
            })
        }else{
            return res.status(404).json({
                message: "Unit Not Found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

//delete unit (later after finish all other API)

export default {
    add_unit,
    update_unit,
    list_unit,
    unit_detail,
}