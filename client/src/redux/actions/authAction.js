
import {AUTH_TYPES} from "../types/authTypes";
import {GLOBAL} from "../types/globalTypes";
import {api} from '../../api/api'
import {imageUpload} from "../../utils/ImageUpload";


export const register = (userData, navigate) => async(dispatch) => {
    try {
        if (userData.password !== userData.cf_password) return

        dispatch({type: GLOBAL.ISLOADING, payload: true})

        const res = await api.post('/register', userData)
        if (!res.data) return

        dispatch({type: GLOBAL.ISLOADING, payload: false})
        navigate('/login')

    }catch (err) {
        dispatch({type: GLOBAL.ISLOADING, payload: false})
        dispatch({type: GLOBAL.ERROR, payload: err.response.data.msg})
    }
}

export const login = (userData, navigate) => async(dispatch) => {
    try {
        dispatch({type: GLOBAL.ISLOADING, payload: true})
        const res = await api.post('/login', userData)

        if(!res.data) return

        dispatch({
            type: AUTH_TYPES.AUTH, payload: {
                user: res.data.user,
                token: res.data.accessToken
            }
        })

        dispatch({type: GLOBAL.ISLOADING, payload: false})

        localStorage.setItem('token', res.data.accessToken)

        window.location.href = '/'
    }catch (err) {
        dispatch({type: GLOBAL.ISLOADING, payload: false})
        dispatch({type: GLOBAL.ERROR, payload: err.response.data.msg})
    }
}


export const getAuthUser = () => async (dispatch) => {
    const token = localStorage.getItem('token')
    if(token) {
        try{
            dispatch({type: GLOBAL.ISLOADING, payload: true})

            const res = await api.get('/api/refreshToken')

            dispatch({
                type: AUTH_TYPES.AUTH, payload: {
                    user: res.data.user,
                    token: res.data.accessToken
                }
            })

            dispatch({type: GLOBAL.ISLOADING, payload: false})

        }catch (err) {
            dispatch({type: GLOBAL.ISLOADING, payload: false})
        }
    }
}


export const logout = () => async (dispatch) => {
    try{
        const res = await api.get('/logout')
        localStorage.removeItem('token')
        window.location.href = '/login'
    }catch (err){

    }
}


export const updateUser = (data, avatar, auth) => async (dispatch) => {
    try {
        dispatch({type: GLOBAL.ISLOADING, payload: true})
        const {username,desc, website}  = data
        let media = []

        if (avatar) media = await imageUpload([avatar])

        const newData = {
            ...auth,
            username: username ? username : auth.username,
            desc: desc ? desc : auth.desc,
            website: website ? website : auth.website,
            avatar: media[0]?.url ? media[0].url : auth.avatar
        }

        console.log(newData)

        await api.patch('/updateUser', newData)

        dispatch({type: AUTH_TYPES.UPDATE_USER, payload: newData})

        dispatch({type: GLOBAL.ISLOADING, payload: false})

    }catch (err){
        dispatch({type: GLOBAL.ERROR, payload: err.response.data.msg})
        dispatch({type: GLOBAL.ISLOADING, payload: false})
    }
}