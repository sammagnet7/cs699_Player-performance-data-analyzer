package iitb.cs699.playerStatAnalyser.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import iitb.cs699.playerStatAnalyser.entity.CareerAvgBatsman;
import iitb.cs699.playerStatAnalyser.entity.CareerAvgBowler;
import iitb.cs699.playerStatAnalyser.entity.HomeVsAwayBatsman;
import iitb.cs699.playerStatAnalyser.entity.HomeVsAwayBowler;
import iitb.cs699.playerStatAnalyser.entity.PlayerOverview;
import iitb.cs699.playerStatAnalyser.entity.VsCountryBatsman;
import iitb.cs699.playerStatAnalyser.entity.VsCountryBowler;
import iitb.cs699.playerStatAnalyser.entity.YearlyStatsBatsman;
import iitb.cs699.playerStatAnalyser.entity.YearlyStatsBowler;
import iitb.cs699.playerStatAnalyser.repo.CareerAvgBatsmanRepository;
import iitb.cs699.playerStatAnalyser.repo.CareerAvgBowlerRepository;
import iitb.cs699.playerStatAnalyser.repo.HomeVsAwayBatsmanRepository;
import iitb.cs699.playerStatAnalyser.repo.HomeVsAwayBowlerRepository;
import iitb.cs699.playerStatAnalyser.repo.PlayerOverviewRepository;
import iitb.cs699.playerStatAnalyser.repo.VsCountryBatsmanRepository;
import iitb.cs699.playerStatAnalyser.repo.VsCountryBowlerRepository;
import iitb.cs699.playerStatAnalyser.repo.YearlyStatsBatsmanRepository;
import iitb.cs699.playerStatAnalyser.repo.YearlyStatsBowlerRepository;

@Service
public class CsvUploadService {

	@Autowired
	private CareerAvgBatsmanRepository careerAvgBatsmanRepo;

	@Autowired
	private HomeVsAwayBatsmanRepository homeVsAwayBatsmanRepo;

	@Autowired
	private VsCountryBatsmanRepository vsCountryBatsmanRepo;

	@Autowired
	private YearlyStatsBatsmanRepository yearlyStatsBatsmanRepo;

	@Autowired
	private CareerAvgBowlerRepository careerAvgBowlerRepo;

	@Autowired
	private HomeVsAwayBowlerRepository homeVsAwayBowlerRepo;

	@Autowired
	private VsCountryBowlerRepository vsCountryBowlerRepo;

	@Autowired
	private YearlyStatsBowlerRepository yearlyStatsBowlerRepo;

	@Autowired
	private PlayerOverviewRepository playerOverviewRepo;
	

	public void uploadCsvFiles(List<MultipartFile> files) throws IOException {

		for (MultipartFile file : files) {

			String originalFilename = file.getOriginalFilename();
			if (originalFilename == null || originalFilename.isEmpty()) {
				continue;
			}

			try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {

				CSVParser csvParser = new CSVParser(reader,
						CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());

				String tableName = getTableName(originalFilename);

				switch (tableName) {
				case "player_overview":
					processPlayerOverview(csvParser);
					break;
				case "career_avg_batsman":
					processCareerAvgBatsman(csvParser);
					break;
				case "vs_country_batsman":
					processVsCountryBatsman(csvParser);
					break;
				case "home_vs_away_batsman":
					processHomeVsAwayBatsman(csvParser);
					break;
				case "yearly_stats_batsman":
					processYearlyStatsBatsman(csvParser);
					break;
				case "career_avg_bowler":
					processCareerAvgBowler(csvParser);
					break;
				case "vs_country_bowler":
					processVsCountryBowler(csvParser);
					break;
				case "home_vs_away_bowler":
					processHomeVsAwayBowler(csvParser);
					break;
				case "yearly_stats_bowler":
					processYearlyStatsBowler(csvParser);
					break;
				default:
					throw new IllegalArgumentException("Unknown table name: " + tableName);
				}
			}
		}
	}

	private String getTableName(String fileName) {
		// Logic to extract table name from the file name, assuming a naming convention
		// return fileName.split("_")[0].toLowerCase();
		return fileName;
	}
	

