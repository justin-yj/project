// pages/search/search.js
var util = require('../../utils/util.js');
const app = getApp()
Page({
  data: {
    inputValue: '',
    hidden:true,
    iconShowed:false,
    scrollTop: 0, // 居顶部高度
    historyShowed: true,
    searchShowed:false,
    historyList: [
      {id:0,name:'郑州市'}
    ],
    searchList: []
  },
  onLoad: function(options) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });
  },
  onShow: function() {
    var getSearch = wx.getStorageSync('searchData');
    console.log(getSearch)
    this.setData({
      historyList: getSearch,
      inputValue: '',
    })
  },
  // 从后台请求数据
  getList(val){
    util.AJAX(
      // 'http://192.168.20.161:8080/CloudServiceCode/findlatticeName',
      app.globalData.baseUrl + 'findlatticeName',
      'GET', {
        latticeName: val
      },
      res => {
        console.log(res)
        this.setData({
          searchList: res.data
        })
      },res=>{
        console.log("请求数据失败！")
      }
    )
  },
  // 取消返回上一页
  cancelHandle(){
    wx.navigateBack()
  },
  // 输入框事件
  bindInput(e) {
    console.log(e.detail.value)
    var that = this;
    var value = encodeURIComponent(e.detail.value);
    console.log(value)
    that.getList(value)
    if (value > 0 || value.length > 0) {
      that.setData({
        iconShowed:true,
        historyShowed: false,
        searchShowed: true
      })
      
    } else {
      that.setData({
        scrollTop: 0,
        historyShowed: true,
        searchShowed: false,
        iconShowed:false
      })
    }
    
  },
  currentStorage(e) {
    var that = this;
   
  },
  // 清除输入框value
  clearInput(){
    this.setData({
      inputValue: "",
      historyShowed: true,
      searchShowed: false,
      iconShowed: false
    })
  },
  // 清空历史搜索
  clearStorage(){
    var that = this
    if(that.data.historyList.length > 0){
      that.setData({
        hidden:false
      })
      wx.removeStorageSync('searchData')
      that.setData({
        historyList: []
      })
    }
    
  },
  // 添加搜索记录并搜索
  setSearchStorage(){
    var that = this;
    if (that.data.inputValue != '') {
      //将搜索记录更新到缓存
      var searchData = that.data.historyList;
      console.log(searchData)
      searchData.push({
        id: searchData.length,
        name: that.data.inputValue
      })
      wx.setStorageSync('searchData', searchData);
      // that.setData({ StorageFlag: false, })
      //请求搜索
      //wx.navigateTo({
      //  url: '../result/result'
      // })
      // console.log('马上就要跳转了！')
    } else {
      console.log('空白的')
    }
  }
})