package iitb.cs699.playerStatAnalyser.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.CareerAvgBatsman;

/**
 * Repository interface for CareerAvgBatsman entity, extending JpaRepository.
 */
public interface CareerAvgBatsmanRepository extends JpaRepository<CareerAvgBatsman, Integer> {

    /**
     * Custom query method to find CareerAvgBatsman records by player ID.
     *
     * @param pid The player ID to search for.
     * @return List of CareerAvgBatsman records matching the player ID.
     */
    List<CareerAvgBatsman> findBypId(Integer pid);
}
