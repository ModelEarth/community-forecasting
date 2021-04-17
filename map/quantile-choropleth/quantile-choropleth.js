// URL: https://observablehq.com/@d3/quantile-choropleth
// Title: Quantile Choropleth
// Author: D3 (@d3)
// Version: 227
// Runtime version: 1

const m0 = {
  id: "604b60abd129bb1b@227",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Quantile Choropleth

Unemployment rate by county, August 2016. Data: [Bureau of Labor Statistics](http://www.bls.gov/lau/#tables).

Search for "CUSTOM" for three place to change to zcta. Copy existing csv files local and add zcta values.`
)})
    },
    {
      name: "chart",
      inputs: ["d3","DOM","legend","topojson","us","color","data"],
      value: (function(d3,DOM,legend,topojson,us,color,data)
{
  const width = 960;
  const height = 600;
  const path = d3.geoPath();

  const svg = d3.select(DOM.svg(width, height))
      .style("width", "100%")
      .style("height", "auto");

  svg.append("g")
      .attr("transform", "translate(600,40)")
      .call(legend);

  // CUSTOM change "counties" to zcta or Georgia.
  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .join("path")
      .attr("fill", d => color(data.get(d.id)))
      .attr("d", path)
    .append("title")
      .text(d => `${data.get(d.id)}%`);

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

  return svg.node();
}
)
    },
    {
      name: "legend",
      inputs: ["ramp","color","data","d3"],
      value: (function(ramp,color,data,d3){return(
g => {
  const width = 240;

  g.append("image")
      .attr("width", width)
      .attr("height", 8)
      .attr("preserveAspectRatio", "none")
      .attr("xlink:href", ramp(color.interpolator()).toDataURL());

  g.append("text")
      .attr("class", "caption")
      .attr("y", -6)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text(data.title);

  g.call(d3.axisBottom(d3.scalePoint(["lowest", "median", "highest"], [0, width]))
      .tickSize(13))
    .select(".domain")
      .remove();
}
)})
    },
    {
      name: "data",
      inputs: ["d3"],
      value: (async function(d3){return(
Object.assign(new Map(await d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv", ({id, rate}) => [id, +rate])), {title: "Unemployment rate (quantile)"})
// CUSTOM
//Object.assign(new Map(await d3.csv("zctatest.csv", ({id, rate}) => [id, +rate])), {title: "Unemployment rate (quantile)"})
)})
    },
    {
      name: "color",
      inputs: ["d3","data"],
      value: (function(d3,data){return(
d3.scaleSequentialQuantile([...data.values()], t => d3.interpolatePiYG(1 - t))
)})
    },
    {
      name: "us",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json("https://cdn.jsdelivr.net/npm/us-atlas@1/us/10m.json")
//d3.json("../zcta/zcta_sm.topo.json")
// CUSTOM
//d3.json("../zcta/states/Georgiatest.topo.json")
)})
    },
    {
      name: "topojson",
      inputs: ["require"],
      value: (function(require){return(
require("topojson-client@3")
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3@5")
)})
    },
    {
      from: "@mbostock/color-ramp",
      name: "ramp",
      remote: "ramp"
    }
  ]
};

const m1 = {
  id: "@mbostock/color-ramp",
  variables: [
    {
      name: "ramp",
      inputs: ["DOM"],
      value: (function(DOM){return(
function ramp(color, n = 512) {
  const canvas = DOM.canvas(n, 1);
  const context = canvas.getContext("2d");
  canvas.style.margin = "0 -14px";
  canvas.style.width = "calc(100% + 28px)";
  canvas.style.height = "40px";
  canvas.style.imageRendering = "pixelated";
  for (let i = 0; i < n; ++i) {
    context.fillStyle = color(i / (n - 1));
    context.fillRect(i, 0, 1, 1);
  }
  return canvas;
}
)})
    }
  ]
};

const notebook = {
  id: "604b60abd129bb1b@227",
  modules: [m0,m1]
};

export default notebook;
