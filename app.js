/*jshint esversion:6*/
function getYoutubeSearchResult(query){
  let settings = {
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
      part: 'snippet',
      key: 'AIzaSyCUDIUbnbMp30QXCi9v8UacXjWKpaOscsI',
      q: query,
      type: 'video'
    },
    dataType: 'json'
  };
  return $.ajax(settings);
}
// responseObj.items is part of Youtube API
function retrieveThumbnails(responseObj, vidRefObj) {
  $.each(responseObj.items, function(index, obj) {
    vidRefObj.thumbs.push(obj.snippet.thumbnails.high.url);
    vidRefObj.ids.push(obj.id.videoId);
  });
}

function renderThumbnails(vidRefObj) {
  let html = '';
  $.each(vidRefObj.thumbs, function functionName(ind, val) {
    html += '<li><a href="https://www.youtube.com/watch?v='+vidRefObj.ids[ind]+'" target="_blank">';
    html += '<img src='+val+' alt: "thumb-"'+ind+'></a></li>';
  });
  $('#search-results').html(html);
}

$(function main() {

  $('form').on('submit', function(event) {
    event.preventDefault();
    let query = $('#query').val();
    console.log(query);
    promise = getYoutubeSearchResult(query);

    let vidRefObj = {
      thumbs: [],
      ids: []
    };

    promise.done(function(data) {
      console.log(data);
      retrieveThumbnails(data, vidRefObj);
      renderThumbnails(vidRefObj);
    });
  });
});
