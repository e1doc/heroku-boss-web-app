<template>
  <div class="meta-modal">
    <div class="meta-wrap">
      <div class="meta-text">
            <div class="meta-input-label">Please enter the Inspection Date</div>
            <base-date-picker/>
      </div>
      <div class="meta-buttons flex-wrap">
          <button class="modal-button agree">SUBMIT</button>
          <button class="modal-button cancel">CANCEL</button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseDatePicker from "@/components/forms/BaseDatePicker";
export default {
  name: "InspectionModal",
  components: {
    BaseDatePicker,
  },
};
</script>

<style lang="scss" scoped>
.meta-modal{
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    box-shadow: 0px 7px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    background: #ffffff;
    .meta-text{
        font-size: 18px;
        font-family: Proxima Nova Rg;
        text-align: center;
        line-height: 1.4;
        padding: 50px 30px;
        .meta-input-label {
            color: #000;
            font-size: 17px;
            line-height: 19px;
            width: 100%;
            margin-bottom: 20px;
        }
    }
    .meta-buttons{
        width: 100%;
        button{
            width: 50%;
            float: left;
            background-color: transparent;
            border: 0;
            padding: 20px 10px;
            border-top: 1px solid #eee;
            font-size: 15px;
            font-weight: bold;
            font-family: Proxima Nova Rg;
            transition: 0.2s;
            cursor: pointer;
        }
        button:focus{
            outline: 0;
        }
        button.agree{
            border-right: 1px solid #eee;
            border-bottom-left-radius: 15px;
        }
        button.cancel{
            border-bottom-right-radius: 15px;
        }
        button.agree:hover{
            color: #fff;
            background-color: #4791db;
        }
        button.cancel:hover{
            color: #fff;
            background-color: #f44336;
        }
    }
}

</style>