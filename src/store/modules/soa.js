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
        currentSelectedBill: {}
    }
  }

const state = getDefaultSoaState()

const getters = {
    soaList: (state) => state.soaList,
    soaFilter: (state) => state.soaFilter,
    currentSoa: (state) => state.currentSoa,
    currentSoaObj: (state) => state.currentSoaObj,
    generatedBill: (state) => state.generatedBill,
    currentSelectedBill: (state) => state.currentSelectedBill
}

const mutations = {
    setSoaList: (state, soaList) => (state.soaList = soaList),
    setSoaFilter: (state, soaFilter) => (state.soaFilter = soaFilter),
    setCurrentSoa: (state, currentSoa) => (state.currentSoa = currentSoa),
    setCurrentSoaObj: (state, currentSoaObj) => (state.currentSoaObj = currentSoaObj),
    resetSoaState: (state) =>
    Object.assign(state, getDefaultSoaState()),
    setGeneratedBill: (state, generatedBill) => (state.generatedBill = generatedBill),
    setCurrentSelectedBill: (state, currentSelectedBill) => (state.currentSelectedBill = currentSelectedBill)

}

const actions = {
    async storeGeneratedBill({commit}, payload){
        commit('setGeneratedBill', payload)
    },
    async getSoaList({commit, getters}, page = 1){
        try {
            console.log(getters.soaFilter)
            const response = await axios.get(`${baseUrl}/api/soa-list/?filter=${getters.soaFilter}&page=${page}`,{
                headers: { Authorization: `jwt ${getters.authToken}` },
            });
            commit("setPageCount", response.data.total_pages);
            commit('setSoaList', response.data.results)
        } catch (error) {
            console.log(error);
        }
    },
    async createSoa({commit, getters}, payload){
        try {
            commit('setIsLoading', true)
            const response = await axios.post(`${baseUrl}/api/user-soa/`, payload, {
                headers: { Authorization: `jwt ${getters.authToken}` },
            })
            await router.push({ name: "StatementOfAccounts" });
            commit('setIsLoading', false)
        } catch (err) {
            commit('setIsLoading', false)
            dispatch("createPrompt", {
                type: "error",
                title: "Failed",
                message: "Something went wrong!",
              });
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
  