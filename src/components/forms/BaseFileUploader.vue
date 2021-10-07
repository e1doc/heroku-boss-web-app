<template>
  <div class="meta-upload-box flex-wrap">
    <div class="meta-label">{{ label }}</div>
    <div class="meta-desc" v-html="description">{{ description }}</div>
    <div class="meta-custom-upload" :class="{ 'has-error': hasError }">
      <form enctype="multipart/form-data" novalidate>
        <input
          :ref="fileLabel"
          type="file"
          :name="name"
          :accept="uploadType"
          @input="filesChange($event.target.name, $event.target.files)"
          :disabled="isUploading"
        />
        <!-- <div class="meta-text big">DRAG/CLICK TO UPLOAD YOUR FILE HERE</div> -->
        <div class="meta-text small">
          {{
            filename
              ? filename
              : properties.filename
              ? properties.filename
              : "DRAG/CLICK TO UPLOAD YOUR FILE HERE"
          }}
        </div>
      </form>

      <div class="upload-limit">Note: File size should not exceed 20mb.</div>
    </div>
  </div>
</template>

<script>
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;
import { mapGetters } from "vuex";
export default {
  name: "BaseFileUploader",
  props: {
    uploadType: {
      type: String,
      default: "image/*, application/pdf",
    },
    hasError: {
      type: Boolean,
      default: false,
      required: false,
    },
    label: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    properties: {
      type: Object,
      default() {
        return {};
      },
    },
    type: {
      type: String,
      default: "",
    },
    fileLabel: {
      type: String,
      default: "",
    },
    isEvaluation: {
      type: Boolean,
      default: false,
    },
    isPaymentDetails: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "file",
    },
  },
  data() {
    return {
      currentStatus: null,
      filename: "",
      connection: null,
      validImageTypes: ["image/gif", "image/jpeg", "image/png"],
    };
  },
  mounted() {
    this.$store.commit("setLoading", false);
    this.$store.commit("setClearFileInput", false);
    this.$store.commit("setIsFileReady", false);
    this.$store.commit("setCurrentEvaluationFile", new FormData());
    this.$store.commit("setIsFileUploadFailed", false);
  },
  computed: {
    ...mapGetters([
      "applicationRequirements",
      "isUploading",
      "buildingApplicationRequirements",
      "currentEvaluationFile",
      "isUploadSuccess",
      "isFileUploadFailed",
      "paymentDetails",
      "clearFileInput",
      "businessApplication",
    ]),
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  watch: {
    clearFileInput: {
      handler(newVal) {
        if (newVal) {
          this.clearInput();
          this.$store.commit("setClearFileInput", false);
        }
      },
    },
  },
  methods: {
    async save(formData) {
      this.$store.commit("setIsFileReady", true);
      if (!this.isEvaluation) {
        if (this.type === "business") {
          await this.$store.dispatch("uploadRequirements", formData);
        } else if (this.type === "property") {
          await this.$store.dispatch("uploadBuildingRequirements", formData);
        } else if (this.type === "business_permit") {
          await this.$store.dispatch("uploadBusinessPermit", formData);
        }
        if (this.isFileUploadFailed) {
          this.filename = "DRAG/CLICK TO UPLOAD YOUR FILE HERE";
        }
      } else {
        this.$store.commit("setCurrentEvaluationFile", formData);
      }
    },
    async initiateWebSocket() {
      console.log("Starting connection to WebSocket Server");
      this.connection = new WebSocket(
        "ws://localhost:8000/ws/building-file-upload/"
      );
    },
    async closeConnection() {
      this.connection.close();
    },
    async sendData(data) {
      this.connection.send(data);
    },
    async save2(formData) {
      try {
        this.initiateWebSocket();
        this.connection.onmessage = (event) => {
          this.sendData(formData);
          this.closeConnection();
        };

        this.connection.onopen = function (event) {
          console.log("Successfully connected to the api websocket server...");
        };

        this.connection.onclose = (event) => {
          console.log(event);
          console.log("successfull closed.");
        };
      } catch (err) {
        console.log(err);
      }
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      var formData = new FormData();
      if (!fileList.length) return;
      let payload = {};
      // append the files to FormData

      if (!this.isEvaluation) {
        let file = this.$refs[`${this.fileLabel}`];
        Array.from(Array(fileList.length).keys()).map((x) => {
          if (
            (this.uploadType === "application/pdf" &&
              fileList[x]["type"] === "application/pdf") ||
            (this.uploadType === "image/*, application/pdf" &&
              (this.validImageTypes.includes(fileList[x]["type"]) ||
                fileList[x]["type"] === "application/pdf"))
          ) {
            if (fileList[x].size <= 26214400) {
              this.filename = fileList[x].name;

              if (!this.isPaymentDetails) {
                formData.append(fieldName, fileList[x]);

                if (this.type !== "business_permit") {
                  let requirement_id =
                    this.type === "business"
                      ? this.applicationRequirements.id
                      : this.buildingApplicationRequirements.id;
                  formData.append("requirement_id", requirement_id);
                  formData.append("requirements_label", this.fileLabel);
                } else {
                  formData.append(
                    "application_id",
                    this.businessApplication.id
                  );
                }
                formData.append("filename", fileList[x].name);
                // payload.requirement_id = requirement_id;
                // payload.requirements_label = this.fileLabel;
                // payload.filename = fileList[x].name;
                // payload.file = fileList[x].file;
                this.save(formData);
              } else {
                let paymentFormData = this.paymentDetails;
                paymentFormData.append("filename", fileList[x].name);
                paymentFormData.append(fieldName, fileList[x]);
                this.$store.commit("setPaymentDetails", paymentFormData);
                this.$store.commit("setIsFileUploaded", true);
              }
            } else {
              this.clearInput();
              this.$swal({
                title: "File is too large!",
                text: "File size must not exceed 25mb.",
                icon: "error",
              });
            }
          } else {
            this.$swal({
              title: "Invalid file type!",
              text: "Please enter a valid file format.",
              icon: "error",
            });
          }
        });
      } else {
        Array.from(Array(fileList.length).keys()).map((x) => {
          if (
            (this.uploadType === "application/pdf" &&
              fileList[x]["type"] === "application/pdf") ||
            (this.uploadType === "image/*, application/pdf" &&
              (this.validImageTypes.includes(fileList[x]["type"]) ||
                fileList[x]["type"] === "application/pdf"))
          ) {
            if (fileList[x].size <= 26214400) {
              this.filename = fileList[x].name;
              formData.append(fieldName, fileList[x]);
              let requirement_id =
                this.type === "business"
                  ? this.applicationRequirements.id
                  : this.buildingApplicationRequirements.id;
              formData.append("filename", fileList[x].name);
              this.save(formData);
            } else {
              this.clearInput();
              this.$swal({
                title: "File is too large!",
                text: "File size must not exceed 25mb.",
                icon: "error",
              });
            }
          } else {
            this.$swal({
              title: "Invalid file type!",
              text: "Please enter a valid file format.",
              icon: "error",
            });
          }
        });
      }
      // save it
    },
    clearInput() {
      this.$refs[`${this.fileLabel}`].value = null;
      this.filename = "DRAG/CLICK TO UPLOAD YOUR FILE HERE";
    },
  },
};
</script>

