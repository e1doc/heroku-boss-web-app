import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;
const getDefaultAppointmentState =  () => {
    return {
        appointmentStatus: "pending",
        currentDate: "",
        isAppointmentSuccess: false,
        appointments: []
    }
}

const state = getDefaultAppointmentState();

const getters = {
    appointmentStatus: (state) => state.appointmentStatus,
    currentDate: (state) => state.currentDate,
    isAppointmentSuccess: (state) => state.isAppointmentSuccess,
    appointments: (state) => state.appointments
}

const mutations = {
  setAppointmentStatus: (state, appointmentStatus) => ( state.appointmentStatus = appointmentStatus ),
  setCurrentDate: (state, currentDate) => (state.currentDate = currentDate),
  setIsAppointmentSuccess: (state, isAppointmentSuccess) => (state.isAppointmentSuccess = isAppointmentSuccess),
  setAppointments: (state, appointments) => (state.appointments = appointments )
}

const actions = {
    async addAppointment({ commit, getters, dispatch }, payload){
        try {
            const response = await axios.post(`${baseUrl}/api/appointment/`, payload,{
                headers: { Authorization: `jwt ${getters.authToken}` },
            });
            commit('setIsAppointmentSuccess', true)
            await dispatch('getUserAppointments')
        } catch (err) {
            console.log(err);
            commit('setIsAppointmentSuccess', false)
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
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
  };
  