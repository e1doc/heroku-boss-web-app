import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;

const getDefaultDepartmentState = () => {
    return {
        departments: []
    }
}

const state = getDefaultDepartmentState();


const getters = {
    departments: (state) => state.departments
}

const mutations = {
    setDepartments = (state, departments) => (state.departments = departments)
}

const actions = {
    async addDepartment({commit, dispatch, getters}, payload) {
        try {
            const response = await axios.post(`${baseUrl}/`)
        } catch (err) {
            console.log(err)
            if(err.response){
                console.log(err.response)
            }
        }
    }
}