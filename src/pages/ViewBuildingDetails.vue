<template>
  <div class="meta-parent-box">
    <div class="meta-container flex-wrap" ref="content">
      <div class="meta-form-body flex-wrap">
        <h1 class="meta-form-title">Building Application Details</h1>
        
      <!-- Owner / Applicant : -->
      <div class="meta-text-group flex-wrap">
        <div class="meta-group-title">Owner / Applicant :</div>
        <div class="meta-text w3 no-br">
          <div class="meta-label">Last Name :</div>
          <div class="meta-value">Lorem Ipsum</div>
        </div>
        <div class="meta-text w3 no-br">
          <div class="meta-label">First Name :</div>
          <div class="meta-value">Lorem Ipsum</div>
        </div>
        <div class="meta-text w3 no-br">
          <div class="meta-label">Middle Initial :</div>
          <div class="meta-value">Lorem Ipsum</div>
        </div>
        <div class="meta-text w3">
          <div class="meta-label">TIN :</div>
          <div class="meta-value">Lorem Ipsum</div>
        </div>
      </div>

      <!-- Name of President/Treasurer of Corporation : -->
      <div class="meta-text-group flex-wrap">
        <div class="meta-group-title">
          For Construction Owned by an Enterprise :
        </div>
        <div class="meta-text">
          <div class="meta-label">Form of Ownership</div>
          <div class="meta-value">Lorem Ipsum</div>
        </div>
      </div>

      <!-- Business Address -->
      <div class="meta-text-group flex-wrap">
        <div class="meta-group-title">Location of Construction :</div>
        <div class="meta-text w3 no-br no-bb">
          <div class="meta-label">Lot No. :</div>
          <div class="meta-value">0001</div>
        </div>
        <div class="meta-text w3 no-br no-bb">
          <div class="meta-label">Blk No. :</div>
          <div class="meta-value">052</div>
        </div>
        <div class="meta-text w3 no-br no-bb">
          <div class="meta-label">TCT No. :</div>
          <div class="meta-value">5246</div>
        </div>
        <div class="meta-text w3 no-bb">
          <div class="meta-label">Tax Dec. No. :</div>
          <div class="meta-value">5246523</div>
        </div>

        <div class="clearfix"></div>

        <div class="meta-text w4 no-br no-bb">
          <div class="meta-label">Street :</div>
          <div class="meta-value">Jose P Street</div>
        </div>
        <div class="meta-text w4 no-br no-bb">
          <div class="meta-label">Barangay :</div>
          <div class="meta-value">Katipunan</div>
        </div>
        <div class="meta-text w4 no-bb">
          <div class="meta-label">City / Province:</div>
          <div class="meta-value">Bacoor City, Cavite</div>
        </div>

        <div class="clearfix"></div>

        <div class="meta-text no-bb">
          <div class="meta-label">Scope of Work :</div>
          <div class="meta-value">New Construction</div>
        </div>
        <div class="meta-text">
          <div class="meta-label">Use or Character of Occupancy</div>
          <div class="meta-value">Grouop E : Business and Mercantile</div>
        </div>
      </div>

      <!-- Other Details -->
      <div class="meta-text-group flex-wrap">
        <div class="meta-text w6 no-br no-bb">
          <div class="meta-label">Occupancy Classified:</div>
          <div class="meta-value">Lorem Ipsum</div>
        </div>
        <div class="meta-text w6 no-bb">
          <div class="meta-label">Total Estimated Cost :</div>
          <div class="meta-value">P 1,000,000.00</div>
        </div>
        <div class="meta-text w6 no-br no-bb">
          <div class="meta-label">Number of Units :</div>
          <div class="meta-value">205</div>
        </div>
        <div class="meta-text w6 no-bb">
          <div class="meta-label">Proposed Date of Construction :</div>
          <div class="meta-value">September 15, 2020</div>
        </div>
        <div class="meta-text no-bb">
          <div class="meta-label">Total Floor Area :</div>
          <div class="meta-value">1,500 square meters</div>
        </div>
        <div class="meta-text">
          <div class="meta-label">Lot Area :</div>
          <div class="meta-value">1,000 square meters</div>
        </div>
      </div>

      <!-- Uploaded Requirements -->
      <div class="meta-text-group flex-wrap">
          <div class="meta-group-title">Uploaded Requirements</div>
          <div class="gallery-box flex-wrap">
              <div class="gallery-image" @click="showSingle" style="background-image: url('https://via.placeholder.com/450.png/fff');"></div>
              <div class="gallery-image" @click="showSingle" style="background-image: url('https://via.placeholder.com/450.png/fff');"></div>
              <div class="gallery-image" @click="showSingle" style="background-image: url('https://via.placeholder.com/450.png/fff');"></div>
              <div class="gallery-image" @click="showSingle" style="background-image: url('https://via.placeholder.com/450.png/fff');"></div>
              <div class="gallery-image" @click="showSingle" style="background-image: url('https://via.placeholder.com/450.png/fff');"></div>
              <div class="gallery-image" @click="showSingle" style="background-image: url('https://via.placeholder.com/450.png/fff');"></div>
              <vue-easy-lightbox
                escDisabled
                moveDisabled
                :visible="visible"
                :imgs="imgs"
                :index="index"
                @hide="handleHide"
              ></vue-easy-lightbox>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'
