export default {
  getUserImformation () {
    return uni.getStorageSync('user-imformation')
  }
}