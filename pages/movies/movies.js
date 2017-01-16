var app = getApp();
Page({
    data:{
      inTheaters:'',
      comingSoon:'',
      Top:''
    },
    onLoad:function(){
      var that = this;
      var inTheaters = "/v2/movie/in_theaters?count=3";
      var comingSoon = "/v2/movie/coming_soon?count=3";
      var Top = "/v2/movie/top250?count=3";
      this.getList(inTheaters,function(res){
         that.setData({
              inTheaters:res.data
            })
      });
      this.getList(comingSoon,function(res){
         that.setData({
              comingSoon:res.data
            })
      });
      this.getList(Top,function(res){
         that.setData({
              Top:res.data
            })
      });
    },
    getList(url, callback){
      var that = this;
      wx.request({
          url: app.globalData.doubanAPI + url,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            "Content-Type": "json"
          }, // 设置请求的 header
          success: function(res){
            // success
            callback(res);
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    }
})