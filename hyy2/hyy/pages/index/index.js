//index.js
var amapFile = require('../../utils/amap-wx.js');
var util = require('../../utils/util.js');
const app = getApp()
Page({
  data: {
    currentCity: '拉萨',
    bannerImg: [{
      id: 0,
      url: '../noticeContent/noticeContent',
      img: '../../images/banner.png',
    }, {
        id: 0,
        url: '../noticeContent/noticeContent',
        img: '../../images/banner.png',
      }, {
        id: 0,
        url: '../noticeContent/noticeContent',
        img: '../../images/banner.png',
      }],
    swiperCurrent: 0,
    list: [],
    distance: '',
    latitude:null,
    longitude:null,
    showFlag: true,
    contenta:[],
    showNotice:false,
    xzdis:null
  },
  elseData:{
    latticeid:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(options) {
    var that = this;
    that.getLocation();
    // 预约须知
    wx.request({
      url: app.globalData.baseUrl + 'configurationInformation?txt=informatior.txt',
      success: function (res) {
        that.setData({
          contenta: res.data
        })
      }
    })
  },
  onShow() {
    var that = this
    that.setData({
      showNotice: false
    })
  },
  // 通过高德地图定位当前城市、经纬度
  getLocation() {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
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
    wx.request({
      url: app.globalData.baseUrl + 'xzgsglj?locallongitude=' + that.data.longitude + '&locallatitude=' + that.data.latitude,
      success(res){
          that.setData({
            xzdis: (res.data.dis /1000).toFixed(2)
          })
      }
    })
    util.AJAX(
      app.globalData.baseUrl + 'appointmentList?locallatitude=' + that.data.latitude + '&locallongitude=' + that.data.longitude + '&cityName=西藏',
      'GET', {},
      res => {
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
        wx.navigateTo({
          url: '../inLine/inLine?latticecode=' + e.currentTarget.dataset.id + '&dis=' + e.currentTarget.dataset.dis,
        }) 

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
    var that = this;
    app.globalData.formids.push(e.detail.formId)
    that.elseData.latticeid = e.currentTarget.dataset.latticeid;
      that.setData({
        showNotice: true
      }) 
  },
  // 预约 须知
  showNotice:function(){
    this.setData({
      showNotice:true
    })
  },
  // 完成预约须知阅读
  btnBack:function(){
    var that = this
    that.setData({
      showNotice: false
    })
    wx.navigateTo({
      url: '../startOrder/order?latticeid=' + that.elseData.latticeid + '&timeid=' + new Date().getTime(),
    })
  },
  // 外接入西藏跳转
  isTap:function(){
    var that = this;
    wx.navigateTo({
      url: '../out/out',
    })
  }
})