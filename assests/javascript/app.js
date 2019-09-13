// create an array with topic examples
const topicArray = ["Fish", "Boat", "Cruise"];
const favArray = [];

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
    newTopic + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=25"
$('#view-images').empty();
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    results = response.data;
    console.log(results)
    for (let i = 0; i < results.length; i++) {
      $gifDiv = $('<div>');
      $p = $('<p>')
      $p.text("Rated - "+results[i].rating)
      $img = $('<img>');
      $img.attr("src", results[i].images.fixed_height.url);
      $gifDiv.append($p)
      $gifDiv.prepend($img);
      $('#view-images').prepend($gifDiv);
    }
  })
}
 
// allow user to input text and click submit

$("#submit").on("click", function (event) {
  event.preventDefault();
  if($("#input-box").val()===("")){throw error}
  else{
  var newTopic = $("#input-box").val().trim();
  // user text gets added to the button area 
  topicArray.push(newTopic);
  renderButtons();
  $('#input-box').val("")}
});

// when user button is clicked it also display gifs of that topic
function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < topicArray.length; i++) {
    var $a = $("<button>");
    $a.addClass("topic");
    $a.attr("data-name", topicArray[i]);
    $a.text(topicArray[i]);
    $("#buttons-view").append($a);
  }
}