import ButtonBlock from "@/components/ButtonBlock";
export default {
  name: "ViewBuildingDetails",
      components: {
        VueEasyLightbox,
        ButtonBlock
    },
    data() {
        return {
        imgs: '',  // Img Url , string or Array of string
        visible: false,
        index: 0   // default: 0
        }
    },
    methods: {
        showSingle() {
        this.imgs =[{ title: 'Requirements Label', src: 'https://via.placeholder.com/450.png/fff' }] 
        this.show()
        },
        show() {
        this.visible = true
        },
        handleHide() {
        this.visible = false
        }
    }
};
</script>

<style lang="scss" scoped>
div.meta-parent-box {
  width: 100%;
  margin-top: 50px;
  padding-bottom: 50px;
  div.meta-container {
    max-width: 1060px;
    margin: 0 auto;
    padding: 0 30px;
  }
  div.meta-form-body {   
    height: 100%;
    width: 100%;
    padding: 50px;
    background-color: #EAF6FF;
    border-radius: 20px; 
    .meta-form-title{
      font-size: 35px;
      text-align: center;
      width: 100%;
      margin-bottom: 30px;
    }
    div.meta-text-group {
      width: 100%;
      padding-bottom: 30px;
      div.meta-group-title {
        width: 100%;
        color: #2699fb;
        font-size: 14px;
        font-weight: bold;
        padding: 10px 0;
      }
      .gallery-box{
        justify-content: center;
      }
      div.meta-text {
        width: 100%;
        color: #2b2b2b;
        font-size: 14px;
        line-height: 1.6;
        padding: 4px 10px;
        border: 1px solid;
        .meta-label {
          font-size: 14px;
          font-weight: bold;
        }
      }
      div.meta-text.w1 {
        width: calc(8.33% - 21.5px);
        float: left;
      }
      div.meta-text.w2 {
        width: calc(16.6% - 21.5px);
        float: left;
      }
      div.meta-text.w3 {
        width: calc(25% - 21.5px);
        float: left;
      }
      div.meta-text.w4 {
        width: calc(33.3333% - 21.5px);
        float: left;
      }
      div.meta-text.w6 {
        width: calc(50% - 21.5px);
        float: left;
      }
      div.meta-text.w7 {
        width: calc(58% - 21.5px);
        float: left;
      }

      div.meta-table-header {
        text-align: center;
        width: 100%;
        div.form-th {
          font-size: 14px;
          font-weight: bold;
          line-height: 1.6;
          height: 100%;
          border: 1px solid;

          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }
      }

      div.meta-table-row {
        text-align: center;
        width: 100%;
        div.form-td {
          font-size: 10px;
          line-height: 1.6;
          padding: 5px 0;
          border: 1px solid;
        }
      }
      div.form-th.code,
      div.form-td.code {
        width: calc(15% - 1.5px);
        float: left;
      }
      div.form-th.line,
      div.form-td.line {
        width: calc(35% - 1.5px);
        float: left;
      }
      div.form-th.units,
      div.form-td.units {
        width: calc(15% - 1.5px);
        float: left;
      }
      div.form-th.sales {
        width: calc(35% - 1.5px);
        float: left;
      }
      div.form-td.sales {
        width: calc(17.5% - 1px);
        float: left;
      }

      div.form-sub-th {
        width: 100%;
        div.form-th {
          width: calc(50% - 1.5px);
          float: left;
        }
      }
    }
    div.meta-text-group.w6 {
      width: 50%;
      float: left;
    }

    div.gallery-image{
      height: 150px;
      width: 150px;
      background-position: center;
      background-size: cover;
      cursor: pointer;
      float: left;
      margin: 5px;
    }

    div.meta-button-group{
        justify-content: center;
        width: 100%;
        margin-top: 20px;
        button{
          margin: 0 15px;
        }
    }
  }
}

