package iitb.cs699.playerStatAnalyser.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.PlayerOverview;

/**
 * Repository interface for PlayerOverview entity, extending JpaRepository.
 */
public interface PlayerOverviewRepository extends JpaRepository<PlayerOverview, Integer> {

    /**
     * Custom query method to find PlayerOverview record by player ID.
     *
     * @param pid The player ID to search for.
     * @return PlayerOverview record matching the player ID.
     */
    PlayerOverview findBypId(int pid);
}

