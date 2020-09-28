import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;
const oneDocToken = process.env.VUE_APP_ONE_DOC_TOKEN;
import router from "../../router/index.js"
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
    businessProfiles: [],
    applicationRequirements: {},
    requirements: [],
    isUploading: false,
    draftBusiness: false,
    pageCount: 0,
    filterBy: 'all',
    isBusinessEnrollmentSuccess: false,
    typeOfOrganization: ''
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
  businessProfiles: (state) => state.businessProfiles,
  applicationRequirements: (state) => state.applicationRequirements,
  isUploading: (state) => state.isUploading,
  requirements: (state) => state.requirements,
  draftBusiness: (state) => state.draftBusiness,
  pageCount: (state) => state.pageCount,
  filterBy: (state) => state.filterBy,
  isBusinessEnrollmentSuccess: (state) => state.isBusinessEnrollmentSuccess,
  typeOfOrganization: ( state ) => state.typeOfOrganization
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
  setBusinessProfiles: (state, businessProfiles) => (state.businessProfiles = businessProfiles),
  setApplicationRequirements: (state, applicationRequirements) => (state.applicationRequirements = applicationRequirements),
  setIsUploading: (state, isUploading) => (state.isUploading = isUploading),
  setRequirements: (state, requirements) => (state.requirements = requirements),
  setDraftBusiness: (state, draftBusiness) => (state.draftBusiness = draftBusiness),
  setPageCount: (state, pageCount) => (state.pageCount = pageCount),
  setFilterBy: (state, filterBy) => (state.filterBy = filterBy),
  setIsBusinessEnrollmentSuccess: (state, isBusinessEnrollmentSuccess) => (state.isBusinessEnrollmentSuccess = isBusinessEnrollmentSuccess),
  setTypeOfOrganization: (state, typeOfOrganization) => (state.typeOfOrganization = typeOfOrganization)
};

