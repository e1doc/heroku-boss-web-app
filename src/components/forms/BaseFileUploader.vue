<template>
  <div class="meta-upload-box flex-wrap">
    <div class="meta-label">{{ label }}</div>
    <div class="meta-desc" v-html="description">{{ description }}</div>
    <div class="meta-custom-upload">
      <form enctype="multipart/form-data" novalidate>
        <input
          type="file"
          name="file"
          accept="image/*"
          @change="filesChange($event.target.name, $event.target.files)"
          :disabled="isUploading"
        />
        <!-- <div class="meta-text big">DRAG/CLICK TO UPLOAD YOUR FILE HERE</div> -->
        <div class="meta-text small" v-if="!isUploading">
          {{
            filename ? filename  : properties.filename ? properties.filename : "DRAG/CLICK TO UPLOAD YOUR FILE HERE" 
          }}
        </div>
         <div class="meta-text small" v-if="isUploading">
            Uploading...
        </div>
      </form>
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
    label: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    properties:{
        type: Object,
        default() {
            return {}
        }
    },
    type:{
        type: String,
        default: ""
    },
    fileLabel:{
      type: String,
      default: ""
    }
  },
  data() {
    return {
      currentStatus: null,
      filename: "",
    };
  },
  computed: {
    ...mapGetters(['applicationRequirements','isUploading','buildingApplicationRequirements']),
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
  methods: {
    save(formData) {
      console.log(formData);
      if(this.type === 'business'){
        this.$store.dispatch("uploadRequirements", formData)
      }else if(this.type === 'property'){
        this.$store.dispatch("uploadBuildingRequirements", formData)
      }
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      var formData = new FormData();
      if (!fileList.length) return;

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x) => {
        this.filename = fileList[x].name;
        formData.append(fieldName, fileList[x])
        let requirement_id = this.type === 'business' ? this.applicationRequirements.id : this.buildingApplicationRequirements.id
        formData.append('requirement_id', requirement_id)
        formData.append('requirements_label', this.fileLabel)
        formData.append('filename',fileList[x].name)
      });
      // save it
      this.save(formData);
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

div.meta-container .meta-custom-upload:hover {
  border-color: #039be5;
}

div.meta-container .meta-custom-upload:hover div.meta-text {
  color: #039be5;
}


/*
MOBILE RESPONSIVENESS 
--------------------------------------------------------------*/

@media only screen and ( max-width : 768px ){
    .meta-upload-box .meta-label{
        font-size: 15px;
    }

    .meta-upload-box .meta-custom-upload .meta-text.small{
        font-size: 13px;
    }
}

@media only screen and ( max-width: 480px ){
    .meta-upload-box .meta-label{
        font-size: 13px;
    }

    .meta-upload-box .meta-desc{
        font-size: 12px;
        margin-bottom: 15px;
    }
    .meta-upload-box .meta-custom-upload .meta-text.small{
        font-size: 12px;
        text-align: center;
    }
}
</style>
