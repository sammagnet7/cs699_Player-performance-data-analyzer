package iitb.cs699.playerStatAnalyser.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.VsCountryBowler;

/**
 * Repository interface for VsCountryBowler entity, extending JpaRepository.
 */
public interface VsCountryBowlerRepository extends JpaRepository<VsCountryBowler, Integer> {

    /**
     * Custom query method to find VsCountryBowler records by player ID.
     *
     * @param pid The player ID to search for.
     * @return List of VsCountryBowler records matching the player ID.
     */
    List<VsCountryBowler> findBypId(Integer pid);
}
