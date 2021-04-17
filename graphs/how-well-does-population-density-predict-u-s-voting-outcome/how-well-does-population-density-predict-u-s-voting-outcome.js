// URL: https://observablehq.com/@jake-low/how-well-does-population-density-predict-u-s-voting-outcome
// Title: How well does population density predict U.S. voting outcomes?
// Author: Jake Low (@jake-low)
// Version: 1174
// Runtime version: 1

const m0 = {
  id: "794f4dcf7e6dc8d2@1174",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# How well does population density predict U.S. voting outcomes?`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`
Inspired by this [excellent feature from the _New York Times_](https://www.nytimes.com/interactive/2018/upshot/election-2016-voting-precinct-maps.html), I wanted to determine how correlated population density and voting outcomes were in the 2016 U.S. Presidential Election. The _Times_ map certainly shows some degree of correlation: dense urban areas tended to vote for Clinton, even in states that Trump won by large margins. How well would population density perform as a predictor of voting outcomes?

To answer this question, I first made a map of voting outcomes by county. County-level data is the best I have access to (the _Times_ map was created with a precinct-level dataset). Colors on this map show the ratio of votes for Trump to votes for Clinton. You can hover over a county to see more info about it.
`
)})
    },
    {
      name: "vote_map",
      inputs: ["width","d3","DOM","projection","counties","format","topojson","us"],
      value: (function(width,d3,DOM,projection,counties,format,topojson,us)
{
  const height = width * 5/8;
  
  const svg = d3.select(DOM.svg(width, height))
      .attr("viewBox", "0 0 960 600")
      .style("width", "100%")
      .style("height", "auto");
  
  const color = d3.scaleSequential(d3.interpolateRdBu);
  
  // render map
  
  const path = d3.geoPath(projection);

  svg.append("g")
    .selectAll("path")
    .data(counties)
    .enter().append("path")
      .attr("fill", county => color(county.properties.votes.two_party_ratio))  
      .attr("d", path)
    .append("title")
      .text(d => [
        d.properties.name,
        `${format.percent(d.properties.votes.percent.dem)} Clinton`,
        `${format.percent(d.properties.votes.percent.gop)} Trump`,
        ].join(" – ")
      )

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

  // render legend
  
  const x = d3.scaleLinear()
      .domain(color.domain())
      .rangeRound([0, 260]);

  const legend = svg.append("g")
      .style("font-size", "0.8rem")
      .style("font-family", "sans-serif")
      .attr("transform", "translate(600,40)");
    
  const label = legend.append("text")
      .attr("y", -8)
      .attr("font-weight", "bold")
      .text("Ratio of Trump votes to Clinton votes");
  
  const scale = legend.append("g")
 
  scale.selectAll("rect")
    .data(d3.range(0, 1, 0.01))
    .enter().append("rect")
      .attr("height", 10)
      .attr("x", d => x(d))
      .attr("width", (260 / 100) * 1.25)
      .attr("fill", d => color(d));

  scale.call(
    d3.axisBottom(x)
      .tickSize(15)
      .tickFormat(v => v > 0.5 ? `${Math.round(v / (1 - v))}:1` : `1:${Math.round((1 - v) / v)}`)
      .tickValues([ 0.2, 0.333, 0.5, 0.666, 0.8 ])
    )
    .select(".domain")
      .remove();

  return svg.node();
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`
Next, I produced a similar map of population density per county, based on the U.S. Census Bureau's population estimates for 2016. Hotter areas indicate higher population density. I mapped the data to a log scale because there is so much variance (Lincoln County, NV has 0.2 people per km², New York County, NY has 28 _thousand_ per km²)

When plotting population density, it's important that the map projection preserve relative areas of places, so that you can visually "integrate" density × area and estimate total population. The projection used here is Albers Conic Equal-Area, but be aware that Alaska and Hawaii are not shown to scale.
`
)})
    },
    {
      name: "population_map",
      inputs: ["width","d3","DOM","counties","projection","format","topojson","us"],
      value: (function(width,d3,DOM,counties,projection,format,topojson,us)
{
  const height = width * 5/8;
  
  const svg = d3.select(DOM.svg(width, height))
      .attr("viewBox", "0 0 960 600")
      .style("width", "100%")
      .style("height", "auto");
   
  const domain = [0.125, Math.max(...counties.map(county => county.properties.density))];

  const color = d3.scaleLog()
    .base(2)
    .domain(domain)
    .interpolate(() => d3.interpolateMagma)
  
  // render map
  
  const path = d3.geoPath(projection);
  
  svg.append("g")
    .selectAll("path")
    .data(counties)
    .enter().append("path")
      .attr("fill", d => color(d.properties.density))
      .attr("d", path)
    .append("title")
      .text(d => `${d.properties.name} - density: ${format.density(d.properties.density)} persons / km²`);

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

  // render legend
  
  const thresholds = d3.range(-3, 16).map(x => 2 ** x);
  
  const x = d3.scaleLog()
    .base(2)
    .domain(domain)
    .rangeRound([0, 260]);

  const legend = svg.append("g")
      .style("font-size", "0.8rem")
      .style("font-family", "sans-serif")
      .attr("transform", "translate(600,40)");
  
  const label = legend.append("text")
      .attr("y", -8)
      .attr("font-weight", "bold")
      .text("Population density (persons / km²)");
  
  const scale = legend.append("g");
  
  scale.selectAll("rect")
    .data(thresholds)
    .enter().append("rect")
      .attr("height", 10)
      .attr("x", d => x(d))
      .attr("width", d => x(2 * d) - x(d))
      .attr("fill", d => color(d));
  
  scale.call(
    d3.axisBottom(x)
      .tickSize(15)
      .tickFormat(v => v > 9999 ? d3.format(".2s")(v) : v > 999 ? d3.format(".1s")(v) : String(v))
    )
    .select(".domain")
      .remove();
  
  return svg.node();
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Certainly the two maps _look_ correlated: we can see hotspots in the population map which seem to align with blue parts of the vote map. But are the two datasets really correlated? Let's find out.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`
I ran a logarithmic regression model on the data. I chose logarithmic over linear for the same reason I chose a log scale in the map above: the domain of the population density data spans many orders of magnitude, while the voting data barely covers two (even the most extreme cases, counties voted for one candidate over the other with a ratio of maybe 20 to 1).
`
)})
    },
    {
      name: "fit",
      inputs: ["regression","counties"],
      value: (function(regression,counties){return(
regression.logarithmic(
  counties.map(county => [county.properties.density, county.properties.votes.two_party_ratio]),
  { precision: 12 }
)
)})
    },
    {
      inputs: ["md","tex","d3","fit"],
      value: (function(md,tex,d3,fit){return(
md`
The ${tex `R^2`} value for the linear regression was ${d3.format(".3f")(fit.r2)}... not fantastic. In order to understand why, I made a scatterplot.

This plot shows voting outcomes on the Y axis and population density on the X axis. Denser counties are further to the right, and counties that preferred Clinton to Trump are at the top. The red line is the best fit line from our regression model (it's a logarithmic model but the line appears straight in this plot because the X axis uses a log scale).
`
)})
    },


    {
      name: "scatterplot",
      inputs: ["vegalite","counties","predictions","width"],
      value: (function(vegalite,counties,predictions,width){return(
vegalite({
  $schema: "https://vega.github.io/schema/vega-lite/v2.json",
  title: "Vote outcomes vs. population density (by county)",
  layer: [
    {
      data: { values: counties.map(county => county.properties) },
      mark: "point",
      encoding: {
        x: {
          field: "density",
          type: "quantitative",
          scale: { type: "log" },
          axis: { title: "Population density (persons / km²)" },
        },
        size: { field: "population", type: "quantitative", scale: { type: "sqrt" } },
        y: {
          field: "votes.two_party_ratio",
          type: "quantitative",
          axis: { title: "Two party vote ratio" },

        },
        tooltip: [
          { field: "name" },
          { field: "population", type: "quantitative", format: ".3s" },
          { field: "density", type: "quantitative", format: ".2f" },
          { field: "votes.percent.dem", type: "quantitative", format: ".2%" },
          { field: "votes.percent.gop", type: "quantitative", format: ".2%" },
        ]
      }
    },
    {
      data: { values: predictions },
      mark: { type: "line" },
      encoding: {
        x: {
          field: "[0]",
          type: "quantitative",
        },
        y: {
          field: "[1]",
          type: "quantitative",
        },
        color: { value: "#e00" },
      }
    }
  ],
  width: width,
  height: width * 5/8,
  autosize: { type: "fit" }
})
)})
    }


    ,
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md`We can see from the plot that there is at best a "soft" trend in the data. Many counties fall far from the best fit line (hence the low ${tex `R^2`}).

But at least one interesting question remains: _where_ is the model wrong? Is it uniformly wrong everywhere, or are there spatial trends in the errors it makes?

To answer this, I made one more map. I created a prediction model from the regression equation and used it to predict how each county would vote, based only on its population density. Then I compared these predictions with the actual voting records, and computed an error for each.

Negative errors (shown in pink) indicate where the model underestimated the Trump vote and overestimated the Clinton vote. Positive errors (shown in green) indicate the reverse: the model underestimated Clinton's popularity with votes and overestimated Trump's.
`
)})
    },
    {
      name: "error_map",
      inputs: ["width","d3","DOM","projection","counties","errors","format","fit","topojson","us"],
      value: (function(width,d3,DOM,projection,counties,errors,format,fit,topojson,us)
{
  const height = width * 2/3;
    
  const svg = d3.select(DOM.svg(width, height))
    .attr("viewBox", "0 0 960 600")
    .style("height", "auto")
    .style("width", "100%");
      
  const color = d3.scaleLinear()
    .domain([ -1.0, 1.0 ])
    .interpolate(() => d3.interpolatePiYG)
  
  // render map
  
  const path = d3.geoPath(projection);

  const map = svg.append("g")
      .attr("transform", "translate(0,30)");
  
  map.append("g")
    .selectAll("path")
    .data(counties)
    .enter().append("path")
      .attr("fill", county => color(errors.find(e => e.id === county.id).error))
      .attr("d", path)
    .append("title")
      .text(d => [
        d.properties.name,
        `predicted: ${format.percent(fit.predict(d.properties.density)[1])}`,
        `actual: ${format.percent(d.properties.votes.two_party_ratio)}`
        ].join(" - ")
      )

  map.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

  // render legend
  
  const x = d3.scaleLinear()
    .domain(color.domain())
    .rangeRound([0, 260]);
  
  const legend = svg.append("g")
      .style("font-size", "0.8rem")
      .style("font-family", "sans-serif")
      .attr("transform", "translate(550,50)");

  legend.selectAll("rect")
    .data(d3.range(-1, 1, 0.01))
    .enter().append("rect")
      .attr("height", 10)
      .attr("x", d => x(d))
      .attr("width", (260 / 100) * 1.25)
      .attr("fill", d => color(d));

  const label = legend.append("g")
      .attr("fill", "#000")
      .attr("text-anchor", "start")
    
  label.append("text")
      .attr("y", -22)
      .attr("font-weight", "bold")
      .text("Prediction error");
  
  label.append("text")
      .attr("y", -8)
      .text("(pink: underestimates Trump votes, green: underestimates Clinton votes)");
  
  const scale = legend.append("g")
    .call(d3.axisBottom(x).tickSize(15))
    .select(".domain").remove();
  
  return svg.node();
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`
What we see in this map is that the errors that the model makes have clear spacial patterns. For example, the model systematically underestimates Clinton's popularity in the Black Belt. African-American voters in these medium-density areas tend to vote for Democrats.

Similarly, the model performs poorly in Texas, where demographics are a better predictor of voting outcomes than density. Hispanic voters in the south and southwest parts of the state overwhelmingly preferred Clinton, but the density-based model doesn't know this. It predicted that Tarrant county, with 904 people per km², would support Clinton, while Zavala County, with 3.6 people per km², would support Trump. In fact, the reverse was true.

To conclude, I think this exercise demonstrates what we already know: voter preference is complicated, and while it is affected by population density, there are too many other factors for that metric alone to be a good predictor.
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`
## Footnotes

jcfrei on Hacker News pointed out that every county in Alaska is showing the same vote ratio. This is likely an error with my processing of the data (or possibly [a limitation](https://github.com/tonmcg/County_Level_Election_Results_12-16/issues/2) of the source dataset?). In any case, be warned: if you live in Alaska, your county data isn't being displayed correctly. Sorry.
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Citations

Datasets:

- Map data: [Natural Earth](https://www.naturalearthdata.com/)
- Voting data: [Tony McGovern, via GitHub](https://github.com/tonmcg/County_Level_Election_Results_12-16)
- Population data: [U.S. Census Bureau Population and Housing Unit Estimates](https://www.census.gov/programs-surveys/popest/data/tables.html)

Tools used:
- [d3](https://github.com/d3/d3)
- [vega-lite](https://github.com/vega/vega-lite)
- [topojson](https://github.com/topojson/topojson-client)
- [regression.js](https://github.com/Tom-Alexander/regression-js)
- and of course Observable ❤
`
)})
    },
    {
      name: "counties",
      inputs: ["topojson","us","votes","populations"],
      value: (function(topojson,us,votes,populations){return(
topojson.feature(us, us.objects.counties).features.map(county => {
  const { count, percent, two_party_ratio } = votes.find(v => v.id === county.id)
  const { population } = populations.find(p => p.id === county.id)
  
  const state = us.objects.states.geometries.find(state => state.id === county.properties.STATEFP);
  
  const name = `${county.properties.NAME} County, ${state.properties.name}`; 
  
  return {
    ...county,
    properties: {
      name,
      state: state.properties.name,
      votes: { count, percent, two_party_ratio },
      population,
      density: population / county.properties.ALAND * 1e6
    }
  }
})
)})
    },
    {
      name: "predictions",
      inputs: ["counties","fit"],
      value: (function(counties,fit){return(
counties.map(county => fit.predict(county.properties.density))
)})
    },
    {
      name: "errors",
      inputs: ["counties","predictions"],
      value: (function(counties,predictions){return(
counties.map((county, index) => ({
  id: county.id,
  error: county.properties.votes.two_party_ratio - predictions[index][1]
}))
)})
    },
    {
      name: "format",
      inputs: ["d3"],
      value: (function(d3){return(
{
  density: (x) => x > 1000 ? d3.format(".2s")(x) : d3.format(".3r")(x),
  percent: d3.format(".1%")
}
)})
    },
    {
      name: "projection",
      inputs: ["d3","topojson","us"],
      value: (function(d3,topojson,us){return(
d3.geoAlbersUsa()
  .fitSize([960, 600], topojson.feature(us, us.objects.counties))
)})
    },
    {
      name: "votes",
      inputs: ["d3"],
      value: (async function(d3)
{
  const url = "https://raw.githubusercontent.com/tonmcg/County_Level_Election_Results_12-16/master/2016_US_County_Level_Presidential_Results.csv";
  
  const csv = await d3.csv(url);
  
  const votes = csv
    .map(row => ({
     id: row.combined_fips.padStart(5, "0"),
     count: { total: +row.votes_total, dem: +row.votes_dem, gop: +row.votes_gop },
     percent: { dem: +row.per_dem, gop: +row.per_gop }, 
     two_party_ratio: (+row.votes_dem) / ((+row.votes_dem) + (+row.votes_gop))
    }))
    .map(row => {
      switch (row.id) {
        case "02270": // Wade Hampton Census Area was renamed to Kusilvak Census Area (Alaska)
          return { ...row, id: "02158" };
        case "46113": // Shannon County Census Area was renamed to Oglala Lakota County Census Area (South Dakota)
          return { ...row, id: "46102" };
        default:
          return row;
      }
    })
  
  return votes;
}
)
    },
    {
      name: "populations",
      inputs: ["d3"],
      value: (async function(d3)
{
  const data = await d3.csv("https://gist.githubusercontent.com/jake-low/907af4cc717e4c289346c6b262d68a50/raw/4e9f4012d346ecff75aaeee751e7f1af3cd9c1d7/co-est2017-alldata.csv");
  
  let population = data
    .filter(row => row.COUNTY !== "000")
    .map(row => ({
      id: row.STATE + row.COUNTY,
      population: +row.POPESTIMATE2016
    }));
  
  // Kalawao County (FIPS 15005) was incorporated into Maui County (FIPS 15009)
  const kalawao = population.find(county => county.id === "15005");
  const maui = population.find(county => county.id === "15009");
  
  maui.population += kalawao.population; // add kalawao population to maui county
  population = population.filter(county => county.id !== "15005"); // remove kalawao county
  
  return population;
}
)
    },
    {
      name: "us",
      inputs: ["d3"],
      value: (async function(d3)
{ 
  const url = "https://gist.githubusercontent.com/jake-low/bd39a072eb4c0822d2c32473816e1c11/raw/5a3296a2049d6719d38b66d0b77c9359b81b8c4c/us-10m-unprojected.json";
  const us = await d3.json(url);
  
  // Kalawao County (FIPS 15005) was incorporated into Maui County (FIPS 15009)
  const counties = us.objects.counties;
  
  const kalawao = counties.geometries.find(county => county.id === "15005");
  const maui = counties.geometries.find(county => county.id === "15009");
  
  maui.arcs.concat(kalawao.arcs); // join the kalawao county geometries into maui county
  counties.geometries = counties.geometries.filter(county => county.id !== "15005"); // remove kalawao county
  
  // Exclude territories and minor outlying areas (Puerto Rico, American Samoa, U.S. Virgin Islands, etc)
  // FIPS prefixes 01xxx (Alabama) through 56xxx (Wyoming) are states; larger values are territories.
  counties.geometries = counties.geometries.filter(county => +county.id < 57000);
  
  const state_fips_codes = await d3.tsv("https://gist.githubusercontent.com/jake-low/f9857e7b5c9a30000dc87cfaf9330ab5/raw/4471d6bbbfb098f27fae5dfc8d9b4ada10dc58e3/state_fips_table.tsv");
  
  const states = us.objects.states;
  
  states.geometries = states.geometries.map(state => ({
    ...state,
    properties: {
      ...state.properties,
      name: state_fips_codes.find(row => row.STATE === state.id).STATE_NAME
    }
  }));
   
  return us;
}
)
    },
    {
      name: "regression",
      inputs: ["require"],
      value: (function(require){return(
require("https://bundle.run/regression@2.0.1")
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
      name: "vegalite",
      inputs: ["require"],
      value: (async function(require)
{
  const [Vega, VegaLite, VegaTooltip] = await Promise.all([
    require("vega@3/build/vega.min.js"),
    require("vega-lite@2/build/vega-lite.min.js"),
    require("vega-tooltip@0.13"),
  ]);
  
  const handler = new VegaTooltip.Handler();
  
  return async spec => {
    const div = document.createElement("div");
    const view = new Vega.View(Vega.parse(VegaLite.compile(spec).spec)).tooltip(handler.call);
    await view.initialize(div).runAsync();
    return div;
  };
}
)
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3@5")
)})
    }
  ]
};

const notebook = {
  id: "794f4dcf7e6dc8d2@1174",
  modules: [m0]
};

export default notebook;
