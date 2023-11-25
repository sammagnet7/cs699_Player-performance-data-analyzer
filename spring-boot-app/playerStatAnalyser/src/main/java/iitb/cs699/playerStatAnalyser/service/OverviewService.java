/**
 * Service class for managing player overview-related statistics
 */
package iitb.cs699.playerStatAnalyser.service;

/**
 * Import necessary classes for the service
 */
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import iitb.cs699.playerStatAnalyser.entity.PlayerOverview;
import iitb.cs699.playerStatAnalyser.repo.PlayerOverviewRepository;

/**
 * Service class for managing player overview-related statistics
 */
@Service
public class OverviewService {

	/**
	 * Autowired repository for player overviews
	 */
	@Autowired
	private PlayerOverviewRepository playerOverviewRepo;

	/**
	 * Retrieve all player overviews
	 * 
	 * @return List of PlayerOverview entities
	 */
	public List<PlayerOverview> findAllPlayerOverview() {
		return playerOverviewRepo.findAll();
	}

	/**
	 * Retrieve player overview by player ID
	 * 
	 * @param pid Player ID
	 * @return PlayerOverview entity for the specified player ID
	 */
	public PlayerOverview findPlayerOverviewByPId(Integer pid) {
		Optional<PlayerOverview> optionalPlayerOverview = playerOverviewRepo.findById(pid);
		return optionalPlayerOverview.orElse(null);
	}
}
