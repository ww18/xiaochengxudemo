var postData = require('../../data/posts-data.js')
Page({
  data: {
    imgUrls: [
      '/images/1.jpg',
      '/images/2.jpg',
      '/images/3.jpg',
      '/images/4.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 300,
    postData: ''
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onLoad:function(){
    var local_database = [];
    this.setData({
      postData: postData.postList
    })
  },
  onPostDetail:function(event){
    var postId = event.currentTarget.dataset.postid;
    console.log(postId);
    wx.navigateTo({
      url: 'post-detail/post-detail'
    })
  }


})