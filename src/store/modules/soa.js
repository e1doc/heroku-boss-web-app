import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;
import router from "../../router/index.js";
const getDefaultSoaState = () => {
  return {
    soaList: [],
    soaFilter: "business",
    currentSoa: {},
    currentSoaObj: {},
    generatedBill: {},
    currentSelectedBill: {},
    soaSearch: "",
    currentSoaType: "",
    paymentDetails: new FormData(),
    isFileUploaded: false,
    bankTransactions: [],
    currentBankTransaction: {},
    transactionSearch: "",
    transactionPageCount: 0,
    isDelinquentPayment: false,
    soaSearch: "",
    landBankTransactions: [],
    currentLandBankTransaction: {},
  };
};

const state = getDefaultSoaState();

const getters = {
  soaList: (state) => state.soaList,
  soaFilter: (state) => state.soaFilter,
  currentSoa: (state) => state.currentSoa,
  currentSoaObj: (state) => state.currentSoaObj,
  generatedBill: (state) => state.generatedBill,
  currentSelectedBill: (state) => state.currentSelectedBill,
  soaSearch: (state) => state.soaSearch,
  currentSoaType: (state) => state.currentSoaType,
  paymentDetails: (state) => state.paymentDetails,
  isFileUploaded: (state) => state.isFileUploaded,
  bankTransactions: (state) => state.bankTransactions,
  currentBankTransaction: (state) => state.currentBankTransaction,
  transactionSearch: (state) => state.transactionSearch,
  transactionPageCount: (state) => state.transactionPageCount,
  isDelinquentPayment: (state) => state.isDelinquentPayment,
  soaSearch: (state) => state.soaSearch,
  landBankTransactions: (state) => state.landBankTransactions,
  currentLandBankTransaction: (state) => state.currentLandBankTransaction,
};

const mutations = {
  setSoaList: (state, soaList) => (state.soaList = soaList),
  setSoaFilter: (state, soaFilter) => (state.soaFilter = soaFilter),
  setCurrentSoa: (state, currentSoa) => (state.currentSoa = currentSoa),
  setCurrentSoaObj: (state, currentSoaObj) =>
    (state.currentSoaObj = currentSoaObj),
  resetSoaState: (state) => Object.assign(state, getDefaultSoaState()),
  setGeneratedBill: (state, generatedBill) =>
    (state.generatedBill = generatedBill),
  setCurrentSelectedBill: (state, currentSelectedBill) =>
    (state.currentSelectedBill = currentSelectedBill),
  setSoaSearch: (state, soaSearch) => (state.soaSearch = soaSearch),
  setCurrentSoaType: (state, currentSoaType) =>
    (state.currentSoaType = currentSoaType),
  setPaymentDetails: (state, paymentDetails) =>
    (state.paymentDetails = paymentDetails),
  setIsFileUploaded: (state, isFileUploaded) =>
    (state.isFileUploaded = isFileUploaded),
  setBankTransactions: (state, bankTransactions) =>
    (state.bankTransactions = bankTransactions),
  setCurrentBankTransaction: (state, currentBankTransaction) =>
    (state.currentBankTransaction = currentBankTransaction),
  setTransactionSearch: (state, transactionSearch) =>
    (state.transactionSearch = transactionSearch),
  setTransactionPageCount: (state, transactionPageCount) =>
    (state.transactionPageCount = transactionPageCount),
  setIsDelinquentPayment: (state, isDelinquentPayment) =>
    (state.isDelinquentPayment = isDelinquentPayment),
  setSoaSearch: (state, soaSearch) => (state.soaSearch = soaSearch),
  setLandBankTransactions: (state, landBankTransactions) =>
    (state.landBankTransactions = landBankTransactions),
  setCurrentLandBankTransaction: (state, currentLandBankTransaction) =>
    (state.currentLandBankTransaction = currentLandBankTransaction),
};

