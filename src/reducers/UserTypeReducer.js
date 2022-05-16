import { ACTION_TYPES } from "../actions/buActions";
const initialState = {
    list: []
}


export const UserTypeReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_USER_TYPES:
            return {
                ...state,
                list: [...action.payload]
            }
    

        
        default:
            return state
    }
}