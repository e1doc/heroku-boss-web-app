<template>
  <div class="meta-container flex-center">
    <h1 class="meta-form-title">Upload your Requirements</h1>
    <div
      class="meta-note"
    >Almost Done! Please upload your file. Only allowed format - jpg, jpeg, png or pdf file.</div>
    <base-file-uploader
      label="1. Latest Business Permit"
      description="
          <ul class='main-list'>
              <li> Basis for computing taxes, fees, and charges {e.g. Income Tax Returns (2019 BIR 1701) or monthly percentage return (2018&2019 BIR 2551M) or quarterly value-added tax return (2018&2019 BIR 2550Q) or quarterly sales summary or the Audited Financial Statement}.</br> </br>
              Note:
                  <ul class='sub-list'>
                      <li> Itemized gross sales of all branches for business establishments with multiple locations.</li>
                      <li> Please upload 2018 BIR 1701 or  ITR if possible.</li>
                  </ul>
              </li>
          </ul>"
      v-model="businesspermit"
    />
    <base-file-uploader
      label="5. One Goverment issued ID"
      name="governmentid"
      v-model="governmentid"
    />
    <div class="meta-form-group button-left-right">
      <button-block class="back-button">BACK</button-block>
      <button-block class="next-button">NEXT</button-block>
    </div>
  </div>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock";
import BaseFileUploader from "@/components/forms/BaseFileUploader";
import BaseSelect from "@/components/forms/BaseSelect";
export default {
  name: "BusinessRenewalUploadStep",
  components: {
    ButtonBlock,
    BaseFileUploader,
    BaseSelect,
  },
};
</script>

<style lang="scss" scoped>
div.meta-container {
  width: 100%;
  padding: 50px;
  background-color: #eaf6ff;
  border-radius: 20px;
  h1.meta-form-title {
    margin-bottom: 40px;
  }
  .meta-note {
    font-size: 16px;
    color: #7ac0fa;
    margin-bottom: 30px;
  }
  .meta-custom-upload {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 3px dashed #bce0fd;
    padding: 50px 30px;
    margin-bottom: 30px;
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
      font-size: 18px;
      font-weight: 700;
      line-height: 1.6;
      transition: 0.4s;
    }
  }
  div.button-left-right {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .back-button {
      background-color: #73befc;
      border-color: #73befc;
    }
  }
}

div.meta-container .meta-custom-upload:hover {
  border-color: #039be5;
}

div.meta-container .meta-custom-upload:hover div.meta-text {
  color: #039be5;
}

.back-button:hover {
  background-color: #2699fb !important;
  color: #fff !important;
  border-color: #2699fb !important;
}




@media only screen and ( max-width : 1380px ){
    div.meta-container h1.meta-form-title{
        font-size: 22px;
    }
}
</style>