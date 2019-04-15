var city = require('../../utils/city.js');
var util = require('../../utils/util.js');
var amapFile = require('../../utils/amap-wx.js');
var app = getApp()
Page({
  data: {
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: "",
    hotcityList: [{ cityCode: 110000, city: '北京市' }, { cityCode: 310000, city: '上海市' }, { cityCode: 440100, city: '广州市' }, { cityCode: 440300, city: '深圳市' }, { cityCode: 330100, city: '杭州市' }, { cityCode: 320100, city: '南京市' }, { cityCode: 420100, city: '武汉市' }, { cityCode: 410100, city: '郑州市' }, { cityCode: 120000, city: '天津市' }, { cityCode: 610100, city: '西安市' }, { cityCode: 510100, city: '成都市' }, { cityCode: 500000, city: '重庆市' }]
  },
  onReady(){
    
  },
  onLoad () {
    var currentCity = wx.getStorageSync("city");
    // console.log(currentCity)
    this.setData({
      city:currentCity
    })
    var searchLetter = city.searchLetter;
    var cityList = city.cityList();
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp)
    }
    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList: cityList
    })

  },
  clickLetter: function (e) {
    console.log(e.currentTarget.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  // 选择当前城市
  bindCurrentCity: function (e) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({
      currentCity: currPage.data.city
    })
    wx.navigateBack();
  },
  //选择城市
  bindCity: function (e) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({
      currentCity: e.currentTarget.dataset.city
    })
    wx.navigateBack();
  },
  //选择热门城市
  bindHotCity: function (e) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({
      currentCity: e.currentTarget.dataset.city
    })
    wx.navigateBack();
  },
  //点击热门城市回到顶部
  hotCity: function () {
    this.setData({
      scrollTop: 0,
    })
  },
  // 获取当前位置经纬度
  getLocation(){
    var that = this
    var myAmapFun = new amapFile.AMapWX(util.key); //key注册高德地图开发者
    myAmapFun.getRegeo({
      success: function (data) {
        // console.log(data);
        wx.showLoading({
          title: '定位中...',
        })
        setTimeout(function () {
          wx.hideLoading()
          that.setData({
            city: data[0].regeocodeData.addressComponent.city
          });
        }, 1000)
      },
      fail: function () {
        that.setData({ city: "获取定位失败" });
      },
    })
  },
  // 跳转搜索城市页面
  searchCity(){
    wx.navigateTo({
      url: 'searchCity/searchCity',
    })
  }
})