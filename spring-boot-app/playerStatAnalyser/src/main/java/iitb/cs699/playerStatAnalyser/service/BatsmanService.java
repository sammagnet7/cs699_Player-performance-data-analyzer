/**
 * Service class for managing batsman-related statistics
 */
package iitb.cs699.playerStatAnalyser.service;

/**
 * Import necessary classes for the service
 */
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import iitb.cs699.playerStatAnalyser.entity.CareerAvgBatsman;
import iitb.cs699.playerStatAnalyser.entity.HomeVsAwayBatsman;
import iitb.cs699.playerStatAnalyser.entity.VsCountryBatsman;
import iitb.cs699.playerStatAnalyser.entity.YearlyStatsBatsman;
import iitb.cs699.playerStatAnalyser.repo.CareerAvgBatsmanRepository;
import iitb.cs699.playerStatAnalyser.repo.HomeVsAwayBatsmanRepository;
import iitb.cs699.playerStatAnalyser.repo.VsCountryBatsmanRepository;
import iitb.cs699.playerStatAnalyser.repo.YearlyStatsBatsmanRepository;

/**
 * Service class for managing batsman-related statistics
 */
@Service
public class BatsmanService {

	/**
	 * Autowired repository for Career Average Batsman statistics
	 */
	@Autowired
	private CareerAvgBatsmanRepository careerAvgBatsmanRepo;

	/**
	 * Autowired repository for Home vs Away Batsman statistics
	 */
	@Autowired
	private HomeVsAwayBatsmanRepository homeVsAwayBatsmanRepo;

	/**
	 * Autowired repository for Batsman vs Country statistics
	 */
	@Autowired
	private VsCountryBatsmanRepository vsCountryBatsmanRepo;

	/**
	 * Autowired repository for Yearly Stats Batsman
	 */
	@Autowired
	private YearlyStatsBatsmanRepository yearlyStatsBatsmanRepo;

	/**
	 * Retrieve all Career Average Batsman statistics
	 * 
	 * @return List of CareerAvgBatsman entities
	 */
	public List<CareerAvgBatsman> findAllCareerAvg() {
		return careerAvgBatsmanRepo.findAll();
	}

	/**
	 * Retrieve Career Average Batsman statistics by player ID
	 * 
	 * @param pid Player ID
	 * @return List of CareerAvgBatsman entities for the specified player ID
	 */
	public List<CareerAvgBatsman> findCareerAvgByPId(Integer pid) {
		return careerAvgBatsmanRepo.findBypId(pid);
	}

	/**
	 * Retrieve all Home vs Away Batsman statistics
	 * 
	 * @return List of HomeVsAwayBatsman entities
	 */
	public List<HomeVsAwayBatsman> findAllHomeVsAway() {
		return homeVsAwayBatsmanRepo.findAll();
	}

	/**
	 * Retrieve Home vs Away Batsman statistics by player ID
	 * 
	 * @param pid Player ID
	 * @return List of HomeVsAwayBatsman entities for the specified player ID
	 */
	public List<HomeVsAwayBatsman> findHomeVsAwayByPId(Integer pid) {
		return homeVsAwayBatsmanRepo.findBypId(pid);
	}

	/**
	 * Retrieve all Batsman vs Country statistics
	 * 
	 * @return List of VsCountryBatsman entities
	 */
	public List<VsCountryBatsman> findAllVsCountry() {
		return vsCountryBatsmanRepo.findAll();
	}

	/**
	 * Retrieve Batsman vs Country statistics by player ID
	 * 
	 * @param pid Player ID
	 * @return List of VsCountryBatsman entities for the specified player ID
	 */
	public List<VsCountryBatsman> findVsCountryByPId(Integer pid) {
		return vsCountryBatsmanRepo.findBypId(pid);
	}

	/**
	 * Retrieve all Yearly Stats Batsman
	 * 
	 * @return List of YearlyStatsBatsman entities
	 */
	public List<YearlyStatsBatsman> findAllYearlyStats() {
		return yearlyStatsBatsmanRepo.findAll();
	}

	/**
	 * Retrieve Yearly Stats Batsman by player ID
	 * 
	 * @param pid Player ID
	 * @return List of YearlyStatsBatsman entities for the specified player ID
	 */
	public List<YearlyStatsBatsman> findYearlyStatsByPId(Integer pid) {
		return yearlyStatsBatsmanRepo.findBypId(pid);
	}
}
