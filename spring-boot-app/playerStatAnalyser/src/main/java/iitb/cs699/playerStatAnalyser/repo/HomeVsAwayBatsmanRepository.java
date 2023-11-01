package iitb.cs699.playerStatAnalyser.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.HomeVsAwayBatsman;

public interface HomeVsAwayBatsmanRepository extends JpaRepository<HomeVsAwayBatsman, Integer> {

	List<HomeVsAwayBatsman> findBypId(Integer pid);
	
	

}
