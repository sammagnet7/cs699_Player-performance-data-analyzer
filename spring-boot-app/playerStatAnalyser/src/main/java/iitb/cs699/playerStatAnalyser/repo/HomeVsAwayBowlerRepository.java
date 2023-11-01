package iitb.cs699.playerStatAnalyser.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.HomeVsAwayBowler;

public interface HomeVsAwayBowlerRepository extends JpaRepository<HomeVsAwayBowler, Integer> {

	List<HomeVsAwayBowler> findBypId(Integer pid);
	
	

}
