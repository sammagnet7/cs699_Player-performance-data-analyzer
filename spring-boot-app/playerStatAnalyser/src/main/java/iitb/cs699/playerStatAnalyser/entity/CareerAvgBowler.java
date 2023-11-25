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
	private int pId;
	
	private String span;
	
	private String inns;
	
	private String overs;
	
	private String mdns;
	
	private String runs;
	
	private String wkts;
	
	private String ave;
	
	private String econ;
	
	private String sr;
	
	private String caught;
	
	private String bowled;
	
	@Column(name="leg_before_wicket")
	private String lbw;
	
	
}
