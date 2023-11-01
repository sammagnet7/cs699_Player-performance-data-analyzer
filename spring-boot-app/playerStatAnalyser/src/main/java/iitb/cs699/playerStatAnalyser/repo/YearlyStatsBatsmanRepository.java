package iitb.cs699.playerStatAnalyser.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.YearlyStatsBatsman;

public interface YearlyStatsBatsmanRepository extends JpaRepository<YearlyStatsBatsman, Integer> {

	List<YearlyStatsBatsman> findBypId(Integer pid);
	
	

}
