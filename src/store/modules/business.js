import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;
const getDefaultBusinessState = () => {
  return {
    currentBusinessStep: "1",
    businessApplication: {},
    businessBasicInformation: {},
    businessDetails: {},
    lessorDetails: {},
    businessActivities: [],
    applicationHasError: false,
    basicInfoHasError: false,
    detailsHasError: false,
    lessorDetailsHasError: false,
    activitiesHasError: false,
    stepOneErrors: {
      application: [],
      basic_information: []
    },
    stepTwoErrors: {
      business_details: [],
      lessor_details: []
    },
    applications: [],
    applicationRequirements: {},
    requirements: [],
    isUploading: false,
    draftBusiness: false,
  };
};

const state = getDefaultBusinessState();

const getters = {
  currentBusinessStep: (state) => state.currentBusinessStep,
  businessApplication: (state) => state.businessApplication,
  businessBasicInformation: (state) => state.businessBasicInformation,
  businessDetails: (state) => state.businessDetails,
  lessorDetails: (state) => state.lessorDetails,
  businessActivities: (state) => state.businessActivities,
  applicationHasError: (state) => state.applicationHasError,
  basicInfoHasError: (state) => state.basicInfoHasError,
  detailsHasError: (state) => state.detailsHasError,
  lessorDetailsHasError: (state) => state.lessorDetailsHasError,
  activitiesHasError: (state) => state.activitiesHasError,
  stepOneErrors: (state) => state.stepOneErrors,
  stepTwoErrors: (state) => state.stepTwoErrors,
  applications: (state) => state.applications,
  applicationRequirements: (state) => state.applicationRequirements,
  isUploading: (state) => state.isUploading,
  requirements: (state) => state.requirements,
  draftBusiness: (state) => state.draftBusiness
};

const mutations = {
  setCurrentBusinessStep: (state, currentBusinessStep) =>
    (state.currentBusinessStep = currentBusinessStep),
  resetBusinessState: (state) =>
    Object.assign(state, getDefaultBusinessState()),
  setBusinessApplication: (state, businessApplication) =>
    (state.businessApplication = businessApplication),
  setBusinessBasicInformation: (state, businessBasicInformation) =>
    (state.businessBasicInformation = businessBasicInformation),
  setBusinessDetails: (state, businessDetails) =>
    (state.businessDetails = businessDetails),
  setLessorDetails: (state, lessorDetails) =>
    (state.lessorDetails = lessorDetails),
  setBusinessActivities: (state, businessActivities) =>
    (state.businessActivities = businessActivities),
  setApplicationHasError: (state, applicationHasError) => (state.applicationHasError = applicationHasError),
  setBasicInfoHasError: (state, basicInfoHasError) => (state.basicInfoHasError = basicInfoHasError),
  setDetailsHasError: (state, detailsHasError) => (state.detailsHasError = detailsHasError),
  setLessorDetailsHasError: (state, lessorDetailsHasError) => (state.lessorDetailsHasError = lessorDetailsHasError),
  setStepOneErrors: (state,stepOneErrors)=>{
    state.stepOneErrors[`${stepOneErrors.key}`] = stepOneErrors.value
  },
  setStepTwoErrors: (state,stepTwoErrors)=>{
    state.stepTwoErrors[`${stepTwoErrors.key}`] = stepTwoErrors.value
  },
  setApplications: (state, applications) => (state.applications = applications),
  setApplicationRequirements: (state, applicationRequirements) => (state.applicationRequirements = applicationRequirements),
  setIsUploading: (state, isUploading) => (state.isUploading = isUploading),
  setRequirements: (state, requirements) => (state.requirements = requirements),
  setDraftBusiness: (state, draftBusiness) => (state.draftBusiness = draftBusiness)
};

