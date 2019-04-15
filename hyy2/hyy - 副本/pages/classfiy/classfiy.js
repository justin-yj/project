// pages/classfiy/classfiy.js
const app = getApp();
var domain = app.globalData.domain
var indxNum;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indxNum: indxNum,
    content:[],
    id:null,
    classfly:null,
    details:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    this.setData({
      indxNum: options.dcs,
      id:options.id,
      classfly: options.classfly,
      details: options.details
    })
    wx.request({
      url: domain +'/configurationInformation?txt=informatior.txt',
      success:function(res){
        console.log(res.data)
        that.setData({
          content: res.data,
          
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
  btn:function(){
    console.log(this.data.indxNum)
    wx.navigateTo({
      url: '../startOrder/order?id=' + this.data.id + '&latticeid=' + this.data.indxNum +  '&details=' + this.data.classfly,
    })
  }
})