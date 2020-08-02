<template>
    <date-picker 
    valueType="format" 
    placeholder="Enter Date"
    v-model="inputData"
    @input="onInput"
    ></date-picker>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
name: 'BaseDatePicker',
components:{
    DatePicker
},
data() {
    return {
      inputData: "",
    };
  },
  methods:{
      onInput(data){
          this.$emit('input', data)
      }
  }
}
</script>

<style lang="scss" scoped>
.mx-datepicker{
  width: 100% !important;
}

/deep/ .mx-input{
    font-family: 'Raleway', sans-serif;
    font-size: 15px;
    min-height: 52px;
    padding: 16px 18px;
    border: 1px solid #cccccc;
    border-radius: 10px;
}

/deep/ .mx-input:focus{
  background-color: #F1F9FF;
  border-color: #BCE0FD;
}

/deep/ .mx-icon-calendar, .mx-icon-clear {
  right: 15px;
}

/deep/ .mx-input::placeholder {
  color: #BABABA;
}

@media only screen and (max-width: 1400px){
  /deep/ .mx-input{    
        font-size: 14px;
        min-height: 44px;
        padding: 12px 18px;
  }
}
</style>