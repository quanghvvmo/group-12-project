import { } from 'dotenv/config'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Admin from "../model/admin.js";
import Employee from "../model/employee.js"

const register = async (req, res) => {
    try {
        const {
            name,
            username,
            workID,
        } = req.body;
            const password = await bcrypt.hash(req.body.password, 12);
            const check_username_existence = await Admin.findOne({ where: { username: username } });
            if (check_username_existence === null) {
                try {
                    const new_admin = await Admin.create({
                        name,
                        workID,
                        username,
                        password
                    });
                    return res.status(201).json({
                        message: "Hello new admin!"
                    })
                } catch (error) {
                    console.log(error)
                    return res.status(500).json({
                        message: "Server Error"
                    })
                }
            } else {
                res.status(400).json({
                    message: "You already have a account in this system"
                });
            }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

const login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body
        const find_admin = await Admin.findOne({ where: { username: username } });
        if (find_admin) {
            try {
                const hashed_password = find_admin.password;
                const auth = await bcrypt.compare(password, hashed_password);
                if (auth) {
                    const token = jwt.sign({
                        id: find_admin.id
                    },
                        process.env.SECRET,
                        {
                            expiresIn: '16h'
                        });
                    res.status(200).json({
                        message: `Welcome back admin ${username}`,
                        username: username,
                        token: token
                    })
                } else {
                    res.status(400).json({
                        message: "Wrong Password"
                    })
                }
            } catch (error) {
                console.log(error)
                res.status(500).json({
                    message: "Server Error"
                });
            }
        } else {
            res.status(404).json({
                message: "Wrong username"
            })
        }
    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
}

export default {
    register,
    login,
}