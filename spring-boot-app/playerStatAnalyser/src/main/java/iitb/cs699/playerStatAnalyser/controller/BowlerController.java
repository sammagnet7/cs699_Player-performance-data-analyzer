package iitb.cs699.playerStatAnalyser.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import iitb.cs699.playerStatAnalyser.entity.CareerAvgBowler;
import iitb.cs699.playerStatAnalyser.entity.HomeVsAwayBowler;
import iitb.cs699.playerStatAnalyser.entity.VsCountryBatsman;
import iitb.cs699.playerStatAnalyser.entity.VsCountryBowler;
import iitb.cs699.playerStatAnalyser.entity.YearlyStatsBowler;
import iitb.cs699.playerStatAnalyser.repo.CareerAvgBowlerRepository;
import iitb.cs699.playerStatAnalyser.repo.HomeVsAwayBowlerRepository;
import iitb.cs699.playerStatAnalyser.repo.VsCountryBowlerRepository;
import iitb.cs699.playerStatAnalyser.repo.YearlyStatsBowlerRepository;

@RestController
@RequestMapping("/bowler")
public class BowlerController {
	
	@Autowired
	private CareerAvgBowlerRepository careerAvgBowlerRepo;
	
	@Autowired
	private HomeVsAwayBowlerRepository homeVsAwayBowlerRepo;
	
	@Autowired
	private VsCountryBowlerRepository vsCountryBowlerRepo;
	
	@Autowired
	private YearlyStatsBowlerRepository yearlyStatsBowlerRepo;
	
	
	@GetMapping(path = "/careeravg")
    public List<CareerAvgBowler> findAllCareerAvg() {
        return careerAvgBowlerRepo.findAll();
    }
	
	
	@GetMapping(path = "/homevsaway")
    public List<HomeVsAwayBowler> findAllHomeVsAway() {
        return homeVsAwayBowlerRepo.findAll();
    }
	
	
	@GetMapping(path = "/vscountry")
    public List<VsCountryBowler> findAllVsCountry() {
        return vsCountryBowlerRepo.findAll();
    }
	
	
	@GetMapping(path = "/yearlystats")
    public List<YearlyStatsBowler> findAllYearlyStats() {
        return yearlyStatsBowlerRepo.findAll();
    }

}
