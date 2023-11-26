/**
 * Controller class for handling requests related to player overviews
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

import iitb.cs699.playerStatAnalyser.entity.PlayerOverview;
import iitb.cs699.playerStatAnalyser.service.OverviewService;

/**
 * RestController class for managing player overview-related statistics requests
 */
@RestController
@RequestMapping("/overview")
public class OverviewController {
	
	/**
	 * Autowired service for managing player overview-related statistics
	 */
	@Autowired
	private OverviewService overviewService;

	/**
	 * Endpoint to retrieve all player overviews
	 * @return List of PlayerOverview entities
	 */
	@GetMapping(path = "/all")
    public List<PlayerOverview> findAllPlayerOverview() {
        return overviewService.findAllPlayerOverview();
    }
	
	/**
	 * Endpoint to retrieve player overview by player ID
	 * @param pid Player ID
	 * @return PlayerOverview entity for the specified player ID
	 */
	@GetMapping(path = "/{pid}")
    public PlayerOverview findPlayerOverviewbyPId(@PathVariable int pid) {
        return overviewService.findPlayerOverviewByPId(pid);
    }
}
