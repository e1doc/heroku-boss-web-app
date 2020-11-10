<template>
  <div class="container form-section">
    <div class="flex-column">
      <h3 class="meta-input-label mt10 mb10 text-bold mb20">
        Department Details
      </h3>
      <div class="meta-input-label mt10 mb10">
        Application Type
      </div>
      <base-select
        placeholder="--- Select from the options ---"
        :options="typeOptions"
        v-model="application_type"
        name="selectOptions"
        class="mb15"
      />
      <base-input
        label="Department Name"
        v-model="department_name"
        name="departmentname"
        refs="department_name"
        type="text"
        class="input-w3"
        inputClass="fw-mobile"
      />
      <button-block @click.native="addDepartment">Submit</button-block>
    </div>
  </div>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock";
import BaseInput from "@/components/forms/BaseInput";
import BaseSelect from "@/components/forms/BaseSelect";
import {mapGetters} from "vuex"
export default {
  name: "DepartmentForm",
  components: {
    ButtonBlock,
    BaseInput,
    BaseSelect,
  },
  computed: {
    ...mapGetters(['addDepartmentSuccess'])
  },
  data() {
    return {
      department_name: "",
      application_type: "",
      typeOptions: [
        {
          label: "Business Application",
          value: "business",
        },
        {
          label: "Building Application",
          value: "building",
        },
        {
          label: "Both",
          value: "both",
        },
      ],
    };
  },

  methods:{
    async addDepartment(){
      await this.$store.commit('setLoading', true)
      let payload = {name: this.department_name, application_type: this.application_type}
      await this.$store.dispatch('addDepartment', payload)
      if(this.addDepartmentSuccess){
          this.$swal({
            title: 'Success!',
            text: 'Department was submitted successfully.',
            icon: 'success'
        })
        this.$modal.hide("departmentModal");
        this.$store.commit('setAddDepartmentSuccess', false)
        this.$store.dispatch("getDepartments");
      }else{
        this.$modal.hide("departmentModal");
      }
       await this.$store.commit('setLoading', false)
    }
  }
};
</script>

<style scoped lang="scss">
.form-section {
  padding: 15px;
}
</style>
