var util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    list: [
      {
        id: 0,
        name: '控制器',
        open: false,
        pages: ['DAK806/DAK807', 'DAK817'],
        url: ['DAK806.pdf', 'DAK817.pdf','DAK827.pdf']
      }, {
        id: 1,
        name: '主机',
        open: false,
        pages:[],
        //pages: ['DAR系列节能变频高效净化全热交换器', 'DAU_DAT系列节能变频高效净化新风', 'DAU高效净化新风'],
        url: ['DAR1.pdf', 'DAU_DAT1.pdf', 'DAU1.pdf']
      }
    ]
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var urls =options.url
    console.log(options)
    if (urls != undefined)
      this.showDocument(urls)
  },
 /**
 *  栏目点击
 */
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  /**
  *  具体选项点击
  */
  itemCLk:function(e){
    var that =this
    var i = e.currentTarget.dataset.i
    var j = e.currentTarget.dataset.j
    that.showDocument(that.data.list[i].url[j])
  },
  /**
  *  下载并显示说明书
  */
  showDocument:function(urls){
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.downloadFile({
      url: app.globalData.myCloudUrl + app.globalData.specificationProperties+ urls,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            wx.hideLoading()
            console.log('打开文档成功')
          },
          fail: function (res) {
            console.log('打开文档fail')
            console.log(res)
            wx.hideLoading()
            util.showToast(res.errMsg)
          },
        })
      },
      fail:function(res){
        console.log(res)
        wx.hideLoading()
        util.showToast(res.errMsg)
      }
    })
  }
})

