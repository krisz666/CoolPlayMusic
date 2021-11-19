<template>
  <view>
    <List :newList="recordList"></List>
  </view>
</template>
<script>
import userService from '../../../api/userService'
import user from '../../../static/js/user';
export default {
  data () {
    return {
      user: {},
      recordList: [],
    }
  },
  onLoad () {
    this.user = user.getUserImformation();
    this.getUserRecord();
  },
  methods: {
    getUserRecord () {
      userService.getUserRecord({ uid: this.user.userId, type: 1 }).then(res => {
        if (res.code === 200) {
          res.weekData.forEach(element => {
            this.recordList.push(element.song);
          });
        }
      })
    }
  },
}
</script>
<style lang="less" scoped>
</style>
