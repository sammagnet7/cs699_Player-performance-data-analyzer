package iitb.cs699.playerStatAnalyser.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="yearly_stats_batsman")
public class YearlyStatsBatsman {
	
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int row_id;	
	public int p_id;
	public String year;
	public String inns;
	public String runs;
	public String hs;
	public String ave;
	public String sr;
	


}
