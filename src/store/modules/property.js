import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;
const oneDocToken = process.env.VUE_APP_ONE_DOC_TOKEN;
import router from "../../router/index.js";
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
    buildingProfiles: [],
    buildingApplicationRequirements: {},
    buildingRequirements: [],
    draftProperty: false,
    realPropertyProfiles: [],
    remarks: {},
    legalDocuments: {},
    technicalDocuments: {},
    supplementaryDocuments: {},
    currentBuildingId: 0,
    buildingSearch: ""
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
  buildingProfiles: (state) => state.buildingProfiles,
  draftProperty: (state) => state.draftProperty,
  buildingApplicationRequirements: (state) =>
    state.buildingApplicationRequirements,
  buildingRequirements: (state) => state.buildingRequirements,
  realPropertyProfiles: (state) => state.realPropertyProfiles,
  remarks: (state) => state.remarks,
  legalDocuments: (state) => state.legalDocuments,
  technicalDocuments: (state) => state.technicalDocuments,
  supplementaryDocuments: (state) => state.supplementaryDocuments,
  currentBuildingId: ( state ) => state.currentBuildingId,
  buildingSearch: ( state ) => state.buildingSearch
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
  setBuildingProfiles: (state, buildingProfiles) =>
    (state.buildingProfiles = buildingProfiles),
  setDraftProperty: (state, draftProperty) =>
    (state.draftProperty = draftProperty),
  setBuildingApplicationRequirements: (
    state,
    buildingApplicationRequirements
  ) =>
    (state.buildingApplicationRequirements = buildingApplicationRequirements),
  setBuildingRequirements: (state, buildingRequirements) =>
    (state.buildingRequirements = buildingRequirements),
  setRealPropertyProfiles: (state, realPropertyProfiles) =>
    (state.realPropertyProfiles = realPropertyProfiles),
  setRemarks: (state, remarks) => (state.remarks = remarks),
  setLegalDocuments: (state, legalDocuments) =>
    (state.legalDocuments = legalDocuments),
  setTechnicalDocuments: (state, technicalDocuments) =>
    (state.technicalDocuments = technicalDocuments),
  setSupplementaryDocuments: (state, supplementaryDocuments) =>
    (state.supplementaryDocuments = supplementaryDocuments),
  setCurrentBuildingId: (state, currentBuildingId) => (state.currentBuildingId = currentBuildingId),
  setBuildingSearch: (state, buildingSearch) => (state.buildingSearch = buildingSearch)
};

const actions = {
  async getBuildingApplication({ commit, getters }, payload) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/building-application?application_number=${payload}`,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      let application = {
        id: response.data.id,
        is_draft: response.data.is_draft,
        is_approve: response.data.is_approve,
        is_disapprove: response.data.is_disapprove,
        created_at: response.data.created_at,
      };
      await commit("setBuildingApplication", application);
      await commit(
        "setBuildingBasicInformation",
        response.data.buildingbasicinformation
      );
      await commit("setBuildingDetails", response.data.buildingdetails);
      await commit(
        "setBuildingOtherDetails",
        response.data.buildingotherdetails
      );
      await commit(
        "setBuildingApplicationRequirements",
        response.data.buildingapplicationrequirements[0]
      );
      await router.push({ name: "BuildingPermitApplication" });
    } catch (err) {
      commit("setLoading", false);
      console.log(err);
    }
  },
  async setBuildingCheckList({ commit, getters }, payload) {
    try {
      console.log("post checklist ", payload);
      const response = await axios.post(
        `${baseUrl}/api/building-checklist/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      let value = JSON.parse(payload.value);
    } catch (err) {
      commit("setLoading", false);
      console.log(err.response);
    }
  },
  async updateBuildingCheckList({ commit, getters }, payload) {
    try {
      console.log("put checklist ", payload.category);
      const response = await axios.put(
        `${baseUrl}/api/building-checklist/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      console.log(response.data);
    } catch (err) {
      commit("setLoading", false);
      console.log(err.response);
    }
  },
  async setApplicationRemarks({ commit, getters }, payload) {
    console.log("set remarks payload", payload);
    await commit("setRemarks", payload);
    console.log(getters.remarks);
  },
  async propertyEnrollment({ commit, dispatch, getters }, payload) {
    let config = {
      headers: {
        "OneDoc-Token": oneDocToken,
      },
    };
    const response = await axios.post(
      `http://122.55.20.85:8012/lguapi/`,
      payload,
      config
    );
    console.log(response.data);
  },
  async approveBuildingApplication({ commit, dispatch, getters }, payload) {
    try {
      const response = await axios.put(
        `${baseUrl}/staff/building-permit-application/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      let action = payload.is_approve ? "approved" : "disapproved";
      dispatch("createPrompt", {
        type: "success",
        title: "Success!",
        message: `Application was successfully ${action}!`,
      });
      router.push({ name: "Applications" });
    } catch (err) {
      console.log(err);
      commit("setLoading", false);
    }
  },
  async getAllBuildingApplications({ commit, getters, dispatch }, page = 1) {
    try {
      const response = await axios.get(
        `${baseUrl}/staff/building-permit-application-list/?page=${page}&filter_by=${getters.filterBy}&id=${getters.buildingSearch}`,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      commit("setPageCount", response.data.total_pages);
      commit("setBuildingApplications", response.data.results);
      console.log(response.data.results);
    } catch (err) {
      console.log(err.response);
    }
  },
  async getBuildingApplications({ commit, getters, dispatch }, payload) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/building-permit-application/`,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      commit("setBuildingApplications", response.data);
    } catch (err) {
      console.log(err.response);
    }
  },
  async getBuildingProfiles({ commit, getters, dispatch }, payload) {
    try {
      const response = await axios.get(`${baseUrl}/api/building-profile/`, {
        headers: { Authorization: `jwt ${getters.authToken}` },
      });
      commit("setBuildingProfiles", response.data);
    } catch (err) {
      console.log(err.response);
    }
  },
  async getRealPropertyProfiles({ commit, getters, dispatch }, payload) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/real-property-profile/`,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      commit("setRealPropertyProfiles", response.data);
    } catch (err) {
      console.log(err.response);
    }
  },
  async addBuildingApplication({ commit, getters, dispatch }, payload) {
    try {
      const response = await axios.post(
        `${baseUrl}/api/building-permit-application/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
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
        { headers: { Authorization: `jwt ${getters.authToken}` } }
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
        { headers: { Authorization: `jwt ${getters.authToken}` } }
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
        { headers: { Authorization: `jwt ${getters.authToken}` } }
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
        { headers: { Authorization: `jwt ${getters.authToken}` } }
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
        { headers: { Authorization: `jwt ${getters.authToken}` } }
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
        { headers: { Authorization: `jwt ${getters.authToken}` } }
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
        { headers: { Authorization: `jwt ${getters.authToken}` } }
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
        { headers: { Authorization: `jwt ${getters.authToken}` } }
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
        { headers: { Authorization: `jwt ${getters.authToken}` } }
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
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
          params: payload,
        }
      );
      console.log(response.data.buildingchecklist)
      response.data.buildingrequirements = response.data.buildingrequirements.filter(item => item.is_active == true)
      commit("setBuildingRequirements", response.data);
        if (response.data.buildingchecklist.length > 0) {
          response.data.buildingchecklist.map((item) => {
            if (item.category === "legal") {
              commit("setLegalDocuments", item);
            } else if (item.category === "technical") {
              commit("setTechnicalDocuments", item);
            } else if (item.category === "supplementary") {
              commit("setSupplementaryDocuments", item);
            }
          });
        }
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
