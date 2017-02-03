var app = getApp();
Page({
    data:{
      in_theaters:'',
      coming_soon:'',
      top250:''
    },
    onLoad:function(){
      var that = this;
      var inTheaters = "/v2/movie/in_theaters?count=3";
      var comingSoon = "/v2/movie/coming_soon?count=3";
      var Top = "/v2/movie/top250?count=3";
      this.getList(inTheaters, "in_theaters");
      this.getList(comingSoon, "coming_soon");
      this.getList(Top, "top250");
    },
    getList(url, str){
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
            var tempData = that.dealwithData(res.data, str);
            var obj = {};
            obj[str] = tempData;
            that.setData(obj);
          },
          fail: function(){
            // fail
          },
          complete: function(){
            // complete
          }
        })
    },
    dealwithData(data, typeName){
      var tempData = {};
      tempData.title = data.title;
      tempData.subjects = data.subjects;
      for(var i = 0; i < tempData.subjects.length; i++){
        var str = tempData.subjects[i].title;
        if(str.length > 6){
          tempData.subjects[i].title = str.substr(0, 6) + '...';
        }
        var tempLength = tempData.subjects[i].rating.stars.substr(0,1);
        var tempArr = [];
        for(var j = 0; j < 5; j++){
          if(j > tempLength-1){
            tempArr.push(0);
          }else{
            tempArr.push(1);
          }
        }
        tempData.subjects[i].stars = '';
        tempData.subjects[i].stars = tempArr;
      }
      tempData.type = typeName;
      return tempData;
    },
    onMoreMovies(event){
      var type = event.currentTarget.dataset.type;
      wx.navigateTo({
        url: 'more-movies/more-movies?type=' + type
      })
    }
})