import axios from "axios";
import moment from "moment-timezone";
const baseUrl = process.env.VUE_APP_API_URL;

const getDefaultAppointmentState = () => {
  return {
    appointmentStatus: "slot",
    currentDate: "",
    isAppointmentSuccess: false,
    appointments: [],
    appointmentError: "",
    appointmentLimits: [],
    adminAppointments: [],
    appointmentCount: 0,
    appointmentSearch: "",
    batchTab: "batch_1",
    currentDate: moment().format(),
    appointmentAction: "add",
    currentAppointment: {},
  };
};

const state = getDefaultAppointmentState();

const getters = {
  appointmentStatus: (state) => state.appointmentStatus,
  currentDate: (state) => state.currentDate,
  isAppointmentSuccess: (state) => state.isAppointmentSuccess,
  appointments: (state) => state.appointments,
  appointmentError: (state) => state.appointmentError,
  appointmentLimits: (state) => state.appointmentLimits,
  adminAppointments: (state) => state.adminAppointments,
  appointmentCount: (state) => state.appointmentCount,
  appointmentSearch: (state) => state.appointmentSearch,
  batchTab: (state) => state.batchTab,
  currentDate: (state) => state.currentDate,
  appointmentAction: (state) => state.appointmentAction,
  currentAppointment: (state) => state.currentAppointment,
};

const mutations = {
  setAppointmentStatus: (state, appointmentStatus) =>
    (state.appointmentStatus = appointmentStatus),
  setCurrentDate: (state, currentDate) => (state.currentDate = currentDate),
  setIsAppointmentSuccess: (state, isAppointmentSuccess) =>
    (state.isAppointmentSuccess = isAppointmentSuccess),
  setAppointments: (state, appointments) => (state.appointments = appointments),
  setAppointmentError: (state, appointmentError) =>
    (state.appointmentError = appointmentError),
  setAppointmentLimits: (state, appointmentLimits) =>
    (state.appointmentLimits = appointmentLimits),
  setAdminAppointments: (state, adminAppointments) =>
    (state.adminAppointments = adminAppointments),
  setAppointmentCount: (state, appointmentCount) =>
    (state.appointmentCount = appointmentCount),
  setAppointmentSearch: (state, appointmentSearch) =>
    (state.appointmentSearch = appointmentSearch),
  setBatchTab: (state, batchTab) => (state.batchTab = batchTab),
  setCurrentDate: (state, currentDate) => (state.currentDate = currentDate),
  resetAppointmentState: (state) =>
    Object.assign(state, getDefaultAppointmentState()),
  setAppointmentAction: (state, appointmentAction) =>
    (state.appointmentAction = appointmentAction),
  setCurrentAppointment: (state, currentAppointment) =>
    (state.currentAppointment = currentAppointment),
};

const actions = {
  async addAppointment({ commit, getters, dispatch }, payload) {
    try {
      const response = await axios.post(
        `${baseUrl}/api/appointment/`,
        payload,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
        }
      );
      await commit("setCurrentAppointment", response.data);
      await commit("setIsAppointmentSuccess", true);
      await dispatch("getUserAppointments");
    } catch (err) {
      console.log(err);
      commit("setIsAppointmentSuccess", false);
      commit("setAppointmentError", err.response.data);
    }
  },
  async updateAppointment({ commit, getters, dispatch }, payload) {
    try {
      const response = await axios.put(`${baseUrl}/api/appointment/`, payload, {
        headers: { Authorization: `jwt ${getters.authToken}` },
      });
      await commit("setIsAppointmentSuccess", true);
      await dispatch("getUserAppointments");
    } catch (err) {
      console.log(err);
      commit("setIsAppointmentSuccess", false);
      commit("setAppointmentError", err.response.data);
    }
  },
  async addAppointmentLimit({ commit, getters, dispatch }, payload) {
    try {
      const response = await axios.post(
        `${baseUrl}/staff/appointment-limit/`,
        payload,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
        }
      );
      await commit("setIsAppointmentSuccess", true);
    } catch (err) {
      console.log(err);
      commit("setIsAppointmentSuccess", false);
      commit("setAppointmentError", err.response.data.detail);
    }
  },
  async getUserAppointments({ commit, getters }, page = 1) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/user-appointment-list/?page=${page}`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
        }
      );
      console.log(response.data);
      commit("setAppointments", response.data.results);
      commit("setPageCount", response.data.total_pages);
    } catch (err) {
      console.log(err);
      commit("setIsAppointmentSuccess", false);
    }
  },
  async appointmentLimits({ commit, getters }, page = 1) {
    try {
      const response = await axios.get(
        `${baseUrl}/staff/appointment-limit-list/?page=${page}`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
        }
      );
      commit("setPageCount", response.data.total_pages);
      commit("setAppointmentLimits", response.data.results);
    } catch (err) {
      console.log(err);
    }
  },
  async getAppointmentLimits({ commit, getters }, payload) {
    try {
      commit("setAppointmentLimits", []);
      const response = await axios.get(
        `${baseUrl}/staff/appointment-limit/?month=${payload}`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
        }
      );
      commit("setAppointmentLimits", response.data);
    } catch (err) {
      console.log(err);
    }
  },
  async getUserAppointmentLimits({ commit, getters }, payload) {
    try {
      commit("setAppointmentLimits", []);
      const response = await axios.get(
        `${baseUrl}/api/appointment-limit/?month=${payload}`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
        }
      );
      commit("setAppointmentLimits", response.data);
    } catch (err) {
      console.log(err);
    }
  },
  async getAdminAppointments({ commit, dispatch, getters }, page = 1) {
    try {
      const response = await axios.get(
        `${baseUrl}/staff/appointment-list/?search=${getters.appointmentSearch}&batch=${getters.batchTab}&page=${page}`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
          params: { date: getters.currentDate },
        }
      );
      commit("setAppointmentCount", response.data.count);
      commit("setAdminAppointments", response.data.results);
      commit("setPageCount", response.data.total_pages);
    } catch (err) {
      console.log(err);
    }
  },
  async printAppointment({ commit, dispatch, getters }, { appointment, soa }) {
    try {
      await commit("setCurrentSoaType", soa.application_type);
      await commit("setCurrentSoaObj", soa);
      await commit("setCurrentSelectedBusiness", soa.business_application);
      await commit("setCurrentAppointment", appointment);
      await commit("setPrintInvoice", true);
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
