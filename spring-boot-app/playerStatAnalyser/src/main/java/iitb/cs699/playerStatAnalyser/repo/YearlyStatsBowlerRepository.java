package iitb.cs699.playerStatAnalyser.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.YearlyStatsBowler;

/**
 * Repository interface for YearlyStatsBowler entity, extending JpaRepository.
 */
public interface YearlyStatsBowlerRepository extends JpaRepository<YearlyStatsBowler, Integer> {

    /**
     * Custom query method to find YearlyStatsBowler records by player ID.
     *
     * @param pid The player ID to search for.
     * @return List of YearlyStatsBowler records matching the player ID.
     */
    List<YearlyStatsBowler> findBypId(Integer pid);
}

