package iitb.cs699.playerStatAnalyser.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * Entity class for CareerAvgBatsman, representing records in the 'career_avg_batsman' table.
 */
@Data
@Entity
@Table(name="career_avg_batsman")
public class CareerAvgBatsman {
	
	
	@Id
	@Column(name ="row_id")
	private int rowId;
	
	@Column(name ="p_id")
	public int pId;
	
	public String span;
	
	public String inns;
	
	public String runs;
	
	public String hs;
	
	public String ave;
	
	public String sr;
	
	@Column(name="100")
	public String _100s;
	
	@Column(name="50")
	public String _50s;
	
	@Column(name="0")
	public String _0s;
	
	@Column(name="4s")
	public String _4s;
	
	@Column(name="6s")
	public String _6s;
	


}
