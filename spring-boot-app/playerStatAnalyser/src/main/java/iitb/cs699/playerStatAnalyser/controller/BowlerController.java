/**
 * Controller class for handling requests related to bowler statistics
 */
package iitb.cs699.playerStatAnalyser.controller;

/**
 * Import necessary classes for the controller
 */
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import iitb.cs699.playerStatAnalyser.entity.CareerAvgBowler;
import iitb.cs699.playerStatAnalyser.entity.HomeVsAwayBowler;
import iitb.cs699.playerStatAnalyser.entity.VsCountryBowler;
import iitb.cs699.playerStatAnalyser.entity.YearlyStatsBowler;
import iitb.cs699.playerStatAnalyser.service.BowlerService;

/**
 * RestController class for managing bowler-related statistics requests
 */
@RestController
@RequestMapping("/bowler")
public class BowlerController {
	
	/**
	 * Autowired service for managing bowler-related statistics
	 */
	@Autowired
	private BowlerService bowlerService;

	/**
	 * Endpoint to retrieve all Career Average Bowler statistics
	 * @return List of CareerAvgBowler entities
	 */
	@GetMapping(path = "/careeravg")
    public List<CareerAvgBowler> findAllCareerAvg() {
        return bowlerService.findAllCareerAvg();
    }
	
	/**
	 * Endpoint to retrieve Career Average Bowler statistics by player ID
	 * @param pid Player ID
	 * @return List of CareerAvgBowler entities for the specified player ID
	 */
	@GetMapping(path = "/careeravg/{pid}")
    public List<CareerAvgBowler> findCareerAvgByPId(@PathVariable Integer pid) {
        return bowlerService.findCareerAvgByPId(pid);
    }
	
	/**
	 * Endpoint to retrieve all Home vs Away Bowler statistics
	 * @return List of HomeVsAwayBowler entities
	 */
	@GetMapping(path = "/homevsaway")
    public List<HomeVsAwayBowler> findAllHomeVsAway() {
        return bowlerService.findAllHomeVsAway();
    }
	
	/**
	 * Endpoint to retrieve Home vs Away Bowler statistics by player ID
	 * @param pid Player ID
	 * @return List of HomeVsAwayBowler entities for the specified player ID
	 */
	@GetMapping(path = "/homevsaway/{pid}")
    public List<HomeVsAwayBowler> findHomeVsAwayByPId(@PathVariable Integer pid) {
        return bowlerService.findHomeVsAwayByPId(pid);
    }
	
	/**
	 * Endpoint to retrieve all Bowler vs Country statistics
	 * @return List of VsCountryBowler entities
	 */
	@GetMapping(path = "/vscountry")
    public List<VsCountryBowler> findAllVsCountry() {
        return bowlerService.findAllVsCountry();
    }
	
	/**
	 * Endpoint to retrieve Bowler vs Country statistics by player ID
	 * @param pid Player ID
	 * @return List of VsCountryBowler entities for the specified player ID
	 */
	@GetMapping(path = "/vscountry/{pid}")
    public List<VsCountryBowler> findVsCountryByPId(@PathVariable Integer pid) {
        return bowlerService.findVsCountryByPId(pid);
    }
	
	/**
	 * Endpoint to retrieve all Yearly Stats Bowler
	 * @return List of YearlyStatsBowler entities
	 */
	@GetMapping(path = "/yearlystats")
    public List<YearlyStatsBowler> findAllYearlyStats() {
        return bowlerService.findAllYearlyStats();
    }
	
	/**
	 * Endpoint to retrieve Yearly Stats Bowler by player ID
	 * @param pid Player ID
	 * @return List of YearlyStatsBowler entities for the specified player ID
	 */
	@GetMapping(path = "/yearlystats/{pid}")
    public List<YearlyStatsBowler> findYearlyStatsByPId(@PathVariable Integer pid) {
        return bowlerService.findYearlyStatsByPId(pid);
    }
}
