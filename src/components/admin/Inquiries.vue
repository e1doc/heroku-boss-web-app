<template>
    <div class="admin-container">
        <div class="admin-page-title flex-center">
            <font-awesome-icon icon="comment-alt" class="admin-icon"/>
            Inquiries
        </div>
        <div class="admin-body flex-wrap">
            <inquiry-table-menu type="profile" />
            <div class="admin-content">
                <!-- <inquiry-table /> -->
                <reply-inquiry />
            </div>
        </div>
    </div>
</template>

<script>

import InquiryTableMenu from "@/components/tables/InquiryTableMenu";
import InquiryTable from "@/components/tables/InquiryTable";
import ReplyInquiry from "@/components/admin/ReplyInquiry";
import { mapGetters } from "vuex";
export default {
  name: "Inquiries",
  components: {
    InquiryTableMenu,
    InquiryTable,
    ReplyInquiry
  },
  computed: {
    ...mapGetters(["currentTable"]),
  },
};
</script>

<style lang="scss" scoped>
div.admin-container{
    width : 100%;
    div.admin-page-title{
        color : #1492E6;
        font-size : 30px;
        font-weight : bold;
        line-height : 29px;
        text-transform : capitalize;
        margin-bottom: 90px;
        .admin-icon{
            color : #1492E6;
            font-size : 35px;
            margin-right : 15px; 
        }
    }
    div.admin-body{
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
        div.admin-search{
            width : 100%;
            display : flex;
            flex-wrap : wrap;
            justify-content: flex-end;
        }
        div.admin-content{
            width: 100%;
            margin-top : 35px;
        }
    }
}
</style>
