import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;
import router from "../../router/index.js"
const getDefaultPropertyState = () => {
  return {
    currentPropertyStep: "1",
    buildingApplication: {},
    buildingBasicInformation: {},
    buildingDetails: {},
    buildingOtherDetails: {},
    buildingBasicInfoHasError: false,
    buildingDetailsHasError: false,
    buildingOtherDetailsHasError: false,
    buildingStepOneErrors: {
      basic_information: [],
    },
    buildingStepTwoErrors: {
      building_details: [],
      building_other_details: [],
    },
    buildingApplications: [],
    buildingApplicationRequirements: {},
    buildingRequirements: [],
    draftProperty: false,
  };
};

const state = getDefaultPropertyState();

const getters = {
  currentPropertyStep: (state) => state.currentPropertyStep,
  buildingApplication: (state) => state.buildingApplication,
  buildingBasicInformation: (state) => state.buildingBasicInformation,
  buildingDetails: (state) => state.buildingDetails,
  buildingOtherDetails: (state) => state.buildingOtherDetails,
  buildingBasicInfoHasError: (state) => state.buildingBasicInfoHasError,
  buildingDetailsHasError: (state) => state.buildingDetailsHasError,
  buildingOtherDetailsHasError: (state) => state.buildingOtherDetailsHasError,
  buildingStepOneErrors: (state) => state.buildingStepOneErrors,
  buildingStepTwoErrors: (state) => state.buildingStepTwoErrors,
  buildingApplications: (state) => state.buildingApplications,
  draftProperty: (state) => state.draftProperty,
  buildingApplicationRequirements: (state) =>
    state.buildingApplicationRequirements,
  buildingRequirements: (state) => state.buildingRequirements,
};

const mutations = {
  setCurrentPropertyStep: (state, currentPropertyStep) =>
    (state.currentPropertyStep = currentPropertyStep),
  resetPropertyState: (state) =>
    Object.assign(state, getDefaultPropertyState()),
  setBuildingApplication: (state, buildingApplication) =>
    (state.buildingApplication = buildingApplication),
  setBuildingBasicInformation: (state, buildingBasicInformation) =>
    (state.buildingBasicInformation = buildingBasicInformation),
  setBuildingDetails: (state, buildingDetails) =>
    (state.buildingDetails = buildingDetails),
  setBuildingOtherDetails: (state, buildingOtherDetails) =>
    (state.buildingOtherDetails = buildingOtherDetails),
  setBuildingBasicInfoHasError: (state, buildingBasicInfoHasError) =>
    (state.buildingBasicInfoHasError = buildingBasicInfoHasError),
  setBuildingDetailsHasError: (state, buildingDetailsHasError) =>
    (state.buildingDetailsHasError = buildingDetailsHasError),
  setBuildingOtherDetailsHasError: (state, buildingOtherDetailsHasError) =>
    (state.buildingOtherDetailsHasError = buildingOtherDetailsHasError),
  buildingSetStepOneErrors: (state, buildingStepOneErrors) => {
    state.buildingStepOneErrors[`${buildingStepOneErrors.key}`] =
      buildingStepOneErrors.value;
  },
  buildingSetStepTwoErrors: (state, buildingStepTwoErrors) => {
    state.buildingStepTwoErrors[`${buildingStepTwoErrors.key}`] =
      buildingStepTwoErrors.value;
  },
  setBuildingApplications: (state, buildingApplications) =>
    (state.buildingApplications = buildingApplications),
  setDraftProperty: (state, draftProperty) =>
    (state.draftProperty = draftProperty),
  setBuildingApplicationRequirements: (
    state,
    buildingApplicationRequirements
  ) =>
    (state.buildingApplicationRequirements = buildingApplicationRequirements),
  setBuildingRequirements: (state, buildingRequirements) =>
    (state.buildingRequirements = buildingRequirements),
};