<style lang="scss" scoped>
.meta-upload-box {
  width: 100%;
  .meta-label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .meta-desc {
    font-size: 14px;
    padding-left: 17px;
    margin-bottom: 18px;
    width: 100%;
  }
  .meta-custom-upload {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    padding: 15px 30px;
    margin: 0 0 30px 17px;
    border: 3px dashed #bce0fd;
    transition: 0.4s;
    input[type="file"] {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      height: 100%;
      width: 100%;
      opacity: 0;
      cursor: pointer;
    }
    .meta-text.big {
      color: #64b4f9;
      font-size: 30px;
      font-weight: 700;
      line-height: 1.6;
      text-transform: uppercase;
      width: 100%;
      text-align: center;
      transition: 0.4s;
    }
    .meta-text.small {
      color: #64b4f9;
      font-size: 15px;
      font-weight: 700;
      line-height: 1.6;
      transition: 0.4s;
    }
  }
}

.upload-limit {
  font-size: 14px;
  width: 100%;
  text-align: center;
  margin-top: 5px;
  color: #4886ba;
}

div.meta-container .meta-custom-upload:hover {
  border-color: #039be5;
}

div.meta-container .meta-custom-upload:hover div.meta-text {
  color: #039be5;
}

.meta-custom-upload.has-error,
.meta-custom-upload.has-error .meta-text {
  border-color: #e23a36;
  color: #e23a36 !important;
}

/*
MOBILE RESPONSIVENESS 
--------------------------------------------------------------*/

@media only screen and (max-width: 768px) {
  .meta-upload-box .meta-label {
    font-size: 15px;
  }

  .meta-upload-box .meta-custom-upload .meta-text.small {
    font-size: 13px;
  }
}

@media only screen and (max-width: 480px) {
  .meta-upload-box .meta-label {
    font-size: 13px;
  }

  .meta-upload-box .meta-desc {
    font-size: 12px;
    margin-bottom: 15px;
  }
  .meta-upload-box .meta-custom-upload .meta-text.small {
    font-size: 12px;
    text-align: center;
  }
}
</style>
