 function init(){

// Get data
  d3.json("data/samples.json").then((data) => {
  
//Initial graphics will contain first ID in dataset.
    var init_data = data.samples.filter(x => x.id == "940");
    var init_meta = data.metadata.filter(x => x.id == "940");

//DROP DOWN
//---------------------------------------------

  //Append each val of 'names' (ids) to dropdown menu.
  var dropdown = d3.select("#selDataset");
  var ids = data.names

  ids.forEach((sample)=> {
    dropdown
      .append("option")
      .text(sample)
      .property("value",sample);   
  });

// CHART PARAMS
// ------------------------------------------------------
  
    var init_vals = init_data[0]["sample_values"];
    var init_labels = init_data[0]["otu_ids"];
    var init_hoverT = init_data[0]["otu_labels"];

//BAR CHART
//------------------------------------------------------- 
var barhtml = d3.select("#bar");
barhtml.html("");
//Create a trace (bar chart) using parameters
  var trace1 = {
    x: init_labels,
    y: init_vals,
    type: "bar",
    boxpoints: "all",
    orientation: 'h'
  };

//Create the data and layout variables

 var barData = [trace1];
  
 var barLayout = {
   title: 'Number of sample values per OTU',
   xaxis: { title: "OTU ID" },
   yaxis: { title: "Sample Values" },
   showlegend: false,
   height: 600,
   width: 600
 };
// Generate plot on the 'bar' area of html
Plotly.newPlot("bar", barData, barLayout);

//BUBBLE CHART
//---------------------------------------------

var bubblehtml = d3.select("#bubble");
bubblehtml.html("");

//Create trace for bubble chart
  var trace2 = {
    x: init_labels,
    y: init_vals,
    text:init_hoverT,
    mode:'markers',
    marker: {
      color:init_labels,
      size: init_vals
    }
  };

//Chart params
  
  var bubbleData = [trace2];
  
  var bubbleLayout = {
    title: 'Number of sample values per OTU',
    xaxis: { title: "OTU ID" },
    yaxis: { title: "Sample Values" },
    showlegend: false,
    height: 600,
    width: 600
  };
  
// //Display bubble chart on 'bubble' area of html
  Plotly.newPlot('bubble', bubbleData, bubbleLayout);

//MetaData

var metText = d3.select("#metData");
metText.html("");
var metArray = Object.entries(init_meta[0]);


metArray.forEach(function([key,value]) {
  metText.append("li").text(`${key} : ${value}`);  
});

//Gauge

var wfreq = metArray[6];
var data = [
	{
		domain: { x: [0, 1], y: [0, 1] },
		value: wfreq[1],
		title: { text: "Belly Button Washing Frequency (per week)" },
		type: "indicator",
		mode: "gauge+number"
	}
];

var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
Plotly.newPlot('gauge', data, layout);
  });
};
// //Run init to generate initial graphics with all data
init()
// //Create function to run when value of dropdown changes
function optionChanged(subject_id) {
  d3.json("data/samples.json").then((data) => {
    //Get objects to iterate over
    var f_samp = data.samples;
    
    //Filtered Graph Params
    var f_samples = f_samp.filter(x => x.id == subject_id);
    var f_values =  f_samples[0]["sample_values"];
    var f_labels = f_samples[0]["otu_ids"];
    var f_hoverT = f_samples[0]["otu_labels"];

    

//Filtered Bar Chart
//-----------------------------------------------------
    var trace1 = {
      x: f_values,
      y: f_labels,
      type: "bar",
      boxpoints: "all",
      orientation: 'h'
    };
  

  
   var barData = [trace1];
    
   var barLayout = {
     title: 'Number of sample values per OTU',
     xaxis: { title: "OTU ID" },
     yaxis: { title: "Sample Values" },
     showlegend: false,
     height: 600,
     width: 600
   };
  // Generate plot on the 'bar' area of html
    Plotly.newPlot("bar", barData, barLayout);
  

//Filtered Bubble Chart
//------------------------------------------------

//Create trace for bubble chart
  var trace2 = {
    x: f_values,
    y: f_labels,
    text:f_hoverT,
    mode:'markers',
    marker: {
      color:f_labels,
      size: f_values
    }
  };

//Chart params
  
  var bubbleData = [trace2];
  
  var bubbleLayout = {
    title: 'Number of sample values per OTU',
    xaxis: { title: "OTU ID" },
    yaxis: { title: "Sample Values" },
    showlegend: false,
    height: 600,
    width: 600
  };
  
Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    
//MetaData\
//------------------------------------------------
//Select metadata element

//Get metadata filtered by id
var metadata = data.metadata.filter(x => x.id == subject_id);
var metText = d3.select("#metData");
metText.html("");
var metArray = Object.entries(metadata[0]);


metArray.forEach(function([key,value]) {
  metText.append("li").text(`${key} : ${value}`);  
});

//Gauge
//------------------------------------------------
var wfreq = metArray[6];
var data = [
	{
		domain: { x: [0, 1], y: [0, 1] },
		value: wfreq[1],
		title: { text: "Belly Button Washing Frequency (per week)" },
		type: "indicator",
		mode: "gauge+number"
	}
];

var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
Plotly.newPlot('gauge', data, layout);

});
}

            

  




