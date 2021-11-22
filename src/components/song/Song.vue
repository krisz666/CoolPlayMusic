<template>
  <view
    class="song"
    v-if="songUrl"
  >
    <image
      class="cover"
      :src="songDetail.al.picUrl"
      mode='widthFix'
    />
    <view>
      {{lyric}}
    </view>
    <view>
      {{"歌名："+ songDetail.name}}
    </view>
    <view>{{"歌手："+ songDetail.ar[0].name}}</view>
    <button @click="play">播放</button>
    <button @click="pause">暂停</button>
    <!-- <button @click="nextsong">下一首</button> -->
  </view>
</template>
<script>

import { mapState } from 'vuex'
let innerAudioContext = uni.createInnerAudioContext();
export default {
  computed: {
    ...mapState(['songDetail', 'songUrl', 'lyric']),
  },
  onBackPress () {
    innerAudioContext.destroy();
  },
  onReady () {
    this.dealWith(this.lyric);
  },
  methods: {
    // onEnded () {
    //   innerAudioContext.onEnded(function () {
    //     this.currentIndex++;
    //     if (this.currentIndex > this.personalFMList.length - 1) {
    //       this.currentIndex = 0;
    //     }
    //   })
    // },
    // nextsong () {
    //   this.currentIndex++;
    //   if (this.currentIndex > this.personalFMList.length - 1) {
    //     this.currentIndex = 0;
    //   }
    // },
    play () {
      let _this = this;
      innerAudioContext.src = this.songUrl.url;
      innerAudioContext.play();
      innerAudioContext.onPlay(function () {
        if (_this.songUrl.url) {
          uni.showToast({
            title: '播放中',
            duration: 2000
          });
        }
        if (_this.currentTime) {
          innerAudioContext.seek(_this.currentTime);
        }
      })
      this.playing = true;

    },
    pause () {
      let _this = this;
      innerAudioContext.pause();
      innerAudioContext.onPause(function () {
        console.log("播放暂停");
        _this.currentTime = innerAudioContext.currentTime;

      })
      this.playing = false;
    },
    dealWith (lyric) {
      let arr = this.lyric.split("\n");
      console.log(arr);
    }
    //获取音乐资源url
    // getSongUrl () {
    //   songService.getSongUrl({ id: this.songDetail.id }).then(res => {
    //     if (res.code === 200) {
    //       this.songUrl = res.data[0].url;
    //     }
    //   })
    // }
  },
}
</script>
<style lang="less" scoped>
.song {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  .cover {
    border-radius: 50%;
    -webkit-transform: rotate(360deg);
    animation: rotation 10s linear infinite;
    -moz-animation: rotation 10s linear infinite;
    -webkit-animation: rotation 10s linear infinite;
    -o-animation: rotation 10s linear infinite;
  }
}
</style>
 