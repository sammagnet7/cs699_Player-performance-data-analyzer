/**
 * Service class for managing bowler-related statistics
 */
package iitb.cs699.playerStatAnalyser.service;

/**
 * Import necessary classes for the service
 */
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import iitb.cs699.playerStatAnalyser.entity.CareerAvgBowler;
import iitb.cs699.playerStatAnalyser.entity.HomeVsAwayBowler;
import iitb.cs699.playerStatAnalyser.entity.VsCountryBowler;
import iitb.cs699.playerStatAnalyser.entity.YearlyStatsBowler;
import iitb.cs699.playerStatAnalyser.repo.CareerAvgBowlerRepository;
import iitb.cs699.playerStatAnalyser.repo.HomeVsAwayBowlerRepository;
import iitb.cs699.playerStatAnalyser.repo.VsCountryBowlerRepository;
import iitb.cs699.playerStatAnalyser.repo.YearlyStatsBowlerRepository;

/**
 * Service class for managing bowler-related statistics
 */
@Service
public class BowlerService {

	/**
	 * Autowired repository for Career Average Bowler statistics
	 */
	@Autowired
	private CareerAvgBowlerRepository careerAvgBowlerRepo;

	/**
	 * Autowired repository for Home vs Away Bowler statistics
	 */
	@Autowired
	private HomeVsAwayBowlerRepository homeVsAwayBowlerRepo;

	/**
	 * Autowired repository for Bowler vs Country statistics
	 */
	@Autowired
	private VsCountryBowlerRepository vsCountryBowlerRepo;

	/**
	 * Autowired repository for Yearly Stats Bowler
	 */
	@Autowired
	private YearlyStatsBowlerRepository yearlyStatsBowlerRepo;

	/**
	 * Retrieve all Career Average Bowler statistics
	 * 
	 * @return List of CareerAvgBowler entities
	 */
	public List<CareerAvgBowler> findAllCareerAvg() {
		return careerAvgBowlerRepo.findAll();
	}

	/**
	 * Retrieve Career Average Bowler statistics by player ID
	 * 
	 * @param pid Player ID
	 * @return List of CareerAvgBowler entities for the specified player ID
	 */
	public List<CareerAvgBowler> findCareerAvgByPId(Integer pid) {
		return careerAvgBowlerRepo.findBypId(pid);
	}

	/**
	 * Retrieve all Home vs Away Bowler statistics
	 * 
	 * @return List of HomeVsAwayBowler entities
	 */
	public List<HomeVsAwayBowler> findAllHomeVsAway() {
		return homeVsAwayBowlerRepo.findAll();
	}

	/**
	 * Retrieve Home vs Away Bowler statistics by player ID
	 * 
	 * @param pid Player ID
	 * @return List of HomeVsAwayBowler entities for the specified player ID
	 */
	public List<HomeVsAwayBowler> findHomeVsAwayByPId(Integer pid) {
		return homeVsAwayBowlerRepo.findBypId(pid);
	}

	/**
	 * Retrieve all Bowler vs Country statistics
	 * 
	 * @return List of VsCountryBowler entities
	 */
	public List<VsCountryBowler> findAllVsCountry() {
		return vsCountryBowlerRepo.findAll();
	}

	/**
	 * Retrieve Bowler vs Country statistics by player ID
	 * 
	 * @param pid Player ID
	 * @return List of VsCountryBowler entities for the specified player ID
	 */
	public List<VsCountryBowler> findVsCountryByPId(Integer pid) {
		return vsCountryBowlerRepo.findBypId(pid);
	}

	/**
	 * Retrieve all Yearly Stats Bowler
	 * 
	 * @return List of YearlyStatsBowler entities
	 */
	public List<YearlyStatsBowler> findAllYearlyStats() {
		return yearlyStatsBowlerRepo.findAll();
	}

	/**
	 * Retrieve Yearly Stats Bowler by player ID
	 * 
	 * @param pid Player ID
	 * @return List of YearlyStatsBowler entities for the specified player ID
	 */
	public List<YearlyStatsBowler> findYearlyStatsByPId(Integer pid) {
		return yearlyStatsBowlerRepo.findBypId(pid);
	}
}
