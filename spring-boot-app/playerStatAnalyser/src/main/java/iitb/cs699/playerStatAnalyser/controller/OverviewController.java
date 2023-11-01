package iitb.cs699.playerStatAnalyser.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import iitb.cs699.playerStatAnalyser.entity.PlayerOverview;
import iitb.cs699.playerStatAnalyser.repo.PlayerOverviewRepository;

@RestController
@RequestMapping("/overview")
public class OverviewController {
	
	@Autowired
	private PlayerOverviewRepository playerOverviewRepo;
	
	

	@GetMapping(path = "/all")
    public List<PlayerOverview> findAllPlayerOverview() {
        return playerOverviewRepo.findAll();
    }
	
	@GetMapping(path = "/{pid}")
    public PlayerOverview findPlayerOverviewbyPId(@PathVariable Integer pid) {
		
        return playerOverviewRepo.findBypId(pid);
    }


}
