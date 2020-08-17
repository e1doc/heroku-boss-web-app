<template>
    <div class="admin-sidebar">
        <div class="admin-container">
            <div class="admin-img"><img src="@/assets/bacoor-cavite-logo.png"></div>
            <div class="admin-text">City of Bacoor <br> Province of Cavite</div>
        </div>

        <div class="admin-body">
            <ul class="admin-nav">
                <li class="admin-item" :class="{ active: activeTab === 'dashboard'}" @click="changeTab('dashboard')">
                    <router-link to="dashboard">
                        <font-awesome-icon icon="chart-line" class="admin-icon"/>
                        DASHBOARD 
                    </router-link>
                </li>
                <li class="admin-item" :class="{ active: activeTab === 'transactions'}" @click="changeTab('transactions')">
                    <router-link to="transactions">
                        <font-awesome-icon icon="coins" class="admin-icon"/>
                        TRANSACTIONS 
                    </router-link>
                </li>
                <li class="admin-item" :class="{ active: activeTab === 'applications'}" @click="changeTab('applications')">
                    <router-link to="applications">
                        <font-awesome-icon icon="users" class="admin-icon"/>
                        APPLICATIONS
                    </router-link>
                </li>
                <li class="admin-item" :class="{ active: activeTab === 'inquiries'}" @click="changeTab('inquiries')">
                    <router-link to="inquiries">
                        <font-awesome-icon icon="comment-alt" class="admin-icon"/>
                        INQUIRIES 
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name : "SidebarNav",
    data(){
        return{
            activeTab: "dashboard",
        }
    },
  methods:{
    changeTab(tab){
      this.activeTab = tab
    },
  }
}
</script>

<style lang="scss" scoped>
div.admin-sidebar{
    height: 100vh;
    width: 290px;
    background-color: #EAF6FF;
    box-shadow: 0px 10px 8px #00000012;
    position : fixed;
    left : 0;
    top : 0;
    div.admin-container{
        width : 100%;
        display : flex;
        flex-wrap : wrap;
        text-align : center;
        padding : 60px 0;
        div.admin-img{
            width : 100%;
            margin-bottom : 20px;
            img{
                width : 60px;
                margin : 0 auto; 
            }
        }
        div.admin-text{
            width : 100%;
            font-size : 16px;
            font-weight : bold;
            line-height : 29px;
            letter-spacing : 0.18px;
        }
    }
    div.admin-body{
        ul.admin-nav{
            li.admin-item{
                a{
                    color : #1492E6;
                    font-size : 15px;
                    font-family : Raleway;
                    font-weight : bold;
                    line-height : 29px;
                    letter-spacing : 0.9px;
                    text-decoration : none;
                    padding: 20px 15px 20px 30px;
                    display : block;
                    .admin-icon{
                        font-size : 24px;
                        padding-right : 15px;
                        position : relative;
                        top : 4px;
                    }
                }
            }
            li.admin-item.active{
                background-color: #C2E6FF;
            }
        }
    }
}
</style>