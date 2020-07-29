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
   border-radius: 10px;
   padding: 1.7em;
   font-family: 'Raleway', sans-serif;
   font-size: 16px;
   border: 2px solid #cccccc;
}

/deep/ .mx-icon-calendar, .mx-icon-clear {
  right: 15px;
}

/deep/ .mx-input::placeholder {
  color: #BABABA;
}
</style>