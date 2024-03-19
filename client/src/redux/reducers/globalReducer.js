import {GLOBAL} from "../types/globalTypes";

const initialState = {
    isLoading: false,
    error: ''
}

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBAL.ISLOADING: {
            return  {
                ...state,
                isLoading: action.payload
            }
        }
        case GLOBAL.ERROR: {
            return  {
                ...state,
                error: action.payload
            }
        }
        default:
            return state
    }
}

export  default globalReducer