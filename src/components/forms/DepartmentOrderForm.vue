<template>
  <div class="container form-section">
    <div class="flex-column">
      <draggable
        v-model="myArray"
        group="people"
        :sort="true"
        @change="inputChanged"
      >
        <div class="meta-items" v-for="element in myArray" :key="element.id">
          {{ element.name }} {{ element.order }}
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "DepartmentOrderForm",
  components: {
    draggable,
  },
  data() {
    return {
      myArray: [
        {
          id: 1,
          order: 0,
          name: "Lorem",
        },
        { id: 2, order: 1, name: "Ipsum" },
      ],
    };
  },
  methods: {
    async inputChanged(value) {
      this.myArray.forEach(function (item, index){
          console.log(item, index)
          item.order = index
      })
    },
  },
  mounted(){
      this.$store.dispatch('getDepartments')
  }
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
