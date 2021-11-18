<template>
  <view class="list">
    <view
      class="item"
      v-for="item in recordList"
      :key="item.song.id"
    >
      <image :src="item.song.al.picUrl" />
      <view class="desc">
        <view class="item-name">{{item.song.name}}</view>

        <view class="item-info">{{item.song.ar[0].name + "-" + item.song.al.name}}</view>
      </view>

    </view>
  </view>
</template>
<script>
import userService from '../../../api/userService'
import user from '../../../static/js/user';
export default {
  data () {
    return {
      userImformation: {},
      recordList: [],
    }
  },
  onLoad () {
    this.userImformation = user.getUserImformation();
    this.getUserRecord();
  },
  methods: {
    getUserRecord () {
      userService.getUserRecord({ uid: this.userImformation.profile.userId, type: 1 }).then(res => {
        if (res.code === 200) {
          this.recordList = res.weekData;
        }
      })
    }
  },
}
</script>
<style lang="less" scoped>
</style>
