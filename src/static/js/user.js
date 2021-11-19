
export default {
  getUserImformation () {
    if (uni.getStorageSync('user-imformation')) {
      let userinfo = uni.getStorageSync('user-imformation');
      let user_p = userinfo.profile; //用户信息
      let cookie = userinfo.cookie;

      let userId = user_p.userId;
      let gender = user_p.gender;
      let avatarUrl = user_p.avatarUrl;
      let nickname = user_p.nickname;
      let follows = user_p.follows;
      let followeds = user_p.followeds;
      let playlistCount = user_p.playlistCount;

      let user = {
        cookie,
        userId,//id
        gender, //性别
        avatarUrl,//头像
        nickname, //昵称
        follows, //关注
        followeds,//粉丝
        playlistCount, //等级
      }
      return user;
    }
  },
}