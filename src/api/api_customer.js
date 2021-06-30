import _ from "lodash";

import pagination from "../common/pagination.js";
import Customer from "../model/customer.js";
import jwt from "jsonwebtoken"
import {} from 'dotenv/config'



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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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

//delete customer (later after finish all other API)



export default {
    add_customer,
    update_customer,
    list_customer,
    customer_detail,
}