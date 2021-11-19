<template>
  <view>

  </view>
</template>
<script>
import service from '../../../api/indexService'
import userService from '../../../api/userService'
import user from '../../../static/js/user';
export default {
  data () {
    return {
      dailySongs: [],
      user: {},
    }
  },
  onLoad () {
    // this.user = user.getUserImformation();
    // this.getRecommendSongs();
  },
  methods: {
    // getRecommendSongs () {
    //   service.getRecommendSongs({ cookie: encodeURIComponent(this.user.cookie) }).then(res => {
    //     if (res.code === 200) {

    //     }
    //   })
    // }
  },
}
</script>
<style lang="less" scoped>
</style>