const actions = {
  async businessEnrollment({commit, dispatch}, payload){
    let config = {
      headers: {
        'OneDoc-Token': oneDocToken,
        'Content-Type': 'application/json'
      },
    };
    console.log(oneDocToken, baseUrl)
    const response  = await axios.post(`http://122.55.20.85:8012/lguapi/`, payload, config)
    if (response.data.Response.Result.businessid){
      commit('setIsBusinessEnrollmentSuccess', true)
    }else{
      console.log('no record found')
      this.$swal({
        title: "Failed!",
        text:
          "No record found.",
        icon: "error",
      });
    }
  },
  async approveBusinessApplication({commit, dispatch, getters}, payload){
    try {
      const response = await axios.put(`${baseUrl}/staff/business-permit-application/`,
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
  async getAllBusinessApplications({commit, dispatch, getters},page = 1){
    try {
      console.log(getters.filterBy)
      const response = await axios.get(
        `${baseUrl}/staff/business-permit-application-list/?page=${page}&filter_by=${getters.filterBy}`,
        { withCredentials: true }
      );
      console.log(response.data)
      commit('setPageCount', response.data.total_pages)
      commit("setApplications",response.data.results)
    } catch (err) {
      console.log(err.response)
      commit('setLoading', false)
    }
  },  
  async getBusinessApplications({commit, dispatch, getters}){
    try {
      const response = await axios.get(
        `${baseUrl}/api/business-permit-application/`,
        { withCredentials: true }
      );
      commit("setApplications",response.data)
    } catch (err) {
      console.log(err.response)
      commit('setLoading', false)
    }
  },  
  async getBusinessProfiles({commit, dispatch, getters}){
    try {
      const response = await axios.get(
        `${baseUrl}/api/business-profile/`,
        { withCredentials: true }
      );
      commit("setBusinessProfiles",response.data)
    } catch (err) {
      console.log(err.response)
      commit('setLoading', false)
    }
  }, 
  async addBusinessApplication({ commit, dispatch, getters }, payload) {
    try {
      const response = await axios.post(
        `${baseUrl}/api/business-permit-application/`,
        payload,
        { withCredentials: true }
      );
      commit("setApplicationHasError", false)
      commit("setBusinessApplication", response.data);
      let errors = {key:'application',value:{}}
      commit("setStepOneErrors",errors)
    } catch (err) {
      commit("setApplicationHasError",true)
      let errors = {key:'application',value: err.response.data}
      commit("setStepOneErrors",errors)
      console.log(err.response);
      commit('setLoading', false)
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
      let errors = {key:'basic_information',value: {}}
      commit("setStepOneErrors",errors)
    } catch (err) {
      console.log(err.response);
      let errors = {key:'basic_information',value: err.response.data}
      commit("setStepOneErrors",errors)
      commit("setBasicInfoHasError", true)
      commit('setLoading', false)
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
      let errors = {key:'business_details',value: {}}
      commit("setStepTwoErrors",errors)
    } catch (err) {
      let errors = {key:'business_details',value: err.response.data}
      commit("setStepTwoErrors",errors)
      console.log(err.response);
      commit("setDetailsHasError", true)
      commit('setLoading', false)
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
      let errors = {key:'lessor_details',value: {}}
      commit("setStepTwoErrors",errors)
    } catch (err) {
      let errors = {key:'lessor_details',value: err.response.data}
      commit("setStepTwoErrors",errors)
      commit("setLessorDetailsHasError", true)
      console.log(err.response);
      commit('setLoading', false)
    }
  },
  async addBusinessActivity({ commit, getters, dispatch }, payload) {
    try {
      for (let item of payload) {
        item.application_number = getters.businessApplication.id;
      }
      const response = await axios.post(
        `${baseUrl}/api/business-activity/`,
        payload,
        { withCredentials: true }
      );
      dispatch('getBusinessActivity')
    } catch (err) {
      console.log(err.response);
      commit('setLoading', false)
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
      let errors = {key:'application',value: {}}
      commit("setStepOneErrors",errors)
    } catch (err) {
      console.log(err)
      let errors = {key:'application',value: err.response.data}
      commit("setStepOneErrors",errors)
      commit("setApplicationHasError", true)
      console.log(err.response);
      commit('setLoading', false)
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
      let errors = {key:'basic_information',value: {}}
      commit("setStepOneErrors",errors)
    } catch (err) {
      let errors = {key:'basic_information',value: err.response.data}
      commit("setStepOneErrors",errors)
      console.log(err);
      commit("setBasicInfoHasError", true)
      commit('setLoading', false)
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
      let errors = {key:'business_details',value: {}}
      commit("setStepTwoErrors",errors)
    } catch (err) {
      let errors = {key:'business_details',value: err.response.data}
      commit("setStepTwoErrors",errors)
      commit("setDetailsHasError", true)
      console.log(err.response);
      commit('setLoading', false)
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
      let errors = {key:'lessor_details',value: {}}
      commit("setStepTwoErrors",errors)
    } catch (err) {
      let errors = {key:'lessor_details',value: err.response.data}
      commit("setStepTwoErrors",errors)
      commit("setLessorDetailsHasError", true)
      console.log(err.response);
      commit('setLoading', false)
    }
  },
  async updateBusinessActivity({ commit, getters }, payload) {
    try {
      if(payload.length > 0){
        let x = 0
        payload.forEach(element => {
            element.id = getters.businessActivities[x].id
            x++
        });
      }
      const response = await axios.put(
        `${baseUrl}/api/business-activity/`,
        payload,
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err.response);
      commit('setLoading', false)
    }
  },
  async getBusinessActivity({commit, getters}){
    try {
      let payload = {application_number: getters.businessApplication.id}
      const response = await axios.get(`${baseUrl}/api/business-activity/`,{ withCredentials: true, params: payload })
      commit("setBusinessActivities", response.data);
    } catch (err) {
      console.log(err)
      commit('setLoading', false)
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
  async uploadRequirements({ commit, getters, dispatch}, payload) {
    try {
      commit("setLoading", true)
      const response = await axios.post(
        `${baseUrl}/api/file-upload/`,
        payload,
        { withCredentials: true }
      );
      commit("setLoading", false)
     await dispatch("getApplicationRequirements")
    } catch (err) {
      commit("setLoading", false)
      console.log(err.response);
      commit('setLoading', false)
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
    } catch (err) {
      console.log(err.response);
      commit('setLoading', false)
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
