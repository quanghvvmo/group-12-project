import Admin from '../models/admin-model.js';
import Employee from '../models/employee-model.js';
import Tech from '../models/tech-model.js';
import Project from '../models/project-model.js';
import ProjectType from '../models/project-type-model.js';
import Customer from '../models/customer-model.js';
//import ProjectEmployee from '../models/project-employee-model.js';
//import EmployeeTech from '../models/employee-tech-model.js';

const employeeReport = async (req, res) => {
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
        
        const tech = req.query.tech;
        const project = req.query.project;

        if (tech) {
            const findEmployeeByTech = await Employee.findAndCountAll({
                include: [
                    {
                        model: Tech,
                        through: { attributes: [] },
                        where: {
                            name: tech
                        }
                    }
                ]
            });

            return res.status(200).json({
                message: "Employee report",
                data: {
                    employeeTech: {
                        tech: tech,
                        report: findEmployeeByTech.count
                    },
                }
            });
        } else if (project) {
            const findEmployeeByProject = await Employee.findAndCountAll({
                include: [
                    {
                        model: Project,
                        through: { attributes: [] },
                        where: {
                            name: project
                        }
                    }
                ]
            });

            return res.status(200).json({
                message: "Employee report",
                data: {
                    employeeTech: {
                        project: project,
                        report: findEmployeeByProject.count
                    },
                }
            });
        } else {
            return res.status(404).json({
                message: "Tech or project not exist"
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const projectReport = async (req, res) => {
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

        const status = req.query.status;
        const type = req.query.type;
        const tech = req.query.tech;
        const customer = req.query.customer;
        const date = req.query.date;

        if(status) {
            const findProjectByStatus = await Project.findAndCountAll({
                where: {
                    projectStatus: status
                }
            });

            return res.status(200).json({
                message: "Project report",
                data: {
                    status: status,
                    report: findProjectByStatus.count
                }
            });
        } else if (type) {
            const findType = await ProjectType.findOne({
                where: {
                    name: type
                }
            });

            const findProjectByType = await Project.findAndCountAll({
                where: {
                    ProjectTypeId: findType.id
                }
            });

            return res.status(200).json({
                message: "Project report",
                data: {
                    projectType: type,
                    report: findProjectByType.count
                }
            });
        } else if (tech) {
            const findProjectByTech = await Project.findAndCountAll({
                include: [
                    {
                        model: Tech,
                        through: { attributes: [] },
                        where: {
                            name: tech
                        }
                    }
                ]
            });

            return res.status(200).json({
                message: "Project report",
                data: {
                    tech: tech,
                    report: findProjectByTech.count
                }
            });
        } else if (customer) {
            const  findCustomer = await Customer.findOne({
                where: {
                    id: customer
                }
            });

            const findProjectByCustomer = await Project.findAndCountAll({
                where: {
                    customerId: findCustomer.id
                }
            });

            return res.status(200).json({
                message: "Project report",
                data: {
                    customer: findCustomer.name,
                    report: findProjectByCustomer.count
                }
            });
        } else if (date) {
            const findProjectByDate = await Project.findAndCountAll({
                where: {
                    startDate: date
                }
            });

            return res.status(200).json({
                message: "Project report",
                data: {
                    date: date,
                    report: findProjectByDate.count
                }
            });
        } else {
            return res.status(404).json({
                message: "Filter info not exist"
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

export default {
    employeeReport,
    projectReport
}