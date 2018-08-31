
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceImages: [
      {
        imageurl: "../../../images/deviceList_device1.png",
        title: "806/807控制器"
      }, {
        imageurl: "../../../images/deviceList_device4.png",
        title: "817控制器"
      }, {
        imageurl: "../../../images/deviceList_device5.png",
        title: "827控制器"
      }, {
        imageurl: "../../../images/deviceList_device0.png",
        title: "未知设备"
      }],
    clkDeviceNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 选择需要添加的设备切换
  changeClk: function (e) {
    this.setData({
      clkDeviceNum: e.detail.current
    })
  },
  // 点击下一步
  nextBtnClk: function () {
    var that =this
    wx.navigateTo({
      url: "../directlyAdd/directlyAdd3?clkDeviceNum=" + that.data.clkDeviceNum
    })
  }

})