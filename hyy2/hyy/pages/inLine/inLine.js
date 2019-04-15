// pages/inLine/inLine.js
const app = getApp();
var domain = app.globalData.domain
var indexNum;
var mechanism;
var showNotice = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listValue: [],
    numberPerson: {},
    timeDuan: [],
    classfiy: [],
    indexNum: 0,
    juli:0,
    showTime:false,
    timeDuanLength:0,
    contenta:[]
  },
  elseData:{
    latitude:'',
    longitude:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      wx.showLoading({
        title: '加载中',
      })
    var timeDuan = [];
    var classfiy = [];
    indexNum = options.latticecode
    this.setData({
      juli:options.dis,
      indexNum: options.latticecode
    })
    var that = this;
    // 预约须知
    wx.request({
      url: app.globalData.baseUrl + 'configurationInformation?txt=informatior.txt',
      success: function (res) {
        that.setData({
          contenta: res.data
        })
      }
    })
    //预约详情
    wx.request({
      header: {
        'content-type': 'application/json'
      },
      url: domain + '/appointmentLists?latticeid=' + indexNum,
      success: function(res) {
        console.log(res)
        wx.hideLoading()
        var list = res.data
        var bToObj =list;
        for (var i = 0; i < bToObj[0].appointmentTime.length; i++) {
          timeDuan[i] = bToObj[0].appointmentTime[i]
        }
        for (var i = 0; i < bToObj[0].businesstype.length; i++) {
          classfiy[i] = bToObj[0].businesstype[i]
        }
        mechanism = bToObj[0].organid;
        that.setData({
          listValue: bToObj,
          numberPerson: res.data[0],
          timeDuan: timeDuan,
          timeDuanLength: timeDuan.length-1,
          classfiy: classfiy
        })
        that.elseData.latitude = list[0].latitude
        that.elseData.longitude = list[0].longitude
      }
    })
  },
  //点击显示时间段
  showDuan:function(){
    var that = this
    that.setData({
      showTime: (!that.data.showTime)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    that.setData({
      showNotice: false
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // wx.navigateBack({
    //   url: '../index/index'
    //   // delta: '2'
    // })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  submit: function (e) {
    var that = this;
    that.setData({
      showNotice:true
    })
    app.globalData.formids.push(e.detail.formId)
    
  },
  // 完成预约须知阅读
  btnBack: function () {
    var that = this;
    that.setData({
      showNotice: false
    })
    wx.navigateTo({
      url: '../startOrder/order?latticeid=' + indexNum + '&mechanism=' + mechanism + '&itmerids=' + new Date().getTime(),
      delta: '2'
    })
  },
  //拔打电话
  calluser:function(){
    wx.makePhoneCall({
      phoneNumber: '10086' //仅为示例，并非真实的电话号码
    })
  },
  //到这去
  comeHere(){
    var  that = this
    console.log(that.elseData.latitude, typeof that.elseData.longitude)
    wx.openLocation({
      latitude: Number(that.elseData.latitude),
      longitude: Number( that.elseData.longitude),
    })
  },
  orderNotice(){
    wx.navigateTo({
      url: '../noticeContent/noticeContent',
    })
  }
  

})