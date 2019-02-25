# CS5331-DataVisualization Time Series
Time series visualization on historic public debt data.

Video: https://youtu.be/rk8Rfqx1D2s

## Description
This time series presents historical public debt data of multiple countries around the globe. The dataset is from the International Monitary Fund which records the public debt ratio to GDP per country per year. They have records from 1800 to 2015 of about 200 countries.

## Features

### Country selection
The menu or control panel is located in the left of the line graph. It contains around 200 countries listed in alphabetical order. The control panel is generated dynamically in case there are fewer countries listed in the dataset. The user is able to click on any country for the line graph to be generated. The button for the country clicked is highlighted by a unique Category 10 color. If another country is clicked the color highlighted will be different. The user can also diselect the country by clicking the country they want to remove from the line graph. The button of the country diselected will turn back to grey. If the user re selected a country that has been previously selected the highlighted color will remain the same. This is thanks to D3's category 10 color function. Moreover, if the countries are mnay, the country list will have a scrollbar to scroll the list. Finally, below the country list there is a "Reset" button which resets the position and zoom of the line graph and resets the dot sizes.

### Line Graph

#### Axis
The line graph is located in the center of the screen. It has a black background in order to make the line graphs stand out. The x axis of the chart represent the time by years while the y axis represent the percentage of debt, where 100% represents the total GPD of the country. The axis labels are colored in white for them to stand out as well.

#### Zooming
The user is able to zoom in and out by scrolling with his/her mouse on top of the line graph. The user can also click on the line graph and drag it up, down, left, or right to see the line data closer among different year intervals or among different debt percentages.

#### Animation
Once the user has clicked on a country on the country selection menu, the country line graph will be drawn from the year 1800 to the year 2015. The animation runs for around 3 second giving the user time to see how the debt is changing throughout the passing years. At the moment the line reaches 2015 dots will slowly appear on the years where there is actual debt data. For example, China does not have available data for the first 200 years hence there is no dots appearing in such years and the line stays at 0% level. The dots are important to differenciate a year that has 0% debt and no data.

#### Tooltip
The user is able to hover over any of the dots in the line graph to see the specific debt percentage. The actual percentage is colored in red to make it easier to the user to see. The dots will increase in size if the user zooms in to the line graph also to make it easier to the user to hover over a single dot. 

## Development
This web application was developed using the D3.js library and Visual Studio Code. This is my first project using D3 therefore there were some obstacles. The main obstacle was getting around the learning curve. D3 is very different from standard JavaScript since it uses mostly chained function calls and promises. Keeping track of the program was difficult given the nature of D3. Furthermore, D3 has its own functions to manipulate data and visual objects that must be learned for any D3 project. It also makes it difficult for the developer to create his/her own functions.

Another obstacle of this project was the versions of D3. Many examples use version V3 and V5 while I required V4 code. The problem with this is that many of the main functions, specially for the graph axis manipulation, are different from version to version.

## References
- http://data.imf.org
- https://d3js.org/
- https://www.tutorialspoint.com/d3js/
- http://labratrevenge.com/d3-tip/