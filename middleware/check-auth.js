import jwt from 'jsonwebtoken';
import Admin from '../models/admin-model.js';
import dotenv from 'dotenv';
dotenv.config();

export default async (req, res, next) => {
    const token = req.header('token');

    if(!token) {
        return res.status(401).json({
            message: "Unauthorized - No token"
        });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        const admin = await Admin.findOne({
            where: {
                id: payload.id,
            },
        });

        if(!admin){
            return res.status(401).json({
                message: "Admin not found"
            });
        }

        req.admin = admin;
        next();
        
    } catch (error) {
        console.log(error.message)
        return res.status(403).json({
            message: "Not authorize to access this resource - You are not admin"
        });
    }
}