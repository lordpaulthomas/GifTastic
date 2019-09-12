// create an array with topic examples
const topicArray = ["Fish", "Boat", "Cruise"];
// turn the array into buttons

function renderButtons() {
  $buttonDiv = $('<div>')
  for (let i = 0; i < topicArray.length; i++) {
    $button = $('<button>');
    $button.attr({
      'data-name': topicArray[i],
      class: "topic",
      value: topicArray[i]
    });
    $button.text(topicArray[i])
    $buttonDiv.append($button)
    $('#buttons-view').append($buttonDiv)
  }
  
}
renderButtons();

// click on the button to load gifs of that topic
$(document).on('click', '.topic', function(){
  const newTopic = $(this).attr('data-name')
  searchGiphy(newTopic);
})
function searchGiphy(newTopic){

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    newTopic + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10"
  
$.ajax( {
  url: queryURL,
  method: 'GET'
}).then(function(response){
  results = response.data;
  console.log(results)
  for (let i = 0; i < results.length; i++){
    $gifDiv = $('<div>');
    $img = $('<img>');
    $img.attr("src", results[i].images.fixed_height.url);
    $gifDiv.prepend($img);
    $('#view-images').prepend($gifDiv);

  }
})


}


// allow user to input text and click submit
// user text gets added to the button area 
// when user button is clicked it also display gifs of that topic