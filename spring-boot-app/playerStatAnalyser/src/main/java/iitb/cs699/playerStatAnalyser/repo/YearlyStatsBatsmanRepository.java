package iitb.cs699.playerStatAnalyser.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

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
    
    
    /**
     * Custom repository method to delete all records from the 'YearlyStatsBatsman' table.
     * This method uses a custom JPQL (Java Persistence Query Language) query with the @Query annotation.
     * The @Modifying annotation is added to indicate that this query modifies the database by deleting records.
     * No parameters are required as it performs a bulk delete operation on the entire table.
     */
    @Modifying
    @Query("DELETE from YearlyStatsBatsman")
    void deleteAll();
}
