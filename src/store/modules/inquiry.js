import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;
const oneDocToken = process.env.VUE_APP_ONE_DOC_TOKEN;

const getDefaultInquiryState = () => {
  return {
    inquiries: [],
    remarks: [],
    inquiry: {},
    currentInquiry: "",
    continueBuildingThread: false,
    continueBusinessThread: false,
    currentEvaluationFile: new FormData(),
    inquirySearch: "",
    departmentFilter: "",
    delinquentPayments: [],
    inquiryPageNum: 1,
    remarksPageNum: 1,
    delinquentPageNum: 1,
    isRemarks: false,
    clearFileInput: false,
    isFileReady: false,
  };
};
const state = getDefaultInquiryState();
const getters = {
  inquiries: (state) => state.inquiries,
  remarks: (state) => state.remarks,
  inquiry: (state) => state.inquiry,
  currentInquiry: (state) => state.currentInquiry,
  continueBuildingThread: (state) => state.continueBuildingThread,
  continueBusinessThread: (state) => state.continueBusinessThread,
  currentEvaluationFile: (state) => state.currentEvaluationFile,
  inquirySearch: (state) => state.inquirySearch,
  departmentFilter: (state) => state.departmentFilter,
  delinquentPayments: (state) => state.delinquentPayments,
  inquiryPageNum: (state) => state.inquiryPageNum,
  remarksPageNum: (state) => state.remarksPageNum,
  delinquentPageNum: (state) => state.delinquentPageNum,
  isRemarks: (state) => state.isRemarks,
  clearFileInput: (state) => state.clearFileInput,
  isFileReady: (state) => state.isFileReady,
};
const mutations = {
  setInquiries: (state, inquiries) => (state.inquiries = inquiries),
  setRemarks: (state, remarks) => (state.remarks = remarks),
  resetInquiryState: (state) => Object.assign(state, getDefaultInquiryState()),
  setInquiry: (state, inquiry) => (state.inquiry = inquiry),
  setCurrentInquiry: (state, currentInquiry) =>
    (state.currentInquiry = currentInquiry),
  setContinueBuildingThread: (state, continueBuildingThread) =>
    (state.continueBuildingThread = continueBuildingThread),
  setContinueBusinessThread: (state, continueBusinessThread) =>
    (state.continueBusinessThread = continueBusinessThread),
  setCurrentEvaluationFile: (state, currentEvaluationFile) =>
    (state.currentEvaluationFile = currentEvaluationFile),
  setInquirySearch: (state, inquirySearch) =>
    (state.inquirySearch = inquirySearch),
  setDepartmentFilter: (state, departmentFilter) =>
    (state.departmentFilter = departmentFilter),
  setDelinquentPayments: (state, delinquentPayments) =>
    (state.delinquentPayments = delinquentPayments),
  setIsRemarks: (state, isRemarks) => (state.isRemarks = isRemarks),
  setClearFileInput: (state, clearFileInput) =>
    (state.clearFileInput = clearFileInput),
  setIsFileReady: (state, isFileReady) => (state.isFileReady = isFileReady),
};
const actions = {
  async getAllUserInquiries({ commit, dispatch, getters }, page = 1) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/user-inquiry/?page=${page}`,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      commit("setPageCount", response.data.total_pages);
      commit("setInquiries", response.data.results);
    } catch (err) {
      console.log(err);
    }
  },
  async getAllUserRemarks({ commit, dispatch, getters }, page = 1) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/user-remarks/?page=${page}`,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      commit("setPageCount", response.data.total_pages);
      commit("F", response.data.results);
    } catch (err) {
      console.log(err);
    }
  },
  async getAllAdminInquiries(
    { commit, getters },
    { page = 1, filter_by = "all_inquiries" }
  ) {
    try {
      const response = await axios.get(
        `${baseUrl}/staff/threads/?page=${page}&filter_by=${filter_by}&search=${getters.inquirySearch}&department=${getters.departmentFilter}`,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      commit("setPageCount", response.data.total_pages);
      commit("setInquiries", response.data.results);
    } catch (err) {
      console.log(err);
    }
  },
  async getAllAdminRemarks(
    { commit, getters },
    { page, filter_by = "all_inquiries" }
  ) {
    try {
      const response = await axios.get(
        `${baseUrl}/staff/remarks-threads/?page=${page}&filter_by=${filter_by}&search=${getters.inquirySearch}&department=all`,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      commit("setPageCount", response.data.total_pages);
      commit("setRemarks", response.data.results);
    } catch (err) {
      console.log(err);
    }
  },
  async getInquiry({ commit, getters }, id) {
    try {
      const response = await axios.get(`${baseUrl}/api/inquiry/?id=${id}`, {
        headers: { Authorization: `jwt ${getters.authToken}` },
      });
      commit("setInquiry", response.data);
      commit("setCurrentInquiry", response.data.id);
    } catch (err) {
      console.log(err);
    }
  },
  async addThread({ commit, getters }, payload) {
    try {
      const response = await axios.post(`${baseUrl}/api/threads/`, payload, {
        headers: { Authorization: `jwt ${getters.authToken}` },
      });
      await commit("setCurrentInquiry", response.data.id);
    } catch (err) {
      console.log(err);
    }
  },

  // TODO:
  async addMessage({ commit, getters, dispatch }, payload) {
    try {
      const response = await axios.post(`${baseUrl}/api/messages/`, payload, {
        headers: { Authorization: `jwt ${getters.authToken}` },
      });
      if (
        (getters.isEvaluation ||
          getters.isDelinquentPayment ||
          getters.isRemarks) &&
        getters.isFileReady
      ) {
        await commit("setLoading", true);
        let newFormData = getters.currentEvaluationFile;
        newFormData.append("message", response.data.id);
        await dispatch("uploadMessageAttachment", newFormData);
        await commit("setIsEvaluation", false);
        await commit("setLoading", false);
        if (getters.isRemarks) {
          await commit("setClearFileInput", true);
        }
      }
    } catch (err) {
      await commit("setLoading", false);
      err.response ? console.log(err.response) : console.log(err);
    }
  },
  async adminRespond({ commit, getters }, payload) {
    try {
      const response = await axios.put(`${baseUrl}/staff/thread/`, payload, {
        headers: { Authorization: `jwt ${getters.authToken}` },
      });
    } catch (err) {
      console.log(err);
    }
  },
  async resolveInquiry({ commit, getters }, payload) {
    try {
      const response = await axios.put(
        `${baseUrl}/api/resolve-inquiry/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
    } catch (err) {
      console.log(err.response);
    }
  },
  async getBusinessRemarks({ commit, getters }, payload) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/business-remarks-thread/?id=${payload}`,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      if (response.data.id) {
        commit("setCurrentInquiry", response.data.id);
      } else {
        commit("setCurrentInquiry", "");
      }
      console.log(response.data);
    } catch (err) {
      console.log(err.response);
    }
  },
  async getBuildingRemarks({ commit, getters }, payload) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/building-remarks-thread/?id=${payload}`,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      console.log(response.data);
      if (response.data.id) {
        await commit("setCurrentInquiry", response.data.id);
      } else {
        await commit("setCurrentInquiry", "");
      }
    } catch (err) {
      console.log(err.response);
    }
  },
  async uploadMessageAttachment({ commit, getters }, payload) {
    try {
      const response = await axios.post(
        `${baseUrl}/api/message-attachment-upload/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      await commit("setIsFileReady", false);
    } catch (err) {
      await commit("setLoading", false);
      err.response ? console.log(err.response) : console.log(err);
    }
  },

  async getAllDelinquentPayments(
    { commit, getters },
    { page = 1, filter_by = "all_inquiries" }
  ) {
    try {
      const response = await axios.get(
        `${baseUrl}/staff/delinquent-payments/?page=${page}&filter_by=${filter_by}&search=${getters.inquirySearch}`,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      await commit("setDelinquentPayments", response.data.results);
      await commit("setPageCount", response.data.total_pages);
    } catch (err) {
      err.response ? console.log(err.response) : console.log(err);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