const actions = {
  async storeGeneratedBill({ commit }, payload) {
    commit("setGeneratedBill", payload);
  },
  async getSoaList({ commit, getters }, page = 1) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/soa-list/?filter=${getters.soaFilter}&page=${page}`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
        }
      );
      commit("setPageCount", response.data.total_pages);
      commit("setSoaList", response.data.results);
    } catch (error) {
      console.log(error);
    }
  },
  async createSoa({ commit, getters, dispatch }, payload) {
    try {
      commit("setLoading", true);
      const response = await axios.post(`${baseUrl}/api/user-soa/`, payload, {
        headers: { Authorization: `jwt ${getters.authToken}` },
      });
      await commit("setCurrentSoa", {
        id: response.data.data.id,
        type: response.data.data.application_type,
      });
      await commit("setCurrentSoaObj", response.data.data);
      await commit("setAppointmentAction", "add");
      await commit("setLoading", false);
      await router.push({ path: "payment" });
    } catch (err) {
      commit("setLoading", false);
      dispatch("createPrompt", {
        type: "error",
        title: "Failed",
        message: "Something went wrong!",
      });
      err.response ? console.log(err.response) : console.log(err);
    }
  },
  async getAdminSoa({ commit, getters }, page = 1) {
    try {
      const response = await axios.get(
        `${baseUrl}/staff/soa-list?page=${page}&search=${getters.soaSearch}`
      );
    } catch (err) {
      err.response ? console.log(err.response) : console.log(err);
    }
  },
  async addPaymentDetails({ commit, getters, dispatch }) {
    try {
      const response = await axios.post(
        `${baseUrl}/api/bank-transaction/`,
        getters.paymentDetails,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
        }
      );
      dispatch("createPrompt", {
        type: "success",
        title: "Success!",
        html:
          'Thank you for providing us your information. Your Payment via other Banks is now submitted and is subjected for verification. You can check the status of your submitted payment at "Payment Transaction" screen. Once validated we will send a soft copy of official receipt to your account.  <br> <br> You can contact the Treasury Department if payment has not been reflected after Five (5) working days.',
      });
      await commit("setPaymentDetails", new FormData());
      await router.push({ name: "Profile" });
    } catch (err) {
      err.response ? console.log(err.response) : console.log(err);
      dispatch("createPrompt", {
        type: "error",
        title: "Failed",
        message: "Something went wrong. Please try again later.",
      });
    }
  },
  async getAllUserBankTransactions({ commit, getters }, { page = 1 }) {
    try {
      await commit("setLoading", true);
      const response = await axios.get(
        `${baseUrl}/api/bank-transaction-list?page=${page}&type=${getters.currentType}`,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      await commit("setBankTransactions", response.data.results);
      await commit("setTransactionPageCount", response.data.total_pages);
      await commit("setLoading", false);
    } catch (err) {
      await commit("setLoading", false);
      err.response ? console.log(err.response) : console.log(err);
    }
  },
  async getAllBankTransactions(
    { commit, getters },
    { page = 1, filter = "all" }
  ) {
    try {
      await commit("setLoading", true);
      const response = await axios.get(
        `${baseUrl}/staff/bank-transaction-list?page=${page}&type=${getters.currentType}&filter=${filter}&search=${getters.transactionSearch}`,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      await commit("setBankTransactions", response.data.results);
      await commit("setTransactionPageCount", response.data.total_pages);
      await commit("setLoading", false);
    } catch (err) {
      await commit("setLoading", false);
      err.response ? console.log(err.response) : console.log(err);
    }
  },
  async verifyBankTransaction({ commit, getters, dispatch }, payload) {
    try {
      await commit("setLoading", true);
      const response = await axios.put(
        `${baseUrl}/staff/bank-transaction/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      await commit("setCurrentBankTransaction", {});
      await dispatch("getAllBankTransactions", { page: 1 });
      await commit("setLoading", false);
      dispatch("createPrompt", {
        type: "success",
        title: "Success!",
        message: "Transaction was verified successfully.",
      });
    } catch (err) {
      await commit("setLoading", false);
      dispatch("createPrompt", {
        type: "error",
        title: "Failed",
        message: "Something went wrong. Please try again later.",
      });
      err.response ? console.log(err.response) : console.log(err);
    }
  },
  async getAdminSoaList({ commit, getters }, page = 1) {
    try {
      const response = await axios.get(
        `${baseUrl}/staff/soa-list/?filter=${getters.soaFilter}&page=${page}&search=${getters.soaSearch}`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
        }
      );
      commit("setPageCount", response.data.total_pages);
      commit("setSoaList", response.data.results);
    } catch (error) {
      console.log(error);
    }
  },
  async getAllUserLandBankTransactions({ commit, getters }, { page = 1 }) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/landbank-transaction-list/?page=${page}&filter=${getters.currentType}`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
        }
      );
      await commit("setPageCount", response.data.total_pages);
      await commit("setLandBankTransactions", response.data.results);
    } catch (err) {
      err.response ? console.log(err.response) : console.log(err);
    }
  },
  async getAllLandBankTransactions({ commit, getters }, { page = 1 }) {
    try {
      const response = await axios.get(
        `${baseUrl}/staff/landbank-transaction-list/?page=${page}&filter=${getters.currentType}&search=${getters.transactionSearch}`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
        }
      );
      await commit("setPageCount", response.data.total_pages);
      await commit("setLandBankTransactions", response.data.results);
    } catch (err) {
      err.response ? console.log(err.response) : console.log(err);
    }
  },
  async verifySoa({ commit, getters, dispatch }, payload) {
    try {
      await commit("setLoading", true);
      const response = await axios.put(
        `${baseUrl}/staff/verify-soa-payment/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      let soaList = getters.soaList;
      soaList = soaList.map((item) => {
        if (item.id === payload.id) {
          item.is_verified = true;
        }
        return item;
      });
      await commit("setSoaList", soaList);
      dispatch("createPrompt", {
        type: "success",
        title: "Success!",
        message: response.data.message,
      });
      await commit("setLoading", false);
    } catch (err) {
      await commit("setLoading", false);
      dispatch("createPrompt", {
        type: "error",
        title: "Failed!",
        message: "Something went wrong. Please try again later.",
      });
      err.response ? console.log(err.response) : console.log(err);
    }
  },

  async getSoaDetails({ commit, dispatch }, payload) {
    try {
      await commit("setLoading", true);
      const response = await axios.get(
        `${baseUrl}/api/download-invoice/?id=${payload.id}`,
        {
          headers: { Authorization: `jwt ${payload.token}` },
        }
      );

      const soa = response.data;

      await commit("setCurrentSoaType", payload.type);
      await commit("setCurrentSoa", payload);
      await commit("setCurrentSoaObj", soa);
      await commit("setAppointmentAction", "add");
      if (payload.type === "business") {
        await commit("setCurrentSelectedBusiness", soa.business_application);
      } else {
        await commit("setCurrentSelectedProperty", soa.building_application);
      }
      await commit("setLoading", false);
    } catch (error) {
      await commit("setLoading", false);
      dispatch("createPrompt", {
        type: "error",
        title: "Failed!",
        message: "Something went wrong. Please try again later.",
      });
      err.response ? console.log(err.response) : console.log(err);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
