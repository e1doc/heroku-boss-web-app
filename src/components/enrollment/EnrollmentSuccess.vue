<template>
  <section class="meta-section flex-wrap">
    <div class="sc-rounded-div">
      <div>
        <h3>
          {{
            type === "business_permit" ? "Business permit" : "Real property"
          }}
          with account no. <span class="account_no">{{ account_no }}</span> has been verified! <br />
          Please check your profile to view the details.
        </h3>
      </div>
      <div class="button-div flex-center">
        <button-block :link="{path:'profile'}" class="button">
          VIEW PROFILE
        </button-block>
      </div>
    </div>
  </section>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock";
export default {
  name: "EnrollmentSuccess",
  components: {
    ButtonBlock,
  },
  props: {
    type: {
      type: String,
      required: true,
      default: "business_permit",
    },
    account_no: {
      type: String,
      required: true,
      default: "00000",
    },
  },
};
</script>

<style lang="scss" scoped>
.account_no{
    color: #2699FB;
}
.meta-section{
    width: 100%;
    .sc-rounded-div {
        background: #eaf6ff !important;
        max-width: 53%;
        min-height: 380px;
        width: 100%;
        padding: 50px 50px 20px;
        margin: 50px auto 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        text-align: center;
        box-shadow: 0px 10px 20px #0000000d;
        div{
            width: 100%;
            h3{
                font-weight: lighter;
                line-height: 1.6;
            }
        }
        .button-div{
          width: 100%;
          justify-content: center;
        }
    }
}

@media only screen and ( max-width: 1400px){
      .meta-section .sc-rounded-div{
          max-width: 570px;
      }
}

@media only screen and ( max-width: 768px){
      h3 {
         font-size: 17px;
      }
}

@media only screen and ( max-width: 480px){
  .button{
      width: 100%;
  }

  .meta-section .sc-rounded-div{
      min-height: 307px;
      padding: 30px;
  }
}
</style>
