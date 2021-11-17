import dao from "./baseDao"
export default {
  // 获取轮播图
  getBanner (data) {
    return dao.get('/banner', data);
  },
  //获取个性歌单推荐
  getPersonalized (data) {
    return dao.get('/personalized', data);
  },
  //获取每日推荐歌曲
  getRecommendSongs() {
    return dao.gete('/recommend/songs');
  }
}