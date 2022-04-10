import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;
const oneDocToken = process.env.VUE_APP_ONE_DOC_TOKEN;
const lguLocalEndpoint = process.env.VUE_APP_LGU_LOCAL_ENDPOINT;
const CancelToken = axios.CancelToken;
let source = CancelToken.source();
import router from "../../router/index.js";
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
      payment_details: [],
      application: [],
      basic_information: [],
    },
    stepTwoErrors: {
      business_details: [],
      lessor_details: [],
    },
    applications: [],
    businessProfiles: [],
    applicationRequirements: {},
    requirements: [],
    isUploading: false,
    draftBusiness: false,
    pageCount: 0,
    filterBy: "all",
    isBusinessEnrollmentSuccess: false,
    typeOfOrganization: "",
    currentBusinessId: 0,
    businessSearch: "",
    businessAssessmentMessage: "",
    businessAssessmentResult: [],
    businessDeptCanAssess: false,
    isLastBusinessDept: false,
    forBusinessAssessmentList: [],
    assessedBusinessList: [],
    currentSelectedBusiness: {},
    isBusinessAssessment: false,
    assessmentPayload: {},
    activityErrors: {},
    showActionButtons: true,
    businessPageNum: 1,
    businessPermits: [],
    businessAssessmentSearch: "",
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
  typeOfOrganization: (state) => state.typeOfOrganization,
  currentBusinessId: (state) => state.currentBusinessId,
  businessSearch: (state) => state.businessSearch,
  businessAssessmentMessage: (state) => state.businessAssessmentMessage,
  businessAssessmentResult: (state) => state.businessAssessmentResult,
  businessDeptCanAssess: (state) => state.businessDeptCanAssess,
  isLastBusinessDept: (state) => state.isLastBusinessDept,
  forBusinessAssessmentList: (state) => state.forBusinessAssessmentList,
  assessedBusinessList: (state) => state.assessedBusinessList,
  currentSelectedBusiness: (state) => state.currentSelectedBusiness,
  isBusinessAssessment: (state) => state.isBusinessAssessment,
  assessmentPayload: (state) => state.assessmentPayload,
  activityErrors: (state) => state.activityErrors,
  showActionButtons: (state) => state.showActionButtons,
  businessPageNum: (state) => state.businessPageNum,
  businessPermits: (state) => state.businessPermits,
  businessAssessmentSearch: (state) => state.businessAssessmentSearch,
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
  setApplicationHasError: (state, applicationHasError) =>
    (state.applicationHasError = applicationHasError),
  setBasicInfoHasError: (state, basicInfoHasError) =>
    (state.basicInfoHasError = basicInfoHasError),
  setDetailsHasError: (state, detailsHasError) =>
    (state.detailsHasError = detailsHasError),
  setLessorDetailsHasError: (state, lessorDetailsHasError) =>
    (state.lessorDetailsHasError = lessorDetailsHasError),
  setStepOneErrors: (state, stepOneErrors) => {
    state.stepOneErrors[`${stepOneErrors.key}`] = stepOneErrors.value;
  },
  setStepTwoErrors: (state, stepTwoErrors) => {
    state.stepTwoErrors[`${stepTwoErrors.key}`] = stepTwoErrors.value;
  },
  setApplications: (state, applications) => (state.applications = applications),
  setBusinessProfiles: (state, businessProfiles) =>
    (state.businessProfiles = businessProfiles),
  setApplicationRequirements: (state, applicationRequirements) =>
    (state.applicationRequirements = applicationRequirements),
  setIsUploading: (state, isUploading) => (state.isUploading = isUploading),
  setRequirements: (state, requirements) => (state.requirements = requirements),
  setDraftBusiness: (state, draftBusiness) =>
    (state.draftBusiness = draftBusiness),
  setPageCount: (state, pageCount) => (state.pageCount = pageCount),
  setFilterBy: (state, filterBy) => (state.filterBy = filterBy),
  setIsBusinessEnrollmentSuccess: (state, isBusinessEnrollmentSuccess) =>
    (state.isBusinessEnrollmentSuccess = isBusinessEnrollmentSuccess),
  setTypeOfOrganization: (state, typeOfOrganization) =>
    (state.typeOfOrganization = typeOfOrganization),
  setCurrentBusinessId: (state, currentBusinessId) =>
    (state.currentBusinessId = currentBusinessId),
  setBusinessSearch: (state, businessSearch) =>
    (state.businessSearch = businessSearch),
  setBusinessAssessmentMessage: (state, businessAssessmentMessage) =>
    (state.businessAssessmentMessage = businessAssessmentMessage),
  setBusinessAssessmentResult: (state, businessAssessmentResult) =>
    (state.businessAssessmentResult = businessAssessmentResult),
  setBusinessDeptCanAssess: (state, businessDeptCanAssess) =>
    (state.businessDeptCanAssess = businessDeptCanAssess),
  setIsLastBusinessDept: (state, isLastBusinessDept) =>
    (state.isLastBusinessDept = isLastBusinessDept),
  setForBusinessAssessmentList: (state, forBusinessAssessmentList) =>
    (state.forBusinessAssessmentList = forBusinessAssessmentList),
  setAssessedBusinessList: (state, assessedBusinessList) =>
    (state.assessedBusinessList = assessedBusinessList),
  setCurrentSelectedBusiness: (state, currentSelectedBusiness) =>
    (state.currentSelectedBusiness = currentSelectedBusiness),
  setIsBusinessAssessment: (state, isBusinessAssessment) =>
    (state.isBusinessAssessment = isBusinessAssessment),
  setAssessmentPayload: (state, assessmentPayload) =>
    (state.assessmentPayload = assessmentPayload),
  setActivityErrors: (state, activityErrors) =>
    (state.activityErrors = activityErrors),
  setShowActionButtons: (state, showActionButtons) =>
    (state.showActionButtons = showActionButtons),
  setBusinessPageNum: (state, businessPageNum) =>
    (state.businessPageNum = businessPageNum),
  setBusinessPermits: (state, businessPermits) =>
    (state.businessPermits = businessPermits),
  setBusinessAssessmentSearch: (state, businessAssessmentSearch) =>
    (state.businessAssessmentSearch = businessAssessmentSearch),
};

