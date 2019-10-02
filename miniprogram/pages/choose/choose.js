// miniprogram/pages/choose/choose.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { title: "一寸", tag: "1", desc: "25×35mm", img:"../../images/profile_photo.jpg"},
      { title: "二寸", tag: "2", desc: "35×49mm", img: "../../images/profile_photo.jpg"},
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  toKnow: function (e) {
    let tag = e.currentTarget.dataset.tag;
    console.log(tag)
    app.globalData.tag = tag;
    wx.navigateTo({
      url: '../know/know'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})