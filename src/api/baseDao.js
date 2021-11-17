let baseUrl = "http://localhost:3000"

function get(path, data){ //get
  return new Promise((resolved, rejected) => {
    uni.request({
      url: baseUrl + path,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        resolved(res.data);
      },
      fail: (err) => {
        rejected(err);
      }
    });
   })
}
function gete(path){ //get
  return new Promise((resolved, rejected) => {
    uni.request({
      url: baseUrl + path,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        resolved(res.data);
      },
      fail: (err) => {
        rejected(err);
      }
    });
   })
}
export default { get, gete}