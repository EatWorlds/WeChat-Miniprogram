// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 页面加载，先获取本地缓存的 openid，到时候得修改成 unionid，
   * 如果获取到的为空，则调用云函数 login 获取 openid（unionid）
   */
  onLoad: function(options) {
    var openid = wx.getStorageSync('openid')
    if (openid == "") {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log(res.result)
          console.log('[云函数] [login] user openid: ', res.result.openid)
          wx.setStorageSync("openid", res.result.openid);
        },
        fail: err => {
          console.error('[云函数] [login] user openid 获取失败：', err)
          wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
              console.log('[云函数] [login] user openid: ', res.result.openid)
              wx.setStorageSync("openid", res.result.openid);
            },
          })
        }
      })
    }
  },
  /**
   * 获取到用户所点消息的页面路径 path 和对应的参数 query
   */
  handleContact(e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  },
  /**
   * 给用户发送客服消息，回复图片+文字
   * 这里还需要接入芝麻小客服，https://xiaokefu.com.cn/
   */
  send() {
    wx.cloud.callFunction({
      name: 'sendImage',
      data: {
        openid: wx.getStorageSync('openid')
      },
      success: res => {
        console.log(res);
      }
    })
    wx.cloud.callFunction({
      name: 'sendText',
      data: {
        openid: wx.getStorageSync('openid')
      },
      success: res => {
        console.log(res);
      }
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

  },

  toChoose() {
    wx.navigateTo({
      url: '../choose/choose'
    })
  },
})