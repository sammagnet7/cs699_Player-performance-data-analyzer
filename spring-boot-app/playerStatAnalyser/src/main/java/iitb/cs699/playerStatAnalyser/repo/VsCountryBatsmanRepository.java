package iitb.cs699.playerStatAnalyser.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.VsCountryBatsman;

/**
 * Repository interface for VsCountryBatsman entity, extending JpaRepository.
 */
public interface VsCountryBatsmanRepository extends JpaRepository<VsCountryBatsman, Integer> {

    /**
     * Custom query method to find VsCountryBatsman records by player ID.
     *
     * @param pid The player ID to search for.
     * @return List of VsCountryBatsman records matching the player ID.
     */
    List<VsCountryBatsman> findBypId(Integer pid);
}

