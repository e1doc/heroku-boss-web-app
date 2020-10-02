import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;
const oneDocToken = process.env.VUE_APP_ONE_DOC_TOKEN;

const getDefaultInquiryState = () => {
  return {
    inquiries: [],
    remarks: [],
    inquiry: {},
    currentInquiry: "",
  };
};
const state = getDefaultInquiryState();
const getters = {
  inquiries: (state) => state.inquiries,
  remarks: (state) => state.remarks,
  inquiry: (state) => state.inquiry,
  currentInquiry: (state) => state.currentInquiry,
};
const mutations = {
  setInquiries: (state, inquiries) => (state.inquiries = inquiries),
  setRemarks: (state, remarks) => (state.remarks = remarks),
  resetInquiryState: (state) => Object.assign(state, getDefaultInquiryState()),
  setInquiry: (state, inquiry) => (state.inquiry = inquiry),
  setCurrentInquiry: (state, currentInquiry) =>
    (state.currentInquiry = currentInquiry),
};
const actions = {
  async getAllUserInquiries({ commit, dispatch, getters }, page = 1) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/user-inquiry/?page=${page}`,
        {headers: {Authorization: `jwt ${getters.authToken}`} }
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
        {headers: {Authorization: `jwt ${getters.authToken}`} }
      );
      commit("setPageCount", response.data.total_pages);
      commit("setRemarks", response.data.results);
    } catch (err) {
      console.log(err);
    }
  },
  async getAllAdminInquiries(
    { commit,getters },
    { page = 1, filter_by = "all_inquiries" }
  ) {
    try {
      const response = await axios.get(
        `${baseUrl}/staff/threads/?page=${page}&filter_by=${filter_by}`,
        {headers: {Authorization: `jwt ${getters.authToken}`} }
      );
      commit("setPageCount", response.data.total_pages);
      commit("setInquiries", response.data.results);
    } catch (err) {
      console.log(err);
    }
  },
  async getAllAdminRemarks(
    { commit,getters },
    { page = 1, filter_by = "all_inquiries" }
  ) {
    try {
      const response = await axios.get(
        `${baseUrl}/staff/remarks-threads/?page=${page}&filter_by=${filter_by}`,
        {headers: {Authorization: `jwt ${getters.authToken}`} }
      );
      commit("setPageCount", response.data.total_pages);
      commit("setRemarks", response.data.results);
    } catch (err) {
      console.log(err);
    }
  },
  async getInquiry({ commit, getters  }, id) {
    try {
      const response = await axios.get(`${baseUrl}/api/inquiry/?id=${id}`, {headers: {Authorization: `jwt ${getters.authToken}`} });
      console.log("Inquiry details", response.data);
      commit("setInquiry", response.data);
      commit("setCurrentInquiry", response.data.id);
    } catch (err) {
      console.log(err);
    }
  },
  async addThread({ commit, getters  }, payload) {
    try {
      const response = await axios.post(`${baseUrl}/api/threads/`, payload, {headers: {Authorization: `jwt ${getters.authToken}`} });
      commit("setCurrentInquiry", response.data.id);
    } catch (err) {
      console.log(err);
    }
  },
  async addMessage({ commit, getters  }, payload) {
    try {
      const response = await axios.post(`${baseUrl}/api/messages/`, payload, {headers: {Authorization: `jwt ${getters.authToken}`} });
    } catch (err) {
      console.log(err);
    }
  },
  async adminRespond({ commit, getters  }, payload) {
    try {
      const response = await axios.put(`${baseUrl}/staff/thread/`, payload, {headers: {Authorization: `jwt ${getters.authToken}`} });
    } catch (err) {
      console.log(err);
    }
  },
  async resolveInquiry({ commit, getters  }, payload) {
    try {
      const response = await axios.put(
        `${baseUrl}/api/resolve-inquiry/`,
        payload,
        {headers: {Authorization: `jwt ${getters.authToken}`} }
      );
    } catch (err) {
      console.log(err);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
