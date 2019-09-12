// create an array with topic examples
const topicArray = ["Fish", "Boat", "Cruise"];
// turn the array into buttons

function renderButtons() {
  $buttonDiv = $('<div>')
  $p = $('<p>')
  $p.text("Click the word to see some Gifs")
  for (let i = 0; i < topicArray.length; i++) {
    $button = $('<button>');
    $button.attr({
      'data-name': topicArray[i],
      class: "btn btn-secondary",
      value: topicArray[i]
    });
    $button.prepend($p)
    $button.text(topicArray[i])
    $buttonDiv.append($button)
    $('#buttons-view').append($buttonDiv)
  }
}
renderButtons();

// click on the button to load gifs of that topic
$(document).on('click', '.topic', function () {
  const newTopic = $(this).attr('data-name')
  searchGiphy(newTopic);
})
function searchGiphy(newTopic) {

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    newTopic + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10"
$('#view-images').empty();
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    results = response.data;
    console.log(results)
    for (let i = 0; i < results.length; i++) {
      $gifDiv = $('<div>');
      
      $img = $('<img>');
      $img.attr("src", results[i].images.fixed_height.url);
      $gifDiv.prepend($img);
      $('#view-images').prepend($gifDiv);

    }
  })
}



$box = $('<p>')
$box.text("Click on the buttons to see some Gifs.  Add a topic to the button list")
$('#input-box').prepend($box);

  

// allow user to input text and click submit


// user text gets added to the button area 


// when user button is clicked it also display gifs of that topic

function renderButtons() {

  $("#buttons-view").empty();

  // Loops through the array of movies
  for (var i = 0; i < topicArray.length; i++) {

    // Then dynamicaly generates buttons for each topic in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var $a = $("<button>");
    // Adds a class of topic to our button
    $a.addClass("topic");
    // Added a data-attribute
    $a.attr("data-name", topicArray[i]);
    // Provided the initial button text
    $a.text(topicArray[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append($a);
  }
}

// This function handles events where the add topic button is clicked
$("#submit").on("click", function (event) {

  event.preventDefault();
  
  // This line of code will grab the input from the textbox
  var newTopic = $("#input-box").val().trim();

  // The topic from the textbox is then added to our array
  topicArray.push(newTopic);
  // Calling renderButtons which handles the processing of our topic array
  renderButtons();
  $('#input-box').val("")
});

