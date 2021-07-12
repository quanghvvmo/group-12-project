import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import Admin from '../models/admin-model.js';
import Employee from '../models/employee-model.js';
import Department from '../models/department-model.js';
import bcrypt from 'bcrypt';

const addAdmin = async (req, res) => {
    try {
        const { username, password, employeeId } = req.body;

        const findEmployee = await Employee.findOne({
            where: {
                id: employeeId,
                isAdmin: 1
            }
        });

        if (!findEmployee) {
            return res.status(404).json({
                message: "Cannot find employee suitable to be admin"
            });
        }

        const checkUsername = await Admin.findOne({
            where: {
                username: username
            }
        });

        if (checkUsername) {
            return res.status(409).json({
                message: "Username already existed"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.create({
            username: username,
            password: hashedPassword,
            name: findEmployee.name,
            employeeId: employeeId,
        });

        return res.status(201).json({
            message: "Admin created",
            data: newAdmin
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({
            where: {
                username: username
            },
        });

        if (!admin) {
            return res.status(401).json({
                message: "Admin not found"
            });
        }

        const validPassword = await bcrypt.compare(password, admin.password);

        if (!validPassword) {
            return res.status(401).json({
                message: "Password is incorrect"
            });
        }

        const token = jwt.sign({
            id: admin.id,
        }, process.env.JWT_SECRET, {
            expiresIn: "8h"
        });

        return res.status(200).json({
            message: "Login successfully!",
            data: {
                admin: admin,
                token: token
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getAdmins = async (req, res) => {
    try {
        const currentAdmin = req.admin.id;

        if(currentAdmin === null) {
            return res.status(404).json({
                message: "Admin not found, contact tech staff for instruction"
            });
        }

        const findCurrentAdmin = await Admin.findOne({
            where: {
                id: currentAdmin
            }
        });

        if (!findCurrentAdmin) {
            return res.status(403).json({
                message: "You are not admin"
            });
        }

        const size = req.query.limit;
        const page = req.query.offset;

        const limit = parseInt(size) ? +parseInt(size) : 5;
        const offset = parseInt(page) ? parseInt(page) * parseInt(size) : 0;

        const findAdmins = await Admin.findAll({
            where: {
                isDeleted: 0
            },
            include: [
                {
                    model: Employee
                }
            ],
            limit: limit,
            offset: offset
        });

        return res.status(200).json({
            message: "Admins found",
            data: findAdmins
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getAdmin = async (req, res) => {
    try {
        const currentAdmin = req.admin.id;

        if(currentAdmin === null) {
            return res.status(404).json({
                message: "Admin not found, contact tech staff for instruction"
            });
        }

        const findCurrentAdmin = await Admin.findOne({
            where: {
                id: currentAdmin
            }
        });

        if (!findCurrentAdmin) {
            return res.status(403).json({
                message: "You are not admin"
            });
        }

        const id = req.params.id;

        const findAdmin = await Admin.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: Employee
                }
            ],
        });

        if (!findAdmin) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        return res.status(200).json({
            message: "Admin found",
            data: findAdmin
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const updateAdmin = async (req, res) => {
    try {
        const currentAdmin = req.admin.id;

        if(currentAdmin === null) {
            return res.status(404).json({
                message: "Admin not found, contact tech staff for instruction"
            });
        }

        const findCurrentAdmin = await Admin.findOne({
            where: {
                id: currentAdmin
            }
        });

        if (!findCurrentAdmin) {
            return res.status(403).json({
                message: "You are not admin"
            });
        }

        const id = req.params.id;

        const findAdmin = await Admin.findOne({
            where: {
                id: id
            }
        });

        if (!findAdmin) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const updateAdmin = await Admin.update({
            username,
            password: hashedPassword,
        }, { where: { id: id } });

        return res.status(200).json({
            message: "Admin updated",
            data: updateAdmin
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const deleteAdmin = async (req, res) => {
    try {
        const currentAdmin = req.admin.id;

        if(currentAdmin === null) {
            return res.status(404).json({
                message: "Admin not found, contact tech staff for instruction"
            });
        }

        const findCurrentAdmin = await Admin.findOne({
            where: {
                id: currentAdmin
            }
        });

        if (!findCurrentAdmin) {
            return res.status(403).json({
                message: "You are not admin"
            });
        }

        const id = req.params.id;

        const findAdmin = await Admin.findOne({
            where: {
                id: id
            }
        });

        if (!findAdmin) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        const checkEmployee = await Employee.findOne({
            where: {
                id: findAdmin.employeeId
            }
        });

        if (checkEmployee.isAdmin !== false) {
            return res.status(409).json({
                message: `Please disable admin permission from employee ${checkEmployee.name} in order to delete his admin account`
            });
        }

        const checkAdminDepartment = await Department.findOne({
            where: {
                adminId: findAdmin.id
            }
        });

        if(checkAdminDepartment !== null){
            return res.status(409).json({
                message: `This admin is in ${checkAdminDepartment.name} department, please update this department with another admin`
            });
        }

        const deleteAdmin = await Admin.update({
            isDeleted: 1,
            status: 0
        }, { where: { id: id } });

        return res.status(200).json({
            message: "Admin deleted",
            data: deleteAdmin
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
    login,
    addAdmin,
    getAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin
}