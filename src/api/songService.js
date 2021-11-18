import dao from "./baseDao"
export default {
  getSongUrl (data) {
    return dao.get('/song/url', data);
  }
}