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
    details:'',
    content1:[],
    contenta:[],
    showNotice: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      indxNum: options.dcs,
      id:options.id,
      classfly: options.classfly,
      details: options.details
    })
    // 预约须知
    wx.request({
      url: app.globalData.baseUrl + 'configurationInformation?txt=informatior.txt',
      success: function (res) {
        that.setData({
          contenta: res.data
        })
      }
    })
    wx.request({
      url: domain + '/configurationInformation?txt=appintment' + options.dcs + '_' + options.id +'.txt',
      success:function(res){
        var arr1 = res.data[0]
        var arr2 = res.data.splice(0, 1)
        that.setData({
          content: res.data,
          content1: arr1
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
    this.setData({
      showNotice: false
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
  btn:function(e){
    var that = this
    that.setData({
      showNotice:true
    })
    app.globalData.formids.push(e.detail.formId)
   
  },
  // 完成预约须知阅读
  btnBack: function () {
    var that = this
    that.setData({
      showNotice: false
    })
    wx.navigateTo({
      url: '../startOrder/order?id=' + this.data.id + '&latticeid=' + this.data.indxNum + '&details=' + this.data.classfly,
    })
  },
})