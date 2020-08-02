

const state = {
    authType: 'login',
    currentTable: 'profile',
    currentType: 'business',
    printInvoice: false
}

const getters = {
    authType : state => state.authType,
    currentTable: state => state.currentTable,
    currentType: state => state.currentType,
    printInvoice: state => state.printInvoice
}

const actions = {}

const mutations = {
    setAuthType : (state, authType) => (state.authType = authType),
    setCurrentTable: (state, currentTable) => (state.currentTable = currentTable),
    setCurrentType: (state, currentType) => (state.currentType = currentType),
    setPrintInvoice: (state, printInvoice) => (state.printInvoice = printInvoice)
}

export default {
    state,
    getters,
    actions,
    mutations
  };