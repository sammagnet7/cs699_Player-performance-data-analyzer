package iitb.cs699.playerStatAnalyser.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.YearlyStatsBatsman;

public interface YearlyStatsBatsmanRepository extends JpaRepository<YearlyStatsBatsman, Integer> {
	
	

}
