package iitb.cs699.playerStatAnalyser.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

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
    
    
    /**
     * Custom repository method to delete all records from the 'CareerAvgBowler' table.
     * This method uses a custom JPQL (Java Persistence Query Language) query with the @Query annotation.
     * The @Modifying annotation is added to indicate that this query modifies the database by deleting records.
     * No parameters are required as it performs a bulk delete operation on the entire table.
     */
    @Modifying
    @Query("DELETE from CareerAvgBowler")
    void deleteAll();
}
