<b style='font-size:22px'>Random Forest Classifier</b><!-- Training Accuracy before tuning: 97%  -->  

Feature importance in zipcodes where  
poverty increased by 2% the next year:     
<!--
1. population	0.078074
2. poverty 18to65	0.070946
3. poverty	0.066794
4. education	0.06455
5. work experience	0.064005
6. working fulltime	0.063938
7. JobsTotal	0.057582
8. poverty under18	0.05754
9. poverty over65	0.051598
10. JobsConstruction	0.047546
11. JobsProfessional	0.042802
12. JobsHealthcare	0.039135
13. JobsTransport	0.037797
14. JobsTrade	0.037657
15. JobsManufacturing	0.037138
16. JobsRealestate	0.032354
17. working fulltime poverty	0.029978
18. JobsEntertainment	0.029099
19. JobsAgriculture	0.018964
-->

<div style='font-size:12pt;line-height:16pt;padding-top:0px'>Accuracy before tuning: 69%<br>
Accuracy after tuning: 71%<br><br>

Best Params:<br>
max depth: 8; <!-- max number of levels in each decision tree -->
n-estimators: 100 <!-- number of trees in the foreset -->  <br><br>

<a href="./?page=about/forest">View Indicator Importance</a>
</div> 

<!--
[Learn About Tuning Random Forests](https://www.analyticsvidhya.com/blog/2015/06/tuning-random-forest-model/) | 

[Hyperparameter Tuning](https://towardsdatascience.com/hyperparameter-tuning-the-random-forest-in-python-using-scikit-learn-28d2aa77dd74)
-->
