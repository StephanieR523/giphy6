// Giphy HOMEWORK #6

$(document).ready(function() {

  var topics = ['Dolphin', 'Platypus', 'Dog', 'Koala'];


    function displayInfo(){
      $('#animal-view').empty();
      var topic = $(this).attr('data-name');
      var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + topic + '&api_key=jVz8LzEOLKTNPSj1tux4I40dP1PX6Pbg&limit=10';

      // AJAX call to GET  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        if (response.pagination.total_count == 0) {
          alert('Sorry, there are no Gifs for this topic');
          var itemindex = topics.indexOf(topic);
          if (itemindex > -1) {
            topics.splice(itemindex, 1);
            renderButtons();
            }
        }
        
        // Save response from API call (JSON) to a variable results
        var results = response.data;
        for (var j = 0; j < results.length; j++){
          // new Div
          var newTopicDiv = $("<div class='animal-name'>");
          // Save responses from API into variables and add to DOM
          // GIF Rating
          var pRating = $('<p>').text('Rating: ' + results[j].rating.toUpperCase());
          // GIF Title
          var pTitle = $('<p>').text('Title: ' + results[j].title.toUpperCase());
          // GIF URL
          var gifURL = results[j].images.fixed_height_still.url;         
          var gif = $('<img>');
          gif.attr('src', gifURL);
          gif.attr('data-still', results[j].images.fixed_height_still.url);
          gif.attr('data-animate', results[j].images.fixed_height.url);
          gif.attr('data-state', 'still');
          gif.addClass ('animate-gif');
          // Appending info 
          newTopicDiv.append(pRating);
          newTopicDiv.append(pTitle);
          newTopicDiv.append(gif);
           // Putting the saved info to new div
          $('#animal-view').prepend(newTopicDiv);
        } 
      });
    };
    
    // Displays
    function renderButtons() {
  //Deletes
      $('.buttons-view').empty();
      // Loops through array
      for (var i = 0; i < topics.length; i++) {
        var createButtons = $('<button>');
        createButtons.addClass('topic btn btn-info');
        createButtons.attr('data-name', topics[i]);
        createButtons.text(topics[i]);
        $('.buttons-view').append(createButtons);
      }
    }

    // Remove buttons
    function removeButton(){
      $("#animal-view").empty();
      var topic = $(this).attr('data-name');
      var itemindex = topics.indexOf(topic);
      if (itemindex > -1) {
        topics.splice(itemindex, 1);
        renderButtons();
      }
    }

    // Function to play or still Gif images
    function playGif () {
      var state = $(this).attr('data-state');
      if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
      }
      else {
        $(this).attr('src' , $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }
    }

    ///EVENT LISTENERS aka CLICK EVENTS
    // Click on the submit button to add a new animal button
    $("#add-animal").on("click", function(event) {
      event.preventDefault();
      // capture input from the form
      var animal = $("#animal-input").val().trim();
      // check if topic exsits already
      if (topics.toString().toLowerCase().indexOf(animal.toLowerCase()) != -1) {
        alert("Topic already exists");
      }
      else {
        topics.push(animal);
        renderButtons();
      }
    });

    
    $(document).on("click", ".topic", displayInfo);

    $(document).on("click", ".animate-gif", playGif);
   
    $(document).on("dblclick", ".topic", removeButton);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();


}); 