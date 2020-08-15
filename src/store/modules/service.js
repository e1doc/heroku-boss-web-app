import axios from "axios";

const baseUrl = process.env.VUE_APP_API_URL;
// const baseUrl = "https://boss-web-api.herokuapp.com";
const getDefaultAuthState = () =>{
  return {
    codeToken: "",
    authToken: "",
    loginSuccess: false,
    registerSuccess: false,
    forgotPasswordSuccess: false,
    resetPasswordSuccess: false,
    validationMessages: {},
    userDetails: {},
    isAuthenticated: false
  }
}
const state = getDefaultAuthState()

const getters = {
  codeToken: (state) => state.codeToken,
  authToken: (state) => state.authToken,
  loginSuccess: (state) => state.loginSuccess,
  registerSuccess: (state) => state.registerSuccess,
  forgotPasswordSuccess: (state) => state.forgotPasswordSuccess,
  resetPasswordSuccess: (state) => state.resetPasswordSuccess,
  validationMessages: (state) => state.validationMessages,
  userDetails: (state) => state.userDetails,
  isAuthenticated: (state) => state.isAuthenticated
};

const mutations = {
  setCodeToken: (state, codeToken) => (state.codeToken = codeToken),
  setAuthToken: (state, authToken) => (state.authToken = authToken),
  setLoginSuccess: (state, loginSuccess) => (state.loginSuccess = loginSuccess),
  setRegisterSuccess: (state, registerSuccess) => (state.registerSuccess = registerSuccess),
  setForgotPasswordSuccess: (state, forgotPasswordSuccess) => (state.forgotPasswordSuccess = forgotPasswordSuccess),
  setResetPasswordSuccess: (state, resetPasswordSuccess) => (state.resetPasswordSuccess = resetPasswordSuccess),
  setValidationMessages: (state, validationMessages) => (state.validationMessages = validationMessages),
  setUserDetails: (state, userDetails) => (state.userDetails = userDetails),
  setIsAuthenticated: (state, isAuthenticated) => (state.isAuthenticated = isAuthenticated),
  resetAuthState: (state) => Object.assign(state, getDefaultAuthState()),
};

const actions = {
  async getCodeToken({ commit, dispatch }, payload) {
    try {
      console.log(process.env.BASE_URL)
      commit("setLoading", true);
      const response = await axios.post(
        `${baseUrl}/auth/2fa-auth/get-code-token/`,
        payload,
        {withCredentials: true }
      );
      commit("setCodeToken", response.data.token);
      commit("setAuthType", "otp");
      commit("setLoading", false);
    } catch (err) {
      console.log(err)
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
        payload,
        {withCredentials: true }
      );
      commit("setLoading", false);
      commit("setLoginSuccess", true);
      commit("setIsAuthenticated",true)
      commit("setAuthType", "login");
    } catch (err) {
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
      commit("setRegisterSuccess", true);
    } catch (err) {
      commit("setLoading", false);
      commit("setValidationMessages", err.response.data);
    }
  },
  async forgotPasswordUser({ commit }, payload) {
    try {
      commit("setLoading", true);
      const response = await axios.post(
        `${baseUrl}/auth/users/reset_password/`,
        payload
      );
      commit("setLoading", false);
      commit("setForgotPasswordSuccess", true);
    } catch (err) {
      commit("setLoading", false);
      commit("setValidationMessages", err.response.data);
    }
  },
  async resetPasswordUser({ commit, dispatch }, payload) {
    try {
      commit("setLoading", true);
      const response = await axios.post(
        `${baseUrl}/auth/users/reset_password_confirm/`,
        payload
      );
      commit("setLoading", false);
      commit("setResetPasswordSuccess", true);
      dispatch("createPrompt", {
        type: "success",
        title: "Reset Password Success!",
        message: "Your password was reset successfully.",
      });
    } catch (err) {
      commit("setLoading", false);
      commit("setValidationMessages", err.response.data);
      if (err.response.data.non_field_errors) {
        dispatch("createPrompt", {
          type: "error",
          title: "Error!",
          message: err.response.data.non_field_errors,
        });
      }
    }
  },
  async getUserDetails({ commit, getters }) {
    try {
      const response = await axios.get(`${baseUrl}/auth/users/me`,{ withCredentials: true })
      commit('setUserDetails',response.data)
    } catch (err) {
      console.log(err)
    }
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
