import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;
import router from "../../router/index.js";
const getDefaultSoaState = () =>{
    return {
        soaList: [],
        soaFilter: 'business',
        currentSoa: {},
        currentSoaObj: {},
        generatedBill: {},
        currentSelectedBill: {},
        soaSearch: "",
        currentSoaType: "",
    }
  }

const state = getDefaultSoaState()

const getters = {
    soaList: (state) => state.soaList,
    soaFilter: (state) => state.soaFilter,
    currentSoa: (state) => state.currentSoa,
    currentSoaObj: (state) => state.currentSoaObj,
    generatedBill: (state) => state.generatedBill,
    currentSelectedBill: (state) => state.currentSelectedBill,
    soaSearch: (state) => state.soaSearch,
    currentSoaType: (state) => state.currentSoaType
}

const mutations = {
    setSoaList: (state, soaList) => (state.soaList = soaList),
    setSoaFilter: (state, soaFilter) => (state.soaFilter = soaFilter),
    setCurrentSoa: (state, currentSoa) => (state.currentSoa = currentSoa),
    setCurrentSoaObj: (state, currentSoaObj) => (state.currentSoaObj = currentSoaObj),
    resetSoaState: (state) =>
    Object.assign(state, getDefaultSoaState()),
    setGeneratedBill: (state, generatedBill) => (state.generatedBill = generatedBill),
    setCurrentSelectedBill: (state, currentSelectedBill) => (state.currentSelectedBill = currentSelectedBill),
    setSoaSearch: (state, soaSearch) => (state.soaSearch = soaSearch),
    setCurrentSoaType: (state, currentSoaType) => (state.currentSoaType = currentSoaType)
}

const actions = {
    async storeGeneratedBill({commit}, payload){
        commit('setGeneratedBill', payload)
    },
    async getSoaList({commit, getters}, page = 1){
        try {
            const response = await axios.get(`${baseUrl}/api/soa-list/?filter=${getters.soaFilter}&page=${page}`,{
                headers: { Authorization: `jwt ${getters.authToken}` },
            });
            commit("setPageCount", response.data.total_pages);
            commit('setSoaList', response.data.results)
        } catch (error) {
            console.log(error);
        }
    },
    async createSoa({commit, getters, dispatch}, payload){
        try {
            commit('setLoading', true)
            const response = await axios.post(`${baseUrl}/api/user-soa/`, payload, {
                headers: { Authorization: `jwt ${getters.authToken}` },
            })
            await router.push({ name: "StatementOfAccounts" });
            await commit("setCurrentSoa", { id: response.data.data.id, type: response.data.data.application_type });
            await commit("setCurrentSoaObj", response.data.data);
            await commit("setAppointmentAction", "add");
            await commit('setLoading', false)
            await router.push({ path: "payment" });
        } catch (err) {
            commit('setLoading', false)
            dispatch("createPrompt", {
                type: "error",
                title: "Failed",
                message: "Something went wrong!",
            });
            err.response ? console.log(err.response) : console.log(err)
        }
    },
    async getAdminSoa({commit, getters}, page = 1){
        try {
            const response = await axios.get(`${baseUrl}/staff/soa-list?page=${page}&search=${getters.soaSearch}`)
        } catch (err) {
            err.response ? console.log(err.response) : console.log(err)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
  };
  