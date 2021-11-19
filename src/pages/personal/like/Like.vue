<template>
  <view>
    <List :newList="LikeSongs"></List>
  </view>
</template>
<script>
import songService from '../../../api/songService'
import userService from '../../../api/userService'
import user from '../../../static/js/user';
export default {
  data () {
    return {
      LikeSongs: [],
      likeSongIds: [],
      user: {},
    }
  },
  onLoad () {
    this.user = user.getUserImformation();
    this.getLikeSongIds();
  },
  methods: {
    getLikeSongIds () {
      userService.getUserLikes({ id: this.user.userId, cookie: encodeURIComponent(this.user.cookie) }).then(res => {
        if (res.code === 200) {
          this.likeSongIds = res.ids;
        }
      }).then(() => {
        songService.getSongDetail({ ids: this.likeSongIds }).then(res => {
          if (res.code === 200) {
            this.LikeSongs = res.songs;
          }
        })
      })
    },
  },
}
</script>
<style lang="less" scoped>
</style>
