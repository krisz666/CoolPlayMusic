<template>

  <view class="navheder">
    <view class="navname">{{newname}}</view>
    <view class="more">{{newmore}}</view>
  </view>

</template>
<script>
export default {
  props: ["newname", "newmore"],
  data () {
    return {
      navname: "",
      more: ""
    }
  },
  watch: {
    newname: function (newnavname, oldnavname) {
      this.navname = newnavname;
    },
    newmore: function (newmore, oldmore) {
      this.more = newmore;
    }
  },
  methods: {
  },
}
</script>
<style lang="less" scoped>
.navheder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10rpx 0;
  .navname {
    font-weight: bold;
    font-size: 28rpx;
  }
  .more {
    padding: 0 20rpx;
    border: 1px solid #000;
    border-radius: 20rpx;
    font-size: 28rpx;
  }
}
</style>
