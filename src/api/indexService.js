import dao from "./baseDao"
export default {
  // 获取轮播图
  getBanner (data) {
    return dao.get('/banner', data);
  },
  //获取个性歌单推荐
  getRecommendResource (data) {
    return dao.get('/recommend/resource', data);
  },
  //获取每日推荐歌曲
  getRecommendSongs(data) {
    return dao.get('/recommend/songs', data);
  },
  //获取私人FM
  getPersonalFM (data) {
    return dao.get('/personal_fm', data);
  }
}