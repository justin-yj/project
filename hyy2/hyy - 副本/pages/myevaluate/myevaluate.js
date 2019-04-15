// pages/myevaluate/myevaluate.js
const app = getApp();
var domain = app.globalData.domain;
var openid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    openid = wx.getStorageSync("OPENID")
    wx.request({
      url: domain + '/findevaluations?openid=' + openid,
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        that.setData({
          list:res.data
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
goDetail:function(e){
  console.log(e.currentTarget.dataset.id)
  var ids = e.currentTarget.dataset.id
wx.navigateTo({
  url: '../evaluateDetail/evaluateDetail?id='+ids,
})
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