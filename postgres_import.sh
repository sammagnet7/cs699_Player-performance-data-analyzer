#!/bin/bash

#Run this script at server side where postgres server is running

psql postgres://cs699:cs699@127.0.0.1:5432/player

\copy player_overview from  '~/Documents/SoumikD/cs699/Csv/Player_overview.csv' delimiter ',' CSV HEADER;

\copy career_avg_batsman from  '~/Documents/SoumikD/cs699/Csv/Career_avg_batsman.csv' delimiter ',' CSV HEADER;

\copy vs_country_batsman from  '~/Documents/SoumikD/cs699/Csv/Vs_country_batsman.csv' delimiter ',' CSV HEADER;

\copy home_vs_away_batsman from  '~/Documents/SoumikD/cs699/Csv/Home_vs_away_batsman.csv' delimiter ',' CSV HEADER;

\copy yearly_stats_batsman from  '~/Documents/SoumikD/cs699/Csv/Yearly_stats_batsman.csv' delimiter ',' CSV HEADER;

\copy career_avg_bowler from  '~/Documents/SoumikD/cs699/Csv/Career_avg_bowler.csv' delimiter ',' CSV HEADER;

\copy vs_country_bowler from  '~/Documents/SoumikD/cs699/Csv/Vs_country_bowler.csv' delimiter ',' CSV HEADER;

\copy home_vs_away_bowler from  '~/Documents/SoumikD/cs699/Csv/Home_vs_away_bowler.csv' delimiter ',' CSV HEADER;

\copy yearly_stats_bowler from  '~/Documents/SoumikD/cs699/Csv/Yearly_stats_bowler.csv' delimiter ',' CSV HEADER;