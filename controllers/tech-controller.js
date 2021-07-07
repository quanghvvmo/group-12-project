import Admin from '../models/admin-model.js';
import Tech from '../models/tech-model.js';
import EmployeeTech from '../models/employee-tech-model.js';
import ProjectTech from '../models/project-tech-model.js';
import db from '../config/db.js';

const createTech = async (req, res) => {
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

        const { name } = req.body;

        const createBy = findAdmin.id;

        if (!name) {
            return res.status(301).json({
                message: "Missing required information"
            });
        }

        const findTech = await Tech.findAll({
            where: {
                name: name
            }
        });

        if (findTech.length > 0 && findTech.name.toUpperCase() === name.toUpperCase()) {
            return res.status(409).json({
                message: "Already have this tech"
            });
        }

        const newTech = await Tech.create({
            name,
            createBy
        });

        return res.status(201).json({
            message: "New tech created",
            data: newTech
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getTechs = async (req, res) => {
    try {
        const size = req.query.limit;
        const page = req.query.offset;

        const limit = parseInt(size) ? +parseInt(size) : 5;
        const offset = parseInt(page) ? parseInt(page) * parseInt(size) : 0;

        const findTechs = await Tech.findAll({
            where: {
                isDeleted: 0
            },
            limit: limit,
            offset: offset
        });

        if (!findTechs) {
            return res.status(404).json({
                message: "Techs not found"
            });
        }

        return res.status(200).json({
            message: "Techs found",
            data: findTechs
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getTech = async (req, res) => {
    try {
        const id = req.params.id;

        const findTech = await Tech.findOne({
            where: {
                id: id,
                isDeleted: 1
            },
        });

        if (!findTech) {
            return res.status(404).json({
                message: "Tech not found, maybe it is deleted"
            });
        }

        return res.status(200).json({
            message: "Tech found",
            data: findTech
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const updateTech = async (req, res) => {
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

        const { name } = req.body;

        const updateBy = findAdmin.id;

        const findTech = await Tech.findOne({
            where: {
                id: id
            },
        });

        if (!findTech) {
            return res.status(404).json({
                message: "Tech not found"
            });
        }

        const updateTech = await Tech.update({
            name,
            updateBy,
            updateAt: Date.now()
        }, { where: { id: id } });

        return res.status(200).json({
            message: "Tech updated",
            data: updateTech
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const deleteTech = async (req, res) => {
    const t = await db.transaction();
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

        const findTech = await Tech.findOne({
            where: {
                id: id
            },
        });

        if (!findTech) {
            return res.status(404).json({
                message: "Tech not found"
            });
        }

        const deleteTech = await Tech.update({
            isDeleted: 1,
            status: 0
        }, { where: { id: id } }, { transaction: t});

        await EmployeeTech.destroy({
            where: {
                techId: id
            }
        }, { transaction: t});

        await ProjectTech.destroy({
            where: {
                techId: id
            }
        }, { transaction: t});

        await t.commit();

        return res.status(200).json({
            message: "Tech deleted",
            data: deleteTech
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
    createTech,
    getTechs,
    getTech,
    updateTech,
    deleteTech
}