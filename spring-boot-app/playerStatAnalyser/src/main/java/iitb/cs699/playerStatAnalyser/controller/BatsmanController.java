/**
 * Controller class for handling requests related to batsmen statistics
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

import iitb.cs699.playerStatAnalyser.entity.CareerAvgBatsman;
import iitb.cs699.playerStatAnalyser.entity.HomeVsAwayBatsman;
import iitb.cs699.playerStatAnalyser.entity.VsCountryBatsman;
import iitb.cs699.playerStatAnalyser.entity.YearlyStatsBatsman;
import iitb.cs699.playerStatAnalyser.service.BatsmanService;

/**
 * RestController class for managing batsman-related statistics requests
 */
@RestController
@RequestMapping("/batsman")
public class BatsmanController {
	
	/**
	 * Autowired service for managing batsman-related statistics
	 */
	@Autowired
	private BatsmanService batsmanService;

	/**
	 * Endpoint to retrieve all Career Average Batsman statistics
	 * @return List of CareerAvgBatsman entities
	 */
	@GetMapping(path = "/careeravg")
    public List<CareerAvgBatsman> findAllCareerAvg() {
        return batsmanService.findAllCareerAvg();
    }
	
	/**
	 * Endpoint to retrieve Career Average Batsman statistics by player ID
	 * @param pid Player ID
	 * @return List of CareerAvgBatsman entities for the specified player ID
	 */
	@GetMapping(path = "/careeravg/{pid}")
    public List<CareerAvgBatsman> findCareerAvgByPId(@PathVariable Integer pid) {
        return batsmanService.findCareerAvgByPId(pid);
    }
	
	/**
	 * Endpoint to retrieve all Home vs Away Batsman statistics
	 * @return List of HomeVsAwayBatsman entities
	 */
	@GetMapping(path = "/homevsaway")
    public List<HomeVsAwayBatsman> findAllHomeVsAway() {
        return batsmanService.findAllHomeVsAway();
    }
	
	/**
	 * Endpoint to retrieve Home vs Away Batsman statistics by player ID
	 * @param pid Player ID
	 * @return List of HomeVsAwayBatsman entities for the specified player ID
	 */
	@GetMapping(path = "/homevsaway/{pid}")
    public List<HomeVsAwayBatsman> findHomeVsAwayBypId(@PathVariable Integer pid) {
        return batsmanService.findHomeVsAwayByPId(pid);
    }
	
	/**
	 * Endpoint to retrieve all Batsman vs Country statistics
	 * @return List of VsCountryBatsman entities
	 */
	@GetMapping(path = "/vscountry")
    public List<VsCountryBatsman> findAllVsCountry() {
        return batsmanService.findAllVsCountry();
    }
	
	/**
	 * Endpoint to retrieve Batsman vs Country statistics by player ID
	 * @param pid Player ID
	 * @return List of VsCountryBatsman entities for the specified player ID
	 */
	@GetMapping(path = "/vscountry/{pid}")
    public List<VsCountryBatsman> findVsCountryByPId(@PathVariable Integer pid) {
        return batsmanService.findVsCountryByPId(pid);
    }
	
	/**
	 * Endpoint to retrieve all Yearly Stats Batsman
	 * @return List of YearlyStatsBatsman entities
	 */
	@GetMapping(path = "/yearlystats")
    public List<YearlyStatsBatsman> findAllYearlyStats() {
        return batsmanService.findAllYearlyStats();
    }
	
	/**
	 * Endpoint to retrieve Yearly Stats Batsman by player ID
	 * @param pid Player ID
	 * @return List of YearlyStatsBatsman entities for the specified player ID
	 */
	@GetMapping(path = "/yearlystats/{pid}")
    public List<YearlyStatsBatsman> findYearlyStatsByPId(@PathVariable Integer pid) {
        return batsmanService.findYearlyStatsByPId(pid);
    }
}
