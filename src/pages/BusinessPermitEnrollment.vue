<template>
  <section class="sc-bs-enrollment">
    <div class="container">
      <div class="flex-column">
        <div>
          <h2>Business Permit Enrollment</h2>
        </div>
        <enrollment-success
          v-if="isSuccess"
          type="business_permit"
          :account_no="account_no"
        />
        <div v-if="!isSuccess" class="sc-rounded-div">
          <div class="form-group">
            <div class="title">
              <h3>Account Information</h3>
            </div>
            <div>
              <base-input-icon-end
                label="Account Number"
                placeholder="Enter account number"
                v-model="account_no"
                name="account_no"
                refs="account_number"
                type="text"
                class="mt40"
                icon="id-card"
              />
            </div>
            <div>
              <base-input-icon-end
                label="Latest Official Receipt Number"
                placeholder="Enter official receipt number"
                v-model="official_receipt"
                name="official_receipt"
                refs="or"
                type="text"
                class="mt40"
                icon="receipt"
              />
            </div>
            <div>
              <base-date-picker
                v-model="date"
                placeholder="Latest Official Receipt Date"
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
import EnrollmentSuccess from "@/components/enrollment/EnrollmentSuccess";
import BaseDatePicker from "@/components/forms/BaseDatePicker";
import { mapGetters } from "vuex";
import axios from "axios";
const oneDocToken = process.env.VUE_APP_ONE_DOC_TOKEN;
const lguLocalEndpoint = process.env.VUE_APP_LGU_LOCAL_ENDPOINT;
export default {
  name: "BusinessPermitEnrollment",
  components: {
    BaseInputIconEnd,
    ButtonBlock,
    EnrollmentSuccess,
    BaseDatePicker,
  },
  data() {
    return {
      account_no: "",
      official_receipt: "",
      date: "",
      isSuccess: false,
    };
  },
  computed: {
    ...mapGetters(["isBusinessEnrollmentSuccess", "authToken"]),
  },
  methods: {
    async verify() {
      this.$store.commit("setLoading", true);
      let payload = {
        name: "BusinessPermitEnrollment",
        param: {
          accountno: this.account_no,
          ordate: this.date,
          ornumber: this.official_receipt,
        },
      };
      await this.businessEnrollment(payload);
      this.$store.commit("setLoading", false);
    },
    async businessEnrollment(payload) {
      try {
        let config = {
          headers: {
            "OneDoc-Token": oneDocToken,
            "Content-Type": "application/json",
          },
        };

        const validateResponse = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/verify-enrollment/?id=${this.account_no}&type=business`,
          { headers: { Authorization: `jwt ${this.authToken}` } }
        );

        if (!validateResponse.data.is_existing) {
          const response = await axios.post(
            `${lguLocalEndpoint}`,
            payload,
            config
          );
          if (response.data.Status === "Success") {
            if (response.data.Result.businessid) {
              await this.$store.dispatch("addBusinessApplication", {
                account_number: this.account_no,
                is_draft: false,
                is_enrolled: true,
              });
              await this.$store.dispatch("addBusinessBasicInformation", {});
              await this.$store.dispatch("addBusinessDetails", {
                name: response.data.Result.businessname,
              });
              this.isSuccess = true;
              this.account_no = response.data.Result.account_number;
            } else {
              this.$swal({
                title: "Failed!",
                text: response.data.Message,
                icon: "error",
              });
            }
          } else {
            this.$swal({
              title: "Failed!",
              text: `${response.data.Message}`,
              icon: "error",
            });
          }
        } else {
          this.$swal({
            title: "Failed!",
            text: "Record already enrolled.",
            icon: "error",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sc-bs-enrollment {
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

/*
MOBILE RESPONSIVENESS 
--------------------------------------------------------------*/
@media only screen and (max-width: 1400px) {
  .sc-bs-enrollment {
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

  .sc-bs-enrollment .sc-rounded-div .form-group {
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
  .sc-bs-enrollment {
    padding: 70px 0 30px;
  }
}

@media only screen and (max-width: 480px) {
  .sc-bs-enrollment .sc-rounded-div .form-group {
    padding: 30px 15px 10px;
  }

  h3 {
    font-size: 15px;
  }
}
</style>
