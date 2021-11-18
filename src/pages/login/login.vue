<template>

  <view class="userlogin background-style">
    <form>
      <view>
        <view class="label">手机号</view>
        <view class="fill">
          <input
            focus
            type="digit"
            placeholder="请输入手机号"
            v-model="phone"
            @blur="checkPhone"
          >
        </view>
      </view>
      <view class="label">密码</view>
      <view class="fill">
        <input
          type="password"
          placeholder="请输入密码"
          v-model="password"
        >
      </view>

      <button @click="userLogin">立刻登录</button>
    </form>
  </view>

</template>
<script>

import loginService from '../../api/loginService'
export default {
  data () {
    return {
      phone: "",
      password: "",
    }
  },
  methods: {
    checkPhone () {
      if (!this.phone) {
        uni.showToast({
          title: '请输入手机号',
          duration: 1000
        });
      } else {
        loginService.verifyUserPhone({ phone: this.phone }).then(res => {
          if (res.exist === -1) {
            uni.showToast({
              title: '请输入正确手机号',
              duration: 2000
            });
          }
        })
      }
    },
    userLogin () {
      let data = {
        phone: this.phone,
        password: this.password,
      }
      loginService.userLogin(data).then((res) => {
        if (res.code === 200) {
          uni.setStorageSync('user-imformation', res);
          uni.navigateBack({
            delta: 2
          });
        } else if (res.code === 502) {
          uni.showToast({
            title: '请输入正确密码',
            duration: 2000
          });
        }
      })
    },

  },
}
</script>
<style lang="less" scoped>
.userlogin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .label {
    margin-bottom: 10rpx;
  }
  .fill {
    border-radius: 6rpx;
    border: 1px solid #ccc;
    padding: 20rpx;
    margin-bottom: 20rpx;
  }
}
</style>
