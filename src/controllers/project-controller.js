import db from '../config/db.js';
import Project from '../models/project-model.js';
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
        const currentAdmin = req.admin.id;

        if (currentAdmin === null) {
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

        const { name, description, type, status, customer, startDate, teches, employees }
            = req.body;

        const createBy = findCurrentAdmin.id;

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

        const findTeches = await Tech.findAll({
            where: {
                id: teches,
                status: 1
            }
        });

        let projectTechs = [];
        findTeches.forEach(tech => {
            projectTechs.push({
                projectId: newProject.id,
                techId: tech.id
            })
        });

        await ProjectTech.bulkCreate(projectTechs, { transaction: t });

        const findEmployees = await Employee.findAll({
            where: {
                id: employees
            }
        });

        let projectEmployees = [];
        findEmployees.forEach(employee => {
            projectEmployees.push({
                projectId: newProject.id,
                employeeId: employee.id
            })
        });

        await ProjectEmployee.bulkCreate(projectEmployees, { transaction: t });

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
        const currentAdmin = req.admin.id;

        if (currentAdmin === null) {
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
        const currentAdmin = req.admin.id;

        if (currentAdmin === null) {
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
        const currentAdmin = req.admin.id;

        if (currentAdmin === null) {
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

        const updateBy = findCurrentAdmin.id;

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

        const findTeches = await Tech.findAll({
            where: {
                id: teches,
                status: 1
            }
        });

        let projectTechs = [];
        findTeches.forEach(tech => {
            projectTechs.push({
                projectId: findProject.id,
                techId: tech.id
            })
        });

        await ProjectTech.bulkCreate(projectTechs, { transaction: t });

        const findEmployees = await Employee.findAll({
            where: {
                id: employees
            }
        });

        let projectEmployees = [];
        findEmployees.forEach(employee => {
            projectEmployees.push({
                projectId: findProject.id,
                employeeId: employee.id
            })
        });

        await ProjectEmployee.bulkCreate(projectEmployees, { transaction: t });

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
        const currentAdmin = req.admin.id;

        if (currentAdmin === null) {
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

        if (findProject.projectStatus !== 'Closed') {
            return res.status(409).json({
                message: "Project status must be set to closed first"
            });
        }

        const deleteProject = await Project.update({
            isDeleted: 1
        }, { where: { id: id } }, { transaction: t });

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