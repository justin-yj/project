const app = getApp()
var domain = app.globalData.domain
var hint = false;
var latticeid;
var dayNumbers ;
Page({
  data: {
    year: 0,
    month: 0,
    xmonth: 0,
    months: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    nowDay: 0,
    chaju: 0,
    jingdu: '',
    weidu: '',
    ldata: false,
    latitude:0,
    longitude:0,
    color: '' + (new Date().getMonth() + 1) + new Date().getDate(),
    num:[10,20,4,2,50,9],
    isFull:true,
    yue:0,
    nowyue:0,
    weekDay:0,
    dataYear:0,
    dataMonth:0,
    dataDays:0,
    canChoose:'../../images/canChoose.png',
    selectChoose:'../../images/selectChoose.png',
    selectOne:NaN,
    selectTime:0,
    hint:false,
    timeDuan:[],
    timeChoose:[],
    latticeid:null,
    appoTimeId:null,
    classId:null
    
  },
  onLoad: function(options) {
    console.log(options)
    latticeid = options.latticeid,
    this.setData({
      latticeid: latticeid,
      classId: options.classId
    })
    this.dateInit();
  
    var that = this;
    var date = new Date;
    var nowyue = date.getMonth() + 1;
    this.setData({
      nowyue: nowyue,
      dataYear: new Date().getFullYear(),
      dataMonth:new Date().getMonth(),
      dataDays:new Date().getDate()
    })
    //数据请求
    wx.request({
      url: domain + '/wxyy/appointmentPeople?latticeid=' + latticeid,
      success:function(res){
         
          for(var i=0;i<res.data.length;i++){
            res.data[i].appoDate = res.data[i].appoDate.slice(-2)
            dayNumbers = res.data[i].daynumber + 1
          }
          that.aasd();
          that.setData({
            timeDuan:res.data
          })
      }
    })

  },
  aasd: function() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let nowDay = Number('' + year + month + (now.getDate() + dayNumbers))
    this.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate(),
      nowDay: nowDay
    })
    return nowDay;
  },
  dateInit: function(setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1  
    let dateArr = []; //需要遍历的日历数组数据  
    let arrLen = 0; //dateArr的数组长度  
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth(); //没有+1方便后面计算当月总天数  
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);


    let startWeek = new Date(Date.UTC(year, (month ), 1)).getDay(); //目标月1号对应的星期  
 



    let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天  
  
    //1.获取点击后的月份和当前月份
    var xmonth = new Date().getMonth();
    //2.获取每月的日期，和超出当月的天数
    //当前月份的天数
    var dqts = new Date(now.getFullYear(), new Date().getMonth() + 1, 0).getDate()
    //当前日期
    var dqrq = new Date().getDate() + dayNumbers
    if (dqrq > dqts) {
      var chaju = dqrq - dqts;
    } else {
      var chaju=0;
    }
    //3.进行月份和日期的比较
    this.setData({
      chaju: chaju,
      xmonth: xmonth + 1,
      months: month
    })

    let obj = {};
    let num = 0;
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: Number('' + year + (month + 1) + num),
          dateNum: num,
          dcs: Number(''+(month + 1) + num),
          yue: Number('' + (month + 1)),
          weight: '可预约',
          weekDay: new Date(Date.UTC(year, (month), num)).getDay(),
          dataYear: year,
          dataMonth: month+1,
         
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
     
    }
    this.setData({
      dateArr: dateArr
    })
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  lastMonth: function() {
    //全部时间的月份都是按0~11基准，显示月份才+1  
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  nextMonth: function() {
    //全部时间的月份都是按0~11基准，显示月份才+1  
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  chooseDay:function(e){
    var that = this
    that.setData({
      color: e.target.dataset.id,
      dataYear: e.currentTarget.dataset.year,
      dataMonth:that.data.month,
      dataDays: e.currentTarget.dataset.days
    })
  },
  goOrder:function(){
    if (this.data.month<10){
      this.data.month =''+0+ this.data.month
    }
    if (this.data.dataDays<10){
      this.data.dataDays = '' + 0 + this.data.dataDays
    }
    var transfer = this.data.dataYear + '/' + this.data.month + '/' + this.data.dataDays + '/' + this.data.selectTime;
    var timeRiqi = this.data.dataYear +'-'+ (this.data.month) + '-' + this.data.dataDays
    var appoTimeId = this.data.appoTimeId
    if (this.data.selectTime == 0){
      hint=true
    }else{
      let pages = getCurrentPages()
      var currPage = pages[pages.length - 1];  //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        selectTime: transfer,
        timeRiqi: timeRiqi,
        appoTimeId: appoTimeId

      })
      wx.navigateBack()
    }
    this.setData({
      hint: hint
    })
  },
  slectChoose:function(e){
    hint = false
    this.setData({
      hint: hint
    })
     this.setData({
       selectOne: e.currentTarget.dataset.index,
       selectTime: e.currentTarget.dataset.value,
       appoTimeId: e.currentTarget.dataset.time,
     })

  }

 

})