import dao from "./baseDao"
export default {
  //用户登陆 手机密码
  userLogin (data) {
    return dao.get('/login/cellphone', data);
  },
  //退出登陆
  userLayout () {
    return dao.gete('/logout');
  },
  // 刷新登陆状态
  userLoginRefresh () {
    return dao.gete('/login/refresh');
  }
}