const actions = {
  async approveBuildingApplication({commit, dispatch, getters}, payload){
    try {
      const response = await axios.put(`${baseUrl}/staff/building-permit-application/`,
      payload,
      { withCredentials: true })
      let action = payload.is_approve ? 'approved' : 'disapproved'
      dispatch("createPrompt", {
        type: "success",
        title: 'Success!',
        message: `Application was successfully ${action}!`,
      });
      router.push({name:'Applications'})
    } catch (err) {
      console.log(err)
      commit('setLoading', false)
    }
  },
  async getAllBuildingApplications({ commit, getters, dispatch }, page = 1) {
    try {
      console.log(getters.filterBy)
      const response = await axios.get(
        `${baseUrl}/staff/building-permit-application-list/?page=${page}&filter_by=${getters.filterBy}`,
        { withCredentials: true }
      );
      commit('setPageCount', response.data.total_pages)
      commit("setBuildingApplications", response.data.results);
    } catch (err) {
      console.log(err.response);
    }
  },
  async getBuildingApplications({ commit, getters, dispatch }, payload) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/building-permit-application/`,
        { withCredentials: true }
      );
      commit("setBuildingApplications", response.data);
    } catch (err) {
      console.log(err.response);
    }
  },
  async addBuildingApplication({ commit, getters, dispatch }, payload) {
    try {
      const response = await axios.post(
        `${baseUrl}/api/building-permit-application/`,
        {},
        { withCredentials: true }
      );
      commit("setBuildingApplication", response.data);
    } catch (err) {
      console.log(err.response);
    }
  },
  async updateBuildingApplication({ commit, getters, dispatch }, payload) {
    try {
      payload.id = getters.buildingApplication.id;
      const response = await axios.put(
        `${baseUrl}/api/building-permit-application/`,
        payload,
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err.response);
    }
  },
  async addBuildingBasicInformation({ commit, getters }, payload) {
    try {
      payload.application_number = getters.buildingApplication.id;
      const response = await axios.post(
        `${baseUrl}/api/building-basic-information/`,
        payload,
        { withCredentials: true }
      );
      await commit("setBuildingBasicInformation", response.data);
      commit("setBuildingBasicInfoHasError", false);
    } catch (err) {
      commit("setBuildingBasicInfoHasError", true);
      let errors = { key: "basic_information", value: err.response.data };
      commit("buildingSetStepOneErrors", errors);
      console.log(err);
    }
  },
  async updateBuildingBasicInformation({ commit, getters }, payload) {
    try {
      payload.id = getters.buildingBasicInformation.id;
      const response = await axios.put(
        `${baseUrl}/api/building-basic-information/`,
        payload,
        { withCredentials: true }
      );
      commit("setBuildingBasicInformation", response.data);
      commit("setBuildingBasicInfoHasError", false);
    } catch (err) {
      let errors = { key: "basic_information", value: err.response.data };
      commit("buildingSetStepOneErrors", errors);
      commit("setBuildingBasicInfoHasError", true);
      console.log(err.response);
    }
  },
  async addBuildingDetails({ commit, getters }, payload) {
    try {
      payload.application_number = getters.buildingApplication.id;
      const response = await axios.post(
        `${baseUrl}/api/building-details/`,
        payload,
        { withCredentials: true }
      );
      commit("setBuildingDetailsHasError", false);
      commit("setBuildingDetails", response.data);
    } catch (err) {
      let errors = { key: "building_details", value: err.response.data };
      commit("buildingSetStepTwoErrors", errors);
      commit("setBuildingDetailsHasError", true);
      console.log(err.response);
    }
  },
  async addBuildingOtherDetails({ commit, getters }, payload) {
    try {
      payload.application_number = getters.buildingApplication.id;
      const response = await axios.post(
        `${baseUrl}/api/building-other-details/`,
        payload,
        { withCredentials: true }
      );
      commit("setBuildingOtherDetailsHasError", false);
      commit("setBuildingOtherDetails", response.data);
    } catch (err) {
      let errors = { key: "building_other_details", value: err.response.data };
      commit("buildingSetStepTwoErrors", errors);
      commit("setBuildingOtherDetailsHasError", true);
      console.log(err.response);
    }
  },
  async updateBuildingDetails({ commit, getters }, payload) {
    try {
      payload.id = getters.buildingDetails.id;
      const response = await axios.put(
        `${baseUrl}/api/building-details/`,
        payload,
        { withCredentials: true }
      );
      commit("setBuildingDetails", response.data);
      commit("setBuildingDetailsHasError", false);
    } catch (err) {
      let errors = { key: "building_details", value: err.response.data };
      commit("buildingSetStepTwoErrors", errors);
      commit("setBuildingDetailsHasError", true);
      console.log(err.response);
    }
  },
  async updateBuildingOtherDetails({ commit, getters }, payload) {
    try {
      payload.id = getters.buildingOtherDetails.id;
      const response = await axios.put(
        `${baseUrl}/api/building-other-details/`,
        payload,
        { withCredentials: true }
      );
      commit("setBuildingOtherDetails", response.data);
      commit("setBuildingOtherDetailsHasError", false);
    } catch (err) {
      let errors = { key: "building_other_details", value: err.response.data };
      commit("buildingSetStepTwoErrors", errors);
      console.log(err.response);
      commit("setBuildingOtherDetailsHasError", true);
    }
  },
  async addBuildingApplicationRequirements({ commit, getters }, payload) {
    try {
      const response = await axios.post(
        `${baseUrl}/api/building-application-requirements/`,
        payload,
        { withCredentials: true }
      );
      commit("setBuildingApplicationRequirements", response.data);
    } catch (err) {
      console.log(err.response);
    }
  },
  async uploadBuildingRequirements({ commit, getters, dispatch }, payload) {
    try {
      commit("setLoading", true);
      const response = await axios.post(
        `${baseUrl}/api/building-file-upload/`,
        payload,
        { withCredentials: true }
      );
      await dispatch("getBuildingApplicationRequirements");
      commit("setLoading", false);
    } catch (err) {
      console.log(err.response);
      commit("setLoading", false);
    }
  },
  async getBuildingApplicationRequirements({ commit, getters }) {
    try {
      let payload = { id: getters.buildingApplicationRequirements.id };
      const response = await axios.get(
        `${baseUrl}/api/building-application-requirements/`,
        { withCredentials: true, params: payload }
      );
      commit("setBuildingRequirements", response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err.response);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
