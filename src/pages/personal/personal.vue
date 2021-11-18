<template>
  <view class="user">
    <!-- 用户信息 -->
    <view class="user-info  background-style">
      <!-- 用户已登录 -->
      <view
        v-if="userImformation"
        class="login"
      >
        <image :src="userImformation.profile.avatarUrl">
          <view class="nickname">{{userImformation.profile.nickname}}</view>
          <view class="fans">
            <view>{{userImformation.profile.follows + " 关注"}}</view>
            <view>{{userImformation.profile.followeds + " 粉丝"}}</view>
            <view>{{"Lv."+userImformation.profile.playlistCount}}</view>
          </view>
      </view>
      <!-- 用户未登录 -->
      <view
        v-else
        class="no-login"
      >
        <image
          src="../../static/image/no_login.png"
          mode=""
        />
        <view
          class="login-tip"
          @tap="toLogin"
        >立即登录</view>
      </view>

    </view>
    <!-- 退出登陆 -->
    <view
      @click="layout"
      class="background-style layout"
    >退出登陆</view>
    <!-- 音乐应用 -->
    <view class="user-application background-style">
      <view
        class="application-item"
        @tap="toUserFollows"
      >
        <view class="iconfont icon-wodehaoyou"></view>
        <view class="application-item-name">我的关注</view>
      </view>
      <view
        class="application-item"
        @tap="toUserRecord"
      >
        <view class="iconfont icon-zuijinbofang1"></view>
        <view class="application-item-name">最近播放</view>
      </view>
    </view>
    <!-- 喜欢 -->
    <view
      class="background-style like"
      @tap='toMyLike'
    >我的喜欢</view>
  </view>
</template>
<script> 
import loginService from '../../api/loginService'
import userService from '../../api/userService'
import user from '../../static/js/user';
export default {
  data () {
    return {
      login: false,
      userImformation: {},
    }
  },
  onShow () {
    this.userImformation = user.getUserImformation();
  },
  methods: {
    layout () {
      if (this.userImformation) {
        loginService.userLayout();
        uni.clearStorage();
        uni.navigateBack({
          delta: 0,
        });
      }
    },
    toLogin () {
      uni.navigateTo({
        url: '../login/Login',
      });
    },
    toUserFollows () {
      uni.navigateTo({
        url: 'follows/Follows',
      });
    },
    toUserRecord () {
      uni.navigateTo({
        url: 'record/Record',
      });
    },
    toCollection () {
      uni.navigateTo({
        url: 'collection/Collection',
      });
    },
    toMyLike () {
      uni.navigateTo({
        url: 'like/Like',
      });
    }
  },
}
</script>
<style lang="less" scoped>
.user {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  .user-info {
    width: 100%;
    margin-top: 60rpx;
    .login {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      image {
        position: absolute;
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        top: -60%;
      }
      .nickname {
        margin-top: 40rpx;
        font-weight: bold;
      }
    }
    .no-login {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      image {
        position: absolute;
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        top: -60%;
      }
      .login-tip {
        margin-top: 40rpx;
      }
    }
    .fans {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22rpx;
      view {
        padding: 0 20rpx;
        border-right: 1px solid #888;
      }
      view:last-child {
        border: none;
      }
    }
  }
  .user-application {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .application-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 42rpx;
      .iconfont {
        font-size: 50rpx;
        color: #87ceeb;
        margin-bottom: 10rpx;
      }
      .application-item-name {
        font-size: 20rpx;
      }
    }
  }
  .like {
  }
}
</style>
