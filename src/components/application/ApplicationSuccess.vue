<template>
  <div class="meta-container">
    <h1 class="meta-form-title">Your Application has been submitted!</h1>
    <div class="meta-text">
      Great! Your application has been successfully submitted.<br />Please note
      that the assessment will take 1-5 working days. <br />We will send you an
      email once your application has been reviewed.
    </div>
    <div class="meta-form-group">
      <div class="meta-link">
        <router-link :to="{ name: 'Profile' }"
          >VIEW YOUR APPLICATIONS</router-link
        >
      </div>
      <button-block @click.native="printForm()">DOWNLOAD</button-block>
    </div>
  </div>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock";
import { mapGetters } from "vuex";
export default {
  name: "ApplicationSuccess",
  components: {
    ButtonBlock,
  },
  computed: {
    ...mapGetters(["applicationType"]),
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setCurrentTable", 'applications');
    if (this.applicationType === "business") {
      this.$store.commit("setCurrentType", 'business');
    } else if (this.applicationType === "property") {
     this.$store.commit("setCurrentType", 'building');
    }
    next();
  },
  methods: {
    printForm() {
      if (this.applicationType === "business") {
        this.$store.commit("setPrintBusiness", true);
      } else if (this.applicationType === "property") {
        this.$store.commit("setPrintProperty", true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
div.meta-container {
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 70px 30px;
  background-color: #eaf6ff;
  border-radius: 20px;
  h1.meta-form-title {
    text-align: center;
    width: 100%;
    margin-bottom: 40px;
  }
  .meta-text {
    color: #73befc;
    font-size: 18px;
    line-height: 39px;
    text-align: center;
    width: 100%;
    margin-bottom: 30px;
  }
  .meta-form-group {
    text-align: center;
    .meta-link {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 20px;
      a {
        color: #039be5;
        transition: 0.4s;
      }
    }
  }
}

.meta-link a:hover {
  color: #73befc !important;
}

@media only screen and (max-width: 1380px) {
  div.meta-container h1.meta-form-title {
    font-size: 22px;
  }
}

@media only screen and (max-width: 768px) {
  div.meta-container {
    min-height: 300px;
  }
  div.meta-container h1.meta-form-title {
    font-size: 18px;
    margin-bottom: 30px;
    line-height: 1.6;
  }

  div.meta-container .meta-text {
    font-size: 16px;
    line-height: 2;
    margin-bottom: 50px;
  }
}

@media only screen and (max-width: 480px) {
  div.meta-container {
    min-height: unset;
    padding-bottom: 40px;
  }

  div.meta-container h1.meta-form-title {
    font-size: 15px;
  }

  div.meta-container .meta-text {
    font-size: 14px;
    line-height: 1.6;
  }
}
</style>
