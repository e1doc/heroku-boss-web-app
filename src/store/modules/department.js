import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;

const getDefaultDepartmentState = () => {
    return {
        departments: [],
        addDepartmentSuccess: false
    }
}

const state = getDefaultDepartmentState();


const getters = {
    departments: (state) => state.departments,
    addDepartmentSuccess: (state) => state.addDepartmentSuccess
}

const mutations = {
    setDepartments : (state, departments) => (state.departments = departments),
    setAddDepartmentSuccess : (state, addDepartmentSuccess) => (state.addDepartmentSuccess = addDepartmentSuccess)
}

const actions = {
    async addDepartment({commit, dispatch, getters}, payload) {
        try {
            const response = await axios.post(`${baseUrl}/staff/viewsets/department/`,payload, {headers: {Authorization: `jwt ${getters.authToken}`} })
            commit('setAddDepartmentSuccess', true)
        } catch (err) {
            console.log(err)
            if(err.response){
                console.log(err.response)
            }
        }
    },
    async getDepartments({commit, dispatch, getters}){
        try {
            let filter = getters.currentType === 'business' ? 'business' : 'building'
            const response = await axios.get(`${baseUrl}/staff/department-list?filter=${filter}`, {headers: {Authorization: `jwt ${getters.authToken}`}})
            commit('setDepartments', response.data)
        } catch (err) {
            console.log(err)
            if(err.response){
                console.log(err.response)
            }
        }
    },
    async updateDepartments({commit, dispatch, getters}, payload){
        try {
            const response = await axios.put(`${baseUrl}/staff/viewsets/department/${payload.id}/`,payload, {headers: {Authorization: `jwt ${getters.authToken}`} })
        } catch (err) {
            console.log(err)
            if(err.response){
                console.log(err.response)
            }          
        }
    }
}


export default {
    state,
    getters,
    mutations,
    actions,
  };
  