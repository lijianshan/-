var util = require('../../utils/util.js')

Page({
  data: {
    list: [
      {
        id: 0,
        name: '控制器',
        open: false,
        pages: ['DAK806/DAK807', 'DAK817', 'DAK827'],
        url: ['https://lg-rg404hpi-1257169638.cos.ap-shanghai.myqcloud.com/%E8%AF%B4%E6%98%8E%E4%B9%A6/DAK806.pdf','','']
      }, {
        id: 1,
        name: '主机',
        open: false,
        pages: ['DAR系列节能变频高效净化全热交换器', 'DAU_DAT系列节能变频高效净化新风', 'DAU高效净化新风'],
        url: ['', '', '']
      }
    ]
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var urls ="https://lg-rg404hpi-1257169638.cos.ap-shanghai.myqcloud.com/"+options.url
    console.log("获取到的option页面是" + urls+"==")
    console.log(options)
    if (options.url != undefined)
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
      url: urls,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (res) {
            console.log('打开文档fail')
            console.log(res)
            util.showToast(res.errMsg)
          },
          complete: function (res) {
            wx.hideLoading()
          }
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

