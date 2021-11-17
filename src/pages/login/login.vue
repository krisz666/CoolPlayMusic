<template>
  <view>
    <view class="background-style">
      <form action="">
        <input
          type="text"
          placeholder="请输入手机号"
          v-model="phone"
        >
        <input
          type="password"
          placeholder="请输入密码"
          v-model="password"
        >
        <button @click="userLogin">确认</button>
      </form>
    </view>
  </view>
</template>
<script>

import loginservice from '../../api/loginService'
export default {
  data () {
    return {
      phone: "",
      password: "",
    }
  },
  methods: {
    userLogin () {
      let data = {
        phone: this.phone,
        password: this.password,
      }
      loginservice.userLogin(data).then((res) => {
        if (res.code === 200) {
          uni.setStorage({
            key: 'user-imformation',
            data: res,
            success: function () {
              console.log('success');
            }
          });
          uni.navigateBack({
            delta: 2
          });
        }
      })
    },

  },
}
</script>
<style lang="less" scoped>
</style>
