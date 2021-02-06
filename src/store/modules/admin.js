import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;
const getDefaultAdminState = () => {
  return {
    dashboard: {},
    groups: [],
    userDepartment: "",
  };
};

const state = getDefaultAdminState();

const getters = {
  dashboard: (state) => state.dashboard,
  groups: (state) => state.groups,
  userDepartment: (state) => state.userDepartment,
};

const mutations = {
  setDashboard: (state, dashboard) => (state.dashboard = dashboard),
  setGroups: (state, groups) => (state.groups = groups),
  setUserDepartment: (state, userDepartment) =>
    (state.userDepartment = userDepartment),
};

const actions = {
  async getDashboardData({ commit, getters }) {
    try {
      const response = await axios.get(`${baseUrl}/staff/dashboard/`, {
        headers: { Authorization: `jwt ${getters.authToken}` },
      });
      commit("setDashboard", response.data);
    } catch (err) {
      console.log(err);
    }
  },
  async checkGroups({ commit, getters }) {
    try {
      const response = await axios.get(`${baseUrl}/staff/group/`, {
        headers: { Authorization: `jwt ${getters.authToken}` },
      });
      commit("setGroups", response.data);
    } catch (err) {
      err.response ? console.log(err.response) : console.log(err);
    }
  },
  async getUserDepartment({ commit, getters }) {
    try {
      const response = await axios.get(`${baseUrl}/staff/user-department`, {
        headers: { Authorization: `jwt ${getters.authToken}` },
      });
      commit("setUserDepartment", response.data.name);
    } catch (err) {
      err.response ? console.log(err.response) : console.log(err);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
