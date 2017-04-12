$(document).ready(function(){
  $.ajax({
    type: 'GET',
    url: '/news/sources',
    dataType: 'json',
    success: function(res){
      console.log('Response : ' + res);
      var data = JSON.parse(res);
      console.log('Response Code: ' + data.status);
      console.log(data.sources);
      var selectMenuObj = $('#newsSources');
      $(data.sources).each(function() {
       selectMenuObj.append($("<option>").attr('value',this.id).text(this.name));
      });
    },
    error: function(err){
      console.log('Error : ' + err);
    }
  });

  $('#newsSources').on('change', function() {
    console.log(this.value);
    fetchArticles(this.value);
  });

  function fetchArticles(source){
    if(!source){
      alert('Select news source');
      return;
    }
    $.ajax({
      type: 'GET',
      url: '/news/articles/'+source,
      dataType: 'json',
      success: function(res){
        console.log('Response : ' + res);
        var data = JSON.parse(res);
        console.log('Response Code: ' + data.status);
        console.log(data.articles);

        var newsDivObj = $('#newsArticles');
        newsDivObj.html('');
        $(data.articles).each(function() {
          //console.log(this);
          newsDivObj.append("<div class=\"col-md-4 dotBorder\"><a href=\""+this.url+"\"><img class=\"lazy left\" src=\""+this.urlToImage+"\" height=\"75\" width=\"100\" alt=\""+this.title+"\" title=\""+this.title+"\"><\/a><h5><a href=\""+this.url+"\">"+this.title+"<\/a><\/h5>"+this.description+"<\/div>");
        });
      },
      error: function(err){
        console.log('Error : ' + err);
      }
    });
  };

});
