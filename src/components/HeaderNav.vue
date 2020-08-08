<template>
  <section class="meta-navigation flex-center">
      <div class="meta-left-box flex-center">
          <img class="meta-img" src="../assets/bacoor-cavite-logo.png">
          <div class="meta-site-name">Bacoor One Stop<br>Shop System</div>
      </div>
      <div class="meta-center-box">
          <ul class="meta-nav">
              <li class="meta-menu"><router-link to="#">Bacoor.gov.ph</router-link></li>
              <li class="meta-menu has-children">
                <router-link to="#">Transactions <font-awesome-icon icon="chevron-down" class="mr10 sub-menu-icon" /></router-link>
                <ul class="meta-sub-menu">
                  <li class="meta-menu"><router-link to="#">Building Permit Application</router-link></li>
                    <li class="meta-menu"><router-link to="#">Business Permit Application</router-link></li>
                    <li class="meta-menu"><router-link to="business-enrollment">Business Permit Enrollment</router-link></li>
                    <li class="meta-menu"><router-link to="real-property-enrollment">Real Property Enrollment</router-link></li>
                    <!-- <li class="meta-menu"><router-link to="#">Search Reference No.</router-link></li> -->
                    <li class="meta-menu"><router-link to="statement-of-accounts">Statement of Accounts</router-link></li>
                </ul>
              </li>
              <li class="meta-menu"><router-link to="#">About</router-link></li>
              <li class="meta-menu"><router-link to="#">FAQ's</router-link></li>
          </ul>
      </div>
      <div class="meta-right-box">
          <ul class="meta-nav flex-center">
              <li class="meta-menu meta-inquire">
                <router-link to="#"><font-awesome-icon icon="comment-alt" class="mr10 icon" />Inquire</router-link>
              </li>
              <li class="meta-menu meta-user-settings">
                <router-link to="#"><font-awesome-icon icon="user" class="mr10 user-icon" /></router-link>
                <ul class="meta-sub-menu">
                    <li class="meta-menu"><router-link to="profile">View Profile</router-link></li>
                    <li class="meta-menu"><a @click="logout()">Logout <font-awesome-icon icon="power-off" class="logout-icon" /></a></li>
                </ul>
              </li>
          </ul>
      </div>
  </section>
</template>

<script>
export default {
 name : "HeaderNav",
 methods:{
   logout(){
         this.$store.commit("setAuthType", 'login');
         this.$store.commit('resetUIState')
         this.$router.push({ path: '/' })
   }
 }
}
</script>

<style lang="scss" scoped>
section.meta-navigation {
    padding: 0px 30px;
    box-shadow: -2px 10px 30px rgba(127,127,127, 0.1);
    .meta-left-box {
        width: 20%;
        padding: 8px 0;
        img.meta-img {
            width: auto;
            max-height: 65px;
            margin-right: 15px;
        }
        .meta-site-name {
            color: #2B2B2B;
            font-size: 15px;
            font-weight: bold;
            line-height: 24px;
            letter-spacing: 0.1px;
        }
    }
    .meta-center-box {
        width: 60%;
        ul.meta-nav{
          text-align: center;
          li{
              margin: 0 40px;
          }
        }
    }
    .meta-right-box {
        width: 20%;
         ul.meta-nav{
            justify-content: flex-end;
            li{
              padding: 0 15px;
              ul.meta-sub-menu{
                width: 189px;
                top: 82px;
                right: 15px;
                left: unset;
                li{
                  padding: 0;
                }
              }
            }
            li.meta-user-settings {
              padding: 21px 15px;
              .user-icon{
                  font-size: 18px;
                  padding: 8px 10px;
                  border: 1px solid;
                  border-radius: 100%;
                  margin-right: 0;
                }
              .logout-icon {
                  position: absolute;
                  right: 20px;
              }
            }
            li.meta-inquire a{
              color: #e23a36;
            }
         }
    }
    ul.meta-nav{
      li{
          color: #2b2b2b;
          font-size: 15px;
          font-weight: bold;
          text-transform: uppercase;
          line-height: 20px;
          letter-spacing: 0.34px;
          display: inline;
          list-style-type: none;
          position: relative;
          a {
              text-decoration: none;
              color: #2b2b2b;
              padding: 10px 5px;
              border-bottom: 2px solid transparent;
              transition: 0.4s;
              .sub-menu-icon{
                  margin-right: 0;
                  font-size: 10px;
                  padding-left: 8px;
              } 
          }
      }
      ul.meta-sub-menu{
          background: #fcfcfc;
          width: 295px;
          display: none;
          position: absolute;
          top: 52px;
          left: -47px;
          z-index: 2;
          text-align: left;
          box-shadow: -2px 10px 20px rgba(127,127,127, 0.1);
          li{
              display: block;
              margin: 0;
              a{
                display: block;
                border-color: #F5F5F5;
                padding: 20px!important;
                font-size: 14px;
              }
          }
      }
    }
}

section.meta-navigation div.meta-center-box ul.meta-nav li:hover > a,
section.meta-navigation div.meta-center-box ul.meta-nav li > a:hover,
section.meta-navigation ul.meta-nav li ul.meta-sub-menu li > a:hover,
section.meta-navigation ul.meta-nav li ul.meta-sub-menu li > div:hover,
section.meta-navigation div.meta-center-box ul.meta-nav li.active{
  color: #E23A36;
  border-color: #E23A36;
  cursor: pointer;
}



section.meta-navigation ul.meta-nav > li.has-children{
  padding-bottom: 50px;
}

section.meta-navigation ul.meta-nav li:hover > ul.meta-sub-menu{
    display: block;
}

li.meta-user-settings:hover > a{
    color: #E23A36!important;
}

li.meta-inquire:hover a{
  color: #2b2b2b!important;
}

@media only screen and (max-width: 1320px){
    section.meta-navigation {
        .meta-center-box{ 
          ul.meta-nav li{
            font-size: 13px;
            margin: 0 20px;
          }
        }
        .meta-left-box{
           img.meta-img{
              max-height: 45px;
          }
          .meta-site-name{
            font-size: 13px;
            line-height: 20px;
          }
        }
        .meta-right-box{
          ul.meta-nav {
            li.meta-user-settings{
              padding: 11px 15px;
              .meta-sub-menu{
                  width: 189px;
                  top: 63px;
              }
            }
            li.meta-inquire{
              font-size: 13px;
            }
          }
        }
        ul.meta-nav{
            ul.meta-sub-menu{
              top: 40px;
              width: 245px;
              li{
                div, a {
                  font-size: 12px;
                  padding: 15px!important;
                }
              }
            }
        }   
    }
}

</style>