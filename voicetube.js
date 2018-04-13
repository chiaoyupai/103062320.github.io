
   $.ajax({
    url:'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=PLS_DZc4k-K4uPvU5yAb4LjJOlvUIOoqiC',
    type:'GET',
    dataType:'json',
    data: {
      'part':'snippet,contentDetails',
      //'playlistId': RDDKPCBAlDw2A,
      'maxResults': 9,
      'key': 'AIzaSyDXpwzqSs41Kp9IZj49efV3CSrVxUDAwS0'
  },
    success: function(data){

      for(var i = 0; i<9; i++){
        getVideos(data.items[i],i);

        var title = $("#video"+i).append('<a href="Video.html?'+data.items[i].snippet.resourceId.videoId+'"><h5 class="index-thumbnail-title" rel="tooltip">'+data.items[i].snippet.title+'</h5></a>');
        var thumb = $("#pictime"+i).append('<a href="Video.html?'+data.items[i].snippet.resourceId.videoId+'"><img class="lazy" src = '+data.items[i].snippet.thumbnails.medium.url+'></a>');
        var icon  = $("#video"+i).append('<span><i class="fas fa-headphones"></i></span>');
        
      }
    }
  });


      

      function getVideos(video_data,index){
           $.ajax({
          url:'https://www.googleapis.com/youtube/v3/videos',
          type:'GET',
          dataType:'json',
          data: {
            'part':'contentDetails,statistics',
            'id':video_data.contentDetails.videoId,
            'key': 'AIzaSyDXpwzqSs41Kp9IZj49efV3CSrVxUDAwS0'
        },

          success: function(data){
              var time = "";
              var flag = false;
              console.log(data.items[0].contentDetails.duration);


              if(isNaN(data.items[0].contentDetails.duration[3]))
                time+='0';

              for(var i=2;i<data.items[0].contentDetails.duration.length;i++){
                if(!isNaN(data.items[0].contentDetails.duration[i])){
                  time+=data.items[0].contentDetails.duration[i];
                }
                else if(flag === false){
                  time+=':';
                  if(data.items[0].contentDetails.duration.length == i+1){
                    time+='00';
                    break;
                  }
                  flag = true;
                  if(isNaN(data.items[0].contentDetails.duration[i+2]))
                    time+='0';
                }
              }


              var duration = $("#pictime"+index).append('<div class = "time">'+time+'</div>');
              var view = $("#video"+index).append(" "+data.items[0].statistics.viewCount);
              var level1 = $("#video"+index).append('<br><span class="label label-success">初級</span> <span class="label label-info">中文</span> <span class="label label-warning" rel="tooltip" data-original-title="英國腔">北京腔</span>');
          }
        });
      }

        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        var player;
        function onYouTubeIframeAPIReady() {
          player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'M7lc1UVf-VE',
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });
        }

        // 4. The API will call this function when the video player is ready.
        function onPlayerReady(event) {
          event.target.playVideo();
        }
        
        // 5. The API calls this function when the player's state changes.
        //    The function indicates that when playing a video (state=1),
        //    the player should play for six seconds and then stop.
        var done = false;
        function onPlayerStateChange(event) {
          if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
          }
        }
        function stopVideo() {
          player.stopVideo();
        }
