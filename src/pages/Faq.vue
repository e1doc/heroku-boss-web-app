<template>
  <div class="meta-wrap">
    <div class="meta-page-title">Frequently Asked Questions</div>
    <div class="meta-content">
      <div class="meta-item" v-for="(item, index) of faq" :key="index">
        <label :for="index" class="meta-question">
          {{ item.question }}
        </label>
        <input type="checkbox" :id="index" class="meta-toggle" />
        <font-awesome-icon icon="plus" class="toggle-icon-plus" />
        <font-awesome-icon icon="minus" class="toggle-icon-minus" />
        <div class="meta-answer" v-html="item.answer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Faq",
  computed: {
    ...mapGetters(["faq"]),
  },
  created() {
    this.$store.dispatch("getFaq");
  },
};
</script>

<style lang="scss" scoped>
.meta-wrap {
  width: 100%;
  max-width: 1100px;
  margin: 50px auto 0;
  padding-bottom: 50px;
  .meta-page-title {
    font-size: 27px;
    font-weight: bold;
    font-family: Raleway;
    text-align: center;
    width: 100%;
    padding-top: 30px;
    margin-bottom: 50px;
  }
  .meta-item {
    margin-bottom: 20px;
    position: relative;
    .meta-question {
      font-size: 18px;
      font-weight: bold;
      line-height: 1.4;
      padding: 20px 50px 20px 20px;
      background: #eaf6ff;
      display: block;
      position: relative;
      z-index: 1;
      cursor: pointer;
    }
    .meta-toggle {
      position: absolute;
      top: 25px;
      right: 30px;
      z-index: 2;
      opacity: 0;
      cursor: pointer;
    }
    .toggle-icon-plus,
    .toggle-icon-minus {
      position: absolute;
      top: 25px;
      right: 30px;
      z-index: 1;
      transition: 0.3s;
    }
    .meta-answer {
      opacity: 0;
      font-size: 16px;
      line-height: 1.6;
      position: absolute;
      background: #f5f5f5;
      padding: 30px;
      border-top: 1px solid #fff;
      z-index: -1;
      transform: translateY(-10px);
      transition: 0.3s;
    }
  }
}
.meta-toggle:checked ~ .meta-answer {
  opacity: 1;
  position: unset;
  min-height: 30px;
  transform: translateY(0px);
}

.meta-toggle:checked ~ .toggle-icon-plus {
  opacity: 0;
}

@media only screen and (max-width: 480px) {
  .meta-wrap .meta-page-title {
    font-size: 22px;
  }

  .meta-wrap .meta-item .meta-question {
    font-size: 16px;
    padding: 20px 30px 20px 15px;
  }
  .meta-wrap .meta-item .meta-answer {
    font-size: 14px;
    padding: 20px;
  }

  .meta-wrap .meta-item .toggle-icon-plus,
  .meta-wrap .meta-item .toggle-icon-minus,
  .meta-wrap .meta-item .meta-toggle {
    right: 15px;
    font-size: 12px;
  }
}
</style>