import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;
const getDefaultAppointmentState =  () => {
    return {
        appointmentStatus: "pending",
        currentDate: "",
        isAppointmentSuccess: false,
        appointments: [],
        appointmentError: "",
        appointmentLimits: []
    }
}

const state = getDefaultAppointmentState();

const getters = {
    appointmentStatus: (state) => state.appointmentStatus,
    currentDate: (state) => state.currentDate,
    isAppointmentSuccess: (state) => state.isAppointmentSuccess,
    appointments: (state) => state.appointments,
    appointmentError: (state) => state.appointmentError,
    appointmentLimits: (state) => state.appointmentLimits
}

const mutations = {
  setAppointmentStatus: (state, appointmentStatus) => ( state.appointmentStatus = appointmentStatus ),
  setCurrentDate: (state, currentDate) => (state.currentDate = currentDate),
  setIsAppointmentSuccess: (state, isAppointmentSuccess) => (state.isAppointmentSuccess = isAppointmentSuccess),
  setAppointments: (state, appointments) => (state.appointments = appointments ),
  setAppointmentError: (state, appointmentError) => (state.appointmentError = appointmentError),
  setAppointmentLimits: (state, appointmentLimits) => (state.appointmentLimits = appointmentLimits)
}

const actions = {
    async addAppointment({ commit, getters, dispatch }, payload){
        try {
            const response = await axios.post(`${baseUrl}/api/appointment/`, payload,{
                headers: { Authorization: `jwt ${getters.authToken}` },
            });
            await commit('setIsAppointmentSuccess', true)
            await dispatch('getUserAppointments')
        } catch (err) {
            console.log(err)
            commit('setIsAppointmentSuccess', false)
            commit('setAppointmentError',err.response.data)
        }
    },
    async getUserAppointments({ commit, getters  }){
        try {
            const response = await axios.get(`${baseUrl}/api/appointment/`,{
                headers: { Authorization: `jwt ${getters.authToken}` },
            });
            commit('setAppointments', response.data)
        } catch (err) {
            console.log(err);
            commit('setIsAppointmentSuccess', false)
        }
    },
    async appointmentLimits({commit, getters}, page = 1){
        try {
            const response = await axios.get(`${baseUrl}/staff/appointment-limit-list/?page=${page}`, {
                headers: { Authorization: `jwt ${getters.authToken}` },
            })
            commit("setPageCount", response.data.total_pages);
            commit('setAppointmentLimits', response.data.results)
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
  