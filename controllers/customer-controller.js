import Customer from '../models/customer-model.js';
import Admin from '../models/admin-model.js';
import Project from '../models/project-model.js';

const createCustomer = async (req, res) => {
    try {
        const adminId = req.admin.id;

        const findAdmin = await Admin.findOne({
            where: {
                id: adminId
            }
        });

        if (!findAdmin) {
            return res.status(403).json({
                message: "You are not admin"
            });
        }

        const { name, description } = req.body;

        const createBy = findAdmin.id;

        if (!name || !description) {
            return res.status(301).json({
                message: "Missing required information"
            });
        }

        const newCustomer = await Customer.create({
            name,
            description,
            createBy
        });

        return res.status(201).json({
            message: "Customer created",
            data: newCustomer
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getCustomers = async (req, res) => {
    try {
        const size = req.query.limit;
        const page = req.query.offset;

        const limit = parseInt(size) ? +parseInt(size) : 5;
        const offset = parseInt(page) ? parseInt(page) * parseInt(size) : 0;

        const findCustomers = await Customer.findAll({
            limit: limit,
            offset: offset
        });

        if (!findCustomers) {
            return res.status(404).json({
                message: "Customers not found"
            });
        }

        return res.status(200).json({
            message: "Customers found",
            data: findCustomers
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getCustomer = async (req, res) => {
    try {
        const id = req.params.id;

        const findCustomer = await Customer.findOne({
            where: {
                id: id
            }
        });

        if (!findCustomer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        return res.status(200).json({
            message: "Customer found",
            data: findCustomer
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const updateCustomer = async (req, res) => {
    try {
        const adminId = req.admin.id;

        const findAdmin = await Admin.findOne({
            where: {
                id: adminId
            }
        });

        if (!findAdmin) {
            return res.status(403).json({
                message: "You are not admin"
            });
        }

        const id = req.params.id;

        const findCustomer = await Customer.findOne({
            where: {
                id: id
            }
        });

        if (!findCustomer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        const { name, description } = req.body;

        const updateBy = findAdmin.id;

        if (!name || !description) {
            return res.status(301).json({
                message: "Missing required information"
            });
        }

        const updateCustomer = await Customer.update({
            name,
            description,
            updateBy,
            updateAt: Date.now()
        }, { where: { id: id } });

        return res.status(200).json({
            message: "Customer updated",
            data: updateCustomer
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const id = req.params.id;

        const findCustomer = await Customer.findOne({
            where: {
                id: id
            }
        });

        if (!findCustomer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        const checkProject = await Project.findAll({
            where: {
                customerId: findCustomer.id
            }
        });

        if(checkProject.length > 0) {
            return res.status(409).json({
                message: "Customer still owned these projects, they must be closed or deleted",
                data: checkProject
            })
        }

        const deleteCustomer = await Customer.update({
            isDeleted: 1
        }, { where: { id: id } });

        return res.status(200).json({
            message: "Customer deleted",
            data: deleteCustomer
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

export default {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
}