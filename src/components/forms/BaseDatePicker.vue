<template>
  <div class="input-holder"  :class="customclass">
    <date-picker
      valueType="format"
      :placeholder="placeholder"
      v-model="inputData"
      @input="onInput"
      :value="value"
    ></date-picker>
    <div v-if="validationMessages.length > 0">
      <div
        class="meta-error-text"
        v-for="(message, index) in validationMessages"
        :key="index"
      >
        * {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment-timezone";
export default {
  name: "BaseDatePicker",
  components: {
    DatePicker,
  },
  data() {
    return {
      inputData: "",
      preFillDone: false,
    };
  },
  props: {
    value: {
      required: false,
    },
    validationMessages: {
      type: Array,
      required: false,
      default: function() {
        return [];
      },
    },
    customclass: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "Enter Date"
    }
  },
  methods: {
    onInput(data) {
      data = moment(data).format();
      this.$emit("input", data);
    },
  },
  watch: {
    value: {
      deep: true,
      handler(newValue) {
        if (!this.preFillDone) {
          this.$emit("input", (this.inputData = newValue));
          this.preFillDone = true;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.input-holder {
  display: flex;
  flex-direction: column;
  text-align: left;
  .meta-error-text {
    margin-top: 10px;
    font-size: 12px;
    color: #e8726f;
    font-weight: bold;
  }
}

.mx-datepicker {
  width: 100% !important;
}

/deep/ .mx-input {
  font-family: "Raleway", sans-serif;
  font-size: 15px;
  min-height: 52px;
  padding: 16px 18px;
  border: 1px solid #cccccc;
  border-radius: 10px;
}

/deep/ .mx-input:focus {
  background-color: #f1f9ff;
  border-color: #bce0fd;
}

/deep/ .mx-icon-calendar,
.mx-icon-clear {
  right: 15px;
}

/deep/ .mx-input::placeholder {
  color: #bababa;
}

@media only screen and (max-width: 1400px) {
  /deep/ .mx-input {
    font-size: 14px;
    min-height: 44px;
    padding: 12px 18px;
  }
}

@media only screen and (max-width: 480px) {
  /deep/ .mx-input {
    font-size: 12px;
  }
}


</style>
