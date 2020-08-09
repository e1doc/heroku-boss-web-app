<template>
  <div class="meta-container">
    <div class="meta-page-title">{{ pageTitle }}</div>
    <div class="meta-progress-bar">
      <!-- STEP ONE 
          3 class status indicator: 
          * previous-active
          * current-active
          * completed -->

      <div
        class="meta-step-box"
        :class="{
          'current-active': currentApplicationStep === '1',
           'previous-active':
            currentApplicationStep === '2' ||
            currentApplicationStep === '3' ||
            currentApplicationStep === '4' 
        }"
      >
        <div class="meta-step flex-center">
          <div class="meta-step-label">{{ stepOne }}</div>
          <div class="meta-number flex-center">1</div>
        </div>
        <div class="meta-line"></div>
      </div>
      <!-- STEP TWO -->
      <div
        class="meta-step-box"
        :class="{
          'current-active': currentApplicationStep === '2',
          'previous-active':
            currentApplicationStep === '3' || 
            currentApplicationStep === '4'
        }"
      >
        <div class="meta-step flex-center">
          <div class="meta-step-label">{{ stepTwo }}</div>
          <div class="meta-number flex-center">2</div>
        </div>
        <div class="meta-line"></div>
      </div>
      <!-- STEP THREE -->
      <div
        class="meta-step-box"
        :class="{
          'current-active': currentApplicationStep  === '3',
          'previous-active': currentApplicationStep === '4'
        }"
      >
        <div class="meta-step flex-center">
          <div class="meta-step-label">{{ stepThree }}</div>
          <div class="meta-number flex-center">3</div>
        </div>
        <div class="meta-line"></div>
      </div>
      <!-- STEP FOUR -->
      <div
        class="meta-step-box"
        :class="{ 'current-active': currentApplicationStep === '4' }"
      >
        <div class="meta-step flex-center">
          <div class="meta-step-label">{{ lastStep }}</div>
          <div class="meta-number flex-center">
            <font-awesome-icon icon="check" class="mr5 icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ProgressIndicator",
  props: {
    pageTitle: {
      type: String,
      default: "",
    },
    stepOne: {
      type: String,
      default: "",
    },
    stepTwo: {
      type: String,
      default: "",
    },
    stepThree: {
      type: String,
      default: "",
    },
    lastStep: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters(["currentApplicationStep"]),
  },
};
</script>

<style lang="scss" scoped>
div.meta-container {
  div.meta-page-title {
    font-size: 32px;
    font-weight: bold;
    line-height: 30px;
    text-align: right;
    margin-bottom: 100px;
  }
  div.meta-progress-bar {
    padding-right: 40px;
    div.meta-step-box {
      width: 100%;
      div.meta-step {
        justify-content: flex-end;
      }
      div.meta-step-label {
        font-size: 20px;
        font-weight: bold;
      }
      div.meta-number {
        color: #fff;
        background-color: #e8726f;
        font-size: 25px;
        font-weight: bold;
        height: 50px;
        width: 50px;
        border-radius: 100%;
        justify-content: center;
        margin-left: 25px;
      }
      .meta-line {
        height: 80px;
        width: 3px;
        background-color: #e5e5e5;
        margin-left: auto;
        margin: 5px 24px 5px auto;
      }
    }
    div.meta-step-box.previous-active {
      div.meta-number,
      div.meta-line {
        background-color: #7ac0fa;
      }
    }
    div.meta-step-box.current-active {
      div.meta-step-label {
        color: #2699fb;
      }
      div.meta-number,
      div.meta-line {
        background-color: #2699fb;
      }
    }
    div.meta-step-box.completed {
      div.meta-step-label {
        color: #00c851;
      }
      div.meta-number {
        background-color: #00c851;
      }
    }
  }
}
</style>
