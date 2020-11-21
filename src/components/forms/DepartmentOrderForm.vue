<template>
  <div class="container form-section">
    <div class="flex-column">
      <div class="mb15">
        <h3 class="mb5">
          Re Order List
        </h3>
        <p>Drag and drop items to reorder.</p>
      </div>
      <div v-if="list.length > 0">
        <draggable
          class="mb20"
          v-model="list"
          group="people"
          :sort="true"
          @change="inputChanged"
        >
          <div class="meta-items" v-for="element in list" :key="element.id">
            {{ element.name }} {{ currentType == 'business' ? element.business_index : element.building_index }}
          </div>
        </draggable>
      </div>
      <button-block @click.native="reOrderList" v-if="list.length > 0">Update</button-block>
      <div v-if="list.length < 1">
        <p class="text-center">No items to re-order</p>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock";
import draggable from "vuedraggable";
import { mapGetters } from "vuex";
export default {
  name: "DepartmentOrderForm",
  components: {
    draggable,
    ButtonBlock,
  },
  computed: {
    ...mapGetters(["departments", "currentType"]),
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.$store.dispatch("getDepartments");
  },
  mounted() {
    if (this.departments.length > 0) {
      this.departments.forEach((item) => {
        this.list.push(item);
      });
    }
  },
  methods: {
    async inputChanged(value) {
      let currentActivity = this.currentType
      this.list.forEach(function(item, index) {
        if(currentActivity == 'business'){
          item.business_index = index + 1;
        }else{
          item.building_index = index + 1;
        }
      });
    },
    async reOrderList() {
      await this.$store.commit("setLoading", true);
      await this.list.forEach((item) => {
        this.$store.dispatch("updateDepartments", item);
        this.$store.dispatch("getDepartments");
      });
      await this.$store.commit("setLoading", false);
      this.$swal({
        title: "Success!",
        text: "Departments order was updated successfully.",
        icon: "success",
      });
      this.$modal.hide("departmentOrderModal");
    },
  },
};
</script>

<style scoped lang="scss">
.form-section {
  padding: 20px;
}
.meta-items {
  box-shadow: 0px 3px 26px #00000029;
  padding: 10px 5px;
  margin: 10px 0px;
}
</style>
