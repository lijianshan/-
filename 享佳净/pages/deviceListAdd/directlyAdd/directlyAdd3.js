Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceImages: [{
      title: "806/807控制器",
      step: [
        "长按【设置】键3秒,进入设置状态",
        "按【风量】或【定时关】键选择到WI-FI图标",
        "长按“【模式】键”3秒后WI-FI图标闪烁,并且显示的版本号大于4.0.0,进入微信配网状态",
      ]
    }, {
      title: "817控制器",
      step: [
        "长按【设置】键3秒,进入设置状态",
        "按【风量】或【模式】键选择到WI-FI图标",
        "长按【定时关】键3秒后WI-FI图标闪烁,并且显示的版本号大于2.0.0,进入微信配网状态",
      ]
    }, {
      title: "827控制器",
      step: [
        "按【设置】键",
        "按【高级设置】键",
        "按【微信配网模式】进入配网状态",
      ]
    }, {
      title: "其他设备",
      step: [
        "操作对应设备说明书使设备进入微信配网状态"
      ]
    }],
    clkDeviceNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      clkDeviceNum: options.clkDeviceNum
    })
  },

  // 点击下一步
  nextBtnClk: function() {
    wx.navigateTo({
      url: "../directlyAdd/directlyAdd4"
    })
  }

})