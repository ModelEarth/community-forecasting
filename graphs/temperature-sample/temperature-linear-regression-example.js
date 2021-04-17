// URL: https://observablehq.com/@jppope/temperature-linear-regression-example
// Title: Temperature Linear Regression Example
// Author: Jon Paul Uritis (@jppope)
// Version: 253
// Runtime version: 1

const m0 = {
  id: "7618219916abc4bf@253",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Linear Regression`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md` #### Example
`
)})
    },
    {
      inputs: ["vegalite","temperature","width"],
      value: (function(vegalite,temperature,width){return(
vegalite({
  data: { values: temperature },
  width,
  height: 500,
  autosize: "fit",
   "layer": [
     {
      mark: "point",
      encoding: {
        x: {field: "date", type: "temporal", "timeUnit": "year"},
        y: {field: "anomaly", type: "quantitative"}
      }
    },
    {
      mark: "line",
      encoding: {
        x: {field: "date", type: "temporal", "timeUnit": "year"},
        y: {field: "expected", type: "quantitative"}
      }
    },
   ]                                 
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md``
)})
    },


    {
      name: "temp",
      value: (function(){return(
[
{ year: 1895, avg: 50.34, anomaly: -1.68 },
{ year: 1896, avg: 51.99, anomaly: -0.03 },
{ year: 1897, avg: 51.56, anomaly: -0.46 }
]
)})
    },


    //"temp": {"url": "../scatterplot/data/temperature.json"},


{
      name: "tempNotUsed",
      value: (function(){return(
        [
        { year: 1895, avg: 50.34, anomaly: -1.68 },
        { year: 1896, avg: 51.99, anomaly: -0.03 },
        { year: 1897, avg: 51.56, anomaly: -0.46 }
        ]
        )})
    },


    {
      name: "temperature",
      inputs: ["temp","linearRegression"],
      value: (function(temp,linearRegression){return(
temp.map((item) => {
    item.expected = linearRegression.predict(item.year)
    item.date = new Date(item.year, 1, 1)
    return item;
  })
)})
    },
    {
      name: "linearRegression",
      inputs: ["mlTools","temp"],
      value: (function(mlTools,temp){return(
new mlTools.SimpleLinearRegression(temp.map(temp => temp.year), temp.map(temp => temp.anomaly))
)})
    },
    {
      name: "vegalite",
      inputs: ["require"],
      value: (function(require){return(
require("@observablehq/vega-lite@0.1")
)})
    },
    {
      name: "mlTools",
      inputs: ["require"],
      value: (function(require){return(
require('https://www.lactame.com/lib/ml/3.3.0/ml.min.js')
)})
    }
  ]
};

const notebook = {
  id: "7618219916abc4bf@253",
  modules: [m0]
};

export default notebook;
