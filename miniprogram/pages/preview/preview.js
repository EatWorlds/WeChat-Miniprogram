// miniprogram/pages/preview/preview.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: '',
    src: '',
    width: 300, //宽度
    height: 450, //高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // https://github.com/wx-plugin/image-cropper，我把裁剪图片的这个去掉了
  // 不需要的话，删掉相关的内容就行
  onLoad: function(options) {
    this.cropper = this.selectComponent("#image-cropper");
    this.setData({
      image: app.globalData.image,
      src: wx.getStorageSync('image')
    })
  },
  cropperload(e) {
    console.log("cropper初始化完成");
  },

  loadimage(e) {
    console.log("图片加载完成", e.detail);
    wx.hideLoading();
    //重置图片角度、缩放、位置
    this.cropper.imgReset();
  },

  clickcut(e) {
    console.log(e.detail);
    //点击裁剪框阅览图片
    wx.previewImage({
      current: e.detail.url, // 当前显示图片的http链接
      urls: [e.detail.url] // 需要预览的图片http链接列表
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