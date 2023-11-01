package iitb.cs699.playerStatAnalyser.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@GetMapping(path = "/careeravg/{pid}")
    public List<CareerAvgBowler> findCareerAvgByPId(@PathVariable Integer pid) {
        return careerAvgBowlerRepo.findBypId(pid);
    }
	
	
	
	
	@GetMapping(path = "/homevsaway")
    public List<HomeVsAwayBowler> findAllHomeVsAway() {
        return homeVsAwayBowlerRepo.findAll();
    }
	
	@GetMapping(path = "/homevsaway/{pid}")
    public List<HomeVsAwayBowler> findHomeVsAwayByPId(@PathVariable Integer pid) {
        return homeVsAwayBowlerRepo.findBypId(pid);
    }
	
	
	
	
	@GetMapping(path = "/vscountry")
    public List<VsCountryBowler> findAllVsCountry() {
        return vsCountryBowlerRepo.findAll();
    }
	
	@GetMapping(path = "/vscountry/{pid}")
    public List<VsCountryBowler> findVsCountryByPId(@PathVariable Integer pid) {
        return vsCountryBowlerRepo.findBypId(pid);
    }
	
	
	
	
	@GetMapping(path = "/yearlystats")
    public List<YearlyStatsBowler> findAllYearlyStats() {
        return yearlyStatsBowlerRepo.findAll();
    }
	
	@GetMapping(path = "/yearlystats/{pid}")
    public List<YearlyStatsBowler> findYearlyStatsByPId(@PathVariable Integer pid) {
        return yearlyStatsBowlerRepo.findBypId(pid);
    }

}
