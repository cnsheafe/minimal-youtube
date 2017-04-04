/*jshint esversion:6*/
function getYoutubeSearchResult(query){
  let settings = {
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
      part: 'snippet',
      key: 'AIzaSyCUDIUbnbMp30QXCi9v8UacXjWKpaOscsI',
      q: query
    },
    dataType: 'json'
  };
  return $.ajax(settings);
}

function retrieveThumbnails(responseObj) {
  let thumbnails = [];
  $.each(responseObj.items, function(index, obj) {
    thumbnails.push(obj.snippet.thumbnails.high.url);
  });
  return thumbnails;
}

function renderThumbnails(thumbsArr) {
  let html = '';
  $.each(thumbsArr, function functionName(ind, val) {
    html += '<img src='+val+' alt: "thumb-"'+ind+'>';
  });
  $('main').append(html);
}

$(function main() {

  $('form').on('submit', function(event) {
    event.preventDefault();
    let query = $(this).text();
    promise = getYoutubeSearchResult(query);
    let thumbnails = [];
    promise.done(function(data) {
      thumbnails = retrieveThumbnails(data);
      renderThumbnails(thumbnails);
    });
  });
});
