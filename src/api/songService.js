import dao from "./baseDao"
export default {
  //获取歌曲URL
  getSongUrl (data) {
    return dao.get('/song/url', data);
  },
  // 获取歌曲详情
  getSongDetail (data) {
    return dao.get('/song/detail', data);
  }
}