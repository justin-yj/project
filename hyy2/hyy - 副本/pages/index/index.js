//index.js
var amapFile = require('../../utils/amap-wx.js');
var util = require('../../utils/util.js');
const app = getApp()
// var latitude, longitude;
var checkeds //是否阅读预约须知

Page({
  data: {
    currentCity: '',
    bannerImg: [{
      id: 0,
      url: '../noticeContent/noticeContent',
      img: '../../images/banner.png',
    }],
    swiperCurrent: 0,
    list: [],
    distance: '',
    latitude:null,
    longitude:null,
    showFlag: true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(options) {
    var that = this;
    that.getLocation()
  },
  onShow() {
    wx.getStorage({
      key: 'checkeds',
      success: function(res) {
        checkeds = res.data
      },
    })
    
  },
  // 通过高德地图定位当前城市、经纬度
  getLocation() {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          showFlag: true,
          latitude: latitude,
          longitude: longitude
        })
        that.getList()
      },
      fail:function(){
        //判断是否获得了用户地理位置授权
        wx.getSetting({
          success: (res) => {
            console.log(res)
            if (!res.authSetting['scope.userLocation']){
              // wx.showModal({
              //   title:'用户未授权',
              //   content: '检测到您未打开定位权限，如需正常使用小程序，请点击授权按钮，勾选使用我的地理位置',
              //   showCancel: false,
              //   success:function(){
              //     that.setData({
              //       showFlag: false
              //     })
              //   }
              // });
              that.setData({
                showFlag: false
              })
            }
          }
        })
      }
    })
    
  },
  handler(e){
    // console.log(e)
    var that = this;
    if (!e.detail.authSetting['scope.userLocation']) {
      that.setData({
        showFlag: false
      })
      
    } else {
      that.setData({
        showFlag: true,
      })
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          that.setData({
            latitude: latitude,
            longitude: longitude
          })
          that.getList()
        }
      })
    }
  },
  // 获取预约网点
  getList() {
    var that = this
    util.AJAX(
      app.globalData.baseUrl + 'appointmentList?locallatitude=' + that.data.latitude + '&locallongitude=' + that.data.longitude,
      'GET', {},
      res => {
        console.log(res)
        wx.showLoading({
          title: '加载中',
        })
        setTimeout(() => {
          wx.hideLoading();
          var list = res.data;
          for (let i = 0; i < list.length; i++) {
            list[i].dis = (list[i].dis / 1000).toFixed(2)
          }
          that.setData({
            list: list
          })
        }, 1000)
      }, res => {
        wx.showToast({
          title: '请求失败',
          icon: 'loading',
          duration: 2000
        })
      })
  },
  // 轮播图切换
  swiperChange(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  // 跳转城市切换
  switchCity() {
    wx.navigateTo({
      url: '../switchCity/switchCity',
    })
  },
  // 跳转搜索页面
  goSearch() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  //跳转详情页
  goDetail(e) {
    var that = this;
    if (checkeds) {
      wx.navigateTo({
        url: '../inLine/inLine?latticecode=' + e.currentTarget.dataset.id + '&dis=' + e.currentTarget.dataset.dis,
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '请您仔细先阅读预约须知，阅读完成后即可进行在线预约',
        success: function(res) {
          if (res.confirm == true) {
            wx.navigateTo({
              url: '../noticeContent/noticeContent?prePage=true&latticecode=' + e.currentTarget.dataset.id + '&dis=' + e.currentTarget.dataset.dis,
            })
          }
        }
      })
    }
  },
  // 跳转开始预约页面
  goOrder(e) {
    console.log(e)
    var latticeid = e.currentTarget.dataset.latticeid;
    console.log(latticeid)
    if (checkeds) {
      wx.navigateTo({
        url: '../startOrder/order?latticeid=' + latticeid,
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '请您仔细先阅读预约须知，阅读完成后即可进行在线预约',
        success: function(res) {
          if (res.confirm == true) {
            wx.navigateTo({
              url: '../noticeContent/noticeContent?latticecode=' + latticeid + '&dis=' + e.currentTarget.dataset.dis + "&goOrder=true",
            })
          }
        }
      })
    }
  },
  beFull() {
    wx.showToast({
      title: '当前网点已预约满',
      icon: 'none',
      duration: 2000
    })
  },
  onShareAppMessage(){
    return {
      title: '云慧约',
      path: '/pages/index/index'
    }
  },
  onPullDownRefresh: function () {
    var that = this;
    setTimeout(function () {
      that.getLocation()
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh()
    }, 1500)
  },
  submit:function(e){
    console.log(e.detail.formId,"模板id")
    app.globalData.formids.push(e.detail.formId)
  }
})