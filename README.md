#Readme file#
##Summary##
This data visualization is based on World Bank data on GDP and economic factors with the added context of timeperiods of economic recessions. I try through the visualization to show the different trajectories of the Malaysian and the Indonesian economies (as displayed through their GDP). Ultimately showing that a difference in development of production sectors seems to be a factor.

##Design decisions##
*Dataset and plot:*
* Picked dimple.js as my tool due to farely quick learning curve and since the package provided adequate plots for my intentions.
* I choose to make four different plots to build my story
*Chart types:*
* GDP was consistently set as a line diagram (plot 1,2,4)
* While barcharts where used to compare other economic factors (plot 2,4)
* To provide a both visual nice and illustrative overview of the production sectors through time, a area chart was picked.
*Story considerations:*
* I used the first three plots for telling my story, and then give the fourth plot letting the user explore.
* The recessions was added on top of the plots - and although they are not strictly necessary for showing the connection between production sectors and GDP development, they in my eyes provide a link from the cold numbers to the real world.
*Interactivity / animation:*
* Plot 1 was given a legend that could be selected to show/hide specific countries
* Plot 3 was animated - switching between the two countries. The transition becomes the comparison.
* Plot 4 had interactivity added for selecting new variabels to display in the plot

##Feedback##
###07-02-2017 Comments from NEB (in-house)###
* Need more clear red line for story
* Spelling errors
* In graph 3 - show legend for black boxes
* In general make text more easy understandable

###14-02-2017 Comments from danielhavir_271822h on Udacity forum###
*Story:*
Your visualization nicely depicts the differences between rather service-oriented Malaysia and rather agricultural Indonesia. As a reader, I was able to complete the whole picture. In my opinion, the finding in the data is obvious and clearly communicated. The only detail I would point out is to add context to the graphs in the bottom (DeathRate, FDI, Unemployment), I didn't understand what for example Unemployment value of 6 means. Maybe as a bullet list with short description and value explanation
*Design:*
Chart types and colors are appropriate and helped me get oriented in the story. The animation (switch between the two countries) makes it a little difficult to hover over a specific point to see the corresponding value (e.g. EmployAgriculture value in Malaysia in 1990). Slower animation may be a better choice (up to you to experiment and decide). Lastly, the Y-Axis lable of the GDP Graph wouldn't make sense without context, I suggest switch the axis label to "GDP" instead of "number".

###18-02-2017 Comments from NEB (in-house):###
* In graph 2 cannot click on points in line - can it changed?
* Possible with navigation / buttons or similar to not have to scroll?
* Animation is a bit annoying for plot 2 - changing before it can be read

###21-02-2017 Comments from Review Udacity###
Suggestions for changing graphs in several ways. Structuring and coloring.
For full review - see udacity review.


##Resources##
* Dimple.js resource: http://dimplejs.org
* CSS Buttons: http://stackoverflow.com/questions/11075116/css-overlapping-arrow
* In general - technical answers and understanding Dimple: http://stackoverflow.com