	 private void processPlayerOverview(CSVParser csvParser) {
		 
	        csvParser.forEach(record -> {
	            PlayerOverview playerOverview = new PlayerOverview();
	            playerOverview.setPId(Integer.parseInt(record.get("p_id")));
	            playerOverview.setFullName(record.get("full_name"));
	            playerOverview.setBorn(record.get("born"));
	            playerOverview.setAge(record.get("age"));
	            playerOverview.setBattingStyle(record.get("batting_style"));
	            playerOverview.setBowlingStyle(record.get("bowling_tyle")); // Typo in your table definition, corrected here
	            playerOverview.setPlayingRole(record.get("playing_role"));
	            playerOverview.setRoll_id(record.get("roll_id"));
	            playerOverview.setPhotoLink(record.get("photo_link"));
	            
	            playerOverviewRepo.save(playerOverview);
	        });
	    }

	    private void processCareerAvgBatsman(CSVParser csvParser) {
	    	
	        csvParser.forEach(record -> {
	            CareerAvgBatsman careerAvgBatsman = new CareerAvgBatsman();
	            careerAvgBatsman.setPId(Integer.parseInt(record.get("p_id")));
	            careerAvgBatsman.setSpan(record.get("span"));
	            careerAvgBatsman.setInns(record.get("inns"));
	            careerAvgBatsman.setRuns(record.get("runs"));
	            careerAvgBatsman.setHs(record.get("hs"));
	            careerAvgBatsman.setAve(record.get("ave"));
	            careerAvgBatsman.setSr(record.get("sr"));
	            careerAvgBatsman.set_100s(record.get("100"));
	            careerAvgBatsman.set_50s(record.get("50"));
	            careerAvgBatsman.set_0s(record.get("0"));
	            careerAvgBatsman.set_4s(record.get("4s"));
	            careerAvgBatsman.set_6s(record.get("6s"));
	            
	            careerAvgBatsmanRepo.save(careerAvgBatsman);
	        });
	    }

	    private void processVsCountryBatsman(CSVParser csvParser) {
	        csvParser.forEach(record -> {
	            VsCountryBatsman vsCountryBatsman = new VsCountryBatsman();
	            vsCountryBatsman.setPId(Integer.parseInt(record.get("p_id")));
	            vsCountryBatsman.setCountry(record.get("country"));
	            vsCountryBatsman.setInns(record.get("inns"));
	            vsCountryBatsman.setRuns(record.get("runs"));
	            vsCountryBatsman.setHs(record.get("hs"));
	            vsCountryBatsman.setAve(record.get("ave"));
	            vsCountryBatsman.setSr(record.get("sr"));
	            
	            vsCountryBatsmanRepo.save(vsCountryBatsman);
	        });
	    }

	    private void processHomeVsAwayBatsman(CSVParser csvParser) {
	        csvParser.forEach(record -> {
	            HomeVsAwayBatsman homeVsAwayBatsman = new HomeVsAwayBatsman();
	            homeVsAwayBatsman.setPId(Integer.parseInt(record.get("p_id")));
	            homeVsAwayBatsman.setVenue(record.get("venue"));
	            homeVsAwayBatsman.setInns(record.get("inns"));
	            homeVsAwayBatsman.setRuns(record.get("runs"));
	            homeVsAwayBatsman.setHs(record.get("hs"));
	            homeVsAwayBatsman.setAve(record.get("ave"));
	            homeVsAwayBatsman.setSr(record.get("sr"));
	            
	            homeVsAwayBatsmanRepo.save(homeVsAwayBatsman);
	        });
	    }

	    private void processYearlyStatsBatsman(CSVParser csvParser) {
	        csvParser.forEach(record -> {
	            YearlyStatsBatsman yearlyStatsBatsman = new YearlyStatsBatsman();
	            yearlyStatsBatsman.setPId(Integer.parseInt(record.get("p_id")));
	            yearlyStatsBatsman.setYear(record.get("year"));
	            yearlyStatsBatsman.setInns(record.get("inns"));
	            yearlyStatsBatsman.setRuns(record.get("runs"));
	            yearlyStatsBatsman.setHs(record.get("hs"));
	            yearlyStatsBatsman.setAve(record.get("ave"));
	            yearlyStatsBatsman.setSr(record.get("sr"));
	            
	            yearlyStatsBatsmanRepo.save(yearlyStatsBatsman);
	        });
	    }

