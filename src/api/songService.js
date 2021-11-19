import dao from "./baseDao"
export default {
  //获取歌曲URL
  getSongUrl (data) {
    return dao.get('/song/url', data);
  },
  // 获取歌曲详情
  getSongDetail (data) {
    return dao.get('/song/detail', data);
  },
  //获取歌词
  getSongLyric (data) {
    return dao.get('/lyric', data);
  },
  //获取歌单详情 
  getPlayList (data) {
    return dao.get('/playlist/detail', data);
  }
}