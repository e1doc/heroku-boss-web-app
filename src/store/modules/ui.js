

const state = {
    authType: 'login',
    currentTable: 'profile',
    currentType: 'business',
    printInvoice: false,
    paymentOption: 'counter'
}

const getters = {
    authType : state => state.authType,
    currentTable: state => state.currentTable,
    currentType: state => state.currentType,
    printInvoice: state => state.printInvoice,
    paymentOption: state => state.paymentOption
}

const actions = {}

const mutations = {
    setAuthType : (state, authType) => (state.authType = authType),
    setCurrentTable: (state, currentTable) => (state.currentTable = currentTable),
    setCurrentType: (state, currentType) => (state.currentType = currentType),
    setPrintInvoice: (state, printInvoice) => (state.printInvoice = printInvoice),
    setPaymentOption: (state, paymentOption) => (state.paymentOption = paymentOption)
}

export default {
    state,
    getters,
    actions,
    mutations
  };