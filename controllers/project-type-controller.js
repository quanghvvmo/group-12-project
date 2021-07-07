import Project from '../models/project-model.js';
import ProjectType from '../models/project-type-model.js';
import Admin from '../models/admin-model.js';

const createProjectType = async (req, res) => {
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

        const { name } = req.body;

        const createBy = findAdmin.id;

        if(!name) {
            return res.status(301).json({
                message: "Missing required information"
            });
        }

        const findType = await ProjectType.findAll({
            where: {
                name: name
            }
        });

        if (findType.length > 0) {
            return res.status(409).json({
                message: "Already have this project type"
            });
        }

        const newType = await ProjectType.create({
            name,
            createBy
        });

        return res.status(201).json({
            message: "New project type created",
            data: newType
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getTypes = async (req, res) => {
    try {
        const size = req.query.limit;
        const page = req.query.offset;

        const limit = parseInt(size) ? +parseInt(size) : 2;
        const offset = parseInt(page) ? parseInt(page) * parseInt(size) : 0;

        const findTypes = await ProjectType.findAll({
            where: {
                isDeleted: 0
            },
            limit: limit,
            offset: offset
        });

        if (!findTypes) {
            return res.status(404).json({
                message: "Types not found"
            });
        }

        return res.status(200).json({
            message: "Types found",
            data: findTypes
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getType = async (req, res) => {
    try {
        const id = req.params.id;

        const findType = await ProjectType.findOne({
            where: {
                id: id
            },
        });

        if (!findType) {
            return res.status(404).json({
                message: "Tech not found"
            });
        }

        return res.status(200).json({
            message: "Tech found",
            data: findType
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const updateType = async (req, res) => {
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

        const { name } = req.body;

        const updateBy = findAdmin.id;

        const findType = await ProjectType.findOne({
            where: {
                id: id
            },
        });

        if (!findType) {
            return res.status(404).json({
                message: "Tech not found"
            });
        }

        const updateType = await ProjectType.update({
            name,
            updateBy,
            updateAt: Date.now()
        }, { where: { id: id } });

        return res.status(200).json({
            message: "Project type updated",
            data: updateType
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const deleteType = async (req, res) => {
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

        const findType = await ProjectType.findOne({
            where: {
                id: id
            },
        });

        if (!findType) {
            return res.status(404).json({
                message: "Project type not found"
            });
        }

        const checkProject = await Project.findAll({
            where: {
                projectTypeId: findType.id
            }
        });
        
        if(checkProject.length > 0) {
            return res.status(409).json({
                message: "Project type still belong to these projects, they must be closed or deleted",
                data: checkProject
            })
        }

        const deleteType = await ProjectType.update({
            isDeleted: 1,
            status: 0
        }, { where: { id: id }});

        return res.status(200).json({
            message: "Project type deleted",
            data: deleteType
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
    createProjectType,
    getTypes,
    getType,
    updateType,
    deleteType
}