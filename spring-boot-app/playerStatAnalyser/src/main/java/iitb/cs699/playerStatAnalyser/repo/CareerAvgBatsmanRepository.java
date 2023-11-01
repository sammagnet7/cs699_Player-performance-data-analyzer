package iitb.cs699.playerStatAnalyser.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.CareerAvgBatsman;

public interface CareerAvgBatsmanRepository extends JpaRepository<CareerAvgBatsman, Integer> {

	List<CareerAvgBatsman> findBypId(Integer pid);
	
	

}
