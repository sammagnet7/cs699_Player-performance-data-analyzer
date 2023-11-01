package iitb.cs699.playerStatAnalyser.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.VsCountryBatsman;

public interface VsCountryBatsmanRepository extends JpaRepository<VsCountryBatsman, Integer> {

	List<VsCountryBatsman> findBypId(Integer pid);
	
	

}
