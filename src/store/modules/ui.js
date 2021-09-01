const getDefaultUIState = () => {
  return {
    authType: "login",
    currentTable: "profile",
    currentType: "business",
    printInvoice: false,
    printBusiness: false,
    printProperty: false,
    paymentOption: "online",
    isLoading: false,
    showPrompt: false,
    promptType: "",
    promptTitle: "",
    promptMessage: "",
    redirectLogin: false,
    currentApplicationStep: "1",
    applicationType: "",
    currentAdminTab: "dashboard",
    currentPaymentType: "landbank",
    isAssessmentActive: false,
    isPrivacyAgree: false,
    isMaintenanceMode: false,
    promptHtml: "",
    currentPageNum: 1,
    showPrivacyDialog: true,
  };
};
const state = getDefaultUIState();
const getters = {
  authType: (state) => state.authType,
  currentTable: (state) => state.currentTable,
  currentType: (state) => state.currentType,
  printInvoice: (state) => state.printInvoice,
  printBusiness: (state) => state.printBusiness,
  printProperty: (state) => state.printProperty,
  paymentOption: (state) => state.paymentOption,
  isLoading: (state) => state.isLoading,
  showPrompt: (state) => state.showPrompt,
  promptType: (state) => state.promptType,
  promptTitle: (state) => state.promptTitle,
  promptMessage: (state) => state.promptMessage,
  currentApplicationStep: (state) => state.currentApplicationStep,
  applicationType: (state) => state.applicationType,
  currentAdminTab: (state) => state.currentAdminTab,
  currentPaymentType: (state) => state.currentPaymentType,
  isAssessmentActive: (state) => state.isAssessmentActive,
  isPrivacyAgree: (state) => state.isPrivacyAgree,
  isMaintenanceMode: (state) => state.isMaintenanceMode,
  promptHtml: (state) => state.promptHtml,
  currentPageNum: (state) => state.currentPageNum,
  showPrivacyDialog: (state) => state.showPrivacyDialog,
};

const actions = {
  createPrompt({ commit }, payload) {
    commit("setPromptType", payload.type);
    commit("setPromptMessage", payload.message);
    commit("setShowPrompt", true);
    commit("setPromptTitle", payload.title);
    commit("setPromptHtml", payload.html);
  },
  closePrompt({ commit, getters }, payload) {
    commit("setPromptType", "");
    commit("setPromptMessage", "");
    commit("setShowPrompt", false);
    commit("setPromptTitle", "");
    commit("setPromptHtml", "");
  },
};

const mutations = {
  setAuthType: (state, authType) => (state.authType = authType),
  setCurrentTable: (state, currentTable) => (state.currentTable = currentTable),
  setCurrentType: (state, currentType) => (state.currentType = currentType),
  setPrintInvoice: (state, printInvoice) => (state.printInvoice = printInvoice),
  setPrintBusiness: (state, printBusiness) =>
    (state.printBusiness = printBusiness),
  setPrintProperty: (state, printProperty) =>
    (state.printProperty = printProperty),
  setPaymentOption: (state, paymentOption) =>
    (state.paymentOption = paymentOption),
  setLoading: (state, isLoading) => (state.isLoading = isLoading),
  setShowPrompt: (state, showPrompt) => (state.showPrompt = showPrompt),
  setPromptType: (state, promptType) => (state.promptType = promptType),
  setPromptTitle: (state, promptTitle) => (state.promptTitle = promptTitle),
  setPromptMessage: (state, promptMessage) =>
    (state.promptMessage = promptMessage),
  setCurrentApplicationStep: (state, currentApplicationStep) =>
    (state.currentApplicationStep = currentApplicationStep),
  resetUIState: (state) => Object.assign(state, getDefaultUIState()),
  setApplicationType: (state, applicationType) =>
    (state.applicationType = applicationType),
  setAdminCurrentTab: (state, currentAdminTab) =>
    (state.currentAdminTab = currentAdminTab),
  setCurrentPaymentType: (state, currentPaymentType) =>
    (state.currentPaymentType = currentPaymentType),
  setIsAssessmentActive: (state, isAssessmentActive) =>
    (state.isAssessmentActive = isAssessmentActive),
  setIsPrivacyAgree: (state, isPrivacyAgree) =>
    (state.isPrivacyAgree = isPrivacyAgree),
  setPromptHtml: (state, promptHtml) => (state.promptHtml = promptHtml),
  setCurrentPageNum: (state, currentPageNum) =>
    (state.currentPageNum = currentPageNum),
  setShowPrivacyDialog: (state, showPrivacyDialog) =>
    (state.showPrivacyDialog = showPrivacyDialog),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
