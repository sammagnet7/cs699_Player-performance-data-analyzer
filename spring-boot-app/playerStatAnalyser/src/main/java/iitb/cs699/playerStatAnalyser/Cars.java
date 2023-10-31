package iitb.cs699.playerStatAnalyser;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="cars")
public class Cars {
	
	
	//@GeneratedValue(strategy = GenerationType.AUTO)
	//private Long id;
	private String brand;
	private String model;
	@Id
	private int year;

}
