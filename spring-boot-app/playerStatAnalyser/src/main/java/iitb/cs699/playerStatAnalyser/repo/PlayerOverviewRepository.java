package iitb.cs699.playerStatAnalyser.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

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
    
    
    /**
     * Custom repository method to delete all records from the 'PlayerOverview' table.
     * This method uses a custom JPQL (Java Persistence Query Language) query with the @Query annotation.
     * The @Modifying annotation is added to indicate that this query modifies the database by deleting records.
     * No parameters are required as it performs a bulk delete operation on the entire table.
     */
    @Modifying
    @Query("DELETE from PlayerOverview")
    void deleteAll();
}

