import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  track: [], //歌单
  songUrl: {}, //歌曲url
  songDetail: {}, //歌曲详情 歌名 封面 歌手等
  lyric: "", // 歌词
}

const store = new Vuex.Store({
  // ...
  state,
  mutations,
  getters,
})
export default store