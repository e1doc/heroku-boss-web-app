const getDefaultUIState =  () => {
  return{
    authType: "login",
    currentTable: "profile",
    currentType: "business",
    printInvoice: false,
    paymentOption: "counter",
    isLoading: false,
    showPrompt: false,
    promptType: "",
    promptTitle: "",
    promptMessage: "",
    redirectLogin: false,
    currentApplicationStep: '1'
  };
}
const state = getDefaultUIState()
const getters = {
  authType: (state) => state.authType,
  currentTable: (state) => state.currentTable,
  currentType: (state) => state.currentType,
  printInvoice: (state) => state.printInvoice,
  paymentOption: (state) => state.paymentOption,
  isLoading: (state) => state.isLoading,
  showPrompt: (state) => state.showPrompt,
  promptType: (state) => state.promptType,
  promptTitle: (state) => state.promptTitle,
  promptMessage: (state) => state.promptMessage,
  currentApplicationStep: (state) => state.currentApplicationStep
};

const actions = {
  createPrompt({ commit }, payload) {
    commit("setPromptType", payload.type);
    commit("setPromptMessage", payload.message);
    commit("setShowPrompt", true);
    commit("setPromptTitle", payload.title);
  },
  closePrompt({ commit, getters}, payload) {
    commit("setPromptType", '');
    commit("setPromptMessage", '');
    commit("setShowPrompt", false);
    commit("setPromptTitle", '');
  },
};

const mutations = {
  setAuthType: (state, authType) => (state.authType = authType),
  setCurrentTable: (state, currentTable) => (state.currentTable = currentTable),
  setCurrentType: (state, currentType) => (state.currentType = currentType),
  setPrintInvoice: (state, printInvoice) => (state.printInvoice = printInvoice),
  setPaymentOption: (state, paymentOption) => (state.paymentOption = paymentOption),
  setLoading: (state, isLoading) => (state.isLoading = isLoading),
  setShowPrompt: (state, showPrompt) => (state.showPrompt = showPrompt),
  setPromptType: (state, promptType) => (state.promptType = promptType),
  setPromptTitle: (state, promptTitle) => (state.promptTitle = promptTitle),
  setPromptMessage: (state, promptMessage) => (state.promptMessage = promptMessage),
  setCurrentApplicationStep: (state, currentApplicationStep) => (state.currentApplicationStep = currentApplicationStep),
  resetUIState: (state) => Object.assign(state, getDefaultUIState()),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
