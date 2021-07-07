import db from '../config/db.js';
import Project from '../models/project-model.js';
import Department from '../models/department-model.js';
import Admin from '../models/admin-model.js';
import Tech from '../models/tech-model.js';
import Customer from '../models/customer-model.js';
import ProjectType from '../models/project-type-model.js';
import Employee from '../models/employee-model.js';
import ProjectTech from '../models/project-tech-model.js';
import ProjectEmployee from '../models/project-employee-model.js';
import moment from 'moment';

const addProject = async (req, res) => {
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

        const { name, description, type, status, customer, startDate, teches, employees }
            = req.body;

        const createBy = findAdmin.id;

        const findProjectType = await ProjectType.findOne({
            where: {
                id: type
            }
        });

        if (!findProjectType) {
            return res.status(404).json({
                message: "Project type not exist"
            });
        }

        const findCustomer = await Customer.findOne({
            where: {
                id: customer
            }
        });

        if (!findCustomer) {
            return res.status(404).json({
                message: "Customer not exist"
            });
        }

        if (!moment(startDate).isValid()) {
            return res.status(301).json({
                message: "Start date is in invalid format"
            });
        }

        const newProject = await Project.create({
            name,
            description,
            projectTypeId: type,
            projectStatus: status,
            customerId: customer,
            startDate,
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
                await ProjectTech.create({
                    projectId: newProject.id,
                    techId: findTech.id
                }, { transaction: t });
            }
        }

        for (let i = 0; i < employees.length; i++) {
            const id = employees[i];

            const findEmployee = await Employee.findOne({
                where: {
                    id: id,
                }
            });

            if (findEmployee) {
                await ProjectEmployee.create({
                    projectId: newProject.id,
                    employeeId: findEmployee.id
                }, { transaction: t });
            }
        }

        await t.commit();

        return res.status(201).json({
            message: "Project created",
            data: newProject
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

const getProjects = async (req, res) => {
    try {
        const size = req.query.limit;
        const page = req.query.offset;

        const limit = parseInt(size) ? +parseInt(size) : 5;
        const offset = parseInt(page) ? parseInt(page) * parseInt(size) : 0;

        const findProjects = await Project.findAll({
            include: [
                {
                    model: Tech,
                    through: { attributes: [] }
                },
                {
                    model: Employee,
                    through: { attributes: [] }
                },
                {
                    model: ProjectType
                },
                {
                    model: Customer
                }
            ],
            limit: limit,
            offset: offset
        });

        if (!findProjects) {
            return res.status(404).json({
                message: "Projects not found"
            });
        }

        return res.status(200).json({
            message: "Projects found",
            data: findProjects
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getProject = async (req, res) => {
    try {
        const id = req.params.id;

        const findProject = await Project.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: Tech,
                    through: { attributes: [] }
                },
                {
                    model: Employee,
                    through: { attributes: [] }
                },
                {
                    model: ProjectType
                },
                {
                    model: Customer
                }
            ],
        });

        if (!findProject) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        return res.status(200).json({
            message: "Project found",
            data: findProject
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const updateProject = async (req, res) => {
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

        const findProject = await Project.findOne({
            where: {
                id: id
            }
        });

        if (!findProject) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const { name, description, type, status, teches, employees, customer, startDate }
            = req.body;

        const updateBy = findAdmin.id;

        const findProjectType = await ProjectType.findOne({
            where: {
                id: type
            }
        });

        if (!findProjectType) {
            return res.status(404).json({
                message: "Project type not exist"
            });
        }

        const findCustomer = await Customer.findOne({
            where: {
                id: customer
            }
        });

        if (!findCustomer) {
            return res.status(404).json({
                message: "Customer not exist"
            });
        }

        if (!moment(startDate).isValid()) {
            return res.status(301).json({
                message: "Start date is in invalid format"
            });
        }

        const updateProject = await Project.update({
            name,
            description,
            projectTypeId: type,
            projectStatus: status,
            customerId: customer,
            startDate,
            updateBy,
            updateAt: Date.now()
        }, { where: { id: id } }, { transaction: t });

        await ProjectTech.destroy({
            where: {
                projectId: findProject.id
            }
        }, { transaction: t });

        await ProjectEmployee.destroy({
            where: {
                projectId: findProject.id
            }
        }, { transaction: t });

        for (let i = 0; i < teches.length; i++) {
            const id = teches[i];

            const findTech = await Tech.findOne({
                where: {
                    id: id,
                    status: 1
                }
            });

            if (!findTech) {
                return res.status(404).json({
                    message: "Tech not exist"
                });
            }

            await ProjectTech.create({
                projectId: findProject.id,
                techId: findTech.id
            }, { transaction: t });
        }

        for (let i = 0; i < employees.length; i++) {
            const id = employees[i];

            const findEmployee = await Employee.findOne({
                where: {
                    id: id,
                }
            });

            if (!findEmployee) {
                return res.status(404).json({
                    message: "Employee not exist"
                });
            }

            await ProjectEmployee.create({
                projectId: findProject.id,
                employeeId: findEmployee.id
            });
        }

        await t.commit();

        return res.status(200).json({
            message: "Project updated",
            data: updateProject
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

const deleteProject = async (req, res) => {
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

        const findProject = await Project.findOne({
            where: {
                id: id
            }
        });

        if (!findProject) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if(findProject.projectStatus !== 'Closed') {
            return res.status(409).json({
                message: "Project status must be set to closed first"
            });
        }

        const deleteProject = await Project.update({
            isDeleted: 1
        }, { where: { id: id}}, { transaction: t });

        await ProjectEmployee.destroy({
            where: {
                projectId: id
            }
        }, { transaction: t });

        await ProjectTech.destroy({
            where: {
                projectId: id
            }
        }, { transaction: t });

        await t.commit();

        return res.status(200).json({
            message: "Project deleted",
            data: deleteProject
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
    addProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
}