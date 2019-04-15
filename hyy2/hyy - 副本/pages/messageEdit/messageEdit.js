const app = getApp();
var domain = app.globalData.domain
var openid = wx.getStorageSync("OPENID")
var idCrd;
var idCrdLength;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    idCrd:[]
  },
  baocun:function(){
    if (idCrdLength == 18){
      wx.request({
        url: domain + '/wxyy/joinidcard',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          "openid": openid,
          "Idcard": idCrd
        },
        success: function (res) {
          wx.navigateBack({
            url:''
          })
         wx.showLoading({
           title: res.data.message,
         })
         setTimeout(function () {
           wx.hideLoading()
         }, 1000)
         
        }
      })
    }else{
      wx.showToast({
        title:'身份证不正确',
        icon:"none"
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1000)
    }
   
  },
  getID:function(res){
    console.log(res)
    var that = this
    idCrd = res.detail.value
    idCrdLength = res.detail.cursor


    
      that.setData({
        idCrd: idCrd
      })
       

   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})