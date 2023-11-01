package iitb.cs699.playerStatAnalyser.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import iitb.cs699.playerStatAnalyser.entity.CareerAvgBatsman;
import iitb.cs699.playerStatAnalyser.entity.CareerAvgBowler;
import iitb.cs699.playerStatAnalyser.entity.HomeVsAwayBatsman;
import iitb.cs699.playerStatAnalyser.entity.HomeVsAwayBowler;
import iitb.cs699.playerStatAnalyser.entity.VsCountryBatsman;
import iitb.cs699.playerStatAnalyser.entity.VsCountryBowler;
import iitb.cs699.playerStatAnalyser.entity.YearlyStatsBatsman;
import iitb.cs699.playerStatAnalyser.entity.YearlyStatsBowler;
import iitb.cs699.playerStatAnalyser.repo.CareerAvgBatsmanRepository;
import iitb.cs699.playerStatAnalyser.repo.HomeVsAwayBatsmanRepository;
import iitb.cs699.playerStatAnalyser.repo.VsCountryBatsmanRepository;
import iitb.cs699.playerStatAnalyser.repo.YearlyStatsBatsmanRepository;

@RestController
@RequestMapping("/batsman")
public class BatsmanController {
	
	@Autowired
	private CareerAvgBatsmanRepository careerAvgBatsmanRepo;
	
	@Autowired
	private HomeVsAwayBatsmanRepository homeVsAwayBatsmanRepo;
	
	@Autowired
	private VsCountryBatsmanRepository vsCountryBatsmanRepo;
	
	@Autowired
	private YearlyStatsBatsmanRepository yearlyStatsBatsmanRepo;
	

	@GetMapping(path = "/careeravg")
    public List<CareerAvgBatsman> findAllCareerAvg() {
        return careerAvgBatsmanRepo.findAll();
    }
	
	
	@GetMapping(path = "/homevsaway")
    public List<HomeVsAwayBatsman> findAllHomeVsAway() {
        return homeVsAwayBatsmanRepo.findAll();
    }
	
	
	@GetMapping(path = "/vscountry")
    public List<VsCountryBatsman> findAllVsCountry() {
        return vsCountryBatsmanRepo.findAll();
    }
	
	
	@GetMapping(path = "/yearlystats")
    public List<YearlyStatsBatsman> findAllYearlyStats() {
        return yearlyStatsBatsmanRepo.findAll();
    }

}
