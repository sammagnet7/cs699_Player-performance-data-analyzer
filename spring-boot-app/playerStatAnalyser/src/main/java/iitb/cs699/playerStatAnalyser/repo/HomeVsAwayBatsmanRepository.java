package iitb.cs699.playerStatAnalyser.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.HomeVsAwayBatsman;

/**
 * Repository interface for HomeVsAwayBatsman entity, extending JpaRepository.
 */
public interface HomeVsAwayBatsmanRepository extends JpaRepository<HomeVsAwayBatsman, Integer> {

    /**
     * Custom query method to find HomeVsAwayBatsman records by player ID.
     *
     * @param pid The player ID to search for.
     * @return List of HomeVsAwayBatsman records matching the player ID.
     */
    List<HomeVsAwayBatsman> findBypId(Integer pid);
}

