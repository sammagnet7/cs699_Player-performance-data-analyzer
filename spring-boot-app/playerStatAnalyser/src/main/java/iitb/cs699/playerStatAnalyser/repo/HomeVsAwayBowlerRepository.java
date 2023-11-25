package iitb.cs699.playerStatAnalyser.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.HomeVsAwayBowler;

/**
 * Repository interface for HomeVsAwayBowler entity, extending JpaRepository.
 */
public interface HomeVsAwayBowlerRepository extends JpaRepository<HomeVsAwayBowler, Integer> {

    /**
     * Custom query method to find HomeVsAwayBowler records by player ID.
     *
     * @param pid The player ID to search for.
     * @return List of HomeVsAwayBowler records matching the player ID.
     */
    List<HomeVsAwayBowler> findBypId(Integer pid);
}
