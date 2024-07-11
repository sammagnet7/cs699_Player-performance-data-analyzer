/**
 * Service class for handling CSV file download operations.
 */
package iitb.cs699.playerStatAnalyser.service;

/**
 * Import necessary classes for the service.
 */
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

/**
 * Service class for handling CSV file download operations.
 */
@SuppressWarnings({ "resource", "deprecation" })
@Service
public class CsvDownloadService {

	/**
	 * Autowired repository for PlayerOverview.
	 */
	@Autowired
	private PlayerOverviewRepository playerOverviewRepo;

	/**
	 * Autowired repository for CareerAvgBatsman.
	 */
	@Autowired
	private CareerAvgBatsmanRepository careerAvgBatsmanRepo;

	/**
	 * Autowired repository for HomeVsAwayBatsman.
	 */
	@Autowired
	private HomeVsAwayBatsmanRepository homeVsAwayBatsmanRepo;

	/**
	 * Autowired repository for VsCountryBatsman.
	 */
	@Autowired
	private VsCountryBatsmanRepository vsCountryBatsmanRepo;

	/**
	 * Autowired repository for YearlyStatsBatsman.
	 */
	@Autowired
	private YearlyStatsBatsmanRepository yearlyStatsBatsmanRepo;

	/**
	 * Autowired repository for CareerAvgBowler.
	 */
	@Autowired
	private CareerAvgBowlerRepository careerAvgBowlerRepo;

	/**
	 * Autowired repository for HomeVsAwayBowler.
	 */
	@Autowired
	private HomeVsAwayBowlerRepository homeVsAwayBowlerRepo;

	/**
	 * Autowired repository for VsCountryBowler.
	 */
	@Autowired
	private VsCountryBowlerRepository vsCountryBowlerRepo;

	/**
	 * Autowired repository for YearlyStatsBowler.
	 */
	@Autowired
	private YearlyStatsBowlerRepository yearlyStatsBowlerRepo;

	/**
	 * Method to download CSV files as a ZIP archive.
	 * 
	 * @return List of byte arrays representing the ZIP archive.
	 * @throws IOException If an I/O error occurs.
	 */
	public List<byte[]> downloadCsvFiles() throws IOException {

		ByteArrayOutputStream zipOutputStream = new ByteArrayOutputStream();

		try (ZipOutputStream zipFile = new ZipOutputStream(zipOutputStream)) {

			addCsvToZip(zipFile, "1_player_overview", getPlayerOverviewCsv());
			addCsvToZip(zipFile, "2_career_avg_batsman", getCareerAvgBatsmanCsv());
			addCsvToZip(zipFile, "3_vs_country_batsman", getVsCountryBatsmanCsv());
			addCsvToZip(zipFile, "4_home_vs_away_batsman", getHomeVsAwayBatsmanCsv());
			addCsvToZip(zipFile, "5_yearly_stats_batsman", getYearlyStatsBatsmanCsv());
			addCsvToZip(zipFile, "6_career_avg_bowler", getCareerAvgBowlerCsv());
			addCsvToZip(zipFile, "7_vs_country_bowler", getVsCountryBowlerCsv());
			addCsvToZip(zipFile, "8_home_vs_away_bowler", getHomeVsAwayBowlerCsv());
			addCsvToZip(zipFile, "9_yearly_stats_bowler", getYearlyStatsBowlerCsv());
		}

		List<byte[]> result = Collections.singletonList(zipOutputStream.toByteArray());

		return result;
	}

	/**
	 * Method to add a CSV file to a ZIP archive.
	 * 
	 * @param zipFile   ZipOutputStream for the ZIP archive.
	 * @param tableName Name of the table for the CSV file.
	 * @param csvData   Data for the CSV file as a string.
	 * @throws IOException If an I/O error occurs.
	 */
	private void addCsvToZip(ZipOutputStream zipFile, String tableName, String csvData) throws IOException {

		ZipEntry entry = new ZipEntry(tableName + ".csv");
		zipFile.putNextEntry(entry);
		zipFile.write(csvData.getBytes(StandardCharsets.UTF_8));
		zipFile.closeEntry();
	}

	/**
	 * Method to get CSV data for the PlayerOverview table.
	 * 
	 * @return CSV data as a string.
	 * @throws IOException If an I/O error occurs.
	 */
	private String getPlayerOverviewCsv() throws IOException {

		List<PlayerOverview> playerOverviewList = playerOverviewRepo.findAll();
		StringWriter writer = new StringWriter();
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("row_id", "p_id", "full_name",
				"born", "age", "batting_style", "bowling_tyle", "playing_role", "roll_id", "photo_link"));

		for (PlayerOverview playerOverview : playerOverviewList) {
			csvPrinter.printRecord(playerOverview.getRowId(), playerOverview.getPId(), playerOverview.getFullName(),
					playerOverview.getBorn(), playerOverview.getAge(), playerOverview.getBattingStyle(),
					playerOverview.getBowlingStyle(), playerOverview.getPlayingRole(), playerOverview.getRoll_id(),
					playerOverview.getPhotoLink());
		}

		csvPrinter.flush();
		return writer.toString();
	}

	/**
	 * Method to get CSV data for the CareerAvgBatsman table.
	 * 
	 * @return CSV data as a string.
	 * @throws IOException If an I/O error occurs.
	 */
	private String getCareerAvgBatsmanCsv() throws IOException {

		List<CareerAvgBatsman> careerAvgBatsmanList = careerAvgBatsmanRepo.findAll();
		StringWriter writer = new StringWriter();
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("row_id", "p_id", "span", "inns",
				"runs", "hs", "ave", "sr", "100", "50", "0", "4s", "6s"));

		for (CareerAvgBatsman careerAvgBatsman : careerAvgBatsmanList) {
			csvPrinter.printRecord(careerAvgBatsman.getRowId(), careerAvgBatsman.getPId(), careerAvgBatsman.getSpan(),
					careerAvgBatsman.getInns(), careerAvgBatsman.getRuns(), careerAvgBatsman.getHs(),
					careerAvgBatsman.getAve(), careerAvgBatsman.getSr(), careerAvgBatsman.get_100s(),
					careerAvgBatsman.get_50s(), careerAvgBatsman.get_0s(), careerAvgBatsman.get_4s(),
					careerAvgBatsman.get_6s());
		}

		csvPrinter.flush();
		return writer.toString();
	}

	/**
	 * Method to get CSV data for the VsCountryBatsman table.
	 * 
	 * @return CSV data as a string.
	 * @throws IOException If an I/O error occurs.
	 */
	private String getVsCountryBatsmanCsv() throws IOException {

		List<VsCountryBatsman> vsCountryBatsmanList = vsCountryBatsmanRepo.findAll();
		StringWriter writer = new StringWriter();
		CSVPrinter csvPrinter = new CSVPrinter(writer,
				CSVFormat.DEFAULT.withHeader("row_id", "p_id", "country", "inns", "runs", "hs", "ave", "sr"));

		for (VsCountryBatsman vsCountryBatsman : vsCountryBatsmanList) {
			csvPrinter.printRecord(vsCountryBatsman.getRowId(), vsCountryBatsman.getPId(),
					vsCountryBatsman.getCountry(), vsCountryBatsman.getInns(), vsCountryBatsman.getRuns(),
					vsCountryBatsman.getHs(), vsCountryBatsman.getAve(), vsCountryBatsman.getSr());
		}

		csvPrinter.flush();
		return writer.toString();
	}

	/**
	 * Method to get CSV data for the HomeVsAwayBatsman table.
	 * 
	 * @return CSV data as a string.
	 * @throws IOException If an I/O error occurs.
	 */
	private String getHomeVsAwayBatsmanCsv() throws IOException {

		List<HomeVsAwayBatsman> homeVsAwayBatsmanList = homeVsAwayBatsmanRepo.findAll();
		StringWriter writer = new StringWriter();
		CSVPrinter csvPrinter = new CSVPrinter(writer,
				CSVFormat.DEFAULT.withHeader("row_id", "p_id", "venue", "inns", "runs", "hs", "ave", "sr"));

		for (HomeVsAwayBatsman homeVsAwayBatsman : homeVsAwayBatsmanList) {
			csvPrinter.printRecord(homeVsAwayBatsman.getRowId(), homeVsAwayBatsman.getPId(),
					homeVsAwayBatsman.getVenue(), homeVsAwayBatsman.getInns(), homeVsAwayBatsman.getRuns(),
					homeVsAwayBatsman.getHs(), homeVsAwayBatsman.getAve(), homeVsAwayBatsman.getSr());
		}

		csvPrinter.flush();
		return writer.toString();
	}

	/**
	 * Method to get CSV data for the YearlyStatsBatsman table.
	 * 
	 * @return CSV data as a string.
	 * @throws IOException If an I/O error occurs.
	 */
	private String getYearlyStatsBatsmanCsv() throws IOException {

		List<YearlyStatsBatsman> yearlyStatsBatsmanList = yearlyStatsBatsmanRepo.findAll();
		StringWriter writer = new StringWriter();
		CSVPrinter csvPrinter = new CSVPrinter(writer,
				CSVFormat.DEFAULT.withHeader("row_id", "p_id", "year", "inns", "runs", "hs", "ave", "sr"));

		for (YearlyStatsBatsman yearlyStatsBatsman : yearlyStatsBatsmanList) {
			csvPrinter.printRecord(yearlyStatsBatsman.getRowId(), yearlyStatsBatsman.getPId(),
					yearlyStatsBatsman.getYear(), yearlyStatsBatsman.getInns(), yearlyStatsBatsman.getRuns(),
					yearlyStatsBatsman.getHs(), yearlyStatsBatsman.getAve(), yearlyStatsBatsman.getSr());
		}

		csvPrinter.flush();
		return writer.toString();
	}

	/**
	 * Method to get CareerAvgBowler CSV data.
	 * 
	 * @return String representation of CSV data for CareerAvgBowler.
	 * @throws IOException If an I/O error occurs.
	 */
	public String getCareerAvgBowlerCsv() throws IOException {
		List<CareerAvgBowler> careerAvgBowlerList = careerAvgBowlerRepo.findAll();
		StringWriter writer = new StringWriter();
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("row_id", "p_id", "span", "inns",
				"overs", "mdns", "runs", "wkts", "ave", "econ", "sr", "caught", "bowled", "leg_before_wicket"));

		for (CareerAvgBowler careerAvgBowler : careerAvgBowlerList) {
			csvPrinter.printRecord(careerAvgBowler.getRowId(), careerAvgBowler.getPId(), careerAvgBowler.getSpan(),
					careerAvgBowler.getInns(), careerAvgBowler.getOvers(), careerAvgBowler.getMdns(),
					careerAvgBowler.getRuns(), careerAvgBowler.getWkts(), careerAvgBowler.getAve(),
					careerAvgBowler.getEcon(), careerAvgBowler.getSr(), careerAvgBowler.getCaught(),
					careerAvgBowler.getBowled(), careerAvgBowler.getLbw());
		}

		csvPrinter.flush();
		return writer.toString();
	}

	/**
	 * Method to get VsCountryBowler CSV data.
	 * 
	 * @return String representation of CSV data for VsCountryBowler.
	 * @throws IOException If an I/O error occurs.
	 */
	public String getVsCountryBowlerCsv() throws IOException {
		List<VsCountryBowler> vsCountryBowlerList = vsCountryBowlerRepo.findAll();
		StringWriter writer = new StringWriter();
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("row_id", "p_id", "country", "inns",
				"overs", "mdns", "runs", "wkts", "ave", "econ", "sr"));

		for (VsCountryBowler vsCountryBowler : vsCountryBowlerList) {
			csvPrinter.printRecord(vsCountryBowler.getRowId(), vsCountryBowler.getPId(), vsCountryBowler.getCountry(),
					vsCountryBowler.getInns(), vsCountryBowler.getOvers(), vsCountryBowler.getMdns(),
					vsCountryBowler.getRuns(), vsCountryBowler.getWkts(), vsCountryBowler.getAve(),
					vsCountryBowler.getEcon(), vsCountryBowler.getSr());
		}

		csvPrinter.flush();
		return writer.toString();
	}

	/**
	 * Method to get HomeVsAwayBowler CSV data.
	 * 
	 * @return String representation of CSV data for HomeVsAwayBowler.
	 * @throws IOException If an I/O error occurs.
	 */
	public String getHomeVsAwayBowlerCsv() throws IOException {
		List<HomeVsAwayBowler> homeVsAwayBowlerList = homeVsAwayBowlerRepo.findAll();
		StringWriter writer = new StringWriter();
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("row_id", "p_id", "venue", "inns",
				"overs", "mdns", "runs", "wkts", "ave", "econ", "sr"));

		for (HomeVsAwayBowler homeVsAwayBowler : homeVsAwayBowlerList) {
			csvPrinter.printRecord(homeVsAwayBowler.getRowId(), homeVsAwayBowler.getPId(), homeVsAwayBowler.getVenue(),
					homeVsAwayBowler.getInns(), homeVsAwayBowler.getOvers(), homeVsAwayBowler.getMdns(),
					homeVsAwayBowler.getRuns(), homeVsAwayBowler.getWkts(), homeVsAwayBowler.getAve(),
					homeVsAwayBowler.getEcon(), homeVsAwayBowler.getSr());
		}

		csvPrinter.flush();
		return writer.toString();
	}

	/**
	 * Method to get YearlyStatsBowler CSV data.
	 * 
	 * @return String representation of CSV data for YearlyStatsBowler.
	 * @throws IOException If an I/O error occurs.
	 */
	public String getYearlyStatsBowlerCsv() throws IOException {
		List<YearlyStatsBowler> yearlyStatsBowlerList = yearlyStatsBowlerRepo.findAll();
		StringWriter writer = new StringWriter();
		CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("row_id", "p_id", "year", "inns",
				"overs", "mdns", "runs", "wkts", "ave", "econ", "sr"));

		for (YearlyStatsBowler yearlyStatsBowler : yearlyStatsBowlerList) {
			csvPrinter.printRecord(yearlyStatsBowler.getRowId(), yearlyStatsBowler.getPId(),
					yearlyStatsBowler.getYear(), yearlyStatsBowler.getInns(), yearlyStatsBowler.getOvers(),
					yearlyStatsBowler.getMdns(), yearlyStatsBowler.getRuns(), yearlyStatsBowler.getWkts(),
					yearlyStatsBowler.getAve(), yearlyStatsBowler.getEcon(), yearlyStatsBowler.getSr());
		}

		csvPrinter.flush();
		return writer.toString();
	}

}
