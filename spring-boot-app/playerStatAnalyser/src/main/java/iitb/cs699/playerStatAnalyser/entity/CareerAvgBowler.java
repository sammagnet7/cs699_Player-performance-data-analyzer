package iitb.cs699.playerStatAnalyser.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


/**
 * Entity class for CareerAvgBowler, representing records in the 'career_avg_bowler' table.
 */
@Data
@Entity
@Table(name="career_avg_bowler")
public class CareerAvgBowler {
	
	
	@Id
	@Column(name ="row_id")
	private int rowId;	
	
	@Column(name ="p_id")
	public int pId;
	
	public String span;
	
	public String inns;
	
	public String overs;
	
	public String mdns;
	
	public String runs;
	
	public String wkts;
	
	public String ave;
	
	public String econ;
	
	public String sr;
	
	public String caught;
	
	public String bowled;
	
	@Column(name="leg_before_wicket")
	public String lbw;
	
	
}