	    private void processCareerAvgBowler(CSVParser csvParser) {
	        csvParser.forEach(record -> {
	            CareerAvgBowler careerAvgBowler = new CareerAvgBowler();
	            careerAvgBowler.setPId(Integer.parseInt(record.get("p_id")));
	            careerAvgBowler.setSpan(record.get("span"));
	            careerAvgBowler.setInns(record.get("inns"));
	            careerAvgBowler.setOvers(record.get("overs"));
	            careerAvgBowler.setMdns(record.get("mdns"));
	            careerAvgBowler.setRuns(record.get("runs"));
	            careerAvgBowler.setWkts(record.get("wkts"));
	            careerAvgBowler.setAve(record.get("ave"));
	            careerAvgBowler.setEcon(record.get("econ"));
	            careerAvgBowler.setSr(record.get("sr"));
	            careerAvgBowler.setCaught(record.get("caught"));
	            careerAvgBowler.setBowled(record.get("bowled"));
	            careerAvgBowler.setLbw(record.get("leg_before_wicket"));
	            
	            careerAvgBowlerRepo.save(careerAvgBowler);
	        });
	    }

	    private void processVsCountryBowler(CSVParser csvParser) {
	        csvParser.forEach(record -> {
	            VsCountryBowler vsCountryBowler = new VsCountryBowler();
	            vsCountryBowler.setPId(Integer.parseInt(record.get("p_id")));
	            vsCountryBowler.setCountry(record.get("country"));
	            vsCountryBowler.setInns(record.get("inns"));
	            vsCountryBowler.setOvers(record.get("overs"));
	            vsCountryBowler.setMdns(record.get("mdns"));
	            vsCountryBowler.setRuns(record.get("runs"));
	            vsCountryBowler.setWkts(record.get("wkts"));
	            vsCountryBowler.setAve(record.get("ave"));
	            vsCountryBowler.setEcon(record.get("econ"));
	            vsCountryBowler.setSr(record.get("sr"));
	            
	            vsCountryBowlerRepo.save(vsCountryBowler);
	        });
	    }

	    private void processHomeVsAwayBowler(CSVParser csvParser) {
	        csvParser.forEach(record -> {
	            HomeVsAwayBowler homeVsAwayBowler = new HomeVsAwayBowler();
	            homeVsAwayBowler.setPId(Integer.parseInt(record.get("p_id")));
	            homeVsAwayBowler.setVenue(record.get("venue"));
	            homeVsAwayBowler.setInns(record.get("inns"));
	            homeVsAwayBowler.setOvers(record.get("overs"));
	            homeVsAwayBowler.setMdns(record.get("mdns"));
	            homeVsAwayBowler.setRuns(record.get("runs"));
	            homeVsAwayBowler.setWkts(record.get("wkts"));
	            homeVsAwayBowler.setAve(record.get("ave"));
	            homeVsAwayBowler.setEcon(record.get("econ"));
	            homeVsAwayBowler.setSr(record.get("sr"));
	            
	            homeVsAwayBowlerRepo.save(homeVsAwayBowler);
	        });
	    }

	    private void processYearlyStatsBowler(CSVParser csvParser) {
	        csvParser.forEach(record -> {
	            YearlyStatsBowler yearlyStatsBowler = new YearlyStatsBowler();
	            yearlyStatsBowler.setPId(Integer.parseInt(record.get("p_id")));
	            yearlyStatsBowler.setYear(record.get("year"));
	            yearlyStatsBowler.setInns(record.get("inns"));
	            yearlyStatsBowler.setOvers(record.get("overs"));
	            yearlyStatsBowler.setMdns(record.get("mdns"));
	            yearlyStatsBowler.setRuns(record.get("runs"));
	            yearlyStatsBowler.setWkts(record.get("wkts"));
	            yearlyStatsBowler.setAve(record.get("ave"));
	            yearlyStatsBowler.setEcon(record.get("econ"));
	            yearlyStatsBowler.setSr(record.get("sr"));
	            
	            yearlyStatsBowlerRepo.save(yearlyStatsBowler);
	        });
	    }
}
