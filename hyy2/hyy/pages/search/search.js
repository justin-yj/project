// pages/search/search.js
var util = require('../../utils/util.js');
const app = getApp()
var getSearch
Page({
  data: {
    inputValue: '',
    hidden:true,
    iconShowed:false,
    scrollTop: 0, // 居顶部高度
    historyShowed: true,
    searchShowed:false,
    historyList: [],
    searchList: [],
    searchData:[]
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
    getSearch = Array.from(new Set(wx.getStorageSync('searchData'))) 
    console.log(getSearch,"缓存")
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
        console.log(res.data)
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
    var value = e.detail.value;
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
    e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../inLine/inLine?latticecode=' + e.currentTarget.dataset.id + '&dis=0',
    })
    that.getList(e.currentTarget.dataset.name)
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
  setSearchStorage(e){
    var that = this;
    console.log(e.currentTarget.dataset.name, "搜索值")
    getSearch.unshift({
      name: e.currentTarget.dataset.name,
      id: e.currentTarget.dataset.id
    })
    //将搜索记录更新到缓存
    wx.setStorageSync('searchData', getSearch);
    wx.navigateTo({
      url: '../inLine/inLine?latticecode=' + e.currentTarget.dataset.id  + '&dis=0',
    })
  },
  storageDelete:function(e){
     
    var that = this;
    getSearch.splice(e.currentTarget.dataset.index, 1)
    that.setData({
      historyList: getSearch
    })
  }
})