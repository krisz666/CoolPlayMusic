<template>
  <view class="record">
    <view
      class="record-item"
      v-for="item in recordList"
      :key="item.song.id"
    >
      <view class="song-name">{{item.song.name}}</view>

      <view class="song-desc">{{item.song.ar[0].name + "-" + item.song.al.name}}</view>

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
      recordList: [],
    }
  },
  onShow () {
    this.userImformation = user.getUserImformation();
    this.getUserRecord();
  },
  methods: {
    getUserRecord () {
      userService.getUserRecord({ uid: this.userImformation.profile.userId, type: 1 }).then(res => {
        if (res.code === 200) {
          this.recordList = res.weekData;
        }
      })
    }
  },
}
</script>
<style lang="less" scoped>
.record {
  background: #fff;
  padding: 20rpx;
  .record-item {
    padding: 20rpx;
    border-bottom: 1px solid #ccc;
    .song-name {
      margin-bottom: 10rpx;
      font-size: 32rpx;
    }
    .song-desc {
      font-size: 24rpx;
    }
  }
}
</style>
