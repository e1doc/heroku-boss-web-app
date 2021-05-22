<template>
  <div class="meta-container">
    <input type="checkbox" id="show_process" />
    <label for="show_process">View Application Process</label>

    <!-- CONDITION FOR BUSINESS -->
    <div class="meta-application-steps" v-if="currentType === 'business'">
      <div class="meta-parent">
        <div class="meta-title">APPLICATION PROCESS</div>
        <ol class="meta-steps flex-center">
          <li class="meta-step">Submission of Application</li>
          <li class="meta-step">Checking of Requirements</li>
          <li class="meta-step">Assessment</li>
          <li class="meta-step">For Payment</li>
        </ol>
      </div>
      <div class="meta-parent">
        <div class="meta-title">ASSESSMENT PROCESS</div>
        <ol class="meta-steps flex-center">
          <li
            class="meta-step"
            v-for="(item, index) in departments"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ol>
      </div>
    </div>

    <!-- CONDITION FOR BUILDING -->
    <div class="meta-application-steps" v-if="currentType === 'building'">
      <div class="meta-parent">
        <div class="meta-title">APPLICATION PROCESS</div>
        <ol class="meta-steps flex-center">
            <li class="meta-step">Submission of Application</li>
            <li class="meta-step">Approval</li>
            <li class="meta-step">Inspection</li>
            <li class="meta-step">Evaluation</li>
            <li class="meta-step">For Payment</li>    
        </ol>
      </div>
      <div class="meta-parent">
        <div class="meta-title">INSPECTION PROCESS</div>
        <ol class="meta-steps flex-center">
          <li
            class="meta-step"
            v-for="(item, index) in departments"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { now } from "moment-timezone";
import { mapGetters } from "vuex";
export default {
  name: "ApproverSteps",
  computed: {
    ...mapGetters(["currentType", "departments"]),
  },
};
</script>

<style lang="scss" scoped>
.meta-container {
  margin-bottom: -30px;
  input {
    position: relative;
    top: 2px;
    margin: 30px 10px 15px 0;
  }
  label {
    font-size: 13px;
    font-weight: bold;
    text-transform: uppercase;
    margin: 30px 0 0;
  }
  input[type="checkbox"]:not(:checked) ~ .meta-application-steps {
    display: none;
  }
  .meta-parent {
    padding: 15px;
    margin-top: 15px;
    border: 2px solid #a1d1f0;
    .meta-title {
      text-align: center;
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 15px;
      span {
        margin-right: 10px;
        font-family: Proxima Nova Rg;
      }
    }
    ol.meta-steps {
      counter-reset: LIST-ITEMS;
      list-style-type: none;
      justify-content: center;
      li {
        color: #000;
        font-size: 13px;
        float: left;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding-right: 30px;
        margin-bottom: 10px;
      }
      li:before {
        content: counter(LIST-ITEMS);
        counter-increment: LIST-ITEMS;
        font-family: Proxima Nova Rg;
        padding: 6px 10px;
        // background: #1492e6;
        border-radius: 100%;
        color: #1492e6;
        font-weight: bold;
        font-size: 16px;
        line-height: 1;
      }
      li::after {
        content: "➟";
        position: absolute;
        right: 0px;
        font-size: 21px;
        color: #f09795;
      }
      li:last-child {
        padding-right: 0;
      }
      li:last-child:after {
        display: none;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .meta-container {
    margin-bottom: 0;
    padding-left: 15px;
  }
}
@media only screen and (max-width: 480px) {
  .meta-container {
    padding-left: 0px;
  }
  .meta-container .meta-parent ol.meta-steps li {
    word-break: break-word;
    width: 100%;
    padding-right: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .meta-container .meta-parent ol.meta-steps li::after {
    font-size: 16px;
    left: 0;
    top: 22px;
    text-align: center;
    transform: rotate(90deg);
  }
  .meta-container .meta-parent ol.meta-steps li:before {
    padding: 6px 5px;
    margin-left: -10px;
  }
}
</style>