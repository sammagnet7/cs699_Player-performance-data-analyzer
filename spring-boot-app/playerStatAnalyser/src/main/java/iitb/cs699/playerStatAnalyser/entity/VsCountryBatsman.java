package iitb.cs699.playerStatAnalyser.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


/**
 * Entity class for VsCountryBatsman, representing records in the 'vs_country_batsman' table.
 */
@Data
@Entity
@Table(name="vs_country_batsman")
public class VsCountryBatsman {
	
	
	@Id
	@Column(name ="row_id")
	private int rowId;	
	
	@Column(name ="p_id")
	public int pId;
	
	private String country;
	
	private String inns;
	
	private String runs;
	
	private String hs;
	
	private String ave;
	
	private String sr;



}
