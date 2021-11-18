<template>
  <view>
    <List :newList="dailySongs"></List>
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
      userImformation: {},
    }
  },
  onLoad () {
    this.userImformation = user.getUserImformation();
    this.getRecommendSongs();
  },
  methods: {
    getRecommendSongs () {
      service.getRecommendSongs({ cookie: encodeURIComponent(this.userImformation.cookie) }).then(res => {
        if (res.code === 200) {
          this.dailySongs = res.data.dailySongs;
        }
      })
    }
  },
}
</script>
<style lang="less" scoped>
</style>
