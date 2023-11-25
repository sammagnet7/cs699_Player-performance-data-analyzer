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
	public int pId;
	
	public String country;
	
	public String inns;
	
	public String overs;
	
	public String mdns;
	
	public String runs;
	
	public String wkts;
	
	public String ave;
	
	public String econ;
	
	public String sr;


}
