
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setWifiScanImgurl: "https://lg-rg404hpi-1257169638.cos.ap-shanghai.myqcloud.com/setWifiScan.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.setWifiScanImgurl
    wx.previewImage({
      current: img,
      urls: [img]
    })
  },

  // 点击完成
  finishBtnClk: function () {
    wx.switchTab({
      url: '../../deviceList/deviceList'
    })
  }

})