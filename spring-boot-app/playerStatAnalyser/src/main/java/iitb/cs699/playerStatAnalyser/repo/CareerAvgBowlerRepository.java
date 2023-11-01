package iitb.cs699.playerStatAnalyser.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.CareerAvgBowler;

public interface CareerAvgBowlerRepository extends JpaRepository<CareerAvgBowler, Integer> {

	List<CareerAvgBowler> findBypId(Integer pid);
	
	

}
