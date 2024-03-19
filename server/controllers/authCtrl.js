import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const register = async(req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (user) return res.status(400).json({msg: 'Пользователь с такой почтой уже есть.'})

        const newPassword = await bcrypt.hash(password, 8)
        const newUser = await User.create({...req.body, password: newPassword})

        res.status(200).json({
            user: {
                ...newUser._doc
            }
        })
    }catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
export const login = async(req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})
        if (!user) return res.status(400).json({msg: 'Нет такого пользователя'})

        const isCompare = await bcrypt.compare(password, user.password)

        if (!isCompare) return res.status(400).json({msg: 'Неверный пароль.'})

        const accessToken = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_KEY, {expiresIn: '1d'})
        const refreshToken = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN_KEY, {expiresIn: '30d'})

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: '/api/refreshToken',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        res.json({
            accessToken,
            user: {
                ...user._doc,
                password: ''
            }
        })
    }catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

export const logout = async (req, res) => {
    try{
        res.clearCookie('refreshToken', {path: '/api/refreshToken'})

        res.json({
            msg: 'Logout'
        })
    }catch (err){
        return res.status(500).json({msg: err.message})
    }
}


export const getAuthUser = async (req, res) => {
    try{
        const rf_token = req.cookies.refreshToken

        if(!rf_token) return res.status(400).json({msg: 'Пожалуйста войдите'})

        const decoded = jwt.verify(rf_token, process.env.REFRESH_TOKEN_KEY)

        const user = await User.findById(decoded.id)

        if(!user) return res.status(400).json({msg: 'Нет пользователя'})

        const accessToken = jwt.sign({id: decoded._id}, process.env.ACCESS_TOKEN_KEY, {expiresIn: '1d'})

        res.json({
            accessToken,
            user: {
                ...user._doc,
                password: ''
            }
        })
    }catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


export const updateUser = async (req, res) => {
    try {
        const newUser = await User.findOneAndUpdate({_id: req.user._id}, {...req.body})

        res.json({
            msg: 'Update User',
            user: {
                ...newUser._doc
            }
        })
    }catch (err) {
        return res.status(500).json({msg: err.message})
    }
}