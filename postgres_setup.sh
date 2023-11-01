#commands to run in local machine and server machine where postgres is installed
@local_machine: 
zip Csv.zip Csv/*
scp Csv.zip soumikdutta@10.157.3.213:~/SoumikD/cs699/
@server_machine:    
cd ~/SoumikD/cs699/
unzip Csv.zip
psql -U cs699 -d player -h 127.0.0.1 -W

---------------------------------
#All create table scripts below :
---------------------------------

#Table1: player_overview
CREATE TABLE player_overview(
	row_id int,
    p_id int primary key,
	"Full Name" VARCHAR(255),
	"Born" VARCHAR(255),
	"Age" VARCHAR(255),
	"Batting Style" VARCHAR(255),
	"Bowling Style" VARCHAR(255),
	"Playing Role" VARCHAR(255),
    roll_id VARCHAR(255) NOT NULL,
    "photo_link" VARCHAR(1024)
);

#Table2: career_avg_batsman
CREATE TABLE career_avg_batsman(
	row_id int primary key,
	p_id INT NOT NULL,
	span VARCHAR(255),
	inns VARCHAR(255),
	runs VARCHAR(255),
	hs VARCHAR(255),
	ave VARCHAR(255),
	sr VARCHAR(255),
    "100" VARCHAR(255),
    "50" VARCHAR(255),
    "0" VARCHAR(255),
    "4s" VARCHAR(255),
    "6s" VARCHAR(255),
    CONSTRAINT fk_player
      FOREIGN KEY(p_id) 
	  REFERENCES player_overview(p_id)
);

#Table3: vs_country_batsman
CREATE TABLE vs_country_batsman(
	row_id int primary key,
	p_id INT NOT NULL,
	country VARCHAR(255),
	inns VARCHAR(255),
	runs VARCHAR(255),
	hs VARCHAR(255),
	ave VARCHAR(255),
	sr VARCHAR(255),
    CONSTRAINT fk_player
      FOREIGN KEY(p_id) 
	  REFERENCES player_overview(p_id)
);

#Table4: home_vs_away_batsman
CREATE TABLE home_vs_away_batsman(
	row_id int primary key,
	p_id INT NOT NULL,
	venue VARCHAR(255),
	inns VARCHAR(255),
	runs VARCHAR(255),
	hs VARCHAR(255),
	ave VARCHAR(255),
	sr VARCHAR(255),
    CONSTRAINT fk_player
      FOREIGN KEY(p_id) 
	  REFERENCES player_overview(p_id)
);

#Table5: yearly_stats_batsman
CREATE TABLE yearly_stats_batsman(
	row_id int primary key,
	p_id INT NOT NULL,
	year VARCHAR(255),
	inns VARCHAR(255),
	runs VARCHAR(255),
	hs VARCHAR(255),
	ave VARCHAR(255),
	sr VARCHAR(255),
    CONSTRAINT fk_player
      FOREIGN KEY(p_id) 
	  REFERENCES player_overview(p_id)
);

#Table6: career_avg_bowler
CREATE TABLE career_avg_bowler(
	row_id int primary key,
	p_id INT NOT NULL,
	span VARCHAR(255),
	inns VARCHAR(255),
	overs VARCHAR(255),
	mdns VARCHAR(255),
	runs VARCHAR(255),
	wkts VARCHAR(255),
    ave VARCHAR(255),
    econ VARCHAR(255),
    sr VARCHAR(255),
    caught VARCHAR(255),
    bowled VARCHAR(255),
    "leg before wicket" VARCHAR(255),
    CONSTRAINT fk_player
      FOREIGN KEY(p_id) 
	  REFERENCES player_overview(p_id)
);

#Table7: vs_country_bowler
CREATE TABLE vs_country_bowler(
	row_id int primary key,
	p_id INT NOT NULL,
	country VARCHAR(255),
	inns VARCHAR(255),
	overs VARCHAR(255),
	mdns VARCHAR(255),
	runs VARCHAR(255),
	wkts VARCHAR(255),
    ave VARCHAR(255),
    econ VARCHAR(255),
    sr VARCHAR(255),
    CONSTRAINT fk_player
      FOREIGN KEY(p_id) 
	  REFERENCES player_overview(p_id)
);

#Table8: home_vs_away_bowler
CREATE TABLE home_vs_away_bowler(
	row_id int primary key,
	p_id INT NOT NULL,
	venue VARCHAR(255),
	inns VARCHAR(255),
	overs VARCHAR(255),
	mdns VARCHAR(255),
	runs VARCHAR(255),
	wkts VARCHAR(255),
    ave VARCHAR(255),
    econ VARCHAR(255),
    sr VARCHAR(255),
    CONSTRAINT fk_player
      FOREIGN KEY(p_id) 
	  REFERENCES player_overview(p_id)
);

#Table9: yearly_stats_bowler
CREATE TABLE yearly_stats_bowler(
	row_id int primary key,
	p_id INT NOT NULL,
	year VARCHAR(255),
	inns VARCHAR(255),
	overs VARCHAR(255),
	mdns VARCHAR(255),
	runs VARCHAR(255),
	wkts VARCHAR(255),
    ave VARCHAR(255),
    econ VARCHAR(255),
    sr VARCHAR(255),
    CONSTRAINT fk_player
      FOREIGN KEY(p_id) 
	  REFERENCES player_overview(p_id)
);
