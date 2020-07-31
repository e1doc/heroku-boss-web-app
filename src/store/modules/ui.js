

const state = {
    authType: 'login'
}

const getters = {
    authType : state => state.authType
}

const actions = {}

const mutations = {
    setAuthType : (state, authType) => (state.authType = authType)
}

export default {
    state,
    getters,
    actions,
    mutations
  };