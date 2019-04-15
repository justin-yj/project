//app.js
var openid;
var wangzhi = 'https://testapp.yunhuiyue.com/wxyy'
var formids = []
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          wx.request({
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            url: wangzhi + '/getopenid?code=' + res.code,
            method: 'POST',
            success: function (res) {
              openid = res.data.openid
              wx.setStorageSync("OPENID", openid)
            }
          })
        }
       
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {

        }
      }
    })
  },
  globalData: {
    userInfo: null,
    baseUrl: "https://testapp.yunhuiyue.com/wxyy/",
    domain: wangzhi,
    openid: openid,
    formids: formids
  }
})