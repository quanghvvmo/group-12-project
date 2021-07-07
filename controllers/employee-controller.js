import dotenv from 'dotenv';
dotenv.config();
import db from '../config/db.js';
import sequelize from 'sequelize';
const { Op } = sequelize;
import Admin from '../models/admin-model.js';
import Employee from '../models/employee-model.js';
import Tech from '../models/tech-model.js';
import EmployeeTech from '../models/employee-tech-model.js';
import DepartmentEmployee from '../models/department-employee-model.js';
import ProjectEmployee from '../models/project-employee-model.js';
import moment from 'moment';

const createEmployee = async (req, res) => {
    const t = await db.transaction();
    try {
        const adminId = req.admin.id;

        const findAdmin = await Admin.findOne({
            where: {
                id: adminId
            }
        });

        if(!findAdmin) {
            return res.status(403).json({
                message: "You are not admin"
            });
        }

        const { name, dob, address, idNumber, phone, experienceYear,
            foreignLanguage, certificate, teches } = req.body;

        const createBy = findAdmin.id;

        const findEmployee = await Employee.findOne({
            where: {
                idNumber: idNumber
            }
        });

        if (findEmployee) {
            return res.status(409).json({
                message: "Id number already existed, must be unique"
            });
        }

        if (!name || !dob || !address || !idNumber || !phone) {
            return res.status(301).json({
                message: "Missing required information"
            });
        }

        if (!moment(dob).isValid()) {
            return res.status(301).json({
                message: "Date of birth is invalid format"
            });
        }

        if (phone.length < 10) {
            return res.status(301).json({
                message: "Phone number is invalid format"
            });
        }

        const newEmployee = await Employee.create({
            name,
            dob,
            address,
            idNumber,
            phone,
            experienceYear,
            foreignLanguage,
            certificate,
            createBy
        }, { transaction: t });

        for (let i = 0; i < teches.length; i++) {
            const id = teches[i];

            const findTech = await Tech.findOne({
                where: {
                    id: id,
                    status: 1
                }
            });

            if (findTech) {
                await EmployeeTech.create({
                    employeeId: newEmployee.id,
                    techId: findTech.id
                }, { transaction: t });
            }
        }

        await t.commit();

        return res.status(201).json({
            message: "Employee created",
            data: newEmployee
        });

    } catch (error) {
        console.error(error.message);
        await t.rollback();
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getEmployees = async (req, res) => {
    try {
        const size = req.query.limit;
        const page = req.query.offset;

        const limit = parseInt(size) ? +parseInt(size) : 5;
        const offset = parseInt(page) ? parseInt(page) * parseInt(size) : 0;

        const findEmployees = await Employee.findAndCountAll({
            include: [
                {
                    model: Tech,
                    through: { attributes: [] },
                }
            ],
            limit: limit,
            offset: offset
        });

        if (!findEmployees) {
            return res.status(404).json({
                message: "Employees not found"
            });
        }

        return res.status(200).json({
            message: "Employees found",
            data: findEmployees
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getEmployee = async (req, res) => {
    try {
        const id = req.params.id;

        const findEmployee = await Employee.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: Tech,
                    through: { attributes: [] },
                }
            ]
        });

        if (!findEmployee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        return res.status(200).json({
            message: "Employee found",
            data: findEmployee
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const updateEmployee = async (req, res) => {
    const t = await db.transaction();
    try {
        const adminId = req.admin.id;

        const findAdmin = await Admin.findOne({
            where: {
                id: adminId
            }
        });

        if(!findAdmin) {
            return res.status(403).json({
                message: "You are not admin"
            });
        }

        const id = req.params.id;

        const findEmployee = await Employee.findOne({
            where: {
                id: id
            }
        });

        if (!findEmployee || !id) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        const { name, dob, address, idNumber, phone, experienceYear,
            foreignLanguage, certificate, teches } = req.body;

        const updateBy = findAdmin.id;

        if (!moment(dob).isValid()) {
            return res.status(301).json({
                message: "Date of birth is invalid format"
            });
        }

        if (phone.length < 10) {
            return res.status(301).json({
                message: "Phone number is invalid format"
            });
        }

        const updateEmployee = await Employee.update({
            name,
            dob,
            address,
            idNumber,
            phone,
            experienceYear,
            foreignLanguage,
            certificate,
            updateBy,
            updateAt: Date.now()
        }, {
            where: {
                id: id
            }
        }, { transaction: t });

        const updateAdmin = await Admin.update({
            name: name
        }, {
            where: {
                employeeId: id
            }
        }, { transaction: t });

        await EmployeeTech.destroy({
            where: {
                employeeId: findEmployee.id
            }
        });

        for (let i = 0; i < teches.length; i++) {
            const id = teches[i];

            const findTech = await Tech.findOne({
                where: {
                    id: id,
                    status: 1
                }
            });

            if (findTech) {
                await EmployeeTech.create({
                    employeeId: findEmployee.id,
                    techId: findTech.id
                }, { transaction: t });
            }
        }

        await t.commit();

        return res.status(200).json({
            message: "Employee updated",
            data: {
                employee: updateEmployee,
                admin: updateAdmin
            }
        });

    } catch (error) {
        console.error(error.message);
        await t.rollback();
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const setAdmin = async (req, res) => {
    try {
        const id = req.params.id;

        const findEmployee = await Employee.findOne({
            where: {
                id: id
            }
        });

        if (!findEmployee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        const { isAdmin } = req.body;

        const employeeAdmin = await Employee.update({
            isAdmin
        }, { where: { id: id } });

        return res.status(200).json({
            message: "Employee set admin",
            data: employeeAdmin
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const deleteEmployee = async (req, res) => {
    const t = await db.transaction();
    try {
        const adminId = req.admin.id;

        const findAdmin = await Admin.findOne({
            where: {
                id: adminId
            }
        });

        if(!findAdmin) {
            return res.status(403).json({
                message: "You are not admin"
            });
        }
        
        const id = req.params.id;

        const findEmployee = await Employee.findOne({
            where: {
                id: id
            }
        });

        if (!findEmployee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        const checkAdmin = await Admin.findOne({
            where: {
                employeeId: id
            }
        });

        if (findEmployee.isAdmin === 1 || checkAdmin !== null) {
            return res.status(409).json({
                message: "Please disable this employee admin permission and delete his account first"
            })
        }

        const deleteEmployee = await Employee.update({
            isDeleted: 1,
        }, { where: {id: id}}, { transaction: t });

        await EmployeeTech.destroy({
            where: {
                employeeId: id
            }
        }, { transaction: t });

        await DepartmentEmployee.destroy({
            where: {
                employeeId: id
            }
        }, { transaction: t });

        await ProjectEmployee.destroy({
            where: {
                employeeId: id
            }
        }, { transaction: t });

        await t.commit();

        return res.status(200).json({
            message: "Employee deleted",
            data: deleteEmployee
        });

    } catch (error) {
        console.error(error.message);
        await t.rollback();
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

export default {
    createEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    setAdmin,
    deleteEmployee,
}