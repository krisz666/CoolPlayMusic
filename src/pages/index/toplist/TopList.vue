<template>
  <view class="top-list">
    <view
      v-for="item in toplist"
      :key="item.id"
      class="item"
      @click="toPlayList(item)"
    >
      <image
        :src="item.coverImgUrl"
        mode="widthFix"
      />
      <view class="ellipsis name">{{item.name}}</view>
    </view>
  </view>
</template>
<script>
import service from '../../../api/indexService'
import songService from '../../../api/songService'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      toplist: [],
    }
  },
  onLoad () {
    this.getTopList();
  },
  methods: {
    ...mapMutations(['changeTrack']),
    getTopList () {
      service.getTopList().then(res => {
        if (res.code === 200) {
          this.toplist = res.list;
        }
      })
    },
    toPlayList (item) {
      songService.getPlayList({ id: item.id }).then(res => {
        if (res.code === 200) {
          // this.$store.commit('changeTrack', res.playlist.tracks.slice(0, 20));
          this.changeTrack(res.playlist.tracks.slice(0, 30));
        }
      }).catch(err => console.log(err));
      uni.navigateTo({
        url: '../../playlist/PlayList',
      });
    }
  },
}
</script>
<style lang="less" scoped>
.top-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20rpx;
  .item {
    width: 200rpx;
    align-items: center;
    margin-bottom: 10rpx;
    image {
      width: 100%;
      border-radius: 10rpx;
    }
    .name {
      font-size: 28rpx;
    }
  }
}
</style>
