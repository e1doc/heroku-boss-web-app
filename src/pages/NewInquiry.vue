<template>
    <div class="inquiry-box">
        <div class="inquiry-header">
             <div class="inquiry-subj">New {{type === 'inquiry' ? "Inquiry" : "Remarks"}}</div>
             <!-- <div class="application-button">
                 <button-block type="default" class="inquiry-application-btn" />
             </div> -->
             <div class="inquiry-date">Date: {{new Date(Date.now()) |  moment("MMMM DD YYYY")}}</div>
        </div>
        <div class="inquiry-body">
            
            <!-- REPLY SECTION -->
            <div class="inquiry-new">
                <div class="inquiry-new-text">SUBJECT</div>
                <input type="text" name="subject" id="subject" class="input-subject" placeholder="Type your subject here" v-model="subject" :disabled="type === 'inquiry' ? false : true">
                <div class="inquiry-new-text">{{type === 'inquiry' ? "Inquiry" : "Remarks"}}</div>
                <textarea name="inquiry" id="inquiry" rows="6" placeholder="Type your text here" v-model="body"></textarea>
                <div class="inquiry-button">
                    <button-block type="send" :disabled="body === '' || subject === '' ? true : false" @click.native="sendMessage">SEND</button-block>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>

import InquiryTableMenu from "@/components/tables/InquiryTableMenu"
import InquiryTable from "@/components/tables/InquiryTable"
import ButtonBlock from "@/components/ButtonBlock"
import BaseInput from "@/components/forms/BaseInput"
import { mapGetters } from "vuex";
export default {
  name: "ReplyInquiry",
  components: {
    InquiryTableMenu,
    InquiryTable,
    ButtonBlock,
    BaseInput
  },
  computed: {
    ...mapGetters(["currentTable", "currentInquiry", "remarks"]),
  },
  props:{
      application_number: {
          type: String,
          default: ""
      },
      type: {
          type: String,
          default: "inquiry"
      }
  },
  data() {
      return{
          subject: "",
          body: ""
      }
  },
  mounted(){
      console.log(this.application_number)
      if (this.application_number !== ""){
           this.subject = `Application ${this.application_number} Remarks`
      }
  },
  methods: {
      async getRemarks(){
        let application_remarks = await this.remarks
        console.log(this.remarks)
        if (application_remarks){
          this.subject = `Application ${this.remarks.application_number} Remarks`
      }
      },
      async sendMessage(){
          await this.$store.commit('setLoading', true)
          await this.$store.dispatch('addThread',{ subject: this.subject })
          await this.$store.dispatch('addMessage', {thread: this.currentInquiry, body: this.body})
          await this.$store.commit('setLoading', false)
            await this.$swal({
                title: "Success!",
                text: "Inquiry successfully sent.",
                icon: "success",
            }).then((value) => {
                this.$router.push({ name: 'UserInquiries' });
            });
      }
  }
};
</script>

<style lang="scss" scoped>
div.inquiry-box{
    width: 100%;
    max-width: 1050px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0px 10px 20px #0000000D;
    border-radius: 20px;
    margin-top: 30px;
    margin-bottom: 50px;
    div.inquiry-header{
        background-color: #1492E6;
        padding: 20px 40px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        position: relative;
        div.inquiry-subj{
            color: #FAFAFA;
            font-size: 20px;
            font-weight: bold;
            line-height: 1.6;
            letter-spacing: 1.06px;
            margin-bottom: 5px;
        }
        div.inquiry-date{
            color: #E6E6E6;
            font-size: 16px;
            line-height: 1.4;
            letter-spacing: 0.8px;
        }
        div.application-button{
            width: auto;
            float: right;
            position: absolute;
            right: 45px;
            top: 25px;
        }
    }
    div.inquiry-body{
        padding: 35px 48px;
        .item-row{
            margin-bottom: 10px;
        }

        .item-row.sender{
            .item-content{
                background-color: #EAF6FF50;
            }
        }

        .item-row.me{
           .item-name{
               text-align: right;
           }
           .item-content{
               background-color: #EAF6FF90;
            }
        }

        .item-name{
            color: #1792E6;
            font-size: 16px;
            font-weight: bold;
            line-height: 29px;
            letter-spacing: 0.32px;
            margin-bottom: 6px;
        }
        
        .item-content{
            color: #000000C1;
            font-size: 14px;
            line-height: 28px;
            padding: 35px 32px;
            border-radius: 12px;
        }

        .item-date{
            color: #B3D7FE;
            font-size: 12px;
            line-height: 1.6;
            letter-spacing: 0.24px;
            text-align: right;
        }

        div.inquiry-new{
            div.inquiry-new-text{
                color: #9FA6AB;
                font-size: 16px;
                font-weight: bold;
                line-height: 29px;
                margin-bottom: 10px;
                .admin-icon{
                    font-size: 21px;
                    margin-right: 14px;
                }
            }
            .input-subject{
                color: #2b2b2b;
                border: 1px solid #D0E9FA;
                font-size: 14px;
                font-family: Raleway;
                line-height: 28px;
                width: calc( 100% - 60px );
                padding: 13px 30px;
                margin-bottom: 30px;
                border-radius: 12px;
                outline: 0;
                transition: 0.4s;
            }
            textarea {
                color: #2b2b2b;
                border-color: #D0E9FA;
                font-size: 14px;
                font-family: Raleway;
                line-height: 28px;
                width: calc( 100% - 60px );
                max-height: 150px;
                padding: 25px 30px;
                margin-bottom: 15px;
                border-radius: 12px;
                transition: 0.4s;
            }
            textarea:focus,
            input:focus{
                outline: 0;
                border-color: #027ab5!important;
                background-color: #f8fcff!important;
            }

            .inquiry-button {
                text-align: right;
            }
        }
    }
}
</style>
