import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;
const oneDocToken = process.env.VUE_APP_ONE_DOC_TOKEN;

const getDefaultInquiryState = () => {
    return {
        inquiries: [],
        inquiry: {},
        currentInquiry: ""
    }
}
const state = getDefaultInquiryState()
const getters = {
    inquiries: (state) => state.inquiries,
    inquiry: (state) => state.inquiry,
    currentInquiry: (state) => state.currentInquiry
}
const mutations = {
    setInquiries: (state, inquiries) => (state.inquiries = inquiries),
    resetInquiryState: (state) =>
    Object.assign(state, getDefaultInquiryState()),
    setInquiry: (state, inquiry) => (state.inquiry =  inquiry),
    setCurrentInquiry: (state, currentInquiry) => (state.currentInquiry = currentInquiry)
}
const actions = {
    async getAllUserInquiries({commit, dispatch, getters}, page = 1){
        try {
            const response = await axios.get(`${baseUrl}/api/user-inquiry/?page=${page}`, { withCredentials: true })
            commit('setPageCount', response.data.total_pages)
            commit('setInquiries', response.data.results)
        } catch (err) {
            console.log(err)
        }
    },
    async getAllAdminInquiries({commit}, {page = 1, filter_by = 'all_inquiries'}){
        try {
            const response = await axios.get(`${baseUrl}/staff/threads/?page=${page}&filter_by=${filter_by}`, { withCredentials: true })
            commit('setPageCount', response.data.total_pages)
            commit('setInquiries', response.data.results)
        } catch (err) {
            console.log(err)
        }
    },
    async getInquiry({commit},id){
        try {
            const response = await axios.get(`${baseUrl}/api/inquiry/?id=${id}`, { withCredentials: true })
            console.log('Inquiry details',response.data)
            commit('setInquiry', response.data)
            commit('setCurrentInquiry',response.data.id)
        } catch (err) {
            console.log(err)
        }
    },
    async addThread({ commit }, payload){
        try {
            const response = await axios.post(`${baseUrl}/api/threads/`, payload, { withCredentials: true })
            commit('setCurrentInquiry',response.data.id)
        } catch (err) {
            console.log(err)
        }
    },
    async addMessage({ commit }, payload){
        try {
            const response = await axios.post(`${baseUrl}/api/messages/`, payload, { withCredentials: true })
        } catch (err) {
            console.log(err)
        }
    },
    async adminRespond({commit}, payload){
        try {
            const response = await axios.put(`${baseUrl}/staff/thread/`, payload, { withCredentials: true })
        } catch (err) {
            console.log(err)
        }
    },
    async resolveInquiry({commit}, payload){
        try {
            const response = await axios.put(`${baseUrl}/api/resolve-inquiry/`, payload, { withCredentials: true })
        } catch (err) {
            console.log(err)
        }
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}