#FactFinder

##Poverty (Demographics) Data

<!--
The following [FactFinder county export steps are by Mike Bostock](https://bost.ocks.org/mike/bubble-map/)  

But we used these [zip export steps](https://acsdatacommunity.prb.org/acs-data-products--resources/american-factfinder/f/3/t/330).  
-->
The poverty data export prepared by the census provides a lot of other useful fields. 
Here are the [fields we're using](annual/).

1. Go to factfinder.census.gov and click "[Advanced Search](https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml?refresh=t)".  
2. Under "Geographies" choose "5 Digit ZIP Code Tabulation Area- 860" (ZCTA)  
3. Click the choice "ALL 5 Digit ZIP Code Tabulation Areas in the United States and Puerto Rico"  
(This step is not intitive. You won't need to select a state if you've clicked this choice.)  
4. Click “ADD TO YOUR SELECTIONS” button.  
5. Click “CLOSE” to dismiss the pop-up.  
6. “Topics” radio button selected.   

[View demographics data selection screenshot](annual/export_screenshot.png) - Probably only need one per year.  

<!--
7. In the pop-up, expand the “People” submenu.  
10. Expand the “Basic Count/Estimate” submenu.  
11. Click “Population Total”.  
12. Click “CLOSE” to dismiss the pop-up.  
13. In the table, click on the most recent ACS 5-year estimate named “TOTAL POPULATION”.  

Need to confirm the following...
-->

7. On the next page, click the “Download” link under “Actions”.  
8. In the pop-up, click “OK”.  
9. Wait for it to “build” your file.  
10. When it’s ready, click “DOWNLOAD”.  

<br>

##Detailed Income Data  

We are not currently using the following since the poverty download contains equivalent data.  

<b>Choose</b>  
S1901 - Income<!-- B02001 - Race   S0101 - Age and Sex-->

The income dataset contains over 100 types of income.  
Our 19.5 MB income source file resides at [prep/income/2017/aff_download/ACS_17_5YR_S1901_with_ann.csv](../../../datateam/usa/income/2017/aff_download/ACS_17_5YR_S1901_with_ann.csv)

Also of interest:  

"Population Total" for demographics.

"FINANCIAL CHARACTERISTICS" - renters vs owners

##Other Notes  

CensusReporter.org cleans up FactFinder data to provide an API. 
[View API](https://censusreporter.org/profiles/16000US1304000-atlanta-ga/)  

We are using the [ZCTA Crosswalk](https://www.census.gov/geo/reference/zctas.html) file to relate 41,160 zip codes to 33,120 census tabulation areas.  

Search for income and demographics:  
https://zipwho.com  

Census parameter names as json  
https://api.census.gov/data/2017/acs/acs5/variables.json  

API URL examples
https://api.census.gov/data/2017/acs/acsse/examples.html  

Detailed Training on Using API  
https://www.census.gov/content/dam/Census/programs-surveys/acs/guidance/training-presentations/20180614_API.pdf  

## Steps for downloading ZCTA