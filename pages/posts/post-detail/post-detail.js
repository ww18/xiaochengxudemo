var data = require('../../../data/posts-data.js');
var app = getApp();
Page({
  data:{
    list:'',
    postId: 0,
    isCollection: false,
    musicPlay: false
  },
  onLoad:function(options){
    var postId = options.id;
    this.setData({postId: postId});
    this.setData({list: data.postList[postId]});
    //shou cang
    var collData = wx.getStorageSync('collectionData');
    if(collData){
      this.setData({
        isCollection: collData[postId]
      })
    }
    if(app.globalData.is_music_play && app.globalData.play_id === postId){
      this.setData({
        musicPlay: true
      })
    }
    this.moditorMusic();
  },
  moditorMusic:function(){
    var that = this;
    wx.onBackgroundAudioPlay(function(){
      that.setData({
        musicPlay: true
      })
      app.globalData.is_music_play = true;
      app.globalData.play_id = that.data.postId;
    })
    wx.onBackgroundAudioPause(function(){
      that.setData({
        musicPlay: false
      })
      app.globalData.is_music_play = false;
      app.globalData.play_id = null;
    })
  },
  onCollection:function(event){
    var that = this;
    var isColl = !this.data.isCollection;
    this.setData({
      isCollection: isColl
    });

   wx.showToast({
     title: isColl? "收藏成功":"取消收藏",
     icon: "success"
   })

    var collData = wx.getStorageSync('collectionData') || {};
    collData[this.data.postId] = this.data.isCollection;
    wx.setStorageSync('collectionData', collData);
  },
  onShare:function(){
    var opt = [
      "分享到微信",
      "分享到朋友圈",
      "分享到qq",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: opt,
      itemColor: '#b8d83e'
    })

  },
  playMusic:function(){
    var that = this;
    var music = data.postList[this.data.postId].music;
    if(this.data.musicPlay){
      wx.pauseBackgroundAudio();
    }else{
      wx.playBackgroundAudio({
        dataUrl: music.url,
        title: music.title,
        coverImgUrl: music.coverImg
      })
    }

    this.setData({
      musicPlay: !this.data.musicPlay
    })
  }
})