import { ACTION_TYPES } from "../actions/buActions";
const initialState = {
    list: []
}


export const locReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_LOC:
            return {
                ...state,
                list: [...action.payload]
            }
        
        
        
        default:
            return state
    }
}