package iitb.cs699.playerStatAnalyser.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.CareerAvgBowler;

/**
 * Repository interface for CareerAvgBowler entity, extending JpaRepository.
 */
public interface CareerAvgBowlerRepository extends JpaRepository<CareerAvgBowler, Integer> {

    /**
     * Custom query method to find CareerAvgBowler records by player ID.
     *
     * @param pid The player ID to search for.
     * @return List of CareerAvgBowler records matching the player ID.
     */
    List<CareerAvgBowler> findBypId(Integer pid);
}
