<template>
  <div class="meta-container flex-wrap">
      <base-pdf-header />
      <div class="meta-form-body">
          <div class="meta-text-group flex-wrap">
              <div class="meta-text w6">
                  <strong>Date of Application : </strong><br>
                  August 09, 2020
              </div>
              <div class="meta-text w6">
                  <strong>DTI/SEC/CDA Registration No. : </strong><br>
                  Lorem Ipsum
              </div>
              <div class="meta-text w6">
                  <strong>Account No : </strong><br>
                  0215453698
              </div>
              <div class="meta-text w6">
                  <strong>DTI/SEC/CDA Date of Registration No. : </strong><br>
                  Lorem Ipsum
              </div>
              <div class="meta-text w6">
                  <strong>Type of Organization : </strong><br>
                  Lorem Ipsum
              </div>
              <div class="meta-text w2">
                  <strong>CTC No. : </strong><br>
                  1234
              </div>
              <div class="meta-text w2">
                  <strong>TIN : </strong><br>
                  0215453698
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import BasePdfHeader from "@/components/forms/BasePdfHeader"
export default {
    name: "DownloadableBusinessForm",
    components: {
        BasePdfHeader,
    },
}
</script>

<style lang="scss" scoped>
div.meta-container {
    width: 210mm;
    height: 297mm;
    width : 100%;
    background-color : #fff;
    div.meta-form-body {
        height: 100%;
        width: 100%;
        padding : 50px 30px;
        div.meta-text-group {
            width : 100%;
            div.meta-text {
                color: #2b2b2b;
                font-size : 12px;
                line-height : 1.6;
                padding: 7px 15px;
            }
            .w2 {
                width: calc( 16.6% - 30px );
                float : left;
            }
            .w3 {
                width: calc( 25% - 30px );
                float : left;
            }
            .w4 {
                width: calc( 33.33% - 30px );
                float : left;
            }
            .w6 {
                width : calc( 50% - 30px ); 
                float : left;
            }
            .w7 {
                width: calc( 58% - 30px );
                float : left;
            }
        }
    }
}
</style>