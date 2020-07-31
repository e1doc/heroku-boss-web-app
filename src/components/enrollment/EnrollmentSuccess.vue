<template>
  <section>
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
      <div>
        <button-block>
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
}
</style>
