

const state = {
    authType: 'login',
    currentTable: 'profile',
    currentType: 'business',
}

const getters = {
    authType : state => state.authType,
    currentTable: state => state.currentTable,
    currentType: state => state.currentType
}

const actions = {}

const mutations = {
    setAuthType : (state, authType) => (state.authType = authType),
    setCurrentTable: (state, currentTable) => (state.currentTable = currentTable),
    setCurrentType: (state, currentType) => (state.currentType = currentType)
}

export default {
    state,
    getters,
    actions,
    mutations
  };