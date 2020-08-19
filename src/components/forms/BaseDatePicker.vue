<template>
  <date-picker
    valueType="format"
    placeholder="Enter Date"
    v-model="inputData"
    @input="onInput"
    :value="value"
  ></date-picker>
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
      preFillDone: false
    };
  },
  props: {
    value: {
      required: false,
    },
  },
  methods: {
    onInput(data) {
      data = moment.tz(data, "Asia/Manila").format();
      this.$emit("input", data);
    },
  },
  watch: {
    value:{
      deep: true,
      handler(newValue) {
        if(!this.preFillDone){
          this.$emit('input', (this.inputData = newValue))
          this.preFillDone = true
        }
      },
    }
  },
};
</script>

<style lang="scss" scoped>
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
