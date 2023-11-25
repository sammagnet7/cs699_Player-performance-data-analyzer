package iitb.cs699.playerStatAnalyser.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

@SuppressWarnings({ "resource", "deprecation" })
@Service
public class CsvDownloadService {
	
	@Autowired
	private PlayerOverviewRepository playerOverviewRepo;

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

	

	
	public List<byte[]> downloadCsvFiles() throws IOException {
		
        ByteArrayOutputStream zipOutputStream = new ByteArrayOutputStream();

        try (ZipOutputStream zipFile = new ZipOutputStream(zipOutputStream)) {
        	
            addCsvToZip(zipFile, "player_overview", getPlayerOverviewCsv());
            addCsvToZip(zipFile, "career_avg_batsman", getCareerAvgBatsmanCsv());
            addCsvToZip(zipFile, "vs_country_batsman", getVsCountryBatsmanCsv());
            addCsvToZip(zipFile, "home_vs_away_batsman", getHomeVsAwayBatsmanCsv());
            addCsvToZip(zipFile, "yearly_stats_batsman", getYearlyStatsBatsmanCsv());
            addCsvToZip(zipFile, "career_avg_bowler", getCareerAvgBowlerCsv());
            addCsvToZip(zipFile, "vs_country_bowler", getVsCountryBowlerCsv());
            addCsvToZip(zipFile, "home_vs_away_bowler", getHomeVsAwayBowlerCsv());
            addCsvToZip(zipFile, "yearly_stats_bowler", getYearlyStatsBowlerCsv());
        }

        List<byte[]> result = Collections.singletonList(zipOutputStream.toByteArray());
        
        return result;
    }

    private void addCsvToZip(ZipOutputStream zipFile, String tableName, String csvData) throws IOException {
    	
        ZipEntry entry = new ZipEntry(tableName + ".csv");
        zipFile.putNextEntry(entry);
        zipFile.write(csvData.getBytes(StandardCharsets.UTF_8));
        zipFile.closeEntry();
    }

    private String getPlayerOverviewCsv() throws IOException {
    	
        List<PlayerOverview> playerOverviewList = playerOverviewRepo.findAll();
        StringWriter writer = new StringWriter();
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                .withHeader("row_id", "p_id", "full_name", "born", "age", "batting_style", "bowling_tyle",
                        "playing_role", "roll_id", "photo_link"));

        for (PlayerOverview playerOverview : playerOverviewList) {
            csvPrinter.printRecord(
                    playerOverview.getRow_id(),
                    playerOverview.getPId(),
                    playerOverview.getFullName(),
                    playerOverview.getBorn(),
                    playerOverview.getAge(),
                    playerOverview.getBattingStyle(),
                    playerOverview.getBowlingStyle(),
                    playerOverview.getPlayingRole(),
                    playerOverview.getRoll_id(),
                    playerOverview.getPhotoLink()
            );
        }

