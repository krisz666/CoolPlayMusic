import dao from "./baseDao"
export default {
  //用户登陆状态
  getUserStatus () {
    return dao.gete('/login/status');
  },
  // 获取用户关注列表
  getUserFollows (data) {
    return dao.get('/user/follows', data);
  },
  // 获取用户最近播放
  getUserRecord (data) {  
    return dao.gete('/user/record', data);
  }
}