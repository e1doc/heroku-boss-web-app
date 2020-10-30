import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;

const getDefaultSoaState = () =>{
    return {
        soaList: [],
        soaFilter: 'business',
        currentSoa: {},
        currentSoaObj: {}
    }
  }

const state = getDefaultSoaState()

const getters = {
    soaList: (state) => state.soaList,
    soaFilter: (state) => state.soaFilter,
    currentSoa: (state) => state.currentSoa,
    currentSoaObj: (state) => state.currentSoaObj
}

const mutations = {
    setSoaList: (state, soaList) => (state.soaList = soaList),
    setSoaFilter: (state, soaFilter) => (state.soaFilter = soaFilter),
    setCurrentSoa: (state, currentSoa) => (state.currentSoa = currentSoa),
    setCurrentSoaObj: (state, currentSoaObj) => (state.currentSoaObj = currentSoaObj),
    resetSoaState: (state) =>
    Object.assign(state, getDefaultSoaState()),
}

const actions = {
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
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
  };
  