.no-bl {
  border-left: 0 !important;
}
.no-br {
  border-right: 0 !important;
}
.no-bt {
  border-top: 0 !important;
}
.no-bb {
  border-bottom: 0 !important;
}

.red-btn{
  background-color: #e23a36;
  border-color: #e23a36;
}

.red-btn:hover{
  color: #e23a36;
  border-color: #e23a36;
}



/*
MOBILE RESPONSIVENESS 
--------------------------------------------------------------*/
@media only screen and ( max-width: 1400px ){
    div.meta-parent-box div.meta-form-body .meta-form-title{
        font-size: 28px;
    }
}

@media only screen and ( max-width: 768px ){
    div.meta-parent-box div.meta-form-body .meta-form-title{
        font-size: 24px;
    }

    div.meta-parent-box div.meta-form-body div.meta-text-group div.meta-text.w3,
    div.meta-parent-box div.meta-form-body div.meta-text-group div.meta-text.w4,
    div.meta-parent-box div.meta-form-body div.meta-text-group div.meta-text.w6{
        width: 100%;
    }

    div.meta-parent-box div.meta-form-body div.meta-text-group div.meta-text.no-br{
        border-right: 1px solid!important;
        border-bottom: 0;
    }

    div.meta-parent-box div.meta-form-body div.gallery-image {
        height: 100px;
        width: 100px;
    }
}

@media only screen and ( max-width: 580px ){
  div.meta-parent-box div.meta-form-body{
      padding: 50px 30px;
  }

  div.meta-parent-box div.meta-form-body .meta-form-title{
      font-size: 20px;
  }

  div.meta-parent-box div.meta-form-body div.meta-text-group div.meta-text .meta-label{
      font-size: 12px;
  }
}

@media only screen and ( max-width: 480px ){
  div.meta-parent-box div.meta-form-body{
      padding: 30px 15px;
  }
  div.meta-parent-box{
      margin-top: 30px;
  }
  div.meta-parent-box div.meta-container{
      padding: 0 15px;
  }
  div.meta-parent-box div.meta-form-body .meta-form-title{
      font-size: 18px;
  }
  div.meta-parent-box div.meta-form-body div.meta-text-group div.meta-group-title{
      font-size: 12px;
  }
  div.meta-parent-box div.meta-form-body div.meta-text-group{
      padding-bottom: 15px;
  }
}

@media only screen and ( max-width: 380px ){
  div.meta-parent-box div.meta-form-body div.gallery-image{
      height: 70px;
      width: 70px;
  }
}
</style>
