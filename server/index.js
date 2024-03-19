import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import dotenv from 'dotenv'
import authRoute from "./routes/authRoute.js";

dotenv.config({})

const app = express()

// app.use(async (req, res, next) => {
//     await new Promise((res) => {
//         setTimeout(res, 2000)
//         next()
//     })
// })


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

// Routes
app.use(authRoute)


// MongoDB
const URL = process.env.DB_URL
mongoose.connect(URL, {}, (err) => {
    if(err) throw err
    console.log('Успешное подключение к базе данных. ')
})


// Listen
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Сервер запущен на порте', PORT)
})
