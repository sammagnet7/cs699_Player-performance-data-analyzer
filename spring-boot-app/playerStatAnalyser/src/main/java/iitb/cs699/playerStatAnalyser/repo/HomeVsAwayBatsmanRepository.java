package iitb.cs699.playerStatAnalyser.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.HomeVsAwayBatsman;

public interface HomeVsAwayBatsmanRepository extends JpaRepository<HomeVsAwayBatsman, Integer> {
	
	

}
