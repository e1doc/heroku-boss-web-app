import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;

const getDefaultSoaState = () =>{
    return {
        soaList: [],
        soaFilter: 'business'
    }
  }

const state = getDefaultSoaState()

const getters = {
    soaList: (state) => state.soaList,
    soaFilter: (state) => state.soaFilter
}

const mutations = {
    setSoaList: (state, soaList) => (state.soaList = soaList),
    setSoaFilter: (state, soaFilter) => (state.soaFilter = soaFilter)
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
  