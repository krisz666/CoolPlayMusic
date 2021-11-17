<template>
  <view class="daily">
    <view
      v-for="item in dailySongs"
      :key="item.al.id"
      class="daily-item"
    >
      <image
        :src="item.al.picUrl"
        mode=""
      />
      <view class="names">
        <view class="song">{{item.name}}</view>
        <view class="singer">{{item.ar[0].name + " - " + item.al.name}}</view>
      </view>
    </view>
  </view>
</template>
<script>
import service from '../../api/indexService'
import userService from '../../api/userService'
import user from '../../static/js/user';
export default {
  data () {
    return {
      recommendSongList: [],
      dailySongs: [],
      userImformation: {},
    }
  },
  onShow () {
    this.userImformation = user.getUserImformation();
    this.getRecommendSongs();
  },
  methods: {
    getRecommendSongs () {
      service.getRecommendSongs({ cookie: encodeURIComponent(this.userImformation.cookie) }).then(res => {
        console.log(res);
        if (res.code === 200) {
          console.log("每日推荐");
          this.dailySongs = res.data.dailySongs;
        }
      })
    }
  },
}
</script>
<style lang="less" scoped>
.daily {
  padding: 20rpx;
  .daily-item {
    display: flex;
    margin-bottom: 16rpx;
    image {
      width: 100rpx;
      height: 100rpx;
      border-radius: 10rpx;
      margin-right: 20rpx;
    }
    .names {
      width: calc(100% - 100rpx);
      border-bottom: 1px solid #ccc;
      .song {
        font-size: 32rpx;
        margin-bottom: 10rpx;
      }
      .singer {
        font-size: 26rpx;
      }
    }
  }
}
</style>
