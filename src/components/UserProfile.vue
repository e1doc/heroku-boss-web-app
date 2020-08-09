<template>
  <div class="meta-parent-box">
    <div class="meta-header"></div>
    <div class="meta-body">
      <div class="meta-icon">
        <font-awesome-icon icon="user" class="mr10 user-icon" />
      </div>
      <div class="meta-content">
        <div class="meta-name">
          <PuSkeleton
            >{{ userDetails.first_name }}
            {{ userDetails.last_name }}</PuSkeleton
          >
        </div>
        <div class="meta-details">
          <div class="meta-text username flex-center">
            <div><font-awesome-icon icon="user" class="mr10 icon" /></div>
            <div class="flex-grow">
              <PuSkeleton>{{ userDetails.username }}</PuSkeleton>
            </div>
          </div>
          <div class="meta-text email flex-center">
            <div><font-awesome-icon icon="envelope" class="mr10 icon" /></div>
            <div class="flex-grow">
              <PuSkeleton>{{ userDetails.email }}</PuSkeleton>
            </div>
          </div>
          <div class="meta-text phone flex-center">
            <div><font-awesome-icon icon="phone" class="mr10 icon" /></div>
            <div class="flex-grow">
              <PuSkeleton>{{ userDetails.phone_number }}</PuSkeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Skeleton } from "vue-loading-skeleton";
import { mapGetters } from "vuex";
export default {
  name: "UserProfile",
  data() {
    return {
      complete: false,
    };
  },
  computed: {
    ...mapGetters(["userDetails"]),
  },
};
</script>

<style lang="scss" scoped>
.meta-parent-box {
  .meta-header {
    height: 274px;
    width: 100%;
    background-image: url("../assets/municipal-hall.png");
    background-position: center;
    background-size: cover;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .meta-body {
    position: relative;
    .meta-icon {
      text-align: center;
      position: absolute;
      top: -30px;
      left: 0;
      right: 0;
      .user-icon {
        font-size: 35px;
        background-color: #fff;
        padding: 10px 12px;
        box-shadow: -2px 10px 30px rgba(127, 127, 127, 0.1);
        border-radius: 100%;
        margin-right: 0;
      }
    }
    .meta-content {
      padding: 30px 15px;
      max-width: 266px;
      margin: 0 auto;
      .meta-details {
        font-family: "Proxima Nova Rg";
        .meta-text {
          font-size: 15px;
          font-weight: normal;
          color: #2b2b2b;
          margin-bottom: 20px;
        }
      }
      .meta-name {
        font-size: 20px;
        font-weight: bold;
        text-transform: uppercase;
        line-height: 24px;
        padding: 50px 0 80px;
        text-align: center;
      }
    }
  }

  .icon {
    color: #1492e6;
    margin-right: 25px;
  }
}

@media only screen and (max-width: 1400px) {
  .meta-parent-box .meta-header {
    height: 200px;
  }

  .meta-parent-box .meta-body .meta-content .meta-name {
    font-size: 18px;
    padding: 30px 0 40px;
  }
}
</style>
