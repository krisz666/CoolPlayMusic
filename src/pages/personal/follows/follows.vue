<template>
  <view class="list">
    <view
      v-for="item in followList"
      :key="item.userId"
      class="item"
    >
      <image :src="item.avatarUrl" />
      <view class="desc">
        <view class="item-name">{{item.nickname}}</view>
        <view class="item-info">
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
      user: {},
      followList: [],
    }
  },
  onLoad () {
    this.user = user.getUserImformation();
    this.getUserFollows();
  },
  methods: {
    getUserFollows () {
      if (!this.user) {

      } else {
        userService.getUserFollows({ uid: this.user.userId }).then(res => {
          if (res.code === 200) {
            this.followList = res.follow;
          }
        });
      }
    },
  }
}
</script>
<style lang="less" scoped>
.list {
  .item {
    image {
      border-radius: 50%;
    }
  }
}
</style>