        csvPrinter.flush();
        return writer.toString();
    }
    
    private String getCareerAvgBatsmanCsv() throws IOException {
        List<CareerAvgBatsman> careerAvgBatsmanList = careerAvgBatsmanRepo.findAll();
        StringWriter writer = new StringWriter();
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                .withHeader("row_id", "p_id", "span", "inns", "runs", "hs", "ave", "sr", "100", "50", "0", "4s", "6s"));

        for (CareerAvgBatsman careerAvgBatsman : careerAvgBatsmanList) {
            csvPrinter.printRecord(
                    careerAvgBatsman.getRow_id(),
                    careerAvgBatsman.getPId(),
                    careerAvgBatsman.getSpan(),
                    careerAvgBatsman.getInns(),
                    careerAvgBatsman.getRuns(),
                    careerAvgBatsman.getHs(),
                    careerAvgBatsman.getAve(),
                    careerAvgBatsman.getSr(),
                    careerAvgBatsman.get_100s(),
                    careerAvgBatsman.get_50s(),
                    careerAvgBatsman.get_0s(),
                    careerAvgBatsman.get_4s(),
                    careerAvgBatsman.get_6s()
            );
        }

        csvPrinter.flush();
        return writer.toString();
    }
    
    private String getVsCountryBatsmanCsv() throws IOException {
        List<VsCountryBatsman> vsCountryBatsmanList = vsCountryBatsmanRepo.findAll();
        StringWriter writer = new StringWriter();
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                .withHeader("row_id", "p_id", "country", "inns", "runs", "hs", "ave", "sr"));

        for (VsCountryBatsman vsCountryBatsman : vsCountryBatsmanList) {
            csvPrinter.printRecord(
                    vsCountryBatsman.getRow_id(),
                    vsCountryBatsman.getPId(),
                    vsCountryBatsman.getCountry(),
                    vsCountryBatsman.getInns(),
                    vsCountryBatsman.getRuns(),
                    vsCountryBatsman.getHs(),
                    vsCountryBatsman.getAve(),
                    vsCountryBatsman.getSr()
            );
        }

        csvPrinter.flush();
        return writer.toString();
    }

    private String getHomeVsAwayBatsmanCsv() throws IOException {
        List<HomeVsAwayBatsman> homeVsAwayBatsmanList = homeVsAwayBatsmanRepo.findAll();
        StringWriter writer = new StringWriter();
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                .withHeader("row_id", "p_id", "venue", "inns", "runs", "hs", "ave", "sr"));

        for (HomeVsAwayBatsman homeVsAwayBatsman : homeVsAwayBatsmanList) {
            csvPrinter.printRecord(
                    homeVsAwayBatsman.getRow_id(),
                    homeVsAwayBatsman.getPId(),
                    homeVsAwayBatsman.getVenue(),
                    homeVsAwayBatsman.getInns(),
                    homeVsAwayBatsman.getRuns(),
                    homeVsAwayBatsman.getHs(),
                    homeVsAwayBatsman.getAve(),
                    homeVsAwayBatsman.getSr()
            );
        }

        csvPrinter.flush();
        return writer.toString();
    }

    private String getYearlyStatsBatsmanCsv() throws IOException {
        List<YearlyStatsBatsman> yearlyStatsBatsmanList = yearlyStatsBatsmanRepo.findAll();
        StringWriter writer = new StringWriter();
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                .withHeader("row_id", "p_id", "year", "inns", "runs", "hs", "ave", "sr"));

        for (YearlyStatsBatsman yearlyStatsBatsman : yearlyStatsBatsmanList) {
            csvPrinter.printRecord(
                    yearlyStatsBatsman.getRow_id(),
                    yearlyStatsBatsman.getPId(),
                    yearlyStatsBatsman.getYear(),
                    yearlyStatsBatsman.getInns(),
                    yearlyStatsBatsman.getRuns(),
                    yearlyStatsBatsman.getHs(),
                    yearlyStatsBatsman.getAve(),
                    yearlyStatsBatsman.getSr()
            );
        }

        csvPrinter.flush();
        return writer.toString();
    }

    private String getCareerAvgBowlerCsv() throws IOException {
        List<CareerAvgBowler> careerAvgBowlerList = careerAvgBowlerRepo.findAll();
        StringWriter writer = new StringWriter();
        CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                .withHeader("row_id", "p_id", "span", "inns", "overs", "mdns", "runs", "wkts", "ave", "econ", "sr",
                        "caught", "bowled", "leg_before_wicket"));

        for (CareerAvgBowler careerAvgBowler : careerAvgBowlerList) {
            csvPrinter.printRecord(
                    careerAvgBowler.getRow_id(),
                    careerAvgBowler.getPId(),
                    careerAvgBowler.getSpan(),
                    careerAvgBowler.getInns(),
                    careerAvgBowler.getOvers(),
                    careerAvgBowler.getMdns(),
                    careerAvgBowler.getRuns(),
                    careerAvgBowler.getWkts(),
                    careerAvgBowler.getAve(),
                    careerAvgBowler.getEcon(),
                    careerAvgBowler.getSr(),
                    careerAvgBowler.getCaught(),
                    careerAvgBowler.getBowled(),
                    careerAvgBowler.getLbw()
            );
        }

        csvPrinter.flush();
        return writer.toString();
    }

    private String getVsCountryBowlerCsv() throws IOException {
        List<VsCountryBowler> vsCountryBowlerList = vsCountryBowlerRepo.findAll();
        StringWriter writer = new StringWriter();
        CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                .withHeader("row_id", "p_id", "country", "inns", "overs", "mdns", "runs", "wkts", "ave", "econ", "sr"));

        for (VsCountryBowler vsCountryBowler : vsCountryBowlerList) {
            csvPrinter.printRecord(
                    vsCountryBowler.getRow_id(),
                    vsCountryBowler.getPId(),
                    vsCountryBowler.getCountry(),
                    vsCountryBowler.getInns(),
                    vsCountryBowler.getOvers(),
                    vsCountryBowler.getMdns(),
                    vsCountryBowler.getRuns(),
                    vsCountryBowler.getWkts(),
                    vsCountryBowler.getAve(),
                    vsCountryBowler.getEcon(),
                    vsCountryBowler.getSr()
            );
        }

        csvPrinter.flush();
        return writer.toString();
    }

    private String getHomeVsAwayBowlerCsv() throws IOException {
        List<HomeVsAwayBowler> homeVsAwayBowlerList = homeVsAwayBowlerRepo.findAll();
        StringWriter writer = new StringWriter();
        CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                .withHeader("row_id", "p_id", "venue", "inns", "overs", "mdns", "runs", "wkts", "ave", "econ", "sr"));

        for (HomeVsAwayBowler homeVsAwayBowler : homeVsAwayBowlerList) {
            csvPrinter.printRecord(
                    homeVsAwayBowler.getRow_id(),
                    homeVsAwayBowler.getPId(),
                    homeVsAwayBowler.getVenue(),
                    homeVsAwayBowler.getInns(),
                    homeVsAwayBowler.getOvers(),
                    homeVsAwayBowler.getMdns(),
                    homeVsAwayBowler.getRuns(),
                    homeVsAwayBowler.getWkts(),
                    homeVsAwayBowler.getAve(),
                    homeVsAwayBowler.getEcon(),
                    homeVsAwayBowler.getSr()
            );
        }

        csvPrinter.flush();
        return writer.toString();
    }

    private String getYearlyStatsBowlerCsv() throws IOException {
    	
        List<YearlyStatsBowler> yearlyStatsBowlerList = yearlyStatsBowlerRepo.findAll();
        StringWriter writer = new StringWriter();
        CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                .withHeader("row_id", "p_id", "year", "inns", "overs", "mdns", "runs", "wkts", "ave", "econ", "sr"));

        for (YearlyStatsBowler yearlyStatsBowler : yearlyStatsBowlerList) {
            csvPrinter.printRecord(
                    yearlyStatsBowler.getRow_id(),
                    yearlyStatsBowler.getPId(),
                    yearlyStatsBowler.getYear(),
                    yearlyStatsBowler.getInns(),
                    yearlyStatsBowler.getOvers(),
                    yearlyStatsBowler.getMdns(),
                    yearlyStatsBowler.getRuns(),
                    yearlyStatsBowler.getWkts(),
                    yearlyStatsBowler.getAve(),
                    yearlyStatsBowler.getEcon(),
                    yearlyStatsBowler.getSr()
            );
        }

        csvPrinter.flush();
        return writer.toString();
    }
    
    
    
    

}