const actions = {
  async getBusinessApplications({commit, dispatch, getters}){
    try {
      const response = await axios.get(
        `${baseUrl}/api/business-permit-application/`,
        { withCredentials: true }
      );
      commit("setApplications",response.data)
    } catch (err) {
      console.log(err.response)
    }
  },  
  async addBusinessApplication({ commit, dispatch, getters }, payload) {
    try {
      const response = await axios.post(
        `${baseUrl}/api/business-permit-application/`,
        payload.business_application,
        { withCredentials: true }
      );
      commit("setApplicationHasError", false)
      commit("setBusinessApplication", response.data);
      dispatch("addBusinessBasicInformation", payload.basic_information);
    } catch (err) {
      commit("setApplicationHasError",true)
      let errors = {key:'application',value: err.response.data}
      commit("setStepOneErrors",errors)
      console.log(err.response);
    }
  },
  async addBusinessBasicInformation({ commit, getters }, payload) {
    try {
      payload.application_number = getters.businessApplication.id;
      const response = await axios.post(
        `${baseUrl}/api/business-basic-information/`,
        payload,
        { withCredentials: true }
      );
      commit("setBasicInfoHasError", false)
      commit("setBusinessBasicInformation", response.data);
      commit("setCurrentApplicationStep", "2");
    } catch (err) {
      console.log(err.response);
      let errors = {key:'basic_information',value: err.response.data}
      commit("setStepOneErrors",errors)
      commit("setBasicInfoHasError", true)
    }
  },
  async addBusinessDetails({ commit, getters }, payload) {
    try {
      payload.application_number = getters.businessApplication.id;
      const response = await axios.post(
        `${baseUrl}/api/business-details/`,
        payload,
        { withCredentials: true }
      );
      commit("setDetailsHasError", false)
      commit("setBusinessDetails", response.data);
    } catch (err) {
      let errors = {key:'business_details',value: err.response.data}
      commit("setStepTwoErrors",errors)
      console.log(err.response);
      commit("setDetailsHasError", true)
    }
  },
  async addLessorDetails({ commit, getters }, payload) {
    try {
      payload.application_number = getters.businessApplication.id;
      const response = await axios.post(
        `${baseUrl}/api/business-lessor-details/`,
        payload,
        { withCredentials: true }
      );
      commit("setLessorDetailsHasError", false)
      commit("setLessorDetails", response.data);
    } catch (err) {
      let errors = {key:'lessor_details',value: err.response.data}
      commit("setStepTwoErrors",errors)
      commit("setLessorDetailsHasError", true)
      console.log(err.response);
    }
  },
  async addBusinessActivity({ commit, getters, dispatch }, payload) {
    try {
      for (let item of payload) {
        item.application_number = getters.businessApplication.id;
      }
      console.log('add',payload)
      const response = await axios.post(
        `${baseUrl}/api/business-activity/`,
        payload,
        { withCredentials: true }
      );
      dispatch('getBusinessActivity')
    } catch (err) {
      console.log(err.response);
    }
  },
  async updateBusinessApplication({ commit, getters }, payload) {
    try {
      payload.id = getters.businessApplication.id
      const response = await axios.put(
        `${baseUrl}/api/business-permit-application/`,
        payload,
        { withCredentials: true }
      );
      commit("setApplicationHasError", false)
      commit("setBusinessApplication", response.data);
    } catch (err) {
      console.log(err)
      let errors = {key:'application',value: err.response.data}
      commit("setStepOneErrors",errors)
      commit("setApplicationHasError", true)
      console.log(err.response);
    }
  },
  async updateBusinessBasicInformation({ commit, getters }, payload) {
    try {
      payload.id = getters.businessBasicInformation.id
      const response = await axios.put(
        `${baseUrl}/api/business-basic-information/`,
        payload,
        { withCredentials: true }
      );
      commit("setBasicInfoHasError", false)
      commit("setBusinessBasicInformation", response.data);
    } catch (err) {
      let errors = {key:'basic_information',value: err.response.data}
      commit("setStepOneErrors",errors)
      console.log(err);
      commit("setBasicInfoHasError", true)
    }
  },
  async updateBusinessDetails({ commit, getters }, payload) {
    try {
      payload.id = getters.businessDetails.id
      const response = await axios.put(
        `${baseUrl}/api/business-details/`,
        payload,
        { withCredentials: true }
      );
      commit("setBusinessDetails", response.data);
      commit("setDetailsHasError", false)
    } catch (err) {
      let errors = {key:'business_details',value: err.response.data}
      commit("setStepTwoErrors",errors)
      commit("setDetailsHasError", true)
      console.log(err.response);
    }
  },
  async updateLessorDetails({ commit, getters }, payload) {
    try {
      payload.id = getters.lessorDetails.id
      const response = await axios.put(
        `${baseUrl}/api/business-lessor-details/`,
        payload,
        { withCredentials: true }
      );
      commit("setLessorDetailsHasError", false)
      commit("setLessorDetails", response.data);
    } catch (err) {
      let errors = {key:'lessor_details',value: err.response.data}
      commit("setStepTwoErrors",errors)
      commit("setLessorDetailsHasError", true)
      console.log(err.response);
    }
  },
  async updateBusinessActivity({ commit, getters }, payload) {
    try {
      if(payload.length > 0){
        console.log(payload)
        let x = 0
        payload.forEach(element => {
            element.id = getters.businessActivities[x].id
            x++
        });
      }
      console.log('update',payload)
      const response = await axios.put(
        `${baseUrl}/api/business-activity/`,
        payload,
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err.response);
    }
  },
  async getBusinessActivity({commit, getters}){
    try {
      let payload = {application_number: getters.businessApplication.id}
      const response = await axios.get(`${baseUrl}/api/business-activity/`,{ withCredentials: true, params: payload })
      commit("setBusinessActivities", response.data);
    } catch (err) {
      console.log(err)
    }
  },
  async addApplicationRequirements({ commit, getters }, payload) {
    try {
      console.log(payload)
      const response = await axios.post(
        `${baseUrl}/api/application-requirements/`,
        payload,
        { withCredentials: true }
      );
      commit("setApplicationRequirements", response.data);
    } catch (err) {
      console.log(err.response);
    }
  },
  async uploadRequirements({ commit, getters }, payload) {
    try {
      commit("setIsUploading", true)
      const response = await axios.post(
        `${baseUrl}/api/file-upload/`,
        payload,
        { withCredentials: true }
      );
      commit("setIsUploading", false)
    } catch (err) {
      console.log(err.response);
    }
  },
  async getApplicationRequirements({ commit, getters }){
    try {
      let payload = {id:getters.applicationRequirements.id}
      const response = await axios.get(
        `${baseUrl}/api/application-requirements/`,
        { withCredentials: true, params: payload }
      );
      commit('setRequirements', response.data)
      console.log(response.data)
    } catch (err) {
      console.log(err.response);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
