<template>

  <view>
    <scroll-view
      scroll-x
      enable-flex
      class="playlist"
    >
      <view
        v-for="item in scrollPlayList"
        :key="item.id"
        class="Item"
      >
        <view
          class="toplaylist"
          @tap='toplaylist(item)'
        >
          <image :src="item.picUrl" />
          <text class="ellipsis">{{item.name}}</text>
        </view>
      </view>
    </scroll-view>
  </view>

</template>
<script>
import songService from '../../api/songService'
export default {
  props: {
    newList: {
      type: Array,
      default: () => []
    },
    // newId: {
    //   type: Number,
    // },
    // tracks: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data () {
    return {
      scrollPlayList: [],
      songs: "",
      id: "",
    }
  },
  watch: {
    newList: function (newVal, oldVal) {
      this.scrollPlayList = newVal;
    },

  },
  methods: {
    getId (item) {
      this.id = item.id;
      this.getPlayList();
    },
    toplaylist (item) {
      this.id = item.id;
      this.getPlayList();
      uni.navigateTo({
        url: '/pages/playlist/playlist',
      });
    },
    getPlayList () {
      songService.getPlayList({ id: this.id }).then(res => {
        if (res.code === 200) {
          this.tracks = res.playlist.tracks;
        }
      })

    }
  },
}
</script>
<style lang="less" scoped>
.playlist {
  display: flex;
  white-space: nowrap;
  justify-items: center;
  align-items: center;
  margin-top: 20rpx;
  .Item {
    display: inline-block;
    margin-right: 20rpx;
    .toplaylist {
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;
      width: 200rpx;
      image {
        width: 100%;
        height: 200rpx;
        border-radius: 10rpx;
      }
      text {
        margin-top: 10rpx;
        font-size: 26rpx;
      }
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