const actions = {
  async getBusinessApplication({ commit, dispatch, getters }, payload) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/business-application?application_number=${payload}`,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );

      let application = {
        id: response.data.id,
        created_at: response.data.created_at,
        is_draft: response.data.is_draft,
        is_approve: response.data.is_approve,
        is_disapprove: response.data.is_disapprove,
        account_number: response.data.account_number,
        application_status: response.data.business_application,
      };
      await commit("setBusinessApplication", application);
      await commit(
        "setBusinessBasicInformation",
        response.data.businessbasicinformation
      );
      await commit("setBusinessDetails", response.data.businessdetails);
      await commit("setLessorDetails", response.data.lessordetails);
      // let activeBusinessActivities = [];

      // response.data.businessactivity.forEach((item) => {
      //   if (item.is_active) {
      //     activeBusinessActivities.push(item);
      //   }
      // });
      await dispatch("getBusinessActivityRenewal", response.data.id);
      // await commit("setBusinessActivities", activeBusinessActivities);
      if (response.data.on_renewal) {
        await dispatch("getBusinessRequirementRenewal", response.data.id);
        await router.push({ name: "BusinessRenewal" });
      } else {
        await commit(
          "setApplicationRequirements",
          response.data.businessapplicationrequirements[0]
        );
        await router.push({ name: "BusinessPermitApplication" });
      }
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  },
  async businessEnrollment({ commit, dispatch, getters }, payload) {
    let config = {
      headers: {
        "OneDoc-Token": oneDocToken,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(`${lguLocalEndpoint}`, payload, config);
    if (response.data.Status === "Success") {
      commit("setIsBusinessEnrollmentSuccess", true);
    } else {
      this.$swal({
        title: "Failed!",
        text: response.data.Message,
        icon: "error",
      });
    }
  },
  async approveBusinessApplication({ commit, dispatch, getters }, payload) {
    try {
      await commit("setLoading", true);
      const response = await axios.put(
        `${baseUrl}/staff/business-permit-application/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      let action =
        payload.status == 1
          ? "incomplete"
          : payload.status == 2
          ? "for assessment"
          : payload.status == 3
          ? "for compliance"
          : payload.status == 4
          ? "for payment"
          : "";

      await dispatch("createPrompt", {
        type: "success",
        title: "Success!",
        message: `Application was successfully set to ${action}!`,
      });
      await commit("setLoading", false);
      router.push({ name: "Applications" });
    } catch (err) {
      console.log(err);
      commit("setLoading", false);
    }
  },
  async getAllBusinessApplications({ commit, dispatch, getters }, page = 1) {
    try {
      const response = await axios.get(
        `${baseUrl}/staff/business-permit-application-list/?page=${page}&filter_by=${getters.filterBy}&id=${getters.businessSearch}`,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      await commit("setPageCount", response.data.total_pages);
      await commit("setApplications", response.data.results);
    } catch (err) {
      console.log(err.response);
      commit("setLoading", false);
    }
  },
  async getBusinessApplications({ commit, dispatch, getters }, page = 1) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/user-business-application-list/?page=${page}`,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      await commit("setApplications", response.data.results);
      await commit("setPageCount", response.data.total_pages);
    } catch (err) {
      console.log(err.response);
      await commit("setLoading", false);
    }
  },
  async getBusinessProfiles({ commit, dispatch, getters }) {
    try {
      const response = await axios.get(`${baseUrl}/api/business-profile/`, {
        headers: { Authorization: `jwt ${getters.authToken}` },
      });
      commit("setBusinessProfiles", response.data);
    } catch (err) {
      console.log(err.response);
      commit("setLoading", false);
    }
  },
  async addBusinessApplication({ commit, dispatch, getters }, payload) {
    try {
      const response = await axios.post(
        `${baseUrl}/api/business-permit-application/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      await commit("setApplicationHasError", false);
      await commit("setBusinessApplication", response.data);
      let errors = { key: "application", value: {} };
      await commit("setStepOneErrors", errors);
    } catch (err) {
      await commit("setApplicationHasError", true);
      let errors = { key: "application", value: err.response.data };
      await commit("setStepOneErrors", errors);
      console.log(err.response);
      await commit("setLoading", false);
    }
  },
  async addBusinessBasicInformation({ commit, getters }, payload) {
    try {
      payload.application_number = getters.businessApplication.id;
      const response = await axios.post(
        `${baseUrl}/api/business-basic-information/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      await commit("setBasicInfoHasError", false);
      await commit("setBusinessBasicInformation", response.data);
      let errors = { key: "basic_information", value: {} };
      await commit("setStepOneErrors", errors);
    } catch (err) {
      console.log(err.response);
      let errors = { key: "basic_information", value: err.response.data };
      await commit("setStepOneErrors", errors);
      console.log(errors);
      await commit("setBasicInfoHasError", true);
      await commit("setLoading", false);
    }
  },
  async addBusinessDetails({ commit, getters }, payload) {
    try {
      payload.application_number = getters.businessApplication.id;
      const response = await axios.post(
        `${baseUrl}/api/business-details/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      commit("setDetailsHasError", false);
      commit("setBusinessDetails", response.data);
      let errors = { key: "business_details", value: {} };
      commit("setStepTwoErrors", errors);
    } catch (err) {
      let errors = { key: "business_details", value: err.response.data };
      commit("setStepTwoErrors", errors);
      console.log(err.response);
      commit("setDetailsHasError", true);
      commit("setLoading", false);
    }
  },
  async addLessorDetails({ commit, getters }, payload) {
    try {
      payload.application_number = getters.businessApplication.id;
      const response = await axios.post(
        `${baseUrl}/api/business-lessor-details/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      commit("setLessorDetailsHasError", false);
      commit("setLessorDetails", response.data);
      let errors = { key: "lessor_details", value: {} };
      commit("setStepTwoErrors", errors);
    } catch (err) {
      let errors = { key: "lessor_details", value: err.response.data };
      commit("setStepTwoErrors", errors);
      commit("setLessorDetailsHasError", true);
      console.log(err.response);
      commit("setLoading", false);
    }
  },
  async addBusinessActivity({ commit, getters, dispatch }, payload) {
    try {
      for (let item of payload) {
        item.capitalization = item.capitalization.toString().replace(/,/g, "");
        item.capitalization = item.capitalization.split(".")[0];
        item.units === "" ? (item.units = 1) : (item.units = item.units);
        if (
          item.application_number == "" ||
          item.application_number == null ||
          item.application_number == undefined
        ) {
          item.application_number = getters.businessApplication.id;
        }
      }
      const response = await axios.post(
        `${baseUrl}/api/business-activity/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      await dispatch("getBusinessActivity");
    } catch (err) {
      err.response ? console.log(err.response) : console.log(err);
      commit("setLoading", false);
    }
  },
  async addRenewBusinessActivity({ commit, getters, dispatch }, payload) {
    try {
      const response = await axios.post(
        `${baseUrl}/api/business-activity/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
    } catch (err) {
      err.response ? console.log(err.response) : console.log(err);
    }
  },
  async updateBusinessApplication({ commit, getters }, payload) {
    try {
      payload.id = getters.businessApplication.id;
      const response = await axios.put(
        `${baseUrl}/api/business-permit-application/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      await commit("setApplicationHasError", false);
      await commit("setBusinessApplication", response.data);
      let errors = { key: "application", value: {} };
      await commit("setStepOneErrors", errors);
    } catch (err) {
      console.log(err);
      let errors = { key: "application", value: err.response.data };
      await commit("setStepOneErrors", errors);
      await commit("setApplicationHasError", true);
      console.log(err.response);
      await commit("setLoading", false);
    }
  },
  async updateBusinessBasicInformation({ commit, getters }, payload) {
    try {
      payload.id = getters.businessBasicInformation.id;
      const response = await axios.put(
        `${baseUrl}/api/business-basic-information/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      await commit("setBasicInfoHasError", false);
      await commit("setBusinessBasicInformation", response.data);
      let errors = { key: "basic_information", value: {} };
      await commit("setStepOneErrors", errors);
    } catch (err) {
      let errors = { key: "basic_information", value: err.response.data };
      await commit("setStepOneErrors", errors);
      err.response ? console.log(err.response.data) : console.log(err);
      await commit("setBasicInfoHasError", true);
      await commit("setLoading", false);
    }
  },
  async updateBusinessDetails({ commit, getters }, payload) {
    try {
      payload.id = getters.businessDetails.id;
      const response = await axios.put(
        `${baseUrl}/api/business-details/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      commit("setBusinessDetails", response.data);
      commit("setDetailsHasError", false);
      let errors = { key: "business_details", value: {} };
      commit("setStepTwoErrors", errors);
    } catch (err) {
      let errors = { key: "business_details", value: err.response.data };
      commit("setStepTwoErrors", errors);
      commit("setDetailsHasError", true);
      console.log(err.response);
      commit("setLoading", false);
    }
  },
  async updateLessorDetails({ commit, getters }, payload) {
    try {
      payload.id = getters.lessorDetails.id;
      const response = await axios.put(
        `${baseUrl}/api/business-lessor-details/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      commit("setLessorDetailsHasError", false);
      commit("setLessorDetails", response.data);
      let errors = { key: "lessor_details", value: {} };
      commit("setStepTwoErrors", errors);
    } catch (err) {
      let errors = { key: "lessor_details", value: err.response.data };
      commit("setStepTwoErrors", errors);
      commit("setLessorDetailsHasError", true);
      console.log(err.response);
      commit("setLoading", false);
    }
  },
  async updateBusinessActivity({ commit, getters }, payload) {
    try {
      if (payload.length > 0) {
        let x = 0;
        payload.forEach((element) => {
          element.capitalization = element.capitalization
            .toString()
            .replace(/,/g, "");
          element.capitalization = element.capitalization.split(".")[0];
          element.id = getters.businessActivities[x].id;
          x++;
        });
      }
      const response = await axios.put(
        `${baseUrl}/api/business-activity/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
    } catch (err) {
      console.log(err.response);
      commit("setLoading", false);
    }
  },
  async getBusinessActivity({ commit, getters }) {
    try {
      let payload = { application_number: getters.businessApplication.id };
      const response = await axios.get(`${baseUrl}/api/business-activity/`, {
        headers: { Authorization: `jwt ${getters.authToken}` },
        params: payload,
      });
      let activeBusinessActivities = [];
      console.log(response.data);
      response.data.forEach((item) => {
        if (item.is_active || item.remarks_draft) {
          activeBusinessActivities.push(item);
        }
      });
      commit("setBusinessActivities", activeBusinessActivities);
    } catch (err) {
      console.log(err);
      commit("setLoading", false);
    }
  },
  async addApplicationRequirements({ commit, getters }, payload) {
    try {
      const response = await axios.post(
        `${baseUrl}/api/application-requirements/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      commit("setApplicationRequirements", response.data);
    } catch (err) {
      console.log(err.response);
    }
  },
  async uploadRequirements({ commit, getters, dispatch }, payload) {
    try {
      commit("setLoading", true);
      const response = await axios.post(
        `${baseUrl}/api/file-upload/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      commit("setLoading", false);
      await dispatch("getApplicationRequirements");
    } catch (err) {
      commit("setLoading", false);
      commit("setIsFileUploadFailed", true);
      console.log(err.response);
      dispatch("createPrompt", {
        type: "error",
        title: "Failed!",
        message: "Something went wrong! Please try again later.",
      });
    }
  },
  async getApplicationRequirements({ commit, getters }) {
    try {
      let payload = { id: getters.applicationRequirements.id };
      const response = await axios.get(
        `${baseUrl}/api/application-requirements/`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
          params: payload,
        }
      );
      response.data.requirements = response.data.requirements.filter(
        (item) => item.is_active == true
      );
      commit("setRequirements", response.data);
    } catch (err) {
      console.log(err.response);
      commit("setLoading", false);
    }
  },
  async assessBusinessApplication({ commit, getters, dispatch }, payload) {
    try {
      await commit("setLoading", true);
      const response = await axios.post(
        `${baseUrl}/staff/business-dept-assessment`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );

      if (!getters.isLastBusinessDept) {
        await commit("setBusinessAssessmentMessage", response.data.message);
      }

      await commit("setIsAssessmentHasError", false);
      await commit("setAssessmentPayload", {});
      await commit("setLoading", false);
    } catch (err) {
      await commit("setLoading", false);
      await commit("setIsAssessmentHasError", true);
      console.log(err);
      if (err.response) {
        console.log(err.response);
        dispatch("createPrompt", {
          type: "error",
          title: "Failed!",
          message: err.response.data.detail,
        });
        router.push({ name: "Assessments" });
      }
    }
  },
  async getBusinessAssessmentResult({ commit, getters }, payload) {
    try {
      const response = await axios.get(
        `${baseUrl}/staff/business-dept-assessment`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
          params: payload,
        }
      );
      commit("setBusinessAssessmentResult", response.data);
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response);
      }
    }
  },
  async checkBusinessDeptCanAssess({ commit, getters }, payload) {
    try {
      const response = await axios.get(
        `${baseUrl}/staff/check-business-dept-if-can-assess`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
          params: payload,
        }
      );
      commit("setBusinessDeptCanAssess", response.data.can_assess);
      commit("setIsLastBusinessDept", response.data.last_department);
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response);
      }
    }
  },
  async getForBusinessAssessmentList({ commit, getters }, page = 1) {
    try {
      source && source.cancel("Operation canceled due to new request.");
      source = axios.CancelToken.source();
      const response = await axios.get(
        `${baseUrl}/staff/for-business-assessment-list?page=${page}&search=${getters.businessAssessmentSearch}`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
          cancelToken: source.token,
        }
      );
      await commit("setPageCount", response.data.total_pages);
      await commit("setForBusinessAssessmentList", response.data.results);
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response.data);
      }
    }
  },
  async getAssessedBusinessList({ commit, getters }, page = 1) {
    try {
      source && source.cancel("Operation canceled due to new request.");
      source = axios.CancelToken.source();
      const response = await axios.get(
        `${baseUrl}/staff/assessed-business-application-list?page=${page}&search=${getters.businessAssessmentSearch}`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
          cancelToken: source.token,
        }
      );
      await commit("setAssessedBusinessList", response.data.results);
      await commit("setPageCount", response.data.total_pages);
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response.data);
      }
    }
  },
  async resetBusinessAssessment({ commit, getters }, payload) {
    try {
      const response = await axios.put(
        `${baseUrl}/staff/reset-business-assessment`,
        payload,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
        }
      );
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response.data);
      }
    }
  },
  async getUserBusinessAssessmentResult({ commit, getters }, payload) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/business-assessment-result/`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
          params: payload,
        }
      );
      commit("setBusinessAssessmentResult", response.data);
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response);
      }
    }
  },
  async getBusinessActivityRenewal({ commit, getters }, payload) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/business-activity-renewal?application_number=${payload}`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
        }
      );
      await commit("setBusinessActivities", response.data);
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response.data);
      }
    }
  },
  async getBusinessRequirementRenewal({ commit, getters, dispatch }, payload) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/business-requirement-renewal?application_number=${payload}`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
        }
      );
      if (response.data.length < 1) {
        let requirements_payload = {
          application_id: payload,
          is_active: false,
          is_draft: true,
        };
        await dispatch("addApplicationRequirements", requirements_payload);
      } else {
        await commit("setApplicationRequirements", response.data[0]);
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response.data);
      }
    }
  },
  async getBusinessActiveRequirement({ commit, getters }) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/business-active-requirements?application_number=${getters.businessApplication.id}`,
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
        }
      );
      console.log(response.data);
      await commit("setApplicationRequirements", response.data[0]);
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response.data);
      }
    }
  },
  async renewBusinessApplication({ commit, getters }) {
    try {
      const response = await axios.post(
        `${baseUrl}/api/renew-business-application/`,
        { application_number: getters.businessApplication.id },
        {
          headers: { Authorization: `jwt ${getters.authToken}` },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response.data);
      }
    }
  },
  async uploadBusinessPermit({ commit, getters, dispatch }, payload) {
    try {
      await commit("setLoading", true);
      const response = await axios.post(
        `${baseUrl}/staff/business-permit/`,
        payload,
        { headers: { Authorization: `jwt ${getters.authToken}` } }
      );
      await commit("setLoading", false);
      await dispatch("getBusinessPermit");
    } catch (err) {
      await commit("setLoading", false);
      await commit("setIsFileUploadFailed", true);
      console.log(err.response);
      await dispatch("createPrompt", {
        type: "error",
        title: "Failed!",
        message: "Something went wrong! Please try again later.",
      });
    }
  },

  async getBusinessPermit({ commit, getters, dispatch }) {
    try {
      let payload = { id: getters.businessApplication.id };
      const response = await axios.get(`${baseUrl}/staff/business-permit`, {
        headers: { Authorization: `jwt ${getters.authToken}` },
        params: payload,
      });
      console.log(response.data);
      await commit("setBusinessPermits", response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
