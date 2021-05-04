import axios from "axios";
import router from "../../router/index.js";
const baseUrl = process.env.VUE_APP_API_URL;
// let config = {
//   headers: {
//     Authorization: `jwt ${localStorage.getItem('')}`
//   }
// }

let config = () => {
  let serviceObj = localStorage.getItem("service");
  let parseObj = JSON.parse(serviceObj);
  return {
    headers: {
      Authorization: `jwt ${parseObj.authToken}`,
    },
  };
};

// const baseUrl = "https://boss-web-api.herokuapp.com";
const getDefaultAuthState = () => {
  return {
    codeToken: "",
    authToken: "",
    loginSuccess: false,
    registerSuccess: false,
    forgotPasswordSuccess: false,
    resetPasswordSuccess: false,
    validationMessages: {},
    userDetails: {},
    credentials: {},
    isAuthenticated: false,
    isAdminAuthenticated: false,
  };
};
const state = getDefaultAuthState();

const getters = {
  codeToken: (state) => state.codeToken,
  authToken: (state) => state.authToken,
  loginSuccess: (state) => state.loginSuccess,
  registerSuccess: (state) => state.registerSuccess,
  forgotPasswordSuccess: (state) => state.forgotPasswordSuccess,
  resetPasswordSuccess: (state) => state.resetPasswordSuccess,
  validationMessages: (state) => state.validationMessages,
  userDetails: (state) => state.userDetails,
  isAuthenticated: (state) => state.isAuthenticated,
  isAdminAuthenticated: (state) => state.isAdminAuthenticated,
  credentials: (state) => state.credentials,
};

const mutations = {
  setCodeToken: (state, codeToken) => (state.codeToken = codeToken),
  setAuthToken: (state, authToken) => (state.authToken = authToken),
  setLoginSuccess: (state, loginSuccess) => (state.loginSuccess = loginSuccess),
  setRegisterSuccess: (state, registerSuccess) =>
    (state.registerSuccess = registerSuccess),
  setForgotPasswordSuccess: (state, forgotPasswordSuccess) =>
    (state.forgotPasswordSuccess = forgotPasswordSuccess),
  setResetPasswordSuccess: (state, resetPasswordSuccess) =>
    (state.resetPasswordSuccess = resetPasswordSuccess),
  setValidationMessages: (state, validationMessages) =>
    (state.validationMessages = validationMessages),
  setUserDetails: (state, userDetails) => (state.userDetails = userDetails),
  setIsAuthenticated: (state, isAuthenticated) =>
    (state.isAuthenticated = isAuthenticated),
  setAdminIsAuthenticated: (state, isAdminAuthenticated) =>
    (state.isAdminAuthenticated = isAdminAuthenticated),
  resetAuthState: (state) => Object.assign(state, getDefaultAuthState()),
  setCredentials: (state, credentials) => (state.credentials = credentials),
};

const actions = {
  async getCodeToken({ commit, dispatch, getters }, payload) {
    try {
      commit("setLoading", true);
      const response = await axios.post(
        `${baseUrl}/auth/2fa-auth/get-code-token/`,
        payload
      );
      commit("setCodeToken", response.data.token);
      commit("setAuthType", "otp");
      commit("setCredentials", payload);
      commit("setLoading", false);
    } catch (err) {
      console.log(err);
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
      commit("setCredentials", {});
      commit("setLoading", false);
      commit("setAuthToken", response.data.token);
      commit("setLoginSuccess", true);
      commit("setIsAuthenticated", true);
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
  async registerUser({ commit, getters }, payload) {
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
  async forgotPasswordUser({ commit, getters, dispatch }, payload) {
    try {
      commit("setLoading", true);
      const response = await axios.post(
        `${baseUrl}/auth/users/reset_password/`,
        payload
      );
      commit("setCredentials", payload);
      commit("setLoading", false);
      commit("setForgotPasswordSuccess", true);
    } catch (err) {
      commit("setLoading", false);
      commit("setValidationMessages", err.response.data);
      dispatch("createPrompt", {
        type: "error",
        title: err.response.statusText,
        message: err.response.data.detail,
      });
    }
  },
  async resetPasswordUser({ commit, dispatch, getters }, payload) {
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
      await commit("setLoading", false);
      const response = await axios.get(`${baseUrl}/auth/users/me/`, {
        headers: { Authorization: `jwt ${getters.authToken}` },
      });
      await commit("setUserDetails", response.data);
    } catch (err) {
      console.log(err);
    }
  },
  async adminLogin({ commit, dispatch, getters }, payload) {
    try {
      commit("setLoading", true);
      const response = await axios.post(`${baseUrl}/auth/admin/`, payload);
      commit("setAuthToken", response.data.token);
      dispatch("checkIfAdmin");
      dispatch("checkGroups");
    } catch (err) {
      err.response ? console.log(err.response) : console.log(err.code);
      commit("setLoading", false);
      if (err.code == "ECONNABORTED") {
        dispatch("createPrompt", {
          type: "error",
          title: "Failed",
          message: "Something went wrong! Please try again later.",
        });
      } else {
        dispatch("createPrompt", {
          type: "error",
          title: "Forbidden",
          message: "Incorrect authentication credentials.",
        });
      }
    }
  },
  async checkIfAdmin({ commit, dispatch, getters }) {
    try {
      const response = await axios.post(
        `${baseUrl}/api/get-level/`,
        {},
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      commit("setLoading", false);
      if (response.data.is_admin) {
        commit("setAdminIsAuthenticated", true);
        router.push({ name: "Dashboard" });
      } else {
        dispatch("createPrompt", {
          type: "error",
          title: "Forbidden",
          message:
            "Please enter the correct username and password for a staff account. ",
        });
      }
    } catch (err) {
      commit("setLoading", false);
      console.log(err);
      dispatch("createPrompt", {
        type: "error",
        title: "Ooops!",
        message: "Something went wrong. Please try again.",
      });
    }
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
