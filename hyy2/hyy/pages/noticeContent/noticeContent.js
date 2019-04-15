// pages/noticeContent/noticeContent.js
const app = getApp();
var checkeds;
var orderStatus;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checkeds:'',
    latticecode:'',
    juli:0,
    prePage:'',
    goOrder:'',
    contenta:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.prePage){
      that.setData({
        latticecode: options.latticecode,
        juli: options.dis,
        prePage: options.prePage
      })
    } else if (options.goOrder){
      that.setData({
        latticecode: options.latticecode,
        juli: options.dis,
        goOrder: options.goOrder
      })
    }
   wx.request({
     url: app.globalData.baseUrl+'configurationInformation?txt=informatior.txt',
     success:function(res){
       console.log(res.data)
       that.setData({
         contenta:res.data
       })
     }
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
  
  },
  returnHandle() {
    wx.navigateBack()
  }

})