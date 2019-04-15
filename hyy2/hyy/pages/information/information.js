const app = getApp();
var domain = app.globalData.domain
var openid = wx.getStorageSync("OPENID")
Page({
  data: {
    startX: 0, //开始坐标
    startY: 0,
    list: [],
  },
  onLoad: function(options) {
    
  },
  onShow: function() {
    var that = this;
    wx.request({
      url: domain + '/findidcard?openid=' + openid,
      success: function (res) {
        var list = res.data
        that.setData({
          list: list
        })
      }
    })
  },
  gomessageEdit: function() {
    wx.navigateTo({
      url: '../messageEdit/messageEdit',
    })
  },
  // 获取列表信息
  getCardList() {
    
  },
  touchS: function(e) {
    
  },
  touchM: function(e) {
    var that = this
    
  },

  touchE: function(e) {
    
  },
  //点击删除按钮事件
  delItem: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {
          //获取列表中要删除项的下标
          var index = e.target.dataset.index;
          var list = that.data.list;
          //移除列表中下标为index的项
          list.splice(index, 1);
          //更新列表的状态
          that.setData({
            list: list
          });
        } else {
         
        }
      }
    })
  }
})