import _ from "lodash";

import pagination from "../common/pagination.js";
import Customer from "../model/customer.js";
import jwt from "jsonwebtoken"
import {} from 'dotenv/config'
import Project from "../model/project.js"


const add_customer = async (req, res) => {
    try {
        const {
            name,
            description
        } = req.body 
        const date = await new Date();
        const createAt = date.toString();
        const createBy = req.userData.id
        const new_customer = await Customer.create({
            name,
            description,
            createAt,
            createBy
        });
        return res.status(201).json({
            message: "New Customer Added"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    };
}

const update_customer = async (req, res) => {
    const {
        name,
        description
    } = req.body
    const id = req.params.id;
    const date = await new Date();
    const updateAt = date.toString();
    const updateBy = req.userData.id
    try {
        const check_customer = await Customer.findOne({where: {id:id}})
        if(check_customer){
            Customer.update({
                name,
                description,
                updateAt,
                updateBy
            }, {where: {id:id}})
            return res.status(200).json({
                message:"Update Success!"
            })
        }else{
            return res.status(404).json({
                message:"No Customer Found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Server Error"
        })
    }
}

const list_customer = async (req, res) => {
    const page = req.query.page;             
    const page_size = req.query.pagesize;
    try {
        const all_customer = await Customer.findAll({
            raw: true,
            attributes: ['name','description']
        })
        const arr_customer = Object.entries(all_customer);
        const sort_customer = _.orderBy(arr_customer, prop => prop.name, 'desc')

        const page_list = await pagination(sort_customer, page, page_size);
        return res.status(200).json({
            message: "Customer list",
            data: page_list
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const customer_detail = async (req, res) => {
    const id = req.params.id;
    try {
        const find_customer = await Customer.findOne({where: {id: id}});
        if (find_customer === null){
            return res.status(404).json({
                message: "No Customer Found"
            });
        }else{
            return res.status(200).json({
                message:"Customer Detail: ",
                data: find_customer,
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Server Error"
        })
    }
}

const delete_customer = async (req, res) => {
    const id = req.params.id;
    const check_customer = await Project.findAll({where: {customerID: id}})
    try {
        if(check_customer.length === 0){
            await Customer.update({
                isDeleted: 1
            }, {where: {id: id}})
        }else{
            for(let i = 0; i < check_customer.length; i++){
                if(check_customer[i].isDeleted === 1 || check_customer.length === 0){
                    await Customer.update({
                        isDeleted: 1
                    }, {where: {id: id}})
                }else{
                    return res.status(400).json({
                        message: "Can't delete. Customer is having a in progress project"
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
    add_customer,
    update_customer,
    list_customer,
    customer_detail,
    delete_customer,
}