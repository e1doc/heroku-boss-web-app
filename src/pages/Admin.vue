<template>
    <section class="admin-section">
        <sidebar-nav />
        <top-nav />
        <div class="admin-content">
            <users />
        </div>
    </section>
</template>

<script>
import SidebarNav from "@/components/admin/SidebarNav";
import TopNav from "@/components/admin/TopNav";
import Users from "@/components/admin/Users";
export default {
    name : "Admin",
    components : {
        SidebarNav,
        TopNav,
        Users
    },
}
</script>

<style lang="scss" scoped>
section.admin-section{
    div.admin-content{
        min-height: calc( 100vh - 207px);   
        padding : 60px 40px;
        margin-left : 290px;
        margin-top : 83px;
        display : flex;
        flex-wrap : wrap;
    }
}
</style>