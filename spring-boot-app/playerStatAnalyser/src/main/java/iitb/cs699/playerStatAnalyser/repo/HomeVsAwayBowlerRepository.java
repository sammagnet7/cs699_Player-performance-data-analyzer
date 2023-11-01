package iitb.cs699.playerStatAnalyser.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.HomeVsAwayBowler;

public interface HomeVsAwayBowlerRepository extends JpaRepository<HomeVsAwayBowler, Integer> {
	
	

}
