import axios from "axios";

const baseUrl = "http://localhost:8000";
const state = {
  codeToken: "",
  authToken: "",
  loginSuccess: false,
  registerSuccess: false,
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false,
  validationMessages: {}
};

const getters = {
  codeToken: (state) => state.codeToken,
  authToken: (state) => state.authToken,
  loginSuccess: (state) => state.loginSuccess,
  registerSuccess: (state) => state.registerSuccess,
  forgotPasswordSuccess: (state) => state.forgotPasswordSuccess,
  resetPasswordSuccess: (state) => state.resetPasswordSuccess,
  validationMessages: (state) => state.validationMessages
};

const mutations = {
  setCodeToken: (state, codeToken) => (state.codeToken = codeToken),
  setAuthToken: (state, authToken) => (state.authToken = authToken),
  setLoginSuccess: (state, loginSuccess) => (state.loginSuccess = loginSuccess),
  setRegisterSuccess: (state, registerSuccess) => (state.registerSuccess = registerSuccess),
  setForgotPasswordSuccess: (state, forgotPasswordSuccess) => (state.forgotPasswordSuccess = forgotPasswordSuccess),
  setResetPasswordSuccess: (state, resetPasswordSuccess) => (state.resetPasswordSuccess = resetPasswordSuccess),
  setValidationMessages: (state, validationMessages) => (state.validationMessages = validationMessages),
};

const actions = {
  async getCodeToken({ commit, dispatch }, payload) {
    try {
      commit("setLoading", true);
      const response = await axios.post(
        `${baseUrl}/auth/2fa-auth/get-code-token/`,
        payload
      );
      commit("setCodeToken", response.data.token);
      commit("setAuthType", "otp");
      commit("setLoading", false);
    } catch (err) {
      commit("setLoading", false);
      dispatch("createPrompt", {
        type: "error",
        title: err.response.statusText,
        message: err.response.data.detail,
      });
    }
  },
  async getAuthToken({ commit, getters, dispatch }, code) {
    try {
      let payload = {
        code_token: getters.codeToken,
        code: code,
      };
      commit("setLoading", true);
      const response = await axios.post(
        `${baseUrl}/auth/2fa-auth/get-auth-token/`,
        payload
      );
      console.log(response.data)
        commit("setLoading", false);
        commit("setAuthToken", response.data.token);
        commit("setLoginSuccess", true);
    } catch (err) {
      console.log(err.response)
      commit("setLoading", false);
      dispatch("createPrompt", {
        type: "error",
        title: err.response.statusText,
        message: err.response.data.detail,
      });
    }
  },
  async registerUser({ commit }, payload) {
    try {
      commit("setLoading", true);
      const response = await axios.post(`${baseUrl}/auth/users/`, payload);
      commit("setLoading", false);
      commit("setRegisterSuccess", true)
    } catch (err) {
      commit("setLoading", false);
      commit('setValidationMessages', err.response.data)
    }
  },
  async forgotPasswordUser({commit}, payload){
    try {
      commit("setLoading", true);
      const response = await axios.post(`${baseUrl}/auth/users/reset_password/`, payload);
      commit("setLoading", false);
      commit("setForgotPasswordSuccess", true)
    } catch (err) {
      commit("setLoading", false);
      commit('setValidationMessages', err.response.data)
    }
  },
  async resetPasswordUser({commit},payload){
    try {
      commit("setLoading", true);
      const response = await axios.post(`${baseUrl}/auth/users/reset_password_confirm/`, payload);
      commit("setLoading", false);
      commit("setResetPasswordSuccess", true)
    } catch (err) {
      commit("setLoading", false);
      commit('setValidationMessages', err.response.data)
    }
  }
};
export default {
  state,
  getters,
  actions,
  mutations,
};
