// pages/noticeContent/noticeContent.js
const app = getApp();
var checkeds;
var prePage;
var orderStatus;
var goOrder;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkeds:'',
    latticecode:'',
    juli:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
    console.log(options)
    if (options.prePage){
      prePage = options.prePage;
      that.setData({
        latticecode: options.latticecode,
        juli: options.dis
      })
    } else if (options.goOrder){
      goOrder = options.goOrder
      that.setData({
        latticecode: options.latticecode,
        juli: options.dis
      })
    }
   
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
    
    var that = this
    wx.getStorage({
      key: 'checkeds',
      success: function (res) {
        checkeds = res.data
        that.setData({
          checkeds: checkeds
        })
      }
    })
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
  finishReading:function(e){
    var isTrue = e.detail.value[0];
    if(e.detail.value[0] == ""){
      this.setData({
        checkeds :true
      })
      wx.setStorage({
        key: 'checkeds',
        data: true,
      })
    }else{
      this.setData({
        checkeds: false
      })
      wx.setStorage({
        key: 'checkeds',
        data: false,
      })
    }
    return {isTrue}
  },
  btnBack:function(){
    var that = this
    console.log(prePage, goOrder,"预约须知")
    if (prePage){
      wx.navigateTo({
        url: '../inLine/inLine?latticecode=' + that.data.latticecode + "&dis=" + that.data.juli
      })
    } else if (goOrder){
      wx.navigateTo({
        url: '../startOrder/order?latticeid=' + that.data.latticecode,
      })
    }
    else{
      wx.navigateBack({
        url:'../index/index'
      })
    }
   
  }


})