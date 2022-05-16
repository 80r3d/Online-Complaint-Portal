import { ACTION_TYPES } from "../actions/buActions";
const initialState = {
    list: []
}


export const updateStatusReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.UPDATE_ISSUE_STATUS:
            return {
                ...state,
                list: [...action.payload]
            }
        
        
        
        default:
            return state
    }
}