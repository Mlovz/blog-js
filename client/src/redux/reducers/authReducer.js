import {AUTH_TYPES} from "../types/authTypes";

const initialState = {
    authData: null,
    token: '',
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_TYPES.AUTH: {
            return  {
                ...state,
                authData: action.payload.user,
                token: action.payload.token
            }
        }

        case AUTH_TYPES.UPDATE_USER: {
            return  {
                ...state,
                authData: action.payload
            }
        }

        default:
            return state
    }

}

export default authReducer