<template>
  <view class="follows">
    <view
      v-for="item in followList"
      :key="item.userId"
      class="follow-item"
    >
      <image
        :src="item.avatarUrl"
        mode=""
        class="follow-image"
      />
      <view class="follow-desc">
        <view class="nickname">{{item.nickname}}</view>
        <view class="follow-info">
          性别：{{item.gender === 1 ? '男' : '女'}}
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import userService from '../../../api/userService'
import user from '../../../static/js/user';
export default {
  data () {
    return {
      userImformation: {},
      followList: [],
    }
  },
  onShow () {
    this.userImformation = user.getUserImformation();
    this.getUserFollows();
  },
  methods: {
    getUserFollows () {
      userService.getUserFollows({ uid: this.userImformation.profile.userId }).then(res => {
        if (res.code === 200) {
          this.followList = res.follow;
        }
      });
    },
  }
}
</script>
<style lang="less" scoped>
page {
  background: #fff;
}
.follows {
  height: 100%;
  padding: 0 10rpx;
  .follow-item {
    display: flex;
    justify-content: flex-start;
    padding: 16rpx;
    .follow-image {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      margin-right: 20rpx;
    }
    .follow-desc {
      width: calc(100% - 100rpx);
      padding-left: 10rpx;
      border-bottom: 2rpx solid #ccc;
      .nickname {
        font-size: 28rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
      }
      .follow-info {
        font-size: 24rpx;
      }
    }
  }
}
</style>
