// pages/feedback/feedback.js
var srcList = [] 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lisrSrc: [],
    max:0,
    canbind:false
  },
  choose: function() {
    var that = this
    wx.chooseImage({
      success: function(res) {
       
        srcList = srcList.concat(res.tempFilePaths);
        console.log(res.tempFilePaths, srcList)
        that.setData({
          lisrSrc: srcList
        })
      },
    })
  },
  tijiao:function(){
    var that = this;
  
    wx.uploadFile({
        url: 'http://192.168.20.103:8080/CloudServiceCode/upload/picture',
        filePath: srcList[0],
        formData:
        {
          userId: 12345678 //附加信息为用户ID
        },
        name: 'image',
        header: {
          "Content-Type": "multipart/form-data"
        },
        success:function(res){
          srcList = [];
          that.setData({
            lisrSrc: srcList
          })
          wx.showToast({
            title: '提交成功',
          })
        }
      })
      this.setData({
        canbind:true
      })
  },
  deleteImg:function(res){
   
    var index = res.currentTarget.dataset.index
    srcList.splice(index,1)
    this.setData({
      lisrSrc: srcList
    })
  },
  listenMax:function(res){
    if (res.detail.cursor>=200){
       
    }else{
      this.setData({
        max: res.detail.cursor
      })
    }
     
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    srcList = [];
    this.setData({
      lisrSrc: srcList
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

  }
})