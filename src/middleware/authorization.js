import { } from 'dotenv/config'
import jwt from "jsonwebtoken"
import Admin from "../model/admin.js"
const admin_check_JWT = async (req, res, next) => {
    const header = req.headers.authorization;
    if (header) {
        const token = header.split(' ');
        const checkToken = token[1].toString()
        try {
            const decode = jwt.verify(checkToken, process.env.SECRET);
            const id = decode.id
            const admin = await Admin.findOne({ where: { id: id } })
            if (!admin) {
                return res.status(401).json({
                    message: "Not Allowed"
                })
            }
            req.userData = admin
            next()
        } catch (error) {
            return res.status(401).json({
                message: "Not Allowed"
            })
        }
    } else {
        res.status(401).json({
            message: "Not Allowed"
        })
    }
}

export default admin_check_JWT