<template>
  <view>
    <!-- 渲染出每句歌词 -->
    <view
      class="other-big"
      :style="{'top':top}"
    >
      <view
        class="other"
        :style="{'color':index==nowlirics?'#EB4A38':'#00000' , 'transform':'translateY('+ height + 'px)'}"
        v-for="(item,index) in arr"
        :key="index"
        style="text-align: center;"
      >
        {{item.words}}
      </view>
    </view>
    <!-- 歌词进度条 -->
    <view class="other-width">
      <view class="wrap">
        <slider
          class=""
          min="0"
          step="1"
          :value="nowtimes"
          activeColor="#BB2C08"
          backgroundColor="#e9e9e9"
          block-size="14"
          block-color="#ffffff"
          @change="moved"
          @changing="moved"
          :max="maxTime"
        ></slider>
      </view>
    </view>
    <!-- 播放、暂停按钮 -->
    <view class="other-flex">
      <view class="other-img">
        <image
          src="https://i.loli.net/2020/11/09/yovmgqYdaxblGAc.png"
          mode=""
        ></image>
        <image
          @click="onBegin()"
          src="https://i.loli.net/2020/11/09/dwnCQBH8pGkhaxR.png"
          mode=""
          v-show="playbool"
        ></image>
        <image
          @click="onStop()"
          src="https://i.loli.net/2020/11/09/vyPNSZQOURFqsg5.png"
          mode=""
          v-show="!playbool"
        ></image>
        <image
          src="https://i.loli.net/2020/11/09/GjUxzkapWyDVi8n.png"
          mode=""
        ></image>
      </view>
    </view>
  </view>
</template>
<script>

export default {
  data () {
    return {
      playbool: false,
      url: "",
      lyric: "",
      maxTime: "",
      arr: "",
      nowtimes: 0,
      ok: true,
      seconds: 0,
      play: true,
      nowlirics: '',
      top: '10px',
      scrollTop: 0,
      height: ""
    }
  },
  onLoad () {
    let bgAudioMannager = uni.createInnerAudioContext();
    var that = this
    var http = "http://localhost:3000"
    // 请求歌词
    uni.request({
      url: http + '/lyric',
      data: {
        id: "33894312"
      },
      success: (res) => {
        var left = res.lrc.lyric.split("\n");
        // console.log(left)
        that.lyric = res.lrc.lyric;
        console.log(that.lyric);
        // 声明一个空数组
        var arr = []
        left.forEach((val, i) => {
          var words = val.split("]") //分割歌词
          var time = words[0].slice(1, 10) //选择从下标为1到下标为10的字符串
          // 向arr数组添加内容（时间和歌词）
          arr.push({
            // 歌词时间转换
            time: ((time.slice(0, 2) - 0) * 60) + (time.slice(3, 5) - 0) + ((time.slice(6, 9) - 0) / 1000), //歌词时间转换为秒
            words: words[1] ? words[1] : ""
          })
        })
        that.arr = arr
        // console.log(that.arr);
        that.maxTime = arr[arr.length - 2].time;
        // 请求歌曲链接
        uni.request({
          url: http + '/song/url',
          data: {
            id: "33894312"
          },
          success: (res) => {
            console.log(res.data[0].url)
            var that = this;

            bgAudioMannager.title = "lll";
            bgAudioMannager.singer = "lll";
            bgAudioMannager.src = res.data[0].url;
            // 当前进度除以总时长
            bgAudioMannager.onTimeUpdate(function () {
              // console.log(bgAudioMannager.duration, "总时间")
              // console.log(bgAudioMannager.currentTime, "当前时间");
              that.nowtimes = Number(bgAudioMannager.currentTime);
              var realtime = Number(bgAudioMannager.currentTime)
              for (var i = 1; i < arr.length; i++) {
                if (realtime < arr[i].time) {
                  var newi = i - 1;
                  that.nowlirics = newi;
                  that.top = (newi * -30) + 250 + "px";
                  // console.log(that.top)
                  var height = 250 - newi * 30
                  // console.log(height);
                  that.height = height
                  break;
                }
              }
            })
            bgAudioMannager.onEnded(() => {
              bgAudioMannager.play()
            });
          }
        })

      }
    });
    console.log(this.arr);

  },

  methods: {

    // 播放
    onBegin () {
      this.playbool = false;
      // 获取背景音频管理器播放
      let bgAudioMannager = uni.createInnerAudioContext()
      bgAudioMannager.play()
    },
    // 暂停
    onStop () {
      // 获取背景音频管理器暂停
      this.playbool = true;
      let bgAudioMannager = uni.createInnerAudioContext()
      bgAudioMannager.pause()
    },
    moved (e) {
      // 拖动进度条跳转到指定时间
      let bgAudioMannager = uni.createInnerAudioContext()
      bgAudioMannager.seek(e.detail.value)
      this.nowtimes = e.detail.value;
    },
  }
}
</script>
<style>
.other-big {
  height: 700rpx;
  overflow: hidden;
  overflow-y: scroll;
  line-height: 60rpx;
  padding-bottom: 300rpx;
}

.wrap {
  width: 80%;
}

.other-width {
  display: flex;
  justify-content: center;
  margin-top: 10%;
}

.other-img image {
  width: 5vh;
  height: 5vh;
  margin: 1%;
}

.other-img {
  background-color: #dbf1e1;
  width: 50%;
  border-radius: 50rpx;
  display: flex;
  justify-content: center;
  padding: 2%;
}

.other-flex {
  display: flex;
  justify-content: center;
}

.other {
  transform: translateY(150px);
  height: 30px;
}
</style>
