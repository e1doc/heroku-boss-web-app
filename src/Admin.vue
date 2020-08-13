<template>
    <section class="admin-section">
        <sidebar-nav />
        <top-nav />
        <div class="admin-content">
            <router-view />
        </div>
    </section>
</template>

<script>
import SidebarNav from "@/components/admin/SidebarNav"
import TopNav from "@/components/admin/TopNav"
export default {
    name : "Admin",
    components : {
        SidebarNav,
        TopNav
    },
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap");
@import url("/css/main.scss");
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

@media only screen and ( max-width: 1380px ){
    section.admin-section div.admin-content{
        padding : 40px;
    }
}
</style>