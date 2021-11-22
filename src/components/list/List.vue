<template>
  <view class="list">
    <view
      class="item"
      v-for="item in list"
      :key="item.id"
      @tap="toSong(item)"
    >
      <image :src="item.al.picUrl" />
      <view class="desc">
        <view class="item-name ellipsis-single">{{item.name}}</view>
        <view class="item-info ellipsis-single">{{item.ar[0].name + "-" + item.al.name}}</view>
      </view>

    </view>
  </view>
</template>
<script>
import { mapMutations } from 'vuex'
import songService from '../../api/songService'
export default {
  props: {
    newList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      list: [],
    }
  },
  watch: {
    newList: function (newVal, oldVal) {
      this.list = newVal;
    }
  },
  methods: {
    ...mapMutations(['changeSongUrl', 'changeSongDetail', 'changeLyric']),
    //前往歌曲页面
    toSong (item) {
      songService.getSongUrl({ id: item.id }).then(res => {
        if (res.code === 200) {
          this.changeSongUrl(res.data[0]);
        }
      }).then(() => {
        songService.getSongDetail({ ids: item.id }).then(res => {
          if (res.code === 200) {
            this.changeSongDetail(res.songs[0]);
          }
        })
      }).then(() => {
        songService.getSongLyric({ id: item.id }).then(res => {
          if (res.code === 200) {
            this.changeLyric(res.lrc.lyric)
          }
        })
      }).then(() => {
        uni.navigateTo({
          url: '/pages/playsong/PlaySong',
          fail (err) {
            console.log(err);
          }
        });
      })
    }
  },
}
</script>
<style lang="less" scoped>
</style>
