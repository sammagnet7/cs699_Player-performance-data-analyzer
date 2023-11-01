package iitb.cs699.playerStatAnalyser.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import iitb.cs699.playerStatAnalyser.entity.PlayerOverview;
import iitb.cs699.playerStatAnalyser.entity.VsCountryBatsman;
import iitb.cs699.playerStatAnalyser.repo.PlayerOverviewRepository;
import iitb.cs699.playerStatAnalyser.repo.VsCountryBatsmanRepository;

@RestController
@RequestMapping("/overview")
public class OverviewController {
	
	@Autowired
	private PlayerOverviewRepository playerOverviewRepo;
	
	

	@GetMapping(path = "/all")
    public List<PlayerOverview> findAllPlayerOverview() {
        return playerOverviewRepo.findAll();
    }

}
