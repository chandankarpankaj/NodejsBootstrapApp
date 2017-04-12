$(document).ready(function(){
  $('.myQuoteBtn').click(function(){
    $.ajax({
      type: 'post',
      url: '/quote/new',
      dataType: 'json',
      success: function(res){
        console.log('Response : ' + res);
        var data = JSON.parse(res);
        $('.quote').html(data.quote);
        $('.author').html(data.author);
        $('.category').html(data.category);
      },
      error: function(err){
        console.log('Error : ' + err);
      }
    });
  });
});
