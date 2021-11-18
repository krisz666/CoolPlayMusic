<template>
  <view class="list">
    <view
      v-for="item in dailySongs"
      :key="item.al.id"
      class="item"
    >
      <image :src="item.al.picUrl" />
      <view class="desc">
        <view class="item-name">{{item.name}}</view>
        <view class="item-info">{{item.ar[0].name + " - " + item.al.name}}</view>
      </view>
    </view>
  </view>
</template>
<script>
import service from '../../../api/indexService'
import userService from '../../../api/userService'
import user from '../../../static/js/user';
export default {
  data () {
    return {
      recommendSongList: [],
      dailySongs: [],
      userImformation: {},
    }
  },
  onLoad () {
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
</style>
