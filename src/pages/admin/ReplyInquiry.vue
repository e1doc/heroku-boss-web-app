<template>
    <div class="inquiry-box">
        <div class="inquiry-header">
             <div class="inquiry-subj">Sample Inquiry Subject</div>
             <div class="inquiry-date">Date: June 01, 2020</div>
        </div>
        <div class="inquiry-body">
            <!-- START OF THREAD -->
            <div class="item-row sender">
                <div class="item-name">John Michael Doe</div>
                <div class="item-content">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                </div>
                <div class="item-date">June 1, 2020 3:40 PM</div>
            </div>
            <div class="item-row me">
                <div class="item-name">Administrator</div>
                <div class="item-content">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consev
                </div>
                <div class="item-date">June 1, 2020 4:40 PM</div>
            </div>

            <!-- REPLY SECTION -->
            <div class="inquiry-footer">
                <div class="inquiry-footer-text">
                    <font-awesome-icon icon="reply" class="admin-icon"/>REPLY
                </div>
                <textarea name="reply" id="reply" rows="4" placeholder="Type your text here"></textarea>
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
import { mapGetters } from "vuex";
export default {
  name: "ReplyInquiry",
  components: {
    InquiryTableMenu,
    InquiryTable,
    ButtonBlock
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

        div.inquiry-footer{
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #D0E9FA;
            div.inquiry-footer-text{
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
            }
            textarea:focus {
                outline: 0;
                border-color: #027ab5;
                background-color: #f8fcff;
            }

            .inquiry-button {
                text-align: right;
            }
        }
    }
}
</style>
