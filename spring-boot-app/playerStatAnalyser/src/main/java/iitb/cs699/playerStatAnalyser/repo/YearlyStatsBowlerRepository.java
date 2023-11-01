package iitb.cs699.playerStatAnalyser.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.YearlyStatsBowler;

public interface YearlyStatsBowlerRepository extends JpaRepository<YearlyStatsBowler, Integer> {
	
	

}
