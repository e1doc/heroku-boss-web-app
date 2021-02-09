<template>
  <section class="sc-rp-enrollment">
    <div class="container">
      <div class="flex-column">
        <div>
          <h2>Request New Tax Declaration Number</h2>
        </div>
        <div class="sc-rounded-div">
          <div class="form-group">
            <div class="title">
              <h3>Account Information</h3>
            </div>
            <div>
              <base-select
                placeholder="------ Choose type of property ------"
                :options="propertytype"
                v-model="property_type"
                name="selectProperty"
                class="mb15"
              />
              <base-input-icon-end
                label="Old Tax Declaration Number"
                placeholder="Enter old tax declaration number"
                v-model="td_no"
                name="td_no"
                refs="td_number"
                type="text"
                class="mt40"
                icon="id-card"
              />
            </div>
            <div>
              <button-block @click.native="verify()"> VERIFY </button-block>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseInputIconEnd from "@/components/forms/BaseInputIconEnd";
import ButtonBlock from "@/components/ButtonBlock";
import BaseSelect from "@/components/forms/BaseSelect";
import axios from "axios";
import { mapGetters } from "vuex";
const oneDocToken = process.env.VUE_APP_ONE_DOC_TOKEN;
const lguLocalEndpoint = process.env.VUE_APP_LGU_LOCAL_ENDPOINT;
export default {
  name: "RealPropertyEnrollment",
  components: {
    BaseInputIconEnd,
    ButtonBlock,
    BaseSelect,
  },
  computed: {
    ...mapGetters(["authToken"]),
  },
  mounted() {
    this.$store.commit("setLoading", false);
  },
  data() {
    return {
      td_no: "",
      official_receipt: "",
      isSuccess: false,
      property_type: "",
      required_fields: ["property_type", "td_no", "official_receipt", "date"],
      propertytype: [
        {
          label: "Land",
          value: "Land",
        },
        {
          label: "Building",
          value: "Building",
        },
        {
          label: "Machinery",
          value: "Machinery",
        },
      ],
    };
  },
  methods: {
    async verify() {
      try {
        await this.$store.commit("setLoading", true);
        let config = {
          headers: {
            "OneDoc-Token": oneDocToken,
            "Content-Type": "application/json",
          },
        };

        let payload = {
          name: "RPTRequestTD",
          param: {
            property_type: this.property_type,
            tdno: this.td_no,
          },
        };

        const response = await axios.post(
          `${lguLocalEndpoint}`,
          payload,
          config
        );
        if (response.data.Status === "Success") {
          this.$swal({
            title: "Success!",
            text: response.data.Message,
            icon: "success",
          });
        } else {
          this.$swal({
            title: "Failed!",
            text: response.data.Message,
            icon: "error",
          });
        }
        await this.$store.commit("setLoading", false);
      } catch (err) {
        let action = await this.$swal({
          title: "Failed!",
          text: "Something went wrong please try again later.",
          icon: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sc-rp-enrollment {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  padding: 70px 30px 50px;
  min-height: calc(100vh - 285px);
  .sc-rounded-div {
    background: #eaf6ff !important;
    max-width: 53%;
    width: 100%;
    min-height: 500px;
    margin: 50px auto 0;
    box-shadow: 0px 10px 20px #0000000d;
    .form-group {
      text-align: center;
      padding: 80px 80px 50px;
      .title {
        margin-bottom: 50px;
        text-align: left;
      }
      div {
        margin-bottom: 30px;
      }
    }
  }
}
.datepicker {
  width: 100%;
}

/*
MOBILE RESPONSIVENESS 
--------------------------------------------------------------*/
@media only screen and (max-width: 1400px) {
  .sc-rp-enrollment {
    .sc-rounded-div {
      max-width: 570px;
      min-height: auto;
      margin-top: 30px;
      .form-group {
        padding: 60px 60px 30px;
        .title {
          margin-bottom: 30px;
        }
        div {
          margin-bottom: 20px;
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  h2 {
    font-size: 20px;
  }

  .sc-rp-enrollment .sc-rounded-div .form-group {
    padding: 50px 30px 30px;
  }

  h3 {
    font-size: 17px;
  }
}

@media only screen and (max-width: 580px) {
  h2 {
    font-size: 20px;
  }
}

@media only screen and (max-width: 480px) {
  .sc-rp-enrollment {
    padding: 70px 0 30px;
  }
}

@media only screen and (max-width: 480px) {
  .sc-rp-enrollment .sc-rounded-div .form-group {
    padding: 30px 15px 10px;
  }

  h3 {
    font-size: 15px;
  }
}
</style>
