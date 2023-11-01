package iitb.cs699.playerStatAnalyser.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.PlayerOverview;

public interface PlayerOverviewRepository extends JpaRepository<PlayerOverview, Integer> {
	
	

}
