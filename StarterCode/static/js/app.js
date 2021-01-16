d3.json("./static/js/samples.json").then((sampleData) => {
    var names = sampleData.names;
    console.log(names);

    // line 25 of index.html for dropdown
    var selectTag = d3.select("#selDataset");

    names.forEach((person) => {
        selectTag
            .append("option")
            .property("value", person)
            .text(person);
    });
});

