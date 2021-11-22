export const changeTrack = (state, payload) => { //修改歌单
  state.track = payload;
}
export const changeSongUrl = (state, payload) => { //歌曲URL
  state.songUrl = payload;
}
export const changeSongDetail = (state, payload) => { //歌曲详情
  state.songDetail = payload;
}
export const changeLyric = (state, payload) => {
  state.lyric = payload;
}