## Cricketer Performance statistic visualizer web application
### Team members: Soumik Dutta(23M0826), SM Arif Ali(23M0822)
## Objective
To create a web application that provides some key performance statistics of cricketers.The app will allow users to search for players and compare cricketers' performance metrics. The players dataset will be acquired through web crawling from web (crickinfo.com).

## Features
### 1. Search & filter:
Provides an interface that would let users to search and filter cricketers based on name.
### 2. Player profiles:
Analyse individual player profiles by visualizing below mentioned player performance metrics
### 4. Comparison tool:
Users will be able to compare key performance of cricketers side by side.
### 5. Generate pdf report
Users will be able to export player statistic data shown on the web app as a pdf file.


## Performance metrics:
### 1. Batsman
- Number of 0's, 50's, 100's, 200's
- Batting average
- Batting strikerate
- Runs scored by year
- Runs scored against country

### 2. Bowler
- Overall wickets, Bowling Average, Economy
- Year wise Economy, Bowling Average, Bowling strike rate
- Dismissal summery
- Wickets taken against country

## Tools used 
- Python package: Pandas
- Bash
- Java - Spring Boot
- Postgres DB
- HTML, CSS, js
- D3: data visualisation tool
- Git
  

## High level architecture
1. All the necessary data will be collected into csv files from web (crickinfo.com) through web scrapping by Python package: Pandas
1. csv file data will be imported into postgres DB through bash scripts
2. Java spring boot framework will be used at backend to perform CRUD operation & to expose REST APIs to the frontend
3. React.js framework will be used at frontend with HTML & CSS.
4. D3.js framework will be used to generate and show different plots.
5. Git for version control.
6. IDE: Eclipse, VSCode