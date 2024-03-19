import mongoose from 'mongoose'

const userModel = new mongoose.Schema({
    username: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: '',
        unique: true,
        required: true
    },
    password: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: 'https://cdn-icons-png.freepik.com/512/219/219986.png'
    },
    desc: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    }
}, {
    timeStamp: true
})

export default mongoose.model('user', userModel)