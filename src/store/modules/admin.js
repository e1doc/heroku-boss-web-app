import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;
const getDefaultAdminState = () => {
  return {
    dashboard: {},
    groups: []
  };
};

const state = getDefaultAdminState();

const getters = {
  dashboard: (state) => state.dashboard,
  groups: (state) => state.groups
};

const mutations = {
  setDashboard: (state, dashboard) => (state.dashboard = dashboard),
  setGroups: (state, groups) => ( state.groups = groups)
};

const actions = {
  async getDashboardData({ commit, getters  }) {
    try {
      const response = await axios.get(`${baseUrl}/staff/dashboard/`, {
        headers: { Authorization: `jwt ${getters.authToken}` },
      });
      commit("setDashboard", response.data);
    } catch (err) {
      console.log(err);
    }
  },
  async checkGroups({ commit, getters }){
    try {
      const response = await axios.get(`${baseUrl}/staff/group/`,{headers: {Authorization: `jwt ${getters.authToken}`} })
      commit('setGroups', response.data)     
    } catch (err) {
      err.response ? console.log(err.response) : console.log(err)
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
