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
	private int pId;
	
	private String span;
	
	private String inns;
	
	private String runs;
	
	private String hs;
	
	private String ave;
	
	private String sr;
	
	@Column(name="100")
	private String _100s;
	
	@Column(name="50")
	private String _50s;
	
	@Column(name="0")
	private String _0s;
	
	@Column(name="4s")
	private String _4s;
	
	@Column(name="6s")
	private String _6s;
	


}
