// Dropdown (line 25 of index.html)
d3.json("./static/js/samples.json").then((sampleData) => {
    var samples = sampleData;
    var names = sampleData.names;
    // console.log(names);

    var selectTag = d3.select("#selDataset");

    names.forEach((person) => {
        selectTag
            .append("option")
            .property("value", person)
            .text(person);
    });

    optionChanged(names[0]);
});

//Graphs and Demographic Info
function optionChanged(selectedName) {
    console.log("name=", selectedName);

    d3.json("./static/js/samples.json").then((data) => {
        var dataSamples = data;
        // console.log(dataSamples);
        var filteredSamplesdata = dataSamples.samples.filter(samplesOTU => samplesOTU.id == selectedName);
        // console.log(filteredSamplesdata[0]);
            var sampleValues = filteredSamplesdata[0].sample_values;
            var otuIDs = filteredSamplesdata[0].otu_ids;
            var otuLables = filteredSamplesdata[0].otu_labels;

        //Bar Graph (line 42)
            //sample_values = values for the bar chart
            //otu_ids = labels for the bar chart
            //otu_labels = hovertext for the chart

            var xValues = sampleValues.slice(0,10).reverse();
            var yValues = otuIDs.slice(0,10).map(otuIDnum => `No. ${otuIDnum}`).reverse();
            var textValues = otuLables.slice(0,10).reverse();

            var trace1 = {
                type: 'bar',
                x: xValues,
                y: yValues,
                orientation: 'h',
                text: textValues,
              };
            
            var dataBar = [trace1];

            var layoutBar = {
                title: `Top 10 OTUs for ID ${selectedName}`,
                colorway: ['#a262a9'],
            }

              Plotly.newPlot('bar', dataBar, layoutBar);
        

        //Bubble Chart (line 50)
            //otu_ids = x values
            //sample_values = y values
            //sample_values = marker size
            //otu_ids = marker colors
            //otu_labels = text values

            var trace2 = {
                x: otuIDs,
                y: sampleValues,
                text: otuLables,
                mode: 'markers',
                marker: {
                  size: sampleValues,
                  color: otuIDs,
                  colorscale: 'Picnic',
                }
              };
              
              var dataBubble = [trace2];
              
              var layoutBubble = {
                title: `All Samples for ID ${selectedName}`,
                showlegend: false,
              };
              
              Plotly.newPlot('bubble', dataBubble, layoutBubble);

        //Demographic Info (line 31, added rows for each stats to index)
        var filteredMetadata = dataSamples.metadata.filter(metaData => metaData.id == selectedName);
        // console.log(filteredMetadata)
            d3.select("#metadata-id span").html(`${filteredMetadata[0].id}`)
            d3.select("#metadata-ethnicity span").html(`${filteredMetadata[0].ethnicity}`)
            d3.select("#metadata-gender span").html(`${filteredMetadata[0].gender}`)
            d3.select("#metadata-age span").html(`${filteredMetadata[0].age}`)
            d3.select("#metadata-location span").html(`${filteredMetadata[0].location}`)
            d3.select("#metadata-bbtype span").html(`${filteredMetadata[0].bbtype}`)
            d3.select("#metadata-wfreq span").html(`${filteredMetadata[0].wfreq}`)

    })
};



