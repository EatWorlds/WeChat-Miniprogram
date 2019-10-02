// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
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

  handleContact(e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  },

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