d3.json("./static/js/samples.json").then((sampleData) => {
    var names = sampleData.names;
    console.log(names);

    // ID in line 25 of index.html for dropdown
    var selectTag = d3.select("#selDataset");

    names.forEach((person) => {
        selectTag
            .append("option")
            .property("value", person)
            .text(person);
    });
});

function optionChanged(selectedPerson) {
    // grab the value of the input field
    var inputText = d3.event.target.value;
  
    // reverse the input string
    var reversedInput = reverseString(inputText);
  
    // Set the output text to the reversed input string
    output.text(reversedInput);
  }
  
  text.on("change", optionChanged);

function filterResults(person) {
    return sampleData.metadata.id === person;
  }
  
//   var filteredMovies = topMovies.filter(filterMovieRatings);

// <h3 class="panel-title">Demographic Info</h3>
{/* <div id="sample-metadata" class="panel-body"></div> */}