/**
 * Service class for handling CSV file upload operations.
 */
package iitb.cs699.playerStatAnalyser.service;

/**
 * Import necessary classes for the service.
 */
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.ListIterator;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

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
import lombok.extern.slf4j.Slf4j;

/**
 * Service class for handling CSV file upload operations for player statistics.
 */
@Slf4j
@Service
public class CsvUploadService {

	/**
	 * Autowired repository for CareerAvgBatsman data.
	 */
	@Autowired
	private CareerAvgBatsmanRepository careerAvgBatsmanRepo;

	/**
	 * Autowired repository for HomeVsAwayBatsman data.
	 */
	@Autowired
	private HomeVsAwayBatsmanRepository homeVsAwayBatsmanRepo;

	/**
	 * Autowired repository for VsCountryBatsman data.
	 */
	@Autowired
	private VsCountryBatsmanRepository vsCountryBatsmanRepo;

	/**
	 * Autowired repository for YearlyStatsBatsman data.
	 */
	@Autowired
	private YearlyStatsBatsmanRepository yearlyStatsBatsmanRepo;

	/**
	 * Autowired repository for CareerAvgBowler data.
	 */
	@Autowired
	private CareerAvgBowlerRepository careerAvgBowlerRepo;

	/**
	 * Autowired repository for HomeVsAwayBowler data.
	 */
	@Autowired
	private HomeVsAwayBowlerRepository homeVsAwayBowlerRepo;

	/**
	 * Autowired repository for VsCountryBowler data.
	 */
	@Autowired
	private VsCountryBowlerRepository vsCountryBowlerRepo;

	/**
	 * Autowired repository for YearlyStatsBowler data.
	 */
	@Autowired
	private YearlyStatsBowlerRepository yearlyStatsBowlerRepo;

	/**
	 * Autowired repository for PlayerOverview data.
	 */
	@Autowired
	private PlayerOverviewRepository playerOverviewRepo;
	
	
	

	/**
	 * Method to upload a ZIP file containing CSV files and process each CSV file.
	 *
	 * @param zipFile The ZIP file containing CSV files.
	 * @throws IOException If an I/O error occurs.
	 */
	public void uploadCsvFiles(MultipartFile zipFile) throws IOException {

		try (ZipInputStream zipInputStream = new ZipInputStream(zipFile.getInputStream())) {
			
			
			// Create a list to store the entries
            List<ZipEntry> entries = new ArrayList<>();

            // Read all entries from the ZIP file
            ZipEntry tempEntry;
            while ((tempEntry = zipInputStream.getNextEntry()) != null) {
            	tempEntry.setComment(getTableName(tempEntry.getName()));
                entries.add(tempEntry);
            }

            // Sort the entries based on their names
            entries.sort(Comparator.comparing(ZipEntry::getComment));
            

			ZipEntry entry;
			ListIterator<ZipEntry> iterator = entries.listIterator();
			
			while ( iterator.hasNext() ) {
				
				entry = iterator.next();

				String originalFilename = entry.getName();
				if (originalFilename == null || originalFilename.isEmpty()) {
					continue;
				}
				String tableName = getTableName(originalFilename);

				// Read the CSV content into a byte array
				ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
				byte[] buffer = new byte[1024];
				int len;
				while ((len = zipInputStream.read(buffer)) > 0) {
					byteArrayOutputStream.write(buffer, 0, len);
				}

				// Create a new ByteArrayInputStream for each CSV entry
				try (InputStream csvInputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray())) {
					processIndividualCsvFile(csvInputStream, tableName);
				}

			}
		}
	}

	/**
	 * Method to process an individual CSV file based on its table name.
	 *
	 * @param csvInputStream The input stream for the CSV file.
	 * @param tableName      The name of the table for the CSV file.
	 * @throws IOException If an I/O error occurs.
	 */
	public void processIndividualCsvFile(InputStream csvInputStream, String tableName) throws IOException {

		try (CSVParser csvParser = CSVParser.parse(new InputStreamReader(csvInputStream),
				CSVFormat.DEFAULT.withHeader())) {

			if (csvParser.iterator().hasNext()) {

				switch (tableName) {
				case "1_player_overview":
					processPlayerOverview(csvParser);
					break;
				case "2_career_avg_batsman":
					processCareerAvgBatsman(csvParser);
					break;
				case "3_vs_country_batsman":
					processVsCountryBatsman(csvParser);
					break;
				case "4_home_vs_away_batsman":
					processHomeVsAwayBatsman(csvParser);
					break;
				case "5_yearly_stats_batsman":
					processYearlyStatsBatsman(csvParser);
					break;
				case "6_career_avg_bowler":
					processCareerAvgBowler(csvParser);
					break;
				case "7_vs_country_bowler":
					processVsCountryBowler(csvParser);
					break;
				case "8_home_vs_away_bowler":
					processHomeVsAwayBowler(csvParser);
					break;
				case "9_yearly_stats_bowler":
					processYearlyStatsBowler(csvParser);
					break;
				default:
					throw new IllegalArgumentException("Unknown table name: " + tableName);
				}

			} else {
				// Handle empty file
				log.debug("Empty file: " + tableName);
			}
		}

	}

	/**
	 * Method to extract the table name from the file name.
	 *
	 * @param fileName The name of the CSV file.
	 * @return The table name.
	 */
	private String getTableName(String fileName) {
				
		String[] tokens= fileName.split(".csv")[0].toLowerCase().split("/");
		return tokens[ tokens.length - 1];
	}

	/**
	 * Method to process CSV data and save it to the PlayerOverview repository.
	 *
	 * @param csvParser The CSVParser containing the data.
	 */
	private void processPlayerOverview(CSVParser csvParser) {

		playerOverviewRepo.deleteAll();

		csvParser.forEach(record -> {
			PlayerOverview playerOverview = new PlayerOverview();
			playerOverview.setRowId( Integer.parseInt(record.get("row_id")) );
			playerOverview.setPId(Integer.parseInt(record.get("p_id")));
			playerOverview.setFullName(record.get("full_name"));
			playerOverview.setBorn(record.get("born"));
			playerOverview.setAge(record.get("age"));
			playerOverview.setBattingStyle(record.get("batting_style"));
			playerOverview.setBowlingStyle(record.get("bowling_tyle")); // Typo in your table definition, correct here
			playerOverview.setPlayingRole(record.get("playing_role"));
			playerOverview.setRoll_id(record.get("roll_id"));
			playerOverview.setPhotoLink(record.get("photo_link"));

			playerOverviewRepo.save(playerOverview);
		});
	}

	/**
	 * Method to process CSV data and save it to the CareerAvgBatsman repository.
	 *
	 * @param csvParser The CSVParser containing the data.
	 */
	private void processCareerAvgBatsman(CSVParser csvParser) {

		careerAvgBatsmanRepo.deleteAll();
		csvParser.forEach(record -> {
			CareerAvgBatsman careerAvgBatsman = new CareerAvgBatsman();
			careerAvgBatsman.setRowId( Integer.parseInt(record.get("row_id")) );
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

	/**
	 * Method to process CSV data and save it to the VsCountryBatsman repository.
	 *
	 * @param csvParser The CSVParser containing the data.
	 */
	private void processVsCountryBatsman(CSVParser csvParser) {

		vsCountryBatsmanRepo.deleteAll();
		
		csvParser.forEach(record -> {
			VsCountryBatsman vsCountryBatsman = new VsCountryBatsman();
			vsCountryBatsman.setRowId( Integer.parseInt(record.get("row_id")) );
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

	/**
	 * Method to process CSV data and save it to the HomeVsAwayBatsman repository.
	 *
	 * @param csvParser The CSVParser containing the data.
	 */
	private void processHomeVsAwayBatsman(CSVParser csvParser) {

		homeVsAwayBatsmanRepo.deleteAll();
		csvParser.forEach(record -> {
			HomeVsAwayBatsman homeVsAwayBatsman = new HomeVsAwayBatsman();
			homeVsAwayBatsman.setRowId( Integer.parseInt(record.get("row_id")) );
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

	/**
	 * Method to process CSV data and save it to the YearlyStatsBatsman repository.
	 *
	 * @param csvParser The CSVParser containing the data.
	 */
	private void processYearlyStatsBatsman(CSVParser csvParser) {

		yearlyStatsBatsmanRepo.deleteAll();
		csvParser.forEach(record -> {
			YearlyStatsBatsman yearlyStatsBatsman = new YearlyStatsBatsman();
			yearlyStatsBatsman.setRowId( Integer.parseInt(record.get("row_id")) );
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

	/**
	 * Method to process CSV data and save it to the CareerAvgBowler repository.
	 *
	 * @param csvParser The CSVParser containing the data.
	 */
	private void processCareerAvgBowler(CSVParser csvParser) {

		careerAvgBowlerRepo.deleteAll();
		csvParser.forEach(record -> {
			CareerAvgBowler careerAvgBowler = new CareerAvgBowler();
			careerAvgBowler.setRowId( Integer.parseInt(record.get("row_id")) );
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

	/**
	 * Process and save VsCountryBowler data from CSVParser.
	 * 
	 * @param csvParser The CSVParser object containing VsCountryBowler data.
	 */
	private void processVsCountryBowler(CSVParser csvParser) {
		vsCountryBowlerRepo.deleteAll();
		csvParser.forEach(record -> {
			VsCountryBowler vsCountryBowler = new VsCountryBowler();
			vsCountryBowler.setRowId( Integer.parseInt(record.get("row_id")) );
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

	/**
	 * Process and save HomeVsAwayBowler data from CSVParser.
	 * 
	 * @param csvParser The CSVParser object containing HomeVsAwayBowler data.
	 */
	private void processHomeVsAwayBowler(CSVParser csvParser) {
		homeVsAwayBowlerRepo.deleteAll();
		csvParser.forEach(record -> {
			HomeVsAwayBowler homeVsAwayBowler = new HomeVsAwayBowler();
			homeVsAwayBowler.setRowId( Integer.parseInt(record.get("row_id")) );
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

	/**
	 * Process and save YearlyStatsBowler data from CSVParser.
	 * 
	 * @param csvParser The CSVParser object containing YearlyStatsBowler data.
	 */
	private void processYearlyStatsBowler(CSVParser csvParser) {
		yearlyStatsBowlerRepo.deleteAll();
		csvParser.forEach(record -> {
			YearlyStatsBowler yearlyStatsBowler = new YearlyStatsBowler();
			yearlyStatsBowler.setRowId( Integer.parseInt(record.get("row_id")) );
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
