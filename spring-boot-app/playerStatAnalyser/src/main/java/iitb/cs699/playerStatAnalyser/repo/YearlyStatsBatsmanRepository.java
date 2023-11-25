package iitb.cs699.playerStatAnalyser.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import iitb.cs699.playerStatAnalyser.entity.YearlyStatsBatsman;

/**
 * Repository interface for YearlyStatsBatsman entity, extending JpaRepository.
 */
public interface YearlyStatsBatsmanRepository extends JpaRepository<YearlyStatsBatsman, Integer> {

    /**
     * Custom query method to find YearlyStatsBatsman records by player ID.
     *
     * @param pid The player ID to search for.
     * @return List of YearlyStatsBatsman records matching the player ID.
     */
    List<YearlyStatsBatsman> findBypId(Integer pid);
}
