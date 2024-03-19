import {Router} from 'express'
import {getAuthUser, login, logout, register, updateUser} from "../controllers/authCtrl.js";
import {auth} from "../middlewares/auth.js";
const router = Router()

router.post('/login', login)
router.post('/register', register)
router.get('/api/refreshToken', getAuthUser)
router.get('/logout', logout)
router.patch('/updateUser', auth, updateUser)
export default router