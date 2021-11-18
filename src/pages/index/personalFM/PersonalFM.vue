<template>
  <view
    class="FM"
    :onEnded='onEnded'
  >
    <image
      :src="personalFMList[currentIndex].album.blurPicUrl"
      mode='widthFix'
    />
    <view>
      {{"歌名："+personalFMList[currentIndex].name}}
    </view>
    <view>{{"歌手："+personalFMList[currentIndex].artists[0].name}}</view>
    <button @click="play">播放</button>
    <button @click="pause">暂停</button>
    <button @click="nextsong">下一首</button>
  </view>
</template>
<script>
import indexService from '../../../api/indexService'
import songService from '../../../api/songService'
import user from '../../../static/js/user';
let innerAudioContext = uni.createInnerAudioContext();
export default {

  data () {
    return {
      userImformation: {},
      personalFMList: [],
      songUrl: "",
      playing: false,
      currentIndex: 0,
    }
  },
  onLoad () {
    this.userImformation = user.getUserImformation();
    this.getPersonalFM();
  },
  onBackPress () {
    this.pause();
  },
  methods: {
    onEnded () {
      innerAudioContext.onEnded(function () {
        this.currentIndex++;
        if (this.currentIndex > this.personalFMList.length - 1) {
          this.currentIndex = 0;
        }
      })
    },
    nextsong () {
      this.currentIndex++;
      if (this.currentIndex > this.personalFMList.length - 1) {
        this.currentIndex = 0;
      }
      this.getSongUrl();
    },
    play () {
      this.getSongUrl();
      let _this = this;
      innerAudioContext.src = this.songUrl;
      innerAudioContext.play();
      innerAudioContext.onPlay(function () {
        if (_this.songUrl) {
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
    //获取私人FM歌曲列表
    getPersonalFM () {
      indexService.getPersonalFM({ cookie: encodeURIComponent(this.userImformation.cookie) }).then(res => {
        if (res.code === 200) {
          this.personalFMList = res.data;
          console.log('list', this.personalFMList);
        }
      });
    },
    //获取音乐资源url
    getSongUrl () {
      songService.getSongUrl({ id: this.personalFMList[this.currentIndex].id }).then(res => {
        if (res.code === 200) {
          this.songUrl = res.data[0].url;
          console.log('songurl', this.songUrl);
        }
      })
    }
  },
}
</script>
<style lang="less" scoped>
.FM {
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
  image {
    border-radius: 50%;
    -webkit-transform: rotate(360deg);
    animation: rotation 10s linear infinite;
    -moz-animation: rotation 10s linear infinite;
    -webkit-animation: rotation 10s linear infinite;
    -o-animation: rotation 10s linear infinite;
  }
}
</style>
