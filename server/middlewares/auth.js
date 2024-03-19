import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if (!token) return res.status(400).json({msg: 'Нет токена'})

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)

        if(!decoded) return res.status(400).json({msg: 'Не валидный токен'})

        const user = await User.findOne({_id: decoded.id})

        req.user = user

        next()
    }catch (err) {
        return res.status(500).json({msg: err.message})
    }
}