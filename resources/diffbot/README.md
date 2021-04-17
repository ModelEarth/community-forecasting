# DiffBot


[Knowledge Graph Search](https://app.diffbot.com/search/)  


Login using: loren@gatech.edu	siteLocator  


Our token is: 31c80e03058e4f5b86585fb9e97640a6  


[Locations by postal code](https://app.diffbot.com/search/?query=type%3ACorporation+locations.postalCode%3A%2230318%22+&from=0&size=50&active_tab=visual)

Top companies by importance:  
type:Corporation importance>2500000 sortBy:importance


From Kris at DiffBot:  

[KG API documentation](https://documentation.diffbot.com/)

[OpenAPI spec](https://kg.diffbot.com/kg/openapi.json)  


Sample API calls using our token:  

[General Mills - with all known entities for organization](https://kg.diffbot.com/kg/dql_endpoint?type=query&token=31c80e03058e4f5b86585fb9e97640a6&size=50&from=0&query=type%3AOrganization%20name%3A%22General%20Mills%22)

[General Mills - US entities](https://kg.diffbot.com/kg/dql_endpoint?type=query&token=31c80e03058e4f5b86585fb9e97640a6&size=50&from=0&query=type%3AOrganization%20name%3A%22General%20Mills%22%20location.country.name%3Aor(%22United%20States%22%2C%20%22United%20States%20of%20America%22))  

[General Mills - frame access to non-canonical facts using their unique DiffbotID](https://kg.diffbot.com/kg/dql_endpoint?type=query&token=31c80e03058e4f5b86585fb9e97640a6&size=50&from=0&query=type%3AOrganization%20id%3A%22OJz7bdtktNEmInrt8CCv1AQ%22%20&jsonmode=extended)  

----

[Leveraging Knowledge Graph for Open-Domain Question Answering](https://ieeexplore.ieee.org/abstract/document/8609620) - IEEE Conference Publication  
