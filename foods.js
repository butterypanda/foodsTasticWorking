$(function() {
    renderButtons(topics, 'foodsButton', '#foodsButtons');
});

var topics = ["pizza", "sushi", "burgers", "tacos", "ramen", "steve brule food"];

function renderButtons(topics, foodsButton, foodsButtons){   
    $(foodsButtons).empty();

    for (var i = 0; i < topics.length; i++){
        
        var a = $('<button>');
        a.addClass(foodsButton);
        a.attr('data-name', topics[i]);
        a.text(topics[i]);
        $(foodsButtons).append(a);
    }
}

$(document).on('click', '.foodsButton', function(){
    $('#foods').empty();
    $('.foodsButton').removeClass('active');
    $(this).addClass('active');

    var name = $(this).data('name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
        
         var results = response.data;

         for(var i=0; i < results.length; i++){
             var foodsDiv = $('<div class="food-thing">')

             var rating = results[i].rating;

             var p = $('<p>').text( "Rating: " + rating);

             var animated = results[i].images.fixed_height.url;
             var still = results[i].images.fixed_height_still.url;

             var foodsImage = $('<img>');
             foodsImage.attr('src', still);
             foodsImage.attr('data-still', still);
             foodsImage.attr('data-animate', animated);
             foodsImage.attr('data-state', 'still')
             foodsImage.addClass('foodsImage');

             foodsDiv.append(p)
             foodsDiv.append(foodsImage)

             $('#foods').append(foodsDiv);
         }
    }); 
});

$(document).on('click', '.foodsImage', function() {
    var state = $(this).attr('data-state'); 
    
    if ( state === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$('#addFoods').on('click', function(){
    var newFoods = $('input').eq(0).val();

    if (newFoods.length > 2){
        topics.push(newFoods);
    }

    renderButtons(topics, 'foodsButton', '#foodsButtons');

    return false;
});