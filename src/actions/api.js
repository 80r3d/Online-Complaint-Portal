import axios from "axios";

const baseUrl = "https://localhost:5001/"



export default {

    fetchIssues(url = baseUrl + "api/issue") {
        return {
            fetchAll: () => axios.get(url),
            //fetchById: id => axios.get(url + id),
            // create: newRecord => axios.post(url, newRecord),
            // update: (id, updateRecord) => axios.put(url + id, updateRecord),
            // delete: id => axios.delete(url + id)
        }
    },

    createIssue(url = baseUrl + "api/issue/post"){
        return{
            create :  newRecord => axios.post(url, newRecord),
        }
    },

    searchIssueByID(url = baseUrl + "api/issue/issue_id="){
        return {
            fetchIssueById: issueId => axios.get(url,issueId),
        }
    },

    fetchIssueByDeptID(url = baseUrl+  "api/issue/department_id="){
        return {
            fetchIssueByDId: issueId => axios.get(url,issueId),
        }
    },

    updateIssueStatus(url = baseUrl + "api/issue/update"){
        return {
            updateIssueStatus: (id, updateRecord) => axios.put(url, updateRecord),
        }
    }

    // CheckLocationWithBU(url = "https://devapi.mctapps.in/Location/CheckLocationWithBU?name="){
    //     return {
    //         checkLoc: nm => axios.get(url + nm),
    //     }
    // },


    // getLocationById(url = "https://devapi.mctapps.in/Location/GetBULocationById/"){
    //     return{
    //         fetchLocById: id => axios.get(url + id)
    //     }
    // }
}