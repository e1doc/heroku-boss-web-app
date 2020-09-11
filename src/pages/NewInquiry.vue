<template>
    <div class="inquiry-box">
        <div class="inquiry-header">
             <div class="inquiry-subj">New Inquiry</div>
             <div class="inquiry-date">Date: June 01, 2020</div>
        </div>
        <div class="inquiry-body">
            
            <!-- REPLY SECTION -->
            <div class="inquiry-new">
                <div class="inquiry-new-text">SUBJECT</div>
                <input type="text" name="subject" id="subject" class="input-subject" placeholder="Type your subject here">
                <div class="inquiry-new-text">INQUIRY</div>
                <textarea name="inquiry" id="inquiry" rows="6" placeholder="Type your text here"></textarea>
                <div class="inquiry-button">
                    <button-block type="send">SEND</button-block>
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
    ...mapGetters(["currentTable"]),
  },
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
