import api from "./api";

export const ACTION_TYPES = {
     CREATE: 'CREATE',
    // UPDATE: 'UPDATE',
    // DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL',
    FETCH_ISSUE_BY_DEPT_ID: 'FETCH_ISSUE_BY_DEPT_ID',
    SEARCH_ISSUE_BY_ID: 'SEARCH_ISSUE_BY_ID',
    UPDATE_ISSUE_STATUS: 'UPDATE_ISSUE_STATUS',
    FETCH_LOC: 'FETCH_LOC',
    FETCH_USER_TYPE:"FETCH_USER_TYPE",
}


export const fetchAll = () => dispatch => {
    api.fetchIssues().fetchAll()
        .then(response=> {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}



export const create = (data,onSuccess,onFailure) => dispatch => {
    
    api.createIssue().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}


export const fetchIssueByDeptID = (id) => dispatch => {
    api.fetchIssueByDeptID().fetchIssueByDId(id)
        .then(response=> {
            dispatch({
                type: ACTION_TYPES.FETCH_ISSUE_BY_DEPT_ID,
                payload: response
            })
        })
        .catch(err => console.log(err))
}

export const searchIssueByID = (id) => dispatch => {
    api.searchIssueByID().fetchIssueById(id)
        .then(response=> {
            dispatch({
                type: ACTION_TYPES.SEARCH_ISSUE_BY_ID,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const updateIssueStatus = () => dispatch => {
    api.updateIssueStatus().updateIssueStatus()
        .then(response=> {
            dispatch({
                type: ACTION_TYPES.UPDATE_ISSUE_STATUS,
                payload: response
            })
        })
        .catch(err => console.log(err))
}

// export const checkLoc = (nm) => dispatch => {
//     api.CheckLocationWithBU().checkLoc(nm)
//         .then(response=> {
//             dispatch({
//                 type: ACTION_TYPES.CHECK_LOC,
//                 payload: response.data
//             })
//         })
//         .catch(err => console.log(err))
// }



export const fetchLoc = () => dispatch => {
    api.getLocationById().fetchLocById()
        .then(response=> {
            dispatch({
                type: ACTION_TYPES.FETCH_LOC,
                payload: response.data.Locations
            })
        })
        .catch(err => console.log(err))
}

export const fetchPBuLoc = () => dispatch => {
    api.getPBuLoc().fetchPBuLoc()
        .then(response=> {
            dispatch({
                type: ACTION_TYPES.FETCH_PBU_LOC,
                payload: response.data
            })
        }
        )
        .catch(err => console.log(err))
}

export const fetchUserType = () => dispatch => {
    api.getUserType().fetchUserType()
        .then(response=> {  
            dispatch({
                type: ACTION_TYPES.FETCH_USER_TYPE,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}


// export const update = (id, data, onSuccess) => dispatch => {
    
//     api.setupBU().update(id, data)
//         .then(res => {
//             dispatch({
//                 type: ACTION_TYPES.UPDATE,
//                 payload: { id, ...data }
//             })
//             onSuccess()
//         })
//         .catch(err => console.log(err))
// }

// export const Delete = (id, onSuccess) => dispatch => {
//     api.setupBU().delete(id)
//         .then(res => {
//             dispatch({
//                 type: ACTION_TYPES.DELETE,
//                 payload: id
//             })
//             onSuccess()
//         })
//         .catch(err => console.log(err))
// }