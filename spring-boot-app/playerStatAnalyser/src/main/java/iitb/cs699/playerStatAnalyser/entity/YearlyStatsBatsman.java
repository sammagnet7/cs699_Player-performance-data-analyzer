package iitb.cs699.playerStatAnalyser.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


/**
 * Entity class for YearlyStatsBatsman, representing records in the 'yearly_stats_batsman' table.
 */
@Data
@Entity
@Table(name="yearly_stats_batsman")
public class YearlyStatsBatsman {
	
	
	@Id
	@Column(name ="row_id")
	private int rowId;	
	
	@Column(name ="p_id")
	private int pId;	
	
	private String year;
	
	private String inns;
	
	private String runs;
	
	private String hs;
	
	private String ave;
	
	private String sr;
	


}
