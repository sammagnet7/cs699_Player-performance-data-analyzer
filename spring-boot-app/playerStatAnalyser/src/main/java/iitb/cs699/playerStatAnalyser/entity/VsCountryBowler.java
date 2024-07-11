package iitb.cs699.playerStatAnalyser.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * Entity class for VsCountryBowler, representing records in the 'vs_country_bowler' table.
 */
@Data
@Entity
@Table(name="vs_country_bowler")
public class VsCountryBowler {
	
	
	@Id
	@Column(name ="row_id")
	private int rowId;	
	
	@Column(name ="p_id")
	private int pId;
	
	private String country;
	
	private String inns;
	
	private String overs;
	
	private String mdns;
	
	private String runs;
	
	private String wkts;
	
	private String ave;
	
	private String econ;
	
	private String sr;


}
