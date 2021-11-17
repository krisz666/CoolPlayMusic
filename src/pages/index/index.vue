<template>
  <view class="content">

    <view class="home-header  background-style">
      <!-- 轮播图 -->
      <view class="banner">
        <swiper
          autoplay
          indicator-dots
          indicator-active-color="#fff"
        >
          <swiper-item
            v-for="item in bannerList"
            :key="item.bannnerId"
          >
            <image :src="item.pic" />
          </swiper-item>
        </swiper>
      </view>
      <!-- 图标行 -->
      <view>
        <scroll-view
          scroll-x
          enable-flex
          class="navContanier "
        >
          <view class="navItem">
            <view
              class="navItemInner"
              @tap='toRecommendSongs'
            >
              <view class="iconfont icon-meirituijian"></view>
              <text>每日推荐</text>
            </view>
          </view>
          <view class="navItem">
            <view class="navItemInner">
              <view class="iconfont icon-paihangbang"></view>
              <text>排行榜</text>
            </view>
          </view>
          <view class="navItem">
            <view class="navItemInner">
              <view class="iconfont icon-sirenFM1"></view>
              <text>私人FM</text>
            </view>
          </view>
          <view class="navItem">
            <view class="navItemInner">
              <view class="iconfont icon-gedan1"></view>
              <text>歌单</text>
            </view>
          </view>
          <view class="navItem">
            <view class="navItemInner">
              <view class="iconfont icon-faxian_youxizhuanqu"></view>
              <text>游戏专区</text>
            </view>
          </view>
          <view class="navItem">
            <view class="navItemInner">
              <view class="iconfont icon-meirituijian"></view>
              <text>每日推荐</text>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <!-- 推荐歌单 -->
    <view class="recommendSong background-style">
      <NavHeader
        newname="推荐歌单"
        newmore="更多>"
      ></NavHeader>
      <scroll-view
        scroll-x
        enable-flex
        class="recommend"
      >
        <view
          v-for="item in recommendList"
          :key="item.id"
          class="recommendItem"
        >
          <view class="recommendItemInner">
            <image :src="item.picUrl" />
            <text class="ellipsis">{{item.name}}</text>
          </view>

        </view>
      </scroll-view>
    </view>
    <!-- 推荐歌曲 -->
    <view class="background-style">
      <NavHeader
        newname="治愈温暖你的时光"
        newmore="播放"
      ></NavHeader>
      <scroll-view
        scroll-x
        enable-flex
        class="recommend"
      >
        <view>

        </view>
      </scroll-view>
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
      bannerList: [],
      recommendList: [],
      recommendResourceList: [],
      userImformation: {},
    }
  },
  onShow () {
    //this.getUserStatus();
    this.getBanner();
    this.getPersonalized();
    this.userImformation = user.getUserImformation();
  },
  methods: {
    //获取用户登陆状态
    getUserStatus () {
      userService.getUserStatus().then(res => {
        console.log(res);
      })
    },
    //获取轮播图
    getBanner () {
      service.getBanner({ type: 2 }).then(res => {
        this.bannerList = res.banners;
      })
    },
    //获取歌单
    getPersonalized () {
      service.getPersonalized({ limit: 10 }).then(res => {
        this.recommendList = res.result;
      })
    },
    toRecommendSongs () {
      uni.navigateTo({
        url: 'RecommendSong',
      });
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../static/less/iconfont.less";
.content {
  .home-header {
    .banner {
      swiper {
        width: 100%;
      }
      image {
        width: 100%;
        height: 100%;
        border-radius: 10rpx;
      }
    }
    .navContanier {
      display: flex;
      white-space: nowrap;
      justify-items: center;
      align-items: center;
      margin-top: 10rpx;
      .navItem {
        display: inline-block;
        margin-right: 60rpx;
        .navItemInner {
          display: flex;
          flex-direction: column;
          justify-items: center;
          align-items: center;
          view {
            width: 90rpx;
            height: 90rpx;
            line-height: 90rpx;
            border-radius: 50%;
            text-align: center;
            background-color: skyblue;
          }
          text {
            font-size: 14rpx;
          }
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .recommendSong {
    .recommend {
      display: flex;
      white-space: nowrap;
      justify-items: center;
      align-items: center;
      margin-top: 20rpx;
      .recommendItem {
        display: inline-block;
        margin-right: 20rpx;
        .recommendItemInner {
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
  }
}
</style>