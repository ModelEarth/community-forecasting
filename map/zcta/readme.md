#Zip Tabulation Area (ZCTA) Map

Our currect work resides at [zeta/basic](basic)  
Our zcta census data resides at [data/2017](../../data/2017/zcta_out.csv) 

Downloaded 61.5 MB zcta shape file cb_2017_us_zcta510_500k.zip from:  
https://www.census.gov/geo/maps-data/data/cbf/cbf_zcta.html  

Simplify and output as 9 MB topojson for zcta_topo_sm.json:  
https://mapshaper.org/  

Or use this command to simplify to 6MB
npx -p mapshaper mapshaper-xl tl_2017_us_zcta510.shp snap -simplify 0.1% -filter-fields ZCTA5CE10 -rename-fields zip=ZCTA5CE10 -o format=topojson zcta_mapshaper.json

Source: https://github.com/elastic/ems-file-service/issues/6


Zips are smaller at 5 MB and include area names. Source: 
http://bl.ocks.org/jefffriesen/raw/6892860/

Embedded topojson preview below using GitHub page mapping  
https://help.github.com/en/articles/mapping-geojson-files-on-github  


##Resources

Logscale - good for income range
https://bl.ocks.org/mbostock/4206573

Could us this for median income - Quantile Choropleth - Nice colors  
https://observablehq.com/@d3/quantile-choropleth

Choropleth  
https://observablehq.com/@d3/choropleth  

Similar to: [HW Q6](../Q6/q6.html)

Bivariate-choropleth - Diabetes and obesity rates by county
https://observablehq.com/@d3/bivariate-choropleth  


Conic equal-area projection - State borders bolder
https://observablehq.com/@d3/u-s-map-canvas  
 

Zoomable Choropleth - Click from state to county shapes  
https://bl.ocks.org/cmgiven/d39ec773c4f063a463137748097ff52f  
Added the above at [zoomstate](zoomstate)  

Map to Force-Directed Graph  
https://bl.ocks.org/cmgiven/4cfa1a95f9b952622280a90138842b79  

Gooey Exploding Scatterplot - Could be modified to compare states  
http://bl.ocks.org/cmgiven/e5dfe0888968ee8c507f5469a4d62b6f  

SF Population by Zip Code Tabulation Area  
https://observablehq.com/@khxu/sf-population-by-zip-code-tabulation-area  
https://observablehq.com/@khxu/san-francisco-zip-code-tabulation-areas-by-household-incom  

Very nice: How well does population density predict U.S. voting outcomes?  
Includes in-line R2 value for the linear regression  
https://observablehq.com/@jake-low/how-well-does-population-density-predict-u-s-voting-outcome  

Cities on the Globe  
https://bl.ocks.org/curran/115407b42ef85b0758595d05c825b346  

ZCTA to County  
https://github.com/AdmitHub/us-zcta-counties  

https://evergreen.data.socrata.com/Maps-Statistics/Cartographic-Boundary-Shapefiles-ZIP-Code-Tabulati/jdvb-ng9e
