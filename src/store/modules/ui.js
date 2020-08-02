

const state = {
    authType: 'login',
    currentTable: 'profile'
}

const getters = {
    authType : state => state.authType,
    currentTable: state => state.currentTable
}

const actions = {}

const mutations = {
    setAuthType : (state, authType) => (state.authType = authType),
    setCurrentTable: (state, currentTable) => (state.currentTable = currentTable)
}

export default {
    state,
    getters,
    actions,
    mutations
  };