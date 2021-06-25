import {} from 'dotenv/config'
import jwt from "jsonwebtoken"

const admin_check_JWT= (req, res, next) => {
    const header = req.headers.authorization;

    if(header){
        const token = header.split(' ');
        const checkToken = token[1].toString()
        jwt.verify(checkToken,process.env.SECRET, (err) => {
            if(err){
                res.status(401).json({
                    message: "Not Allowed"
                })
            }else{
                next()
            }
        })
    }else{
        res.status(401).json({
            message: "Not Allowed"
        })
    }
}

export default admin_check_JWT