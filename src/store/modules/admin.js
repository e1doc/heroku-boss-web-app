import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;
const getDefaultAdminState = () => {
    return {
        dashboard: {}
    }
}

const state = getDefaultAdminState();

const getters = {
    dashboard: (state) => state.dashboard
}

const mutations = {
    setDashboard: (state, dashboard) => (state.dashboard = dashboard)
}

const actions = {
    async getDashboardData({ commit }){
        try {
            const response = await axios.get(`${baseUrl}/staff/dashboard/`, { withCredentials: true })
            commit('setDashboard', response.data)   
        } catch (err) {
            console.log(err)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
  };