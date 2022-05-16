import { combineReducers } from "redux";
import { issueListReducer } from "./issueListReducer";
import {locReducer} from    "./locReducer";
import {PBuLocReducer} from "./PBuLocReducer";
import {createIssueReducer} from "./createIssueReducer";
import { UserTypeReducer } from "./UserTypeReducer";
export const reducers = combineReducers({
    issueListReducer,
    locReducer,
    PBuLocReducer,
    createIssueReducer,
    UserTypeReducer,
  